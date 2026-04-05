import express from 'express';

import { checkForAuthenticationCookie } from '../../middlewares/authentication.middleware.js';
import { hasPermission } from '../../middlewares/permission.middleware.js';
import { departmentScope } from '../../middlewares/departmentscope.middleware.js';
import { getEntries, createEntry, deleteEntry, updateEntry } from '../../controllers/finance/finEntries.controller.js';

const router = express.Router();

router.use(checkForAuthenticationCookie('token'));

router.get( "/entries", hasPermission("FinEntry", "READ"), departmentScope(), getEntries);
router.post( "/entries", hasPermission("FinEntry", "CREATE"), createEntry );
router.patch( "/entries/:id", hasPermission("FinEntry", "UPDATE"), updateEntry );
router.delete( "/entries/:id", hasPermission("FinEntry", "DELETE"), deleteEntry);

export default router;