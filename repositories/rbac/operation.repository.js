import prisma from "../../prisma/client.js";

export async function findOperationByName(operationname) {
    const operation = await prisma.operation.findUnique({
        where: {
            operationname
        }
    });

    return operation;
}

export async function createOperation(operationname) {
    const newOperation = await prisma.operation.create({
        data: {
            operationname
        }
    });

    return newOperation;
}