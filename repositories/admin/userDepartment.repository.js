import prisma from "../../prisma/client.js";

export async function findDepartmentById(departmentId) {
    const department = await prisma.department.findUnique({
        where: { id: departmentId }
    });
    return department;
}

export async function findUserById(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    return user;
}

export async function findUserDepartment(userId, departmentId) {
    const userDepartmt = await prisma.userDepartment.findUnique({
        where: {
            userId_departmentId: {
                userId,
                departmentId
            }
        }
    });

    return userDepartmt;
}

export async function createUserDepartment(userId, departmentId) {
    const newUserDept = await prisma.userDepartment.create({
        data: {
            userId,
            departmentId,
            isDeleted: false
        }
    });
    return newUserDept;
}

export async function updateUserDepartment(userId, departmentId, isDeleted) {
    const deletedUserDept = await prisma.userDepartment.update({
        where: {
            userId_departmentId: {
                userId,
                departmentId
            }
        },
        data: {
            isDeleted
        }
    });
    return deletedUserDept;
}