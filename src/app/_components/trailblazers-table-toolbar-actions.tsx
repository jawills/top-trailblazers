"use client"

import { type SelectTrailblazer } from "~/server/db/schema"
import { type Table } from "@tanstack/react-table"


import { CreateTrailblazerDialog } from "./create-trailblazer-dialog"


export function TrailblazersTableToolbarActions({
}) {
  return (
      <CreateTrailblazerDialog />
  )
}