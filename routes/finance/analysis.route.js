import express from 'express';

import { checkForAuthenticationCookie } from '../../middlewares/authentication.middleware.js';
import { hasPermission } from '../../middlewares/permission.middleware.js';
import { departmentScope } from '../../middlewares/departmentscope.middleware.js';

import { getSummary, getCategoryBreakdown, getTrend, getRecentActivity } from '../../controllers/finance/analysis.controller.js'

const router = express.Router();

router.use(checkForAuthenticationCookie('token'));

router.get( "/summary", hasPermission("FinEntry", "READ"), departmentScope(), getSummary);

router.get( "/category-breakdown", hasPermission("FinEntry", "READ"), departmentScope(), getCategoryBreakdown);

router.get( "/trend", hasPermission("FinEntry", "READ"), departmentScope(), getTrend);

router.get( "/recent-activity", hasPermission("FinEntry", "READ"), departmentScope(), getRecentActivity);

export default router;