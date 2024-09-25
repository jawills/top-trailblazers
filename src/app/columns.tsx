"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SelectTrailblazer } from "~/server/db/schema"


export const columns: ColumnDef<SelectTrailblazer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "badges",
    header: "Badges",
  },
  {
    accessorKey: "trails",
    header: "Trails",
  },
  {
    accessorKey: "superBadges",
    header: "Super Badges",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
]
