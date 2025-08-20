"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Product } from "@/lib/products"

interface WishlistContextType {
  wishlistItems: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
  wishlistCount: number
  showToast: boolean
  toastData: { productName: string; action: "added" | "removed" } | null
  hideToast: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastData, setToastData] = useState<{ productName: string; action: "added" | "removed" } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedWishlist = localStorage.getItem("wishlist")
        if (storedWishlist) {
          setWishlistItems(JSON.parse(storedWishlist))
        }
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage whenever wishlistItems changes (but only after initial load)
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error)
      }
    }
  }, [wishlistItems, isLoaded])

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev // Already in wishlist
      }
      setToastData({ productName: product.name, action: "added" })
      setShowToast(true)
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => {
      const product = prev.find((item) => item.id === productId)
      if (product) {
        setToastData({ productName: product.name, action: "removed" })
        setShowToast(true)
      }
      return prev.filter((item) => item.id !== productId)
    })
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const hideToast = () => {
    setShowToast(false)
    setToastData(null)
  }

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length,
    showToast,
    toastData,
    hideToast,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
