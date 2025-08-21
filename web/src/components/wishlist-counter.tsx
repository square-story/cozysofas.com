"use client"

import { Heart } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/lib/wishlist-context"

export function WishlistCounter() {
  const { wishlistCount } = useWishlist()

  return (
<Link
      href="/wishlist"
      className="group relative flex h-[45px] w-[45px] items-center justify-start rounded-full bg-red-600 shadow-md transition-all duration-300 hover:w-[150px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]"
    >
      {/* Heart Icon */}
      <div className="flex w-full items-center justify-center transition-all duration-300 group-hover:w-[30%] group-hover:pl-2">
        <Heart className="w-6 h-6 text-white" />
      </div>

      {/* Text */}
      <div className="absolute right-0 w-0 opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:w-[70%] group-hover:pr-2 group-hover:opacity-100">
        Wishlist
      </div>

      {/* Badge Counter */}
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {wishlistCount > 99 ? "99+" : wishlistCount}
        </span>
      )}
    </Link>
  )
}