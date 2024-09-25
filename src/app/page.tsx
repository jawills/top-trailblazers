import { api } from "~/trpc/server";
import { Trailblazer, columns } from "./columns"
import { DataTable } from "./data-table"

export const dynamic = 'force-dynamic';


export default async function DemoPage() {
  const data = await api.trailblazer.getLatest();

  return (
    <main>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </main>
  )
}
