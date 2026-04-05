import express from "express";
import { createUserController, loginUserController, logOutController, getUserController, deleteUserController } from "../controllers/auth.controller.js";

import { checkForAuthenticationCookie } from "../middlewares/authentication.middleware.js";
import { hasPermission } from "../middlewares/permission.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import { signupSchema, loginSchema } from "../validations/auth.validation.js"

const router = express.Router();

router.post("/signup", validate(signupSchema), createUserController);
router.post("/login", validate(loginSchema), loginUserController);

router.post("/logout", logOutController);

router.get("/me", checkForAuthenticationCookie("token"), getUserController);

router.delete( "/:userId", checkForAuthenticationCookie("token"), hasPermission("User", "DELETE"), deleteUserController );

export default router;