import express from "express";
import { createOperationController } from "../../controllers/rbac/operation.controller.js";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";

const router = express.Router();

router.post( "/", checkForAuthenticationCookie("token"), hasPermission("Operation", "CREATE"), createOperationController );

export default router;