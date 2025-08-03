"use client"

import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/lib/wishlist-context"

export function WishlistCounter() {
  const { wishlistCount } = useWishlist()

  return (
    <Link href="/wishlist" className="relative inline-flex items-center">
      <Heart className="w-6 h-6 text-gray-700 hover:text-amber-600 transition-colors" />
      {wishlistCount > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1">
          {wishlistCount > 99 ? "99+" : wishlistCount}
        </Badge>
      )}
    </Link>
  )
}
