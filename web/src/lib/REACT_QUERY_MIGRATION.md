# React Query Migration Guide

## Overview

This document provides guidance on migrating the cozysofas.com web application from direct API calls to React Query for state management, caching, and data fetching. React Query offers significant benefits including:

- Automatic caching and stale-time management
- Deduplication of requests
- Background refetching
- Optimistic updates
- Error handling and retry logic
- Server-side rendering and hydration support

## Implementation Details

### Core Files

1. **Query Provider Setup**
   - `src/lib/query-provider.tsx`: Configures the React Query client with default options

2. **API and Data Fetching**
   - `src/lib/api/index.ts`: Enhanced with configurable caching options
   - `src/lib/server-fetch.ts`: Server-side data fetching functions with revalidation
   - `src/lib/hooks/use-query-hooks.ts`: Custom React Query hooks for data fetching

3. **Hydration and Prefetching**
   - `src/lib/hydration-utils.tsx`: Utilities for SSR hydration and prefetching

4. **Error Handling and State Management**
   - `src/lib/hooks/use-query-state.ts`: Hooks for managing loading and error states
   - `src/lib/hooks/use-optimistic-wishlist.ts`: Optimistic updates for wishlist

5. **Refactored Components**
   - `src/app/products/page-with-react-query.tsx`: Products page using React Query
   - `src/app/products/[id]/page-with-react-query.tsx`: Product detail page using React Query
   - `src/app/page-with-react-query.tsx`: Home page with prefetching
   - `src/lib/wishlist-context-with-react-query.tsx`: Wishlist context with React Query integration

### Migration Steps

1. **Update Layout Component**
   - Replace the current layout with the updated version that includes `QueryProvider`

2. **Replace Direct API Calls**
   - Replace direct `fetchAPI` calls with the appropriate React Query hooks
   - For server components, use `prefetchQueries` and `Hydrate`
   - For client components, use the custom hooks from `use-query-hooks.ts`

3. **Update Components**
   - Rename the `-with-react-query` files to replace their original counterparts
   - Update imports in components that use these files

4. **Test and Verify**
   - Test the application to ensure data fetching works correctly
   - Verify that caching and revalidation are working as expected
   - Check that optimistic updates for the wishlist are functioning

## Usage Examples

### Server Component with Prefetching

```tsx
import { prefetchQueries } from "@/lib/hydration-utils"
import { Hydrate } from "@/lib/hydration-utils"
import { queryKeys } from "@/lib/hooks/use-query-hooks"
import { getProducts } from "@/lib/server-fetch"

export default async function ProductsPage() {
  // Prefetch data on the server
  const dehydratedState = await prefetchQueries([
    { queryKey: queryKeys.products, queryFn: () => getProducts() },
  ])

  return (
    <Hydrate state={dehydratedState}>
      <ProductsClient />
    </Hydrate>
  )
}
```

### Client Component with React Query

```tsx
import { useProducts, useCategories } from "@/lib/hooks/use-query-hooks"
import { useQueryState } from "@/lib/hooks/use-query-state"

function ProductsClient() {
  const productsQuery = useProducts()
  const { data: products = [], isLoading, ErrorState } = useQueryState(productsQuery)
  
  if (isLoading) {
    return <LoadingComponent />
  }
  
  if (productsQuery.isError) {
    return <ErrorState />
  }
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Optimistic Updates

```tsx
import { useOptimisticWishlist } from "@/lib/hooks/use-optimistic-wishlist"

function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useOptimisticWishlist()
  const inWishlist = isInWishlist(product.id)
  
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id, product)
    }
  }
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleWishlistToggle}>
        {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  )
}
```

## Benefits of This Implementation

1. **Improved Performance**
   - Reduced network requests through caching
   - Faster page loads with prefetching
   - Smoother user experience with optimistic updates

2. **Better Developer Experience**
   - Centralized data fetching logic
   - Consistent error handling
   - Simplified component code

3. **Enhanced User Experience**
   - Reduced loading states
   - Immediate feedback for user actions
   - Consistent data across components

## Next Steps

1. Implement pagination and infinite scrolling using React Query's built-in support
2. Add mutation hooks for form submissions and data updates
3. Implement query invalidation strategies for real-time updates
4. Add offline support using React Query's persistence plugins