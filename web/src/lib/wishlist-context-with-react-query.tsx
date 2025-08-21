"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/hooks/use-query-hooks"
import { Product } from "@/lib/products"

type ToastProps = {
  title: string;
  description: string;
}

// Mock toast function if the actual component is not available
const toast = (props: ToastProps) => {
  console.log(`Toast: ${props.title} - ${props.description}`);
  // In a real implementation, this would show a toast notification
}

type WishlistContextType = {
  wishlist: string[]
  addToWishlist: (productSlug: string, product?: Product) => void
  removeFromWishlist: (productSlug: string) => void
  isInWishlist: (productSlug: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const queryClient = useQueryClient()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
        localStorage.removeItem("wishlist")
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  // Add product to wishlist with optimistic updates
  const addToWishlist = (productSlug: string, product?: Product) => {
    if (wishlist.includes(productSlug)) return
    
    // Optimistic update
    setWishlist((prev) => [...prev, productSlug])
    
    // Update React Query cache if product data is provided
    if (product) {
      // Update products list cache
      queryClient.setQueryData<Product[]>(
        queryKeys.products,
        (oldData) => {
          if (!oldData) return undefined
          return oldData.map(p => p.id === product.id ? { ...p, isInWishlist: true } : p)
        }
      )
      
      // Update single product cache
      queryClient.setQueryData<Product>(
        queryKeys.product(productSlug),
        (oldData) => {
          if (!oldData) return undefined
          return { ...oldData, isInWishlist: true }
        }
      )
    }
    
    toast({
      title: "Added to Wishlist",
      description: "Product has been added to your wishlist",
    })
  }

  // Remove product from wishlist with optimistic updates
  const removeFromWishlist = (productSlug: string) => {
    if (!wishlist.includes(productSlug)) return
    
    // Optimistic update
    setWishlist((prev) => prev.filter((id) => id !== productSlug))
    
    // Update React Query cache
    queryClient.setQueryData<Product[]>(
      queryKeys.products,
      (oldData) => {
        if (!oldData) return undefined
        return oldData.map(p => p.slug === productSlug ? { ...p, isInWishlist: false } : p)
      }
    )
    
    queryClient.setQueryData<Product>(
      queryKeys.product(productSlug),
      (oldData) => {
        if (!oldData) return undefined
        return { ...oldData, isInWishlist: false }
      }
    )
    
    toast({
      title: "Removed from Wishlist",
      description: "Product has been removed from your wishlist",
    })
  }

  // Check if product is in wishlist
  const isInWishlist = (productSlug: string) => {
    return wishlist.includes(productSlug)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

// Custom hook to get wishlist products with React Query integration
export function useWishlistProducts() {
  const { wishlist } = useWishlist()
  const queryClient = useQueryClient()
  
  // Get all products from cache
  const allProducts = queryClient.getQueryData<Product[]>(queryKeys.products) || []
  
  // Filter products in wishlist
  const wishlistProducts = allProducts.filter(product => wishlist.includes(product.slug))
  
  return wishlistProducts
}