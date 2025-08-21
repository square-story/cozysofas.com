import { Suspense } from "react"
import { Hydrate, prefetchQueries } from "@/lib/hydration-utils"
import { getProducts, getCategories, getColors, getMaterials } from "@/lib/server-fetch"
import { queryKeys } from "@/lib/hooks/use-query-hooks"
import { useProducts, useCategories, useColors, useMaterials } from "@/lib/hooks/use-query-hooks"
import { useQueryState } from "@/lib/hooks/use-query-state"
import { ErrorState } from "@/lib/hooks/use-query-state"
import { Product, Category, Color, Material } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"

// Server Component
export default async function ProductsPage({ searchParams }: { searchParams: Record<string, string> }) {
  try {
    // Prefetch data for the products page
    const dehydratedState = await prefetchQueries([
      {
        queryKey: queryKeys.products,
        queryFn: () => getProducts(),
      },
      {
        queryKey: queryKeys.categories,
        queryFn: () => getCategories(),
      },
      {
        queryKey: queryKeys.colors,
        queryFn: () => getColors(),
      },
      {
        queryKey: queryKeys.materials,
        queryFn: () => getMaterials(),
      },
    ])
    
    return (
      <Hydrate state={dehydratedState}>
        <Suspense fallback={<ProductsPageSkeleton />}>
          <ProductsClient searchParams={searchParams} />
        </Suspense>
      </Hydrate>
    )
  } catch (error) {
    console.error("Error prefetching products page data:", error)
    // Fallback to client-side fetching
    return <ProductsClient searchParams={searchParams} />
  }
}

// Client Component
function ProductsClient({ searchParams }: { searchParams: Record<string, string> }) {
  // Use React Query hooks
  const productsQuery = useProducts()
  const categoriesQuery = useCategories()
  const colorsQuery = useColors()
  const materialsQuery = useMaterials()
  
  // Handle loading and error states
  const { isLoading: isLoadingProducts, error: productsError } = useQueryState(productsQuery)
  const { isLoading: isLoadingCategories, error: categoriesError } = useQueryState(categoriesQuery)
  const { isLoading: isLoadingColors, error: colorsError } = useQueryState(colorsQuery)
  const { isLoading: isLoadingMaterials, error: materialsError } = useQueryState(materialsQuery)
  
  // Show error if any query fails
  const error = productsError || categoriesError || colorsError || materialsError
  if (error) {
    return <ErrorState error={error} />
  }
  
  // Get data from queries with proper typing
  const products: Product[] = productsQuery.data || []
  const categories: Category[] = categoriesQuery.data || []
  const colors: Color[] = colorsQuery.data || []
  const materials: Material[] = materialsQuery.data || []
  
  // Parse search params
  const searchQuery = searchParams.q || ""
  const categoryId = searchParams.category ? parseInt(searchParams.category, 10) : undefined
  const colorId = searchParams.color ? parseInt(searchParams.color, 10) : undefined
  const materialId = searchParams.material ? parseInt(searchParams.material, 10) : undefined
  const sortBy = searchParams.sort || "featured"
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1
  const perPage = 12
  
  // Filter products based on search params
  const filteredProducts = filterProducts(
    products,
    searchQuery,
    categoryId,
    colorId,
    materialId
  )
  
  // Sort filtered products
  const sortedProducts = sortProducts(filteredProducts, sortBy)
  
  // Paginate products
  const paginatedProducts = paginateProducts(sortedProducts, page, perPage)
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / perPage)
  
  // Loading state
  const isLoading = isLoadingProducts || isLoadingCategories || isLoadingColors || isLoadingMaterials
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      {/* Filters and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          {/* Search */}
          <div>
            <h3 className="font-medium mb-3">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                defaultValue={searchQuery}
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  if (e.target.value) {
                    url.searchParams.set("q", e.target.value)
                  } else {
                    url.searchParams.delete("q")
                  }
                  url.searchParams.delete("page")
                  window.history.pushState({}, "", url)
                }}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  const url = new URL(window.location.href)
                  url.searchParams.delete("q")
                  url.searchParams.delete("page")
                  window.location.href = url.toString()
                }}
              >
                {searchQuery && "×"}
              </button>
            </div>
          </div>
          
          {/* Categories Filter */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="category-all"
                  name="category"
                  checked={!categoryId}
                  onChange={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.delete("category")
                    url.searchParams.delete("page")
                    window.location.href = url.toString()
                  }}
                  className="mr-2"
                />
                <label htmlFor="category-all">All Categories</label>
              </div>
              
              {isLoadingCategories ? (
                <div className="animate-pulse space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded w-3/4"></div>
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category.id}`}
                      name="category"
                      checked={categoryId === category.id}
                      onChange={() => {
                        const url = new URL(window.location.href)
                        url.searchParams.set("category", category.id.toString())
                        url.searchParams.delete("page")
                        window.location.href = url.toString()
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category.id}`}>{category.name}</label>
                      <span className="ml-2 text-gray-500 text-sm">
                        ({products.filter(p => p.category?.id === category.id).length})
                      </span>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Colors Filter */}
          <div>
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="color-all"
                  name="color"
                  checked={!colorId}
                  onChange={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.delete("color")
                    url.searchParams.delete("page")
                    window.location.href = url.toString()
                  }}
                  className="mr-2"
                />
                <label htmlFor="color-all">All Colors</label>
              </div>
              
              {isLoadingColors ? (
                <div className="animate-pulse space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded w-3/4"></div>
                  ))}
                </div>
              ) : (
                colors.map((color) => (
                  <div key={color.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`color-${color.id}`}
                      name="color"
                      checked={colorId === color.id}
                      onChange={() => {
                        const url = new URL(window.location.href)
                        url.searchParams.set("color", color.id.toString())
                        url.searchParams.delete("page")
                        window.location.href = url.toString()
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`color-${color.id}`} className="flex items-center">
                      <span 
                        className="w-4 h-4 rounded-full mr-2 border"
                        style={{ backgroundColor: color.name.toLowerCase() }}
                      ></span>
                      {color.name}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Materials Filter */}
          <div>
            <h3 className="font-medium mb-3">Materials</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="material-all"
                  name="material"
                  checked={!materialId}
                  onChange={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.delete("material")
                    url.searchParams.delete("page")
                    window.location.href = url.toString()
                  }}
                  className="mr-2"
                />
                <label htmlFor="material-all">All Materials</label>
              </div>
              
              {isLoadingMaterials ? (
                <div className="animate-pulse space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded w-3/4"></div>
                  ))}
                </div>
              ) : (
                materials.map((material) => (
                  <div key={material.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`material-${material.id}`}
                      name="material"
                      checked={materialId === material.id}
                      onChange={() => {
                        const url = new URL(window.location.href)
                        url.searchParams.set("material", material.id.toString())
                        url.searchParams.delete("page")
                        window.location.href = url.toString()
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`material-${material.id}`}>{material.name}</label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-600 mb-4 sm:mb-0">
              {isLoading ? (
                <span className="animate-pulse">Loading products...</span>
              ) : (
                `Showing ${filteredProducts.length} products`
              )}
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  url.searchParams.set("sort", e.target.value)
                  window.location.href = url.toString()
                }}
                className="border rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          {/* Products */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query.</p>
              <button
                onClick={() => {
                  window.location.href = "/products"
                }}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-1">
                    {/* Previous Page */}
                    <button
                      disabled={page === 1}
                      onClick={() => {
                        const url = new URL(window.location.href)
                        url.searchParams.set("page", (page - 1).toString())
                        window.location.href = url.toString()
                      }}
                      className={`px-3 py-1 rounded-md ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      &lt;
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          const url = new URL(window.location.href)
                          url.searchParams.set("page", pageNum.toString())
                          window.location.href = url.toString()
                        }}
                        className={`px-3 py-1 rounded-md ${pageNum === page ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    
                    {/* Next Page */}
                    <button
                      disabled={page === totalPages}
                      onClick={() => {
                        const url = new URL(window.location.href)
                        url.searchParams.set("page", (page + 1).toString())
                        window.location.href = url.toString()
                      }}
                      className={`px-3 py-1 rounded-md ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  return (
    <Link 
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
        <div className="flex justify-between items-center">
          <p className="font-bold">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

// Skeleton Component
function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-5 bg-gray-200 rounded w-3/4"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="lg:col-span-3">
          <div className="flex justify-between mb-6">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/6"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
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
      </div>
    </div>
  )
}

// Helper function to filter products
function filterProducts(
  products: Product[],
  searchQuery: string,
  categoryId?: number,
  colorId?: number,
  materialId?: number
): Product[] {
  return products.filter((product) => {
    // Search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Category filter
    if (categoryId && product.category?.id !== categoryId) {
      return false
    }
    
    // Color filter
    if (colorId && (!product.colors || !product.colors.some(color => color.id === colorId))) {
      return false
    }
    
    // Material filter
    if (materialId && (!product.materials || !product.materials.some(material => material.id === materialId))) {
      return false
    }
    
    return true
  })
}

// Helper function to sort products
function sortProducts(products: Product[], sortBy: string): Product[] {
  const sortedProducts = [...products]
  
  switch (sortBy) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price)
    case "name-asc":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    case "name-desc":
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
    case "featured":
    default:
      return sortedProducts
  }
}

// Helper function to paginate products
function paginateProducts(products: Product[], page: number, perPage: number): Product[] {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  return products.slice(startIndex, endIndex)
}