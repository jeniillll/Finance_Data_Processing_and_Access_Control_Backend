import express from "express";
import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";
import { updateUserActiveStatusController, deleteUserController } from "../../controllers/admin/user.controller.js";

const router = express.Router();

router.patch( "/:userId/status", checkForAuthenticationCookie("token"), hasPermission("User", "UPDATE"), updateUserActiveStatusController);
router.delete( "/:userId/", checkForAuthenticationCookie("token"), hasPermission("User", "DELETE"), deleteUserController);

export default router;