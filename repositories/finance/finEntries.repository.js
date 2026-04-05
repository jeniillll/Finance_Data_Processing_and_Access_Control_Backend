import prisma from "../../prisma/client.js";

export async function findEntries(departmentId) {
    const whereClause = {
        isDeleted: false,
        ...(departmentId && { departmentId })
    };

    return prisma.finEntry.findMany({
        where: whereClause,
        include: {
            department: true,
            category: true
        }
    });
}

export async function createFinEntry(data) {
    return prisma.finEntry.create({
        data,
        include: {
            department: true,
            category: true
        }
    });
}

export async function findEntryById(id) {
    return prisma.finEntry.findUnique({
        where: { id }
    });
}

export async function updateFinEntry(id, body) {
    const { departmentId, categoryId, amount, type, date, description } = body;

    return prisma.finEntry.update({
        where: { id },
        data: {
            ...(departmentId && { departmentId: Number(departmentId) }),
            ...(categoryId && { categoryId: Number(categoryId) }),
            ...(amount && { amount }),
            ...(type && { type }),
            ...(date && { date: new Date(date) }),
            ...(description !== undefined && { description })
        },
        include: {
            department: true,
            category: true
        }
    });
}

export async function softDeleteFinEntry(id) {
    return prisma.finEntry.update({
        where: { id },
        data: {
            isDeleted: true
        }
    });
}