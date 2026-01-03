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
    createBase: protectedProcedure
        .input(z.object({name: z.string()}))
        .mutation(({ ctx, input }) => {
            return ctx.db.base.create({ 
                data: {
                    base_name: input.name,
                    user_id: ctx.session.user.id,
                }
            });
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
