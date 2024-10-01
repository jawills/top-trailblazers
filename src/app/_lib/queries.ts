import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { db } from "~/server/db"
import { trailblazers, type SelectTrailblazer } from "~/server/db/schema"
import { type DrizzleWhere } from "~/types"
import { and, asc, count, desc, isNotNull, or, type SQL } from "drizzle-orm"

import { filterColumn } from "~/lib/filter-column"

import { type GetTrailblazersSchema } from "./validations"

export async function getTrailblazers(input: GetTrailblazersSchema) {
  noStore()
  const { page, per_page, sort, name, rank, operator } =
    input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "points",
      "desc",
    ]) as [keyof SelectTrailblazer | undefined, "asc" | "desc" | undefined]

    const expressions: (SQL<unknown> | undefined)[] = [
      // Filter trailblazers by name
      !!name
        ? filterColumn({
          column: trailblazers.name,
          value: name.toLowerCase(),
        })
        : undefined,
      // Filter trailblazers by rank
      !!rank
        ? filterColumn({
          column: trailblazers.rank,
          value: rank,
          isSelectable: true
        })
        : undefined,
      isNotNull(trailblazers.points)  
    ]
    const where: DrizzleWhere<SelectTrailblazer> =
      !operator || operator === "and" ? and(...expressions) : or(...expressions)
    // Transaction is used to ensure both queries are executed in a single transaction
    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(trailblazers)
        .limit(per_page)
        .offset(offset)
        .where(where)
        .orderBy(
          column && column in trailblazers
            ? order === "asc"
              ? asc(trailblazers[column])
              : desc(trailblazers[column])
            : desc(trailblazers.id)
        )

      const total = await tx
        .select({
          count: count(),
        })
        .from(trailblazers)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0)

      return {
        data,
        total,
      }
    })

    const pageCount = Math.ceil(total / per_page)
    return { data, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}