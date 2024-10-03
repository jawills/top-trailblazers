import Image from "next/image"
import { notFound } from "next/navigation"
import { SelectTrailblazer, type BadgeUnion } from "~/server/db/schema"
import { api } from "~/trpc/server"
import { BadgesTable } from "./_components/badges-table/badges-table"
import { Shell } from "~/components/shell"
import React from "react"
import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton"
import { CertsTable } from "./_components/certs-table/certs-table"
import { Card } from "~/components/ui/card"
import ProfileCard from "./_components/profile-card"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params 
  // fetch data
  const trailblazer = await api.trailblazer.getTrailblazer({slug: params.slug})
 
  // optionally access and extend (rather than replace) parent metadata
   return {
    title: trailblazer?.name,
    openGraph: {
      images: [trailblazer?.avatarUrl ?? ''],
    },
  }
}

export default async function TrailblazerPage({ params }: Props ) {
  const trailblazer = await api.trailblazer.getTrailblazer({slug: params.slug})
  if (!trailblazer){
    return notFound()
  }
  const badges = api.trailblazer.getTrailblazerBadges({id: trailblazer.profileId}) as BadgeUnion[]
  const certs = api.trailblazer.getTrailblazerCerts({id: trailblazer.profileId})
  return <>
      <ProfileCard trailblazer={trailblazer}/>
      <Shell className="gap-2">
      <h2>Certs</h2>
      <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={3}
              searchableColumnCount={0}
              filterableColumnCount={0}
              cellWidths={["5rem", "5rem", "5rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
        <CertsTable certsPromise={certs}/>
      </React.Suspense>
      <h2>Badges</h2>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={4}
              searchableColumnCount={0}
              filterableColumnCount={0}
              cellWidths={["1rem", "1rem", "1rem", "1rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
        <BadgesTable badgesPromise={badges}/>
      </React.Suspense>

    </Shell>
    </>
}