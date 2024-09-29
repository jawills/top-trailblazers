import { api } from "~/trpc/server";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { searchParamsSchema } from "~/lib/validations"
import type { SearchParams } from "~/types/index"

export const dynamic = 'force-dynamic';

export interface IndexPageProps {
  searchParams: SearchParams
}
export default async function DemoPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams)
  const data = await api.trailblazer.infiniteTrailblazers({limit: 25, cursor: 0});

  return (
    <main>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.trailblazer} />
    </div>
    </main>
  )
}
