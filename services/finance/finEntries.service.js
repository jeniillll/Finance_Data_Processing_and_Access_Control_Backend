import { findEntries, createFinEntry, findEntryById, updateFinEntry, softDeleteFinEntry } from "../../repositories/finance/finEntries.repository.js";

export async function getEntriesService(departmentId, query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const result = await findEntries(departmentId, query, page, limit);

    return {
        statusCode: 200,
        message: "Got entries",
        entries: result.entries,
        pagination: {
            page,
            limit,
            totalRecords: result.totalRecords,
            totalPages: Math.ceil(result.totalRecords / limit)
        }
    };
}

export async function createEntryService(body, userId) {
    const { departmentId, categoryId, amount, type, date, description } = body;

    const entry = await createFinEntry({
        departmentId: Number(departmentId),
        categoryId: Number(categoryId),
        amount,
        type,
        date: new Date(date),
        description,
        createdById: userId
    });

    return {
        statusCode: 201,
        message: "Financial entry created successfully",
        entry
    };
}

export async function updateEntryService(id, body) {
    const entryId = Number(id);

    const existing = await findEntryById(entryId);

    if (!existing || existing.isDeleted) {
        return {
            statusCode: 404,
            message: "Entry not found"
        };
    }

    const updatedEntry = await updateFinEntry(entryId, body);

    return {
        statusCode: 200,
        message: "Entry updated successfully",
        entry: updatedEntry
    };
}

export async function deleteEntryService(id) {
    const entryId = Number(id);

    const existing = await findEntryById(entryId);

    if (!existing || existing.isDeleted) {
        return {
            statusCode: 404,
            message: "Entry not found"
        };
    }

    await softDeleteFinEntry(entryId);

    return {
        statusCode: 200,
        message: "Entry deleted successfully"
    };
}