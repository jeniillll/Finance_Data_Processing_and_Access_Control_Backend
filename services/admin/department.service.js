import { findAllDepartments, findDepartmentByName ,createDepartment } from "../../repositories/admin/department.repository.js";

export async function getAllDepartmentsService() {
    const departments = await findAllDepartments();

    return {
        statusCode: 200,
        message: "got departments",
        departments
    };
}

export async function addDepartmentService(body) {
    const { deptName } = body;

    if (!deptName) {
        return {
            statusCode: 400,
            message: "deptName not found in body!"
        };
    }

    const existingDepartment = await findDepartmentByName(deptName);

    if (existingDepartment) {
        return {
            statusCode: 409,
            message: "Department already exists"
        };
    }

    await createDepartment(deptName);

    return {
        statusCode: 201,
        message: "Created department successfully!"
    };
}