import express from "express";
import { createUser, loginUser, logOutHelper, getUser, deleteUser } from "../controllers/auth.controller.js";

import { checkForAuthenticationCookie } from "../middlewares/authentication.middleware.js";
import { hasPermission } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

router.get("/logout", logOutHelper);
router.get("/me", checkForAuthenticationCookie("token"), getUser);

router.delete( "/:userId", checkForAuthenticationCookie("token"), hasPermission("User", "DELETE"), deleteUser
);

export default router;