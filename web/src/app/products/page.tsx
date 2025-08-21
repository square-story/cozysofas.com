"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Grid, List } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { products, categories, colors, materials, sortOptions, getProductsData, getCategoriesData, getColorsData, getMaterialsData } from "@/lib/products"
import { QuickWhatsAppActions } from "@/components/quick-whatsapp-actions"
import { IFilters } from "@/lib/filter"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [maxPrice, setMaxPrice] = useState(0)
  const [filters, setFilters] = useState<IFilters>({
    categories: [],
    colors: [],
    materials: [],
    priceRange: [0, maxPrice],
    inStock: false,
  })

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData, colorsData, materialsData] = await Promise.all([
          getProductsData(),
          getCategoriesData(),
          getColorsData(),
          getMaterialsData()
        ]);

        const maxPrice = Math.max(...productsData.map(product => product.price));
        const roundedMaxPrice = Math.ceil(maxPrice / 1000) * 1000;
        setMaxPrice(roundedMaxPrice);
        setFilters({
          ...filters,
          priceRange: [0, roundedMaxPrice],
        });
        
       
        Object.assign(products, productsData);
        Object.assign(categories, categoriesData);
        Object.assign(colors, colorsData);
        Object.assign(materials, materialsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 12

  const filteredAndSortedProducts = useMemo(() => {
    // Return empty array if products haven't loaded yet
    if (isLoading || products.length === 0) {
      return [];
    }
    
    const filtered = products.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.some(category => {
          // Check if product.category exists before comparing
          if (!product.category) return false;
          return category.name === product.category.name;
        })
      ) {
        return false
      }

      // Color filter
      if (
        filters.colors.length > 0 &&
        !product.colors.some((productColor) => 
          filters.colors.some(filterColor => filterColor.name === productColor.name)
        )
      ) {
        return false
      }

      // Material filter
      if (
        filters.materials.length > 0 &&
        !product.materials.some((productMaterial) => 
          filters.materials.some(filterMaterial => filterMaterial.name === productMaterial.name)
        )
      ) {
        return false
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "bestseller":
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, sortBy, filters, isLoading])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-gray-600 mt-1">Discover our complete collection of premium furniture</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0 space-y-6">
            <ProductFilters onFiltersChange={setFilters} activeFilters={filters} />
            <QuickWhatsAppActions />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <ProductFilters onFiltersChange={setFilters} activeFilters={filters} />
                  </SheetContent>
                </Sheet>

                <div className="text-sm text-gray-600">{filteredAndSortedProducts.length} products found</div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  }`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setFilters({
                      categories: [],
                      colors: [],
                      materials: [],
                      priceRange: [0, 3000],
                      inStock: false,
                    })
                  }}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
