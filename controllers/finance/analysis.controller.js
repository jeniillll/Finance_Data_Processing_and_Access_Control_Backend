import { getSummaryService, getTrendService, getRecentActivityService, getAnomaliesService } from "../../services/finance/analysis.service.js";

export async function getSummaryController(req, res) {
    try {
        const result = await getSummaryService(
            req.allowedDepartmentId,
            req.query
        );
        return res.status(result.statusCode).json(result);
    } catch {
        return res.status(500).json({ message: "Error fetching summary" });
    }
}

export async function getTrendController(req, res) {
    try {
        const result = await getTrendService(
            req.allowedDepartmentId,
            req.query.range,
            req.query
        );
        return res.status(result.statusCode).json(result);
    } catch {
        return res.status(500).json({ message: "Error fetching trend" });
    }
}

export async function getRecentActivityController(req, res) {
    try {
        const result = await getRecentActivityService(
            req.allowedDepartmentId,
            req.query
        );
        return res.status(result.statusCode).json(result);
    } catch {
        return res.status(500).json({ message: "Error fetching recent activity" });
    }
}

export async function getAnomaliesController(req, res) {
    try {
        const result = await getAnomaliesService(
            req.allowedDepartmentId,
            req.query
        );
        return res.status(result.statusCode).json(result);
    } catch {
        return res.status(500).json({ message: "Error fetching anomalies" });
    }
}