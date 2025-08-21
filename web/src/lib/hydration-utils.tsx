"use client"

import { ReactNode } from "react"
import { QueryClient, dehydrate, DehydratedState, hydrate as RQHydrate } from "@tanstack/react-query"

type HydrateProps = {
  children: ReactNode
  state: DehydratedState | undefined
}

// Client component for hydrating the React Query state
export function Hydrate({ children, state }: HydrateProps) {
  // Safely cast the state to DehydratedState
  const safeState = state as DehydratedState | undefined
  
  const queryClient = new QueryClient()
  RQHydrate(queryClient, safeState)
  return <>{children}</>
}

type QueryConfig = {
  queryKey: readonly unknown[]
  queryFn: () => Promise<unknown>
}

// Server component for prefetching queries
export async function prefetchQueries(queries: QueryConfig[]) {
  const queryClient = new QueryClient()
  
  // Prefetch all queries in parallel
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
      })
    )
  )
  
  // Dehydrate the query cache
  return dehydrate(queryClient)
}

// Helper function to prefetch a single query
export async function prefetchQuery(queryKey: readonly unknown[], queryFn: () => Promise<unknown>) {
  const queryClient = new QueryClient()
  
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  })
  
  return dehydrate(queryClient)
}