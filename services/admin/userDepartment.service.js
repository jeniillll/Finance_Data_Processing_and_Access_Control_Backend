import { findDepartmentById, findUserById, findUserDepartment, assignDepartmentToUser, deassignDepartmentFromUser } from "../../repositories/admin/userDepartment.repository.js";

export async function assignDepartmentService(params) {
    const { userId, departmentId } = params;

    const user = await findUserById(Number(userId));
    if (!user) {
        return {
            statusCode: 404,
            message: "User not found"
        };
    }

    const department = await findDepartmentById(Number(departmentId));
    if (!department) {
        return {
            statusCode: 404,
            message: "Department not found"
        };
    }

    const existing = await findUserDepartment(Number(userId), Number(departmentId));
    if (existing) {
        return {
            statusCode: 409,
            message: "Department already assigned"
        };
    }

    const assignment = await assignDepartmentToUser(Number(userId), Number(departmentId));

    return {
        statusCode: 201,
        message: "Department assigned successfully",
        assignment
    };
}

export async function deassignDepartmentService(params) {
    const userId = Number(params.userId);
    const departmentId = Number(params.departmentId);

    const existing = await findUserDepartment(userId, departmentId);

    if (!existing) {
        return {
            statusCode: 404,
            message: "Department assignment not found"
        };
    }

    const removed = await deassignDepartmentFromUser(userId, departmentId);

    return {
        statusCode: 200,
        message: "Department de-assigned successfully",
        removed
    };
}