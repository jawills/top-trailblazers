import { trailblazers } from "~/server/db/schema"
import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  rank: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getTrailblazersSchema = searchParamsSchema

export type GetTrailblazersSchema = z.infer<typeof getTrailblazersSchema>

// https://www.salesforce.com/trailblazer/justinwills
export const createTrailblazerSchema = z.object({
  profileUrl: z.string().regex(new RegExp('https:\/\/www.salesforce.com\/trailblazer\/([a-zA-Z0-9]*)'), 'Please use the correct url format'),
})

export type CreateTrailblazerSchema = z.infer<typeof createTrailblazerSchema>
