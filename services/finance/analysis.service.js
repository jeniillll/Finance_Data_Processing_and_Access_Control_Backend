import { getIncomeExpenseSummary, getTrendEntries, getRecentEntries, getAverageExpense, getExpenseAnomalies } from "../../repositories/finance/analysis.repository.js";

export async function getSummaryService(departmentId, query) {
    const { totalIncome, totalExpense } = await getIncomeExpenseSummary(
        departmentId,
        query
    );

    return {
        statusCode: 200,
        message: "Summary fetched successfully",
        summary: {
            totalIncome,
            totalExpense,
            netBalance: totalIncome - totalExpense
        }
    };
}

export async function getTrendService(departmentId, range = "month", query) {
    const entries = await getTrendEntries(departmentId, range, query);

    const trendMap = new Map();

    for (const entry of entries) {
        const d = new Date(entry.date);
        let label;

        if (range === "week" || range === "month") {
            label = d.toISOString().split("T")[0];
        } else if (range === "year") {
            label = `${d.getFullYear()}-${d.getMonth() + 1}`;
        } else {
            label = `${d.getFullYear()}`;
        }

        if (!trendMap.has(label)) {
            trendMap.set(label, {
                label,
                income: 0,
                expense: 0
            });
        }

        const row = trendMap.get(label);

        if (entry.type === "INCOME") row.income += Number(entry.amount);
        else row.expense += Number(entry.amount);
    }

    return {
        statusCode: 200,
        message: "Trend fetched successfully",
        trend: Array.from(trendMap.values())
    };
}

export async function getRecentActivityService(departmentId, query) {
    const recentActivity = await getRecentEntries(departmentId, query);

    return {
        statusCode: 200,
        message: "Recent activity fetched successfully",
        recentActivity
    };
}

export async function getAnomaliesService(departmentId, query) {
    const average = await getAverageExpense(departmentId, query);
    const anomalies = await getExpenseAnomalies(departmentId, average, query);

    return {
        statusCode: 200,
        message: "Anomalies fetched successfully",
        anomalies
    };
}