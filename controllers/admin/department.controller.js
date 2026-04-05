import { getAllDepartmentsService, addDepartmentService } from "../../services/admin/department.service.js";

export async function getAllDepartments(req, res) {
    try {
        const result = await getAllDepartmentsService();

        return res.status(result.statusCode).json({
            message: result.message,
            departments: result.departments
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while getting departments",
            error: error.message
        });
    }
}

export async function AddDepartment(req, res) {
    try {
        const result = await addDepartmentService(req.body);

        return res.status(result.statusCode).json({
            message: result.message
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while creating department",
            error: error.message
        });
    }
}