import { addRoleService, getAllRolesService } from "../../services/rbac/role.service.js";

export async function addRoleController(req, res) {
  try {
    const result = await addRoleService(req.body);

    return res.status(result.statusCode).json({
      message: result.message,
      role: result.role
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getAllRolesController(req, res) {
  try {
    const result = await getAllRolesService();

    return res.status(result.statusCode).json({
      roles: result.roles
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}