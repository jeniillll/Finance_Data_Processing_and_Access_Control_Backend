import { getAllCategoriesService, addCategoryService } from "../../services/admin/category.service.js";

export async function getAllCategories(req, res) {
    try {
        const result = await getAllCategoriesService();

        return res.status(result.statusCode).json({
            message: result.message,
            categories: result.categories
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while getting categories",
            error: error.message
        });
    }
}

export async function addCategory(req, res) {
    try {
        const result = await addCategoryService(req.body);

        return res.status(result.statusCode).json({
            message: result.message
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while creating category",
            error: error.message
        });
    }
}