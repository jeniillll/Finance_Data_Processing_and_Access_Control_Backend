import { findAllCategories, findCategoryByName, createCategory } from "../../repositories/admin/category.repository.js";

export async function getAllCategoriesService() {
    const categories = await findAllCategories();

    return {
        statusCode: 200,
        message: "Got categories successfully",
        categories
    };
}

export async function addCategoryService(body) {
    const { categoryName } = body;

    if (!categoryName) {
        return {
            statusCode: 400,
            message: "categoryName not found in body"
        };
    }

    const existingCategory = await findCategoryByName(categoryName);

    if (existingCategory) {
        return {
            statusCode: 409,
            message: "Category already exists"
        };
    }

    await createCategory(categoryName);

    return {
        statusCode: 201,
        message: "Category created successfully"
    };
}