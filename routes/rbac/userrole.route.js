import express from "express";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { assignRoleToUserController, deAssignRoleFromUserController } from "../../controllers/rbac/userrole.controller.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";

const router = express.Router();

router.post( "/roles/:roleId/users/:userId", checkForAuthenticationCookie("token"), hasPermission("UserRole", "CREATE"),assignRoleToUserController );

router.delete( "/roles/:roleId/users/:userId", checkForAuthenticationCookie("token"), hasPermission("UserRole", "DELETE"), deAssignRoleFromUserController );

export default router;