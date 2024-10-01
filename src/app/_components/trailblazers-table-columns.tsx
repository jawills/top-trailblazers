"use client"

import * as React from "react"
import { trailblazers, type SelectTrailblazer } from "~/server/db/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header"

import Image from "next/image"
import Link from "next/link"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"
// import { UpdateTaskSheet } from "./update-task-sheet"

export function getColumns(): ColumnDef<SelectTrailblazer>[] {

  return [
    {
      accessorKey: "avatarUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Profile" />
      ),
      cell: ({ row }) => <Image className="rounded-full" src={row.getValue("avatarUrl")} width={50} height={50} alt={row.getValue("name")}/>,
      enableSorting: false,
      enableHiding: false,
    },
    {
    accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),

    },
    {
      accessorKey: "rank",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rank" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "superBadges",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Super Badges" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "badges",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Badges" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "profileSlug",
    },
    {
      accessorKey: "points",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Points" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                <Link href={`u/${row.getValue('profileSlug')}`}>View</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
      size: 40,
    },
  ]
}