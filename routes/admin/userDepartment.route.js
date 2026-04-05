import express from "express";
import { assignDepartmentController, deassignDepartmentController } from "../../controllers/admin/userDepartment.controller.js";

import { hasPermission } from "../../middlewares/permission.middleware.js";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(checkForAuthenticationCookie("token"));

router.post( "/departments/:departmentId/users/:userId", hasPermission("Department", "UPDATE"), assignDepartmentController);

router.delete( "/departments/:departmentId/users/:userId", hasPermission("Department", "UPDATE"), deassignDepartmentController);

export default router;