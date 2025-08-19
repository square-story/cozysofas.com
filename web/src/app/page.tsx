/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Truck,
  Shield,
  Headphones,
  Heart,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WhatsAppShareButton } from "@/components/whatsapp-share-button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"


export default function SofaLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="animate-bounce bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">Premium Furniture Collection</Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your Living Space with
                  <span className="text-green-800"> Luxury Sofas</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover our handcrafted collection of premium sofas designed for ultimate comfort and style. Each
                  piece is meticulously crafted to elevate your home's aesthetic.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-accent-foreground text-white px-8 py-4">
                  <Link href="/products">
                    Shop Collection
                  </Link>
                </Button>
                <WhatsAppShareButton
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-800 hover:bg-green-50 px-8 py-4"
                  showItemCount={false}
                />
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Designs</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://asembleindia.com/wp-content/uploads/2025/07/image3-1-scaled.jpg"
                alt="Luxury Sofa Collection"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Cozy Sofas?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional quality and service that exceeds your expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-green-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Free Delivery</h3>
                <p className="text-gray-600">Complimentary delivery and setup service for all orders above ₹500</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">10-Year Warranty</h3>
                <p className="text-gray-600">Comprehensive warranty coverage on all our premium furniture pieces</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer support via WhatsApp and phone</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Handcrafted Quality</h3>
                <p className="text-gray-600">Each sofa is meticulously handcrafted by skilled artisans</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and trending sofa designs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map(item => (
              <ProductCard product={item} key={item.id} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-green-800 hover:bg-green-900 text-white px-8 py-4">
              <Link href="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r bg-primary text-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Transform Your Living Space?</h2>
            <p className="text-xl opacity-90">
              Connect with our furniture experts on WhatsApp for personalized recommendations and exclusive deals. Get
              instant responses to all your questions!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppShareButton size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4" />
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>10-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
