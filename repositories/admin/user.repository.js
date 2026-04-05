import prisma from "../../prisma/client.js";

export async function findUserById(userId) {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}

export async function updateUserActiveStatus(userId, isActive) {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isActive
        }
    });
}

export async function softDeleteUser(userId) {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isDeleted: true
        }
    });
}