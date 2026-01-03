import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const cellRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        cellId: z.string(),
        value: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.cell.update({
        where: { id: input.cellId },
        data: { value: input.value },
      });
    }),
});
