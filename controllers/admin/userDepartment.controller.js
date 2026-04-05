import { assignDepartmentService, deassignDepartmentService } from "../../services/admin/userDepartment.service.js";

export async function assignDepartmentController(req, res) {
    try {
        const result = await assignDepartmentService(req.params);

        return res.status(result.statusCode).json({
            message: result.message,
            assignment: result.assignment
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deassignDepartmentController(req, res) {
    try {
        const result = await deassignDepartmentService(req.params);

        return res.status(result.statusCode).json({
            message: result.message,
            removed: result.removed
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}