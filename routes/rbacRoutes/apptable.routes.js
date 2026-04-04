import express from "express";
import { createAppTableController } from "../../controllers/rbac/apptable.controller.js"
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/", checkForAuthenticationCookie("token"), hasPermission("AppTable", "CREATE"), createAppTableController);

export default router;
