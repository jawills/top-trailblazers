import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      picture: 'https://url.com',
      name: 'Justin Wills',
      rank: 'Ranger',
      badges: 1234,
      modules: 13,
      projects: 12,
      trails: 1,
      superBadges: 13,
      points: 500000,
      lastBadge: 'Badge Name',
      badgeStreak: 1235,
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <main>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </main>
  )
}
