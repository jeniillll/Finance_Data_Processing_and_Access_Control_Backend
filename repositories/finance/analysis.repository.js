import prisma from "../../prisma/client.js";
import { buildFinEntryFilters } from "../../utils/buildFinEntryFilters.js";

export async function getIncomeExpenseSummary(departmentId, query) {
    const baseWhere = buildFinEntryFilters(query, departmentId);

    const incomeResult = await prisma.finEntry.aggregate({
        where: { ...baseWhere, type: "INCOME" },
        _sum: { amount: true }
    });

    const expenseResult = await prisma.finEntry.aggregate({
        where: { ...baseWhere, type: "EXPENSE" },
        _sum: { amount: true }
    });

    return {
        totalIncome: Number(incomeResult._sum.amount || 0),
        totalExpense: Number(expenseResult._sum.amount || 0)
    };
}

export async function getTrendEntries(departmentId, range, query) {
    const where = buildFinEntryFilters(query, departmentId);

    const now = new Date();
    let startDate = null;

    switch (range) {
        case "week":
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
        case "month":
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
        case "year":
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
        case "10years":
            startDate = new Date(now.setFullYear(now.getFullYear() - 10));
            break;
    }

    if (startDate) {
        where.date = {
            ...(where.date || {}),
            gte: startDate
        };
    }

    return prisma.finEntry.findMany({
        where,
        orderBy: { date: "asc" }
    });
}

export async function getRecentEntries(departmentId, query) {
    const where = buildFinEntryFilters(query, departmentId);

    return prisma.finEntry.findMany({
        where,
        orderBy: { date: "desc" },
        take: 5,
        include: {
            department: true,
            category: true
        }
    });
}

export async function getAverageExpense(departmentId, query) {
    const where = buildFinEntryFilters(query, departmentId);

    const avgExpense = await prisma.finEntry.aggregate({
        where: {
            ...where,
            type: "EXPENSE"
        },
        _avg: {
            amount: true
        }
    });

    return Number(avgExpense._avg.amount || 0);
}

export async function getExpenseAnomalies(departmentId, average, query) {
    const where = buildFinEntryFilters(query, departmentId);

    return prisma.finEntry.findMany({
        where: {
            ...where,
            type: "EXPENSE",
            amount: {
                gt: average * 1.5
            }
        },
        orderBy: {
            amount: "desc"
        },
        take: 5,
        include: {
            department: true,
            category: true
        }
    });
}