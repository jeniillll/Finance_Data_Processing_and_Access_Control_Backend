import { findRolePermission, createRolePermission, updateRolePermission } from "../../repositories/rbac/permission.repository.js";

export async function assignPermissionService(params) {
    const roleId = Number(params.roleId);
    const tableId = Number(params.tableId);
    const operationId = Number(params.operationId);

    const existingPermission = await findRolePermission(
        roleId,
        tableId,
        operationId
    );

    if (!existingPermission) {
        await createRolePermission(roleId, tableId, operationId);

        return {
            statusCode: 201,
            message: "permission granted"
        };
    }

    if (existingPermission.isDeleted) {
        await updateRolePermission(roleId, tableId, operationId, false);

        return {
            statusCode: 200,
            message: "permission restored"
        };
    }

    return {
        statusCode: 409,
        message: "permission already exists"
    };
}

export async function deAssignPermissionService(params) {
    const roleId = Number(params.roleId);
    const tableId = Number(params.tableId);
    const operationId = Number(params.operationId);

    const existingPermission = await findRolePermission(
        roleId,
        tableId,
        operationId
    );

    if (!existingPermission || existingPermission.isDeleted) {
        return {
            statusCode: 404,
            message: "This permission does not exist"
        };
    }

    await updateRolePermission(roleId, tableId, operationId, true);

    return {
        statusCode: 200,
        message: "Permission revoked"
    };
}