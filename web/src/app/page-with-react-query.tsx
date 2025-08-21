import { Suspense } from "react"
import { Hydrate, prefetchQueries } from "@/lib/hydration-utils"
import { getProducts, getCategories } from "@/lib/server-fetch"
import { queryKeys } from "@/lib/hooks/use-query-hooks"
import { useProducts, useCategories } from "@/lib/hooks/use-query-hooks"
import { useQueryState } from "@/lib/hooks/use-query-state"
import { ErrorState } from "@/lib/hooks/use-query-state"
import Image from "next/image"
import Link from "next/link"

// Server Component
export default async function HomePage() {
  try {
    // Prefetch data for the home page
    const dehydratedState = await prefetchQueries([
      {
        queryKey: queryKeys.products,
        queryFn: () => getProducts(),
      },
      {
        queryKey: queryKeys.categories,
        queryFn: () => getCategories(),
      },
    ])
    
    return (
      <Hydrate state={dehydratedState}>
        <Suspense fallback={<HomePageSkeleton />}>
          <HomeClient />
        </Suspense>
      </Hydrate>
    )
  } catch (error) {
    console.error("Error prefetching home page data:", error)
    // Fallback to client-side fetching
    return <HomeClient />
  }
}

// Client Component
function HomeClient() {
  // Use React Query hooks
  const productsQuery = useProducts()
  const categoriesQuery = useCategories()
  
  // Handle loading and error states
  const { isLoading: isLoadingProducts, error: productsError } = useQueryState(productsQuery)
  const { isLoading: isLoadingCategories, error: categoriesError } = useQueryState(categoriesQuery)
  
  // Show error if any query fails
  if (productsError || categoriesError) {
    return <ErrorState error={productsError || categoriesError} />
  }
  
  // Get data from queries
  const products = productsQuery.data || []
  const categories = categoriesQuery.data || []
  
  // Featured products (first 8 products)
  const featuredProducts = products.slice(0, 8)
  
  // Featured categories (first 4 categories)
  const featuredCategories = categories.slice(0, 4)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="/images/hero-bg.jpg" 
            alt="Luxury Sofa" 
            className="w-full h-full object-cover opacity-40"
            width={1920}
            height={1080}
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Luxury Comfort for Your Home</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Discover our handcrafted collection of premium sofas and furniture designed for style and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/products" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          
          {isLoadingCategories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category) => (
                <Link
                  key={category.id} 
                  href={`/products?category=${category.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <Image 
                      src={`/images/categories/${category.id}.jpg`} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      Browse collection
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link 
                  key={product.slug} 
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-64 overflow-hidden">
                    <Image 
                      src={product.images?.[0]?.formats?.thumbnail?.url || `/images/products/${product.id}.jpg`} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 truncate">{product.category?.name}</p>
                    <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link 
              href="/products" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < testimonial.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Skeleton Component
function HomePageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="h-12 bg-gray-700 rounded w-3/4 max-w-2xl mb-6"></div>
          <div className="h-6 bg-gray-700 rounded w-2/3 max-w-xl mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 max-w-lg mb-8"></div>
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-gray-700 rounded"></div>
            <div className="h-12 w-32 bg-gray-700 rounded"></div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data for testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    text: "The quality of my new sofa is exceptional. The customer service team was helpful throughout the entire process."
  },
  {
    name: "Michael Chen",
    avatar: "/images/testimonials/avatar-2.jpg",
    rating: 5,
    text: "We purchased a sectional sofa and couldn't be happier. The delivery was prompt and the quality exceeded our expectations."
  },
  {
    name: "Emily Rodriguez",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 4,
    text: "Beautiful furniture that transformed our living room. The only reason for 4 stars is that delivery took a bit longer than expected."
  }
]

// Sample data for features
const features = [
  {
    icon: "🛋️",
    title: "Premium Quality",
    description: "All our furniture is crafted with the finest materials and built to last for years to come."
  },
  {
    icon: "🚚",
    title: "Free Delivery",
    description: "Enjoy free delivery on all orders over $500 within the continental United States."
  },
  {
    icon: "⭐",
    title: "10-Year Warranty",
    description: "We stand behind our products with an industry-leading 10-year warranty on all frames."
  }
]