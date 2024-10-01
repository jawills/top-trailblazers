"use client"
"use memo"

import * as React from "react"
import { SelectCertification, trailblazers, type SelectTrailblazer } from "~/server/db/schema"
import { type DataTableFilterField } from "~/types"

import { useDataTable } from "~/hooks/use-data-table"
import { DataTable } from "~/components/data-table/data-table"
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar"
import { type BadgeUnion } from "~/server/db/schema"

import { getColumns } from "./certs-table-columns"
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { CertsTableFloatingBar } from "./certs-table-floating-bar"

interface CertsTableProps {
  badgesPromise: ReturnType<SelectCertification>
}

export function CertsTable({ certsPromise }: CertsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  const { data, length } = React.use(certsPromise)

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
          <CertsTableFloatingBar table={table} /> 
      }
    >
        <DataTableToolbar table={table} filterFields={undefined}/>
    </DataTable>
  )
}