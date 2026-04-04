import prisma from "../../prisma/client.js";

export async function findRoleByName(rolename) {
    const role = await prisma.role.findUnique({
        where: {
            rolename
        }
    });

    return role;
}

export async function findRoleById(roleId) {
    const role = await prisma.role.findUnique({
        where: {
            id: roleId
        }
    });

    return role;
}

export async function createRole(rolename) {
    const role = await prisma.role.create({
        data: {
            rolename
        }
    });

    return role;
}

export async function removeRole(roleId) {
    const deletedRole = await prisma.role.delete({
        where: {
            id: roleId
        }
    });

    return deletedRole;
}

export async function findAllRoles() {
    const roles = await prisma.role.findMany();

    return roles;
}