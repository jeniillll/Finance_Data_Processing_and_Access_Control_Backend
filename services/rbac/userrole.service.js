import { findUserById, findRoleById, findUserRole, createUserRole, updateUserRole } from "../../repositories/rbac/userrole.repository.js";

export async function assignRoleToUserService(params) {
    const userId = Number(params.userId);
    const roleId = Number(params.roleId);

    const user = await findUserById(userId);
    const role = await findRoleById(roleId);

    if (!user || !role) {
        return {
            statusCode: 400,
            message: "Invalid metadata"
        };
    }

    if (role.rolename === "Super_Admin") {
        return {
            statusCode: 403,
            message: "You are not authorized to assign Super_Admin role"
        };
    }

    const existingUserRole = await findUserRole(userId, roleId);

    if (!existingUserRole) {
        await createUserRole(userId, roleId);

        return {
            statusCode: 201,
            message: "User assigned role successfully"
        };
    }

    if (existingUserRole.isDeleted) {
        await updateUserRole(userId, roleId, false);

        return {
            statusCode: 200,
            message: "User role restored successfully"
        };
    }

    return {
        statusCode: 409,
        message: "User already has this role"
    };
}

export async function deAssignRoleFromUserService(params) {
    const userId = Number(params.userId);
    const roleId = Number(params.roleId);

    const user = await findUserById(userId);
    const role = await findRoleById(roleId);

    if (!user || !role) {
        return {
            statusCode: 400,
            message: "Invalid metadata"
        };
    }

    if (role.rolename === "Super_Admin") {
        return {
            statusCode: 403,
            message: "You are not authorized to remove Super_Admin role"
        };
    }

    const existingUserRole = await findUserRole(userId, roleId);

    if (!existingUserRole || existingUserRole.isDeleted) {
        return {
            statusCode: 404,
            message: "User does not have this role"
        };
    }

    await updateUserRole(userId, roleId, true);

    return {
        statusCode: 200,
        message: "Role de-assigned from user successfully"
    };
}