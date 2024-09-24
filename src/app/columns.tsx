"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Trailblazer = {
  id: string;
  picture: string;
  name: string;
  rank: string;
  badges: number;
  modules: number;
  projects: number;
  trails: number;
  superBadges: number;
  points: number;
  lastBadge: string;
  badgeStreak: number;
}

export const columns: ColumnDef<Trailblazer>[] = [
  {
    accessorKey: "picture",
    header: "Picture",
  },
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
    accessorKey: "modules",
    header: "Modules",
  },
  {
    accessorKey: "projects",
    header: "Projects",
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
  {
    accessorKey: "lastBadge",
    header: "Last Badge",
  },
  {
    accessorKey: "badgeStreak",
    header: "Badge Streak",
  },
]
