import { createAppTable, findAppTable } from "../../repositories/rbac/apptable.repository.js"

export async function createAppTableService(body) {
    const { tablename, displayname } = body;

    const exists = await findAppTable(tablename, displayname);

    if (exists) return {
        statusCode: 409,
        message: "tablename and displayname should be unique"
    };

    const table = await createAppTable(tablename, displayname);

    return {
        statusCode: 200,
        message: "Table created Successfully"
    };
}