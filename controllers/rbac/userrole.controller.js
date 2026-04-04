import { assignRoleToUserService, deAssignRoleFromUserService } from "../../services/rbac/userrole.service.js";
// import {  } from "../../services/rbac/userrole.service.js"

export async function assignRoleToUserController(req, res) {
    try {
        const result = await assignRoleToUserService(req.params);

        return res.status(result.statusCode).json({
            message: result.message
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function deAssignRoleFromUserController(req, res) {
    try {
        const result = await deAssignRoleFromUserService(req.params);

        return res.status(result.statusCode).json({
            message: result.message
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}