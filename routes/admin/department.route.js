import express from 'express';

import { checkForAuthenticationCookie } from '../../middlewares/authentication.middleware.js';
import { hasPermission } from '../../middlewares/permission.middleware.js';

import { getAllDepartments, AddDepartment } from '../../controllers/admin/department.controller.js';

const router = express.Router();

router.get('/', checkForAuthenticationCookie('token'), hasPermission("Department", "READ"), getAllDepartments);
router.post('/', checkForAuthenticationCookie('token'), hasPermission("Department", "CREATE"), AddDepartment);

export default router;