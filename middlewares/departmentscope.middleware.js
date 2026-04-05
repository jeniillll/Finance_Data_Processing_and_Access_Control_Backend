import prisma from "../prisma/client.js";

export const departmentScope = () => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            const departmentId = req.query.departmentId? Number(req.query.departmentId) : null;

            const admin = await prisma.role.findUnique({
                where: {
                    rolename: "Admin"
                }
            })
            const analyst = await prisma.role.findUnique({
                where: {
                    rolename: "Analyst"
                }
            })

            const isAdminOrAnalyst = await prisma.userRole.findFirst({
                where: {
                    userId: user.id,
                    OR : [
                        {roleId: admin.id},
                        {roleId: analyst.id},
                    ]
                }
            })

            if (isAdminOrAnalyst) {
                req.allowedDepartmentId = departmentId; // null means all
                return next();
            }

            // viewer have to have a department asked (means they can not ask all at once...)
            if (!departmentId) {
                return res.status(400).json({
                    message: "departmentId query param is required",
                });
            }

            const mapping = await prisma.userDepartment.findUnique({
                where: {
                    userId_departmentId: {
                        userId: user.id,
                        departmentId,
                    },
                },
            });

            if (!mapping) {
                return res.status(403).json({
                    message: "You are not authorized for this department",
                });
            }

            req.allowedDepartmentId = departmentId;
            next();
        } catch (err) {
            return res.status(500).json({
                message: "Department scope validation failed",
            });
        }
    };
};