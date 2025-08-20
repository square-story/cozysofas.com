/* eslint-disable react/no-unescaped-entities */
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Check,
} from "lucide-react"
import { products } from "@/lib/products"
import { ProductGallary } from "@/components/product-gallary"


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ProductGallary product={product} />
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                  <div className="prose max-w-none">
                    <p className="mb-4">{product.description}</p>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          {feature.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Dimensions</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Width:</span>
                          <span>{product.Dimensions.Width}"</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Height:</span>
                          <span>{product.Dimensions.Height}"</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Depth:</span>
                          <span>{product.Dimensions.Depth || 'Not Found'}"</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Materials</h4>
                      <div className="space-y-1">
                        {product.materials.map((material, index) => (
                          <div key={index} className="text-sm">
                            {material.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Free Delivery</h4>
                      <p className="text-sm text-gray-600">
                        Free delivery on orders over $500. Standard delivery takes 5-7 business days.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">White Glove Service</h4>
                      <p className="text-sm text-gray-600">
                        Professional delivery and setup service available for an additional fee.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Image
                      src={relatedProduct.images[0].url || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold hover:text-amber-600 transition-colors">{relatedProduct.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-amber-600">₹{relatedProduct.price.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
