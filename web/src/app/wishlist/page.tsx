"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Trash2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWishlist } from "@/lib/wishlist-context"
import { WishlistButton } from "@/components/wishlist-button"
import { WhatsAppShareButton } from "@/components/whatsapp-share-button"

export default function WishlistPage() {
  const { wishlistItems, clearWishlist, wishlistCount } = useWishlist()

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600 mt-1">Save your favorite items for later</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Start browsing our collection and save your favorite items to your wishlist.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600 mt-1">
                  {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            {wishlistCount > 0 && (
              <div className="flex gap-3">
                <WhatsAppShareButton size="lg" />
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Link href={`/products/${product.slug}`}>
                  <Image
                    src={product.images[0].url || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                  {product.isBestSeller && <Badge className="bg-red-500 text-white">Best Seller</Badge>}
                  {product.originalPrice && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Save ₹{product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>

                <WishlistButton
                  product={product}
                  variant="icon"
                  className="absolute top-3 right-3 opacity-100 bg-red-50 border-red-200"
                />

                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-lg hover:text-amber-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12 space-y-4">
          <WhatsAppShareButton size="lg" className="mr-4" />
          <Link href="/products">
            <Button size="lg" variant="outline" className="bg-transparent">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
