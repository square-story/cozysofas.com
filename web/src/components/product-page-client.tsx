/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { products, getProductsData, Product } from "@/lib/products"
import { ProductGallary } from "@/components/product-gallary"

interface ProductPageClientProps {
  slug: string
}

export function ProductPageClient({ slug }: ProductPageClientProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch product data when component mounts
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const productsData = await getProductsData()
        
        // Update the exported variable
        Object.assign(products, productsData)
        
        // Find the specific product by slug
        const foundProduct = products.find((p) => p.slug === slug)
        if (!foundProduct) {
          setProduct(null)
          setIsLoading(false)
          return
        }
        setProduct(foundProduct)
        
        // Find related products (same category, excluding current product)
        if (foundProduct) {
          const related = products
            .filter(
              (p) =>
                p.id !== foundProduct.id &&
                p.category?.id === foundProduct.category?.id
            )
            .slice(0, 4) // Limit to 4 related products
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error("Error fetching product data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug, router])

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading ? (
        // Loading skeleton
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="h-12 bg-gray-200 rounded animate-pulse w-full" />
            </div>
          </div>
        </div>
      ) : product ? (
        <>
          <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-amber-600">
                  Home
                </Link>
                <span>/</span>
                <Link href="/products" className="hover:text-amber-600">
                  Products
                </Link>
                <span>/</span>
                <span className="text-gray-900">{product.name}</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            {product && <ProductGallary product={product} />}
            {/* Product Details Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start border-b rounded-none gap-8">
                  <TabsTrigger value="description" className="text-lg">
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="text-lg">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="shipping" className="text-lg">
                    Shipping & Returns
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                    <h3 className="text-xl font-semibold mt-6 mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature.id} className="flex items-start gap-2">
                          <Check className="text-green-600 mt-1 flex-shrink-0" />
                          <span>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-6">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Dimensions</h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-sm">Width</p>
                        <p className="text-xl font-semibold">{product.Dimensions.Width} cm</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-sm">Height</p>
                        <p className="text-xl font-semibold">{product.Dimensions.Height} cm</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-sm">Depth</p>
                        <p className="text-xl font-semibold">{product.Dimensions.Depth || "Not Found"} cm</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Materials</h3>
                    <ul className="space-y-2 mb-6">
                      {product.materials.map((material) => (
                        <li key={material.id} className="flex items-start gap-2">
                          <Check className="text-green-600 mt-1 flex-shrink-0" />
                          <span>{material.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="mt-6">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                    <p className="mb-4">
                      We offer free shipping on all orders within city limits. For locations outside the city, shipping costs will be calculated at checkout based on distance and product size.
                    </p>
                    <p className="mb-4">
                      Standard delivery time is 3-5 business days for in-stock items. Custom orders may take 2-3 weeks for production before shipping.
                    </p>

                    <h3 className="text-xl font-semibold mb-4 mt-6">Return Policy</h3>
                    <p className="mb-4">
                      If you're not completely satisfied with your purchase, you can return it within 14 days of delivery. The item must be in its original condition and packaging.
                    </p>
                    <p>
                      Please note that custom-made or personalized items cannot be returned unless there is a manufacturing defect.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            {!isLoading && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">You might also like</h2>
                {relatedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((relatedProduct) => (
                      <Card key={relatedProduct.id} className="overflow-hidden">
                        <Link href={`/products/${relatedProduct.slug}`}>
                          <Image
                            src={relatedProduct.images[0].url || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                        </Link>
                        <CardContent className="p-4">
                          <Link href={`/products/${relatedProduct.slug}`}>
                            <h3 className="font-semibold hover:text-amber-600 transition-colors">{relatedProduct.name}</h3>
                          </Link>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-amber-600">₹{relatedProduct.price.toLocaleString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No related products found.</p>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="text-amber-600 hover:text-amber-700 font-medium">
            Browse all products
          </Link>
        </div>
      )}
    </div>
  )
}