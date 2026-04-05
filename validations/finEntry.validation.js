import { z } from "zod";

export const createFinEntrySchema = z
    .object({
        departmentId: z.coerce.number().int().positive(),
        categoryId: z.coerce.number().int().positive().optional(),
        amount: z.coerce.number().positive(),
        type: z.enum(["INCOME", "EXPENSE"]),
        date: z.string().datetime(),
        description: z.string().optional()
    })
    .superRefine((data, ctx) => {
        if (data.type === "EXPENSE" && !data.categoryId) {
            ctx.addIssue({
                code: "custom",
                path: ["categoryId"],
                message: "categoryId is required for EXPENSE entries"
            });
        }
    });


export const updateFinEntrySchema = z
    .object({
        departmentId: z.coerce.number().int().positive().optional(),
        categoryId: z.coerce.number().int().positive().optional(),
        amount: z.coerce.number().positive().optional(),
        type: z.enum(["INCOME", "EXPENSE"]).optional(),
        date: z.string().datetime().optional(),
        description: z.string().optional()
    })
    .partial();