import express from 'express'
import { checkForAuthenticationCookie } from '../../middlewares/authentication.middleware.js';
import { assignRoleToUser , deAssignRoleFromUser } from '../../controllers/rbacControllers/userrole.controller.js'
import { hasPermission } from "../../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/roles/:roleId/users/:userId", checkForAuthenticationCookie("token"), hasPermission("UserRole", "CREATE"), assignRoleToUser);

router.delete("/roles/:roleId/users/:userId", checkForAuthenticationCookie("token"), hasPermission("UserRole", "DELETE"), deAssignRoleFromUser);


export default router;