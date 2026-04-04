import { createAppTableService } from "../../services/rbac/apptable.service.js"

export async function createAppTableController(req, res) {
  try {
    const result = await createAppTableService(req.body);
    return res.status(result.statusCode).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}