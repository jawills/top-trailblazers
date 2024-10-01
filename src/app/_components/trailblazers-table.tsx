"use client"
"use memo"

import * as React from "react"
import { trailblazers, type SelectTrailblazer } from "~/server/db/schema"
import { type DataTableFilterField } from "~/types"

import { useDataTable } from "~/hooks/use-data-table"
import { DataTable } from "~/components/data-table/data-table"
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar"

import { type getTrailblazers } from "~/app/_lib/queries"
import { getPriorityIcon, getStatusIcon } from "~/app/_lib/utils"
import { getColumns } from "~/app/_components/trailblazers-table-columns"
import { TrailblazersTableFloatingBar } from "~/app/_components/trailblazers-table-floating-bar"
import { TrailblazersTableToolbarActions } from "~/app/_components/trailblazers-table-toolbar-actions"

interface TrailblazerTableProps {
  trailblazersPromise: ReturnType<typeof getTrailblazers>
}

export function TrailblazersTable({ trailblazersPromise }: TrailblazerTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  const { data, pageCount } = React.use(trailblazersPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<SelectTrailblazer>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter trailblazers...",
    },
    {
      label: "Rank",
      value: "rank",
      options: trailblazers.rank.enumValues.map((rank) => ({
        label: rank[0]?.toUpperCase() + rank.slice(1),
        value: rank,
        withCount: true,
      })),
    },
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    /* optional props */
    filterFields,
    initialState: {
      sorting: [{ id: "points", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    /* */
  })

  return (
    <DataTable
      table={table}
      floatingBar={
          <TrailblazersTableFloatingBar table={table} /> 
      }
    >
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TrailblazersTableToolbarActions table={table} />
        </DataTableToolbar>
    </DataTable>
  )
}