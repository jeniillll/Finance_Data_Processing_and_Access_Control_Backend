import prisma from "../../prisma/client.js";

export async function findAppTable(tablename, displayname) {
    const table = await prisma.appTable.findFirst({
        where: {
            OR: [
                { tablename },
                { displayname }
            ]
        }
    });

    return table;
}

export async function createAppTable(tablename, displayname) {
    const newTable = await prisma.appTable.create({
        data: {
            tablename,
            displayname
        }
    });

    return newTable;
}