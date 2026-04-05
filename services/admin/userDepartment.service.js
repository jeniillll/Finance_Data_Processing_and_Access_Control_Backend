import { findDepartmentById, findUserById, findUserDepartment, updateUserDepartment, createUserDepartment } from "../../repositories/admin/userDepartment.repository.js";

export async function assignDepartmentService(params) {
    const userId = Number(params.userId);
    const departmentId = Number(params.departmentId);

    const user = await findUserById(userId);
    if (!user) {
        return {
            statusCode: 404,
            message: "User not found"
        };
    }

    const department = await findDepartmentById(departmentId);
    if (!department) {
        return {
            statusCode: 404,
            message: "Department not found"
        };
    }

    const existing = await findUserDepartment(userId, departmentId);

    if (!existing) {
        await createUserDepartment(userId, departmentId);

        return {
            statusCode: 201,
            message: "Department assigned successfully"
        };
    }

    if (existing.isDeleted) {
        await updateUserDepartment(userId, departmentId, false);

        return {
            statusCode: 200,
            message: "Department restored successfully"
        };
    }

    return {
        statusCode: 409,
        message: "User already belongs to this department"
    };
}

export async function deassignDepartmentService(params) {
    const userId = Number(params.userId);
    const departmentId = Number(params.departmentId);


    const user = await findUserById(userId);
    if (!user) {
        return {
            statusCode: 404,
            message: "User not found"
        };
    }

    const department = await findDepartmentById(departmentId);
    if (!department) {
        return {
            statusCode: 404,
            message: "Department not found"
        };
    }

    const existing = await findUserDepartment(userId, departmentId);

    if (!existing || existing.isDeleted) {
        return {
            statusCode: 404,
            message: "Department assignment not found"
        };
    }

    await updateUserDepartment(userId, departmentId, true);

    return {
        statusCode: 200,
        message: "Department de-assigned successfully"
    };
}