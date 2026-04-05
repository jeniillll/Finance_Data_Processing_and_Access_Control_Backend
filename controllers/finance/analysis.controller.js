import prisma from "../../prisma/client.js";


export async function getSummary(req, res) {
    try {
        const departmentId = req.allowedDepartmentId;

        const baseWhere = {
            isDeleted: false,
            ...(departmentId && { departmentId }),
        };

        const incomeResult = await prisma.finEntry.aggregate({
            where: {
                ...baseWhere,
                type: "INCOME",
            },
            _sum: {
                amount: true,
            },
        });

        const expenseResult = await prisma.finEntry.aggregate({
            where: {
                ...baseWhere,
                type: "EXPENSE",
            },
            _sum: {
                amount: true,
            },
        });

        const totalIncome = Number(incomeResult._sum.amount || 0);
        const totalExpense = Number(expenseResult._sum.amount || 0);
        const netBalance = totalIncome - totalExpense;

        return res.status(200).json({
            message: "Summary fetched successfully",
            summary: {
                totalIncome,
                totalExpense,
                netBalance,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching summary",
        });
    }
}

// for pie chart kinda things... helps to compare how expance is used...
export async function getCategoryBreakdown(req, res) {
    try {
        const departmentId = req.allowedDepartmentId;

        const whereClause = {
            isDeleted: false,
            type: "EXPENSE",
            ...(departmentId && { departmentId }),
        };

        const breakdown = await prisma.finEntry.groupBy({
            by: ["categoryId"],
            where: whereClause,
            _sum: {
                amount: true,
            },
        });

        const categoryIds = breakdown.map((item) => item.categoryId);

        const categories = await prisma.category.findMany({
            where: {
                id: { in: categoryIds },
            },
        });

        const categoryMap = new Map(
            categories.map((cat) => [cat.id, cat.categoryName])
        );

        const formatted = breakdown.map((item) => ({
            category: categoryMap.get(item.categoryId),
            total: Number(item._sum.amount || 0),
        }));

        return res.status(200).json({
            message: "Category breakdown fetched successfully",
            breakdown: formatted,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching category breakdown",
        });
    }
}


// for line chart and user can enter range (from given one --> week, month, year, 10years, all time)
export async function getTrend(req, res) {
    try {
        const { range = "month" } = req.query; // default monthly...
        const departmentId = req.allowedDepartmentId;

        const now = new Date();
        let startDate = null;
        let groupFormat = "day";

        switch (range) {
            case "week":
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 7);
                groupFormat = "day";
                break;

            case "month":
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 1);
                groupFormat = "day";
                break;

            case "year":
                startDate = new Date(now);
                startDate.setFullYear(now.getFullYear() - 1);
                groupFormat = "month";
                break;

            case "10years":
                startDate = new Date(now);
                startDate.setFullYear(now.getFullYear() - 10);
                groupFormat = "year";
                break;

            case "all":
                startDate = null;
                groupFormat = "year";
                break;
        }

        const whereClause = {
            isDeleted: false,
            ...(departmentId && { departmentId }),
            ...(startDate && {
                date: {
                    gte: startDate,
                },
            }),
        };

        const entries = await prisma.finEntry.findMany({
            where: whereClause,
            orderBy: {
                date: "asc",
            },
        });

        const trendMap = new Map();

        for (const entry of entries) {
            const d = new Date(entry.date);
            let label;

            if (groupFormat === "day") {
                label = d.toISOString().split("T")[0];
            } else if (groupFormat === "month") {
                label = `${d.getFullYear()}-${d.getMonth() + 1}`;
            } else {
                label = `${d.getFullYear()}`;
            }

            if (!trendMap.has(label)) {
                trendMap.set(label, {
                    label,
                    income: 0,
                    expense: 0,
                });
            }

            const row = trendMap.get(label);

            if (entry.type === "INCOME") {
                row.income += Number(entry.amount);
            } else {
                row.expense += Number(entry.amount);
            }
        }

        return res.status(200).json({
            message: "Trend fetched successfully",
            trend: Array.from(trendMap.values()),
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching trend",
        });
    }
}

export async function getRecentActivity(req, res) {
    try {
        const departmentId = req.allowedDepartmentId;

        const whereClause = {
            isDeleted: false,
            ...(departmentId && { departmentId }),
        };

        // recent 5 entries
        const recentActivity = await prisma.finEntry.findMany({
            where: whereClause,
            orderBy: {
                date: "desc",
            },
            take: 5,
            include: {
                department: true,
                category: true,
            },
        });


        const avgExpense = await prisma.finEntry.aggregate({
            where: {
                ...whereClause,
                type: "EXPENSE",
            },
            _avg: {
                amount: true,
            },
        });

        const average = Number(avgExpense._avg.amount || 0);

        // if entry > 1.5x averge then this is non-usual entry
        const anomalies = await prisma.finEntry.findMany({
            where: {
                ...whereClause,
                type: "EXPENSE",
                amount: {
                    gt: average * 1.5,
                },
            },
            orderBy: {
                amount: "desc",
            },
            take: 5,
            include: {
                department: true,
                category: true,
            },
        });

        return res.status(200).json({
            message: "Recent activity fetched successfully",
            recentActivity,
            anomalies,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching recent activity",
        });
    }
}