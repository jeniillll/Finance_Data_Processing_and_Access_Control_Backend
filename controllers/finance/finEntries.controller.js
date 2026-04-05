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