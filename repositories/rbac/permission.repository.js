import prisma from "../../prisma/client.js";

// find role's - perticuler permission - on a perticular table
export async function findRolePermission(roleId, tableId, operationId) {
    const rolePermission = await prisma.rolePermission.findUnique({
        where: {
            roleId_tableId_operationId: {
                roleId,
                tableId,
                operationId
            }
        }
    });
    return rolePermission;
}

// give a role to perform a operation on a pertucular table
export async function createRolePermission(roleId, tableId, operationId) {
    const newRolePermission = await prisma.rolePermission.create({
        data: {
            roleId,
            tableId,
            operationId
        }
    });
    return newRolePermission;
}

// take permission back ...
export async function updateRolePermission( roleId, tableId, operationId, isDeleted ) {
    const updatedRolePermission = await prisma.rolePermission.update({
        where: {
            roleId_tableId_operationId: {
                roleId,
                tableId,
                operationId
            }
        },
        data: {
            isDeleted
        }
    });

    return updatedRolePermission;
}