import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { WishlistButton } from "@/components/wishlist-button"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
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
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
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
        <div className="space-y-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-amber-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>


          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <WishlistButton product={product} size="lg" className="w-full mt-3" />
        </div>
      </CardContent>
    </Card>
  )
}
