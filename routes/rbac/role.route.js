import express from "express"
import { addRoleController, deleteRoleController, getAllRolesController } from "../../controllers/rbac/role.controller.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";

const router = express.Router();
router.use(checkForAuthenticationCookie("token"))

router.get("/", hasPermission("Role", "READ"), getAllRolesController);

router.post("/", hasPermission("Role", "CREATE"), addRoleController);

router.delete("/:roleId", hasPermission("Role", "DELETE"), deleteRoleController);

export default router;