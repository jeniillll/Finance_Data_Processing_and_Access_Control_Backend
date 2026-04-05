import prisma from "../../prisma/client.js";

export async function findAllCategories() {
    return prisma.category.findMany({});
}

export async function findCategoryByName(categoryName) {
    return prisma.category.findUnique({
        where: {
            categoryName
        }
    });
}

export async function createCategory(categoryName) {
    return prisma.category.create({
        data: {
            categoryName
        }
    });
}