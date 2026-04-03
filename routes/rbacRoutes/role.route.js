import express from "express"
import { addRole, deleteRole, getAllRoles } from '../../controllers/rbacControllers/role.controller.js'
import { hasPermission } from "../../middlewares/permission.middleware.js";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";

const router = express.Router();
router.use(checkForAuthenticationCookie("token"))

router.get('/' , hasPermission("Role", "READ") , getAllRoles)

router.post("/", hasPermission("Role", "CREATE"), addRole);

router.delete("/:roleId", hasPermission("Role", "DELETE"), deleteRole);


export default router;