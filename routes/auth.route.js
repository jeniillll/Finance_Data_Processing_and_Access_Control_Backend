import express from "express";
import { createUserController, loginUserController, logOutController, getUserController, deleteUserController } from "../controllers/auth.controller.js";

import { checkForAuthenticationCookie } from "../middlewares/authentication.middleware.js";
import { hasPermission } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/signup", createUserController);
router.post("/login", loginUserController);

router.post("/logout", logOutController);

router.get("/me", checkForAuthenticationCookie("token"), getUserController);

router.delete( "/:userId", checkForAuthenticationCookie("token"), hasPermission("User", "DELETE"), deleteUserController );

export default router;