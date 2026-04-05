import prisma from "../prisma/client.js";

export async function findUserByEmailOrPhone(email, contactnumber) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { contactnumber }]
        }
    });

    return user;
}

export async function findUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return user;
}

export async function createUser(userData) {
    const user = await prisma.user.create({
        data: userData
    });

    return user;
}

export async function findRoleByName(rolename) {
    const role = await prisma.role.findUnique({
        where: {
            rolename
        }
    });

    return role;
}

export async function assignRoleToUser(userId, roleId) {
    return prisma.userRole.create({
        data: {
            userId,
            roleId,
            isDeleted: false
        }
    });
}
