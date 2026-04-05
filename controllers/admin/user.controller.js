import { updateUserActiveStatusService, deleteUserService } from "../../services/admin/user.service.js";

export async function updateUserActiveStatusController(req, res) {
    try {
        const result = await updateUserActiveStatusService(
            req.params,
            req.body
        );

        return res.status(result.statusCode).json({
            message: result.message
        });
    } catch {
        return res.status(500).json({
            message: "Error updating user status"
        });
    }
}

export async function deleteUserController(req, res) {
  try {
    const result = await deleteUserService(req.params);

    return res.status(result.statusCode).json({
      message: result.message
    });
  } catch (err) {
    return res.status(500).json({ message: "Delete failed" });
  }
}
