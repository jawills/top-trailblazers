import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { trailblazers } from "~/server/db/schema";

export const trailblazerRouter = createTRPCRouter({

  infiniteTrailblazers: publicProcedure.input(z.object({ 
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.number().nullish(), 
  })).query(async ({ input, ctx }) => {
    const limit = input.limit ?? 50;
    const offset = input.cursor ?? 0;
    const trailblazer = await ctx.db.query.trailblazers.findMany({
      where: (and(eq(trailblazers.isPublic, true), gt(trailblazers.points, -1))),
      orderBy: (trailblazers, { desc }) => [desc(trailblazers.points)],
      limit: limit,
      offset: offset
    });
    const nextCursor = trailblazer.length + offset;
    return {trailblazer, nextCursor};
  }),
});
