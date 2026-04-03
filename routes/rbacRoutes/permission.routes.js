import express from "express";
import { assignPermission, deAssignPermission } from "../../controllers/rbacControllers/permission.controller.js";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/roles/:roleId/op/:operationId/tb/:tableId", checkForAuthenticationCookie("token"), hasPermission("RolePermission", "CREATE"), assignPermission);

router.delete("/roles/:roleId/op/:operationId/tb/:tableId", checkForAuthenticationCookie("token"), hasPermission("RolePermission", "DELETE"), deAssignPermission);

export default router;
