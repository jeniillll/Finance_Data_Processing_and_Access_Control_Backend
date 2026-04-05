import express from "express";
import { createUserController, loginUserController, logOutController, getUserController } from "../controllers/auth.controller.js";

import { checkForAuthenticationCookie } from "../middlewares/authentication.middleware.js";
import { hasPermission } from "../middlewares/permission.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import { signupSchema, loginSchema } from "../validations/auth.validation.js"

const router = express.Router();

router.post("/signup", validate(signupSchema), checkForAuthenticationCookie("token"), hasPermission("User", "CREATE"), createUserController);

router.post("/login", validate(loginSchema), loginUserController);

router.post("/logout", logOutController);

router.get("/me", checkForAuthenticationCookie("token"), getUserController);

export default router;