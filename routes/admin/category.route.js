import express from 'express';

import { checkForAuthenticationCookie } from '../../middlewares/authentication.middleware.js';
import { hasPermission } from '../../middlewares/permission.middleware.js';

import { getAllCategories, addCategory } from "../../controllers/admin/category.controller.js";

const router = express.Router();

router.get('/', checkForAuthenticationCookie('token'), hasPermission("Category", "READ"), getAllCategories);
router.post('/', checkForAuthenticationCookie('token'), hasPermission("Category", "CREATE"), addCategory);

export default router;