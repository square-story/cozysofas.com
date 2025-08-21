"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useWishlist } from "../wishlist-context";
import type { Product } from "../products";

// Hook for optimistic updates with wishlist
export function useOptimisticWishlist() {
  const queryClient = useQueryClient();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Optimistically add to wishlist
  const optimisticAddToWishlist = (product: Product) => {
    // Only proceed if not already in wishlist
    if (!isInWishlist(product.id)) {
      // Perform the actual update
      addToWishlist(product);

      // Update the React Query cache
      queryClient.setQueryData(["wishlist"], (oldData: Product[] = []) => {
        return [...oldData, product];
      });
    }
  };

  // Optimistically remove from wishlist
  const optimisticRemoveFromWishlist = (productId: number) => {
    // Only proceed if in wishlist
    if (isInWishlist(productId)) {
      // Perform the actual update
      removeFromWishlist(productId);

      // Update the React Query cache
      queryClient.setQueryData(["wishlist"], (oldData: Product[] = []) => {
        return oldData.filter(item => item.id !== productId);
      });
    }
  };

  return {
    optimisticAddToWishlist,
    optimisticRemoveFromWishlist,
  };
}