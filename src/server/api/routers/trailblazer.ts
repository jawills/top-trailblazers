import { and, eq, gt, ne } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { trailblazers } from "~/server/db/schema";

export const trailblazerRouter = createTRPCRouter({

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(trailblazers).values({
  //       name: input.name,
  //     });
  //   }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const trailblazer = await ctx.db.query.trailblazers.findMany({
      where: (and(eq(trailblazers.isPublic, true), gt(trailblazers.points, -1))),
      orderBy: (trailblazers, { desc }) => [desc(trailblazers.badges)],
    });

    return trailblazer ?? null;
  }),
});
