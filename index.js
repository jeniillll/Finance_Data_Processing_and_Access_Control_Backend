import express from "express"
import cookieParser from 'cookie-parser';

import dotenv from "dotenv";
dotenv.config();

// auth
import authRoutes from './routes/auth.route.js';

// rbac
import apptableRoutes from './routes/rbacRoutes/apptable.routes.js';
import permissionRoutes from './routes/rbacRoutes/permission.routes.js';
import operationRoutes from './routes/rbacRoutes/operation.routes.js';
import roleRoutes from './routes/rbacRoutes/role.route.js';
import assignRoleRoutes from './routes/rbacRoutes/userrole.route.js';

// Admin
import departmentRoutes from './routes/admin/department.route.js';
import assignDepartmentRoutes from './routes/admin/userDepartment.route.js';


const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// auth
app.use('/api/v1/auth' , authRoutes); // open to public...

// RBAC (for admin controll...)
app.use('/api/v1/rbac/tables' , apptableRoutes);
app.use('/api/v1/rbac/operations', operationRoutes);
app.use('/api/v1/rbac/permission' , permissionRoutes);
app.use('/api/v1/rbac/role', roleRoutes);
app.use('/api/v1/rbac/assign/', assignRoleRoutes); // post request will assign , delete request will de-assign that role from user ...


// Admin
app.use('/api/v1/admin/departments', departmentRoutes);
app.use('/api/v1/admin/assign-dept/', assignDepartmentRoutes);

app.listen(PORT, () => console.log(`app listening at PORT:${PORT}`));