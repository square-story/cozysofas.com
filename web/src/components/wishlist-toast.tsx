"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, X, Eye } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/lib/wishlist-context"

interface WishlistToastProps {
  show: boolean
  productName: string
  action: "added" | "removed"
  onClose: () => void
}

export function WishlistToast({ show, productName, action, onClose }: WishlistToastProps) {
  const { wishlistCount } = useWishlist()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card className="p-4 shadow-lg border-l-4 border-l-red-500 bg-white max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {action === "added" ? "Added to wishlist!" : "Removed from wishlist"}
            </p>
            <p className="text-sm text-gray-600 truncate">{productName}</p>
            {action === "added" && (
              <div className="flex items-center gap-2 mt-2">
                <Link href="/wishlist">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    View Wishlist ({wishlistCount})
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="flex-shrink-0 h-6 w-6">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
