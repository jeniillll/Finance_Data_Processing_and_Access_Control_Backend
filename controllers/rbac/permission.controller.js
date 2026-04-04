import { assignPermissionService, deAssignPermissionService } from "../../services/rbac/permission.service.js";

export async function assignPermissionController(req, res) {
  try {
    const result = await assignPermissionService(req.params);
    return res.status(result.statusCode).json({ message: result.message });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function deAssignPermissionController(req, res) {
  try {
    const result = await deAssignPermissionService(req.params);
    return res.status(result.statusCode).json({ message: result.message });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}