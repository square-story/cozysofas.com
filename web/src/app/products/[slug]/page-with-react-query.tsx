import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Hydrate, prefetchQueries } from "@/lib/hydration-utils"
import { getProduct, getProducts } from "@/lib/server-fetch"
import { queryKeys } from "@/lib/hooks/use-query-hooks"
import { useProduct, useProducts } from "@/lib/hooks/use-query-hooks"
import { useQueryState } from "@/lib/hooks/use-query-state"
import { ErrorState } from "@/lib/hooks/use-query-state"
import { useWishlist } from "@/lib/wishlist-context-with-react-query"
import { Product } from "@/lib/products"
import Image from "next/image"

// Server Component
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const productSlug = params.slug
  
  if (!productSlug) {
    notFound()
  }
  
  try {
    // Prefetch product and related products data
    const dehydratedState = await prefetchQueries([
      {
        queryKey: queryKeys.product(productSlug),
        queryFn: () => getProduct(productSlug),
      },
      {
        queryKey: queryKeys.products,
        queryFn: () => getProducts(),
      },
    ])
    
    return (
      <Hydrate state={dehydratedState}>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetail productSlug={productSlug} />
        </Suspense>
      </Hydrate>
    )
  } catch (error) {
    console.error("Error fetching product:", error)
    notFound()
  }
}

// Client Component
function ProductDetail({ productSlug }: { productSlug: string }) {
  // Use React Query hooks
  const productQuery = useProduct(productSlug)
  const productsQuery = useProducts()
  
  // Handle loading and error states
  const { error } = useQueryState(productQuery)
  
  
  // Get wishlist functionality
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  // If there's an error, show error state
  if (error) {
    return <ErrorState error={error} />
  }
  
  // Get product data
  const product = productQuery.data
  
  if (!product) {
    return <ProductNotFound />
  }
  
  // Get related products
  const relatedProducts = getRelatedProducts(product, productsQuery.data || [])
  
  // Check if product is in wishlist
  const inWishlist = isInWishlist(product.slug)
  
  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.slug)
    } else {
      addToWishlist(product.slug, product)
    }
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg border">
          <Image 
            src={product.images?.[0]?.formats?.thumbnail?.url || `/images/products/${product.id}.jpg`} 
            alt={product.name}
            className="w-full h-full object-cover"
            width={500}
            height={500}
            priority
          />
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">{product.category?.name}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">ID: {product.id}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg line-through text-muted-foreground">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          {/* Product Attributes */}
          <div className="space-y-4 mb-8">
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div 
                      key={color.id}
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: color.name.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material) => (
                    <span 
                      key={material.id}
                      className="px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      Material {material.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex gap-4 mt-auto">
            <button 
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => alert(`Added ${product.name} to cart`)}
            >
              Add to Cart
            </button>
            
            <button 
              className={`p-3 rounded-md border ${inWishlist ? 'bg-primary/10' : 'hover:bg-muted'}`}
              onClick={handleWishlistToggle}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {inWishlist ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Related Product Card
function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-square overflow-hidden">
        <Image 
          src={product.images?.[0]?.formats?.thumbnail?.url || `/images/products/${product.slug}.jpg`} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width={200}
          height={200}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium truncate">{product.name}</h3>
        <p className="text-muted-foreground text-sm truncate">{product.category?.name}</p>
        <p className="font-semibold mt-2">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}

// Product Not Found Component
function ProductNotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
      <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been removed.</p>
      <Link 
        href="/products"
        className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  )
}

// Skeleton Component
function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Image Skeleton */}
        <div className="aspect-square bg-muted rounded-lg"></div>
        
        {/* Details Skeleton */}
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-muted rounded"></div>
          <div className="h-4 w-1/2 bg-muted rounded"></div>
          <div className="h-8 w-1/4 bg-muted rounded"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-3/4 bg-muted rounded"></div>
          <div className="h-12 w-full bg-muted rounded mt-8"></div>
        </div>
      </div>
      
      {/* Related Products Skeleton */}
      <div className="h-8 w-48 bg-muted rounded mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <div className="aspect-square bg-muted"></div>
            <div className="p-4 space-y-2">
              <div className="h-5 bg-muted rounded"></div>
              <div className="h-4 w-2/3 bg-muted rounded"></div>
              <div className="h-5 w-1/3 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to get related products
function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  // Filter products by same category, excluding the current product
  return allProducts
    .filter(p => 
      p.id !== product.id && 
      p.category?.id === product.category?.id
    )
    .slice(0, 4) // Limit to 4 related products
}