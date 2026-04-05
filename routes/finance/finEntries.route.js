import express from "express";

import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";
import { departmentScope } from "../../middlewares/departmentscope.middleware.js";

import { getEntriesController, createEntryController, updateEntryController, deleteEntryController } from "../../controllers/finance/finEntries.controller.js";

const router = express.Router();

router.use(checkForAuthenticationCookie("token"));

router.get( "/entries", hasPermission("FinEntry", "READ"), departmentScope(), getEntriesController );

router.post( "/entries", hasPermission("FinEntry", "CREATE"), createEntryController);

router.patch( "/entries/:id", hasPermission("FinEntry", "UPDATE"), updateEntryController);

router.delete( "/entries/:id", hasPermission("FinEntry", "DELETE"), deleteEntryController);

export default router;