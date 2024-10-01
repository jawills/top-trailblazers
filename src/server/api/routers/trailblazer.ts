import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";
import { getTrailblazers } from "~/app/_lib/queries";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { awards, earnedAwards, trailblazerCertifications, trailblazers } from "~/server/db/schema";

export const trailblazerRouter = createTRPCRouter({
  getTrailblazer: publicProcedure.input(z.object({slug: z.string().max(100)})).query(async ({ input, ctx }) => {

    const trailblazer = await ctx.db.query.trailblazers.findFirst({
      where: (and(eq(trailblazers.isPublic, true), eq(trailblazers.profileSlug, input.slug))),
    });
    return trailblazer;
  }),

  getTrailblazerBadges: publicProcedure.input(z.object({id: z.string()})).query(async ({ input, ctx }) => {

    const badges = await ctx.db.select().from(earnedAwards).where(eq(earnedAwards.user_id, input.id)).leftJoin(awards, eq(awards.id, earnedAwards.award_id))
    return {data: badges, length: badges.length};
  }),

  getTrailblazerCerts: publicProcedure.input(z.object({id: z.string()})).query(async ({ input, ctx }) => {

    const certs = await ctx.db.query.trailblazerCertifications.findMany({
      where: eq(trailblazerCertifications.userProfileId , input.id),
    });
    return {data: certs, length: certs.length};
  }),

});
