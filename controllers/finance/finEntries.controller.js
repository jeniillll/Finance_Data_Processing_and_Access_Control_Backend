import { getEntriesService, createEntryService, updateEntryService, deleteEntryService } from "../../services/finance/finEntries.service.js";

export async function getEntriesController(req, res) {
    try {
        const result = await getEntriesService(req.allowedDepartmentId);

        return res.status(result.statusCode).json({
            message: result.message,
            entries: result.entries
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error getting entries"
        });
    }
}

export async function createEntryController(req, res) {
    try {
        const result = await createEntryService(req.body, req.user.id);

        return res.status(result.statusCode).json({
            message: result.message,
            entry: result.entry
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error creating financial entry"
        });
    }
}

export async function updateEntryController(req, res) {
    try {
        const result = await updateEntryService(req.params.id, req.body);

        return res.status(result.statusCode).json({
            message: result.message,
            entry: result.entry
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating entry"
        });
    }
}

export async function deleteEntryController(req, res) {
    try {
        const result = await deleteEntryService(req.params.id);

        return res.status(result.statusCode).json({
            message: result.message
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error deleting entry"
        });
    }
}