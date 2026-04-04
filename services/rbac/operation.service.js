import { findOperationByName, createOperation } from "../../repositories/rbac/operation.repository.js";

export async function createOperationService(body) {
    const { operationname } = body;

    const exists = await findOperationByName(operationname);

    if (exists) {
        return {
            statusCode: 409,
            message: "Operation already exists"
        };
    }

    const operation = await createOperation(operationname);

    return {
        statusCode: 201,
        message: "Operation added successfully",
        operation
    };
}