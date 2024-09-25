import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const trailblazerRouter = createTRPCRouter({

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(trailblazers).values({
  //       name: input.name,
  //     });
  //   }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.trailblazers.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),
});
