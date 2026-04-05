import prisma from "../../prisma/client.js";

export async function getEntries(req, res) {
    try {
        const departmentId = req.allowedDepartmentId;

        const whereClause = {
            isDeleted: false,
            ...(departmentId && { departmentId }),
        };

        const entries = await prisma.finEntry.findMany({
            where: whereClause,
            include: {
                department: true,
                category: true,
            },
        });

        return res.status(200).json({
            message: "Got entries!",
            entries,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error getting entries!",
        });
    }
}

export async function createEntry(req, res) {
    try {
        const { departmentId, categoryId, amount, type, date, description } = req.body;

        if (!departmentId || !categoryId || !amount || !type || !date) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        const entry = await prisma.finEntry.create({
            data: {
                departmentId: Number(departmentId),
                categoryId: Number(categoryId),
                amount,
                type,
                date: new Date(date),
                description,
                createdById: req.user.id,
            },
            include: {
                department: true,
                category: true,
            },
        });

        return res.status(201).json({
            message: "Financial entry created successfully",
            entry,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error creating financial entry",
        });
    }
}

export async function updateEntry(req, res) {
    try {
        const id = Number(req.params.id);

        const { departmentId, categoryId, amount, type, date, description } = req.body;

        const existing = await prisma.finEntry.findUnique({
            where: { id },
        });

        if (!existing || existing.isDeleted) {
            return res.status(404).json({
                message: "Entry not found",
            });
        }

        const updatedEntry = await prisma.finEntry.update({
            where: { id },
            data: {
                ...(departmentId && { departmentId: Number(departmentId) }),
                ...(categoryId && { categoryId: Number(categoryId) }),
                ...(amount && { amount }),
                ...(type && { type }),
                ...(date && { date: new Date(date) }),
                ...(description !== undefined && { description }),
            },
            include: {
                department: true,
                category: true,
            },
        });

        return res.status(200).json({
            message: "Entry updated successfully",
            entry: updatedEntry,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating entry",
        });
    }
}

export async function deleteEntry(req, res) {
    try {
        const id = Number(req.params.id);

        const existing = await prisma.finEntry.findUnique({
            where: { id },
        });

        if (!existing || existing.isDeleted) {
            return res.status(404).json({
                message: "Entry not found",
            });
        }

        await prisma.finEntry.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });

        return res.status(200).json({
            message: "Entry deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error deleting entry",
        });
    }
}