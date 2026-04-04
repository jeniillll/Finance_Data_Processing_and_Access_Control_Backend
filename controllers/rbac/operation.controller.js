import { createOperationService } from "../../services/rbac/operation.service.js";

export async function createOperationController(req, res) {
    try {
        const result = await createOperationService(req.body);

        return res.status(result.statusCode).json({
            message: result.message,
            operation: result.operation
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}