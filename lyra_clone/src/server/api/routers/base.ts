import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
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
    getAll: publicProcedure.query(({ ctx }) => {
        return db.base.findMany();
        }
    ),
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
