import express from "express";

import { checkForAuthenticationCookie } from "../../middlewares/authentication.middleware.js";
import { hasPermission } from "../../middlewares/permission.middleware.js";
import { departmentScope } from "../../middlewares/departmentscope.middleware.js";

import { getSummaryController, getTrendController, getRecentActivityController, getAnomaliesController } from "../../controllers/finance/analysis.controller.js";

const router = express.Router();

router.use(checkForAuthenticationCookie("token"));

router.get("/summary", hasPermission("FinEntry", "READ"), departmentScope(), getSummaryController);

router.get("/trend", hasPermission("FinEntry", "READ"), departmentScope(), getTrendController);

router.get("/recent-activity", hasPermission("FinEntry", "READ"), departmentScope(), getRecentActivityController);

router.get("/anomalies", hasPermission("FinEntry", "READ"), departmentScope(), getAnomaliesController);

export default router;