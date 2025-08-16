"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

interface WishlistButtonProps {
  product: Product
  variant?: "default" | "icon"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function WishlistButton({ product, variant = "default", size = "default", className }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isAnimating, setIsAnimating] = useState(false)
  const inWishlist = isInWishlist(product.id)

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  if (variant === "icon") {

    return (
      product.inStock &&
      <Button
        size="icon"
        variant="secondary"
        onClick={handleToggleWishlist}
        className={cn(
          "transition-all duration-200",
          inWishlist ? "bg-red-50 hover:bg-red-100 border-red-200" : "hover:bg-gray-100",
          isAnimating && "scale-110",
          className,
        )}
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors",
            inWishlist ? "text-red-500 fill-red-500" : "text-gray-600",
            isAnimating && "animate-pulse",
          )}
        />
      </Button>
    )
  }

  return (
    product.inStock &&
    <Button
      variant={inWishlist ? "default" : "outline"}
      size={size}
      onClick={handleToggleWishlist}
      className={cn(
        "transition-all duration-200",
        inWishlist
          ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
          : "border-gray-300 hover:border-red-300 hover:text-red-600 bg-transparent",
        isAnimating && "scale-105",
        className,
      )}
    >
      <Heart
        className={cn(
          "w-4 h-4 mr-2 transition-colors",
          inWishlist ? "fill-white" : "text-current",
          isAnimating && "animate-pulse",
        )}
      />
      {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  )
}
