import express from "express";
import { assignPermissionController, deAssignPermissionController } from "../../controllers/rbac/permission.controller.js";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/roles/:roleId/op/:operationId/tb/:tableId", checkForAuthenticationCookie("token"), hasPermission("RolePermission", "CREATE"), assignPermissionController);

router.delete("/roles/:roleId/op/:operationId/tb/:tableId", checkForAuthenticationCookie("token"), hasPermission("RolePermission", "DELETE"), deAssignPermissionController);

export default router;
