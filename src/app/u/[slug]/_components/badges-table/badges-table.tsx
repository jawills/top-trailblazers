"use client"
"use memo"

import * as React from "react"
import { trailblazers, type SelectTrailblazer } from "~/server/db/schema"
import { type DataTableFilterField } from "~/types"

import { useDataTable } from "~/hooks/use-data-table"
import { DataTable } from "~/components/data-table/data-table"
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar"
import { type BadgeUnion } from "~/server/db/schema"

import { getPriorityIcon, getStatusIcon } from "~/app/_lib/utils"
import { getColumns } from "./badges-table-columns"
import { TrailblazersTableFloatingBar } from "~/app/_components/trailblazers-table-floating-bar"
import { TrailblazersTableToolbarActions } from "~/app/_components/trailblazers-table-toolbar-actions"
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { BadgesTableFloatingBar } from "./badges-table-floating-bar"

interface BadgesTableProps {
  badgesPromise: ReturnType<BadgeUnion>
}

export function BadgesTable({ badgesPromise }: BadgesTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  const { data, length } = React.use(badgesPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

  })

  return (
    <DataTable
      table={table}
      floatingBar={
          <BadgesTableFloatingBar table={table} /> 
      }
    >
        <DataTableToolbar table={table} filterFields={undefined}/>
    </DataTable>
  )
}