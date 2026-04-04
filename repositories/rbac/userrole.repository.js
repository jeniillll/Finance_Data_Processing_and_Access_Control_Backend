import prisma from "../../prisma/client.js";

export async function findUserById(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    return user;
}

export async function findRoleById(roleId) {
    const role = await prisma.role.findUnique({
        where: {
            id: roleId
        }
    });

    return role;
}

export async function findUserRole(userId, roleId) {
    const userRole = await prisma.userRole.findUnique({
        where: {
            userId_roleId: {
                userId,
                roleId
            }
        }
    });

    return userRole;
}

export async function createUserRole(userId, roleId) {
    const userRole = await prisma.userRole.create({
        data: {
            userId,
            roleId,
            isDeleted: false
        }
    });

    return userRole;
}

export async function updateUserRole(userId, roleId, isDeleted) {
    const updatedUserRole = await prisma.userRole.update({
        where: {
            userId_roleId: {
                userId,
                roleId
            }
        },
        data: {
            isDeleted
        }
    });

    return updatedUserRole;
}