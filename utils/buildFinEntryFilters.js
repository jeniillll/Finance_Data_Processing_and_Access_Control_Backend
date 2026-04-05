export function buildFinEntryFilters(query, departmentId) {
    const { startDate, endDate, categoryId, type } = query;

    const where = {
        isDeleted: false,
        ...(departmentId && { departmentId })
    };

    if (categoryId) {
        where.categoryId = Number(categoryId);
    }

    if (type) {
        where.type = type;
    }

    if (startDate || endDate) {
        where.date = {};
        if (startDate) where.date.gte = new Date(startDate);
        if (endDate) where.date.lte = new Date(endDate);
    }

    return where;
}