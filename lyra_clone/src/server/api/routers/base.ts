import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { db } from "../../db";
import { plugin } from "typescript-eslint";

export const baseRouter = createTRPCRouter({
    getBase: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            return db.base.findUnique({
                where: { id: input.id },
                include: { tables: true },
            });
        }
    ),
    getAll: protectedProcedure.query(async ({ ctx }) => { 
        return ctx.db.base.findMany({ 
            where: { user_id: ctx.session.user.id }, 
            orderBy: { base_name: "asc" }, 
        }); 
    }),
    createBase: publicProcedure
        .input(z.object({
            base_name: z.string(),
            user_id: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return db.base.create({ data: input });
        }
    ),
    getAllWithTables: publicProcedure.query(async () => {
        return db.base.findMany({
            include: {
            tables: true,
            },
        });
    }),
});
