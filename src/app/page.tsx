"use memo"

import * as React from "react"
import type { SearchParams } from "~/types"

import { Skeleton } from "~/components/ui/skeleton"
import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton"
import { Shell } from "~/components/shell"

import { TrailblazersTable } from "./_components/trailblazers-table"
import { getTrailblazers } from "./_lib/queries"
import { searchParamsSchema } from "./_lib/validations"

export interface IndexPageProps {
  searchParams: SearchParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams)

  const trailblazersPromise = getTrailblazers(search)

  return (
    <Shell className="gap-2">
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={9}
              searchableColumnCount={1}
              filterableColumnCount={1}
              cellWidths={['1rem','1rem','1rem','1rem','1rem','1rem','1rem','1rem','1rem',]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <TrailblazersTable trailblazersPromise={trailblazersPromise} />
        </React.Suspense>
    </Shell>
  )
}