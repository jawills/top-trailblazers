"use client"

import * as React from "react"
import { awards, type BadgeUnion } from "~/server/db/schema"
import { type ColumnDef } from "@tanstack/react-table"

import { Button } from "~/components/ui/button"

import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header"

import Image from "next/image"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"
// import { UpdateTaskSheet } from "./update-task-sheet"

export function getColumns(): ColumnDef<BadgeUnion>[] {
  return [
    {
      accessorKey: "award.icon",
      id: 'icon',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Icon" />
      ),
      cell: ({ row }) => <Image className="rounded-full" src={row.getValue("icon")} width={50} height={50} alt={row.getValue("title")}/>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "award.title",
      id: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "award.type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),

    },
    {
      accessorKey: "award.description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
  ]
}