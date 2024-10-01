"use client"

import * as React from "react"
import { type SelectCertification } from "~/server/db/schema"
import { type ColumnDef } from "@tanstack/react-table"

import { Button } from "~/components/ui/button"

import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header"

import Image from "next/image"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"
// import { UpdateTaskSheet } from "./update-task-sheet"

export function getColumns(): ColumnDef<SelectCertification>[] {
  return [
    {
      accessorKey: "certName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "status",
      id: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "dateCompleted",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date Completed" />
      ),

    },
  ]
}