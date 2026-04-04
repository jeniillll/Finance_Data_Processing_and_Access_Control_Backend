import { findRoleByName, findRoleById, createRole, removeRole, findAllRoles } from "../../repositories/rbac/role.repository.js";

export async function addRoleService(body) {
    const { rolename } = body;

    const existingRole = await findRoleByName(rolename);

    if (existingRole) {
        return {
            statusCode: 409,
            message: "Role already exists"
        };
    }

    const role = await createRole(rolename);

    return {
        statusCode: 201,
        message: "Role added successfully",
        role
    };
}

export async function deleteRoleService(params) {
    const roleId = Number(params.roleId);

    const existingRole = await findRoleById(roleId);

    if (!existingRole) {
        return {
            statusCode: 404,
            message: "Could not find this role"
        };
    }

    const deletedRole = await removeRole(roleId);

    return {
        statusCode: 200,
        message: "Role deleted successfully",
        deletedRole
    };
}

export async function getAllRolesService() {
    const roles = await findAllRoles();

    return {
        statusCode: 200,
        roles
    };
}