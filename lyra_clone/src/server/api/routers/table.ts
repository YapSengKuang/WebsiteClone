import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import { z } from "zod";

export const tableRouter = createTRPCRouter({
    getByBaseId: protectedProcedure
        .input(z.object({ baseId: z.string() }))
        .query(async ({ ctx, input }) => {
        return ctx.db.table.findMany({
            where: { base_id: input.baseId },
            orderBy: { table_name: "asc" },
        });
    }),

    getFullTable: protectedProcedure
    .input(z.object({ tableId: z.string() }))
    .query(async ({ ctx, input }) => {
        const fields = await ctx.db.field.findMany({
            where: { table_id: input.tableId },
            orderBy: { order_index: "asc" },
            select: {
                id: true,
                field_name: true,
                field_type: true,
            }
        });

        const rows = await ctx.db.row.findMany({
            where: { table_id: input.tableId },
            orderBy: { id: "asc" },
        });

        const cells = await ctx.db.cell.findMany({
            where: { row: { table_id: input.tableId } },
        });

        return { fields, rows, cells };
    }),


});
