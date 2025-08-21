"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { categories, Category, Color, colors, Material, materials, getCategoriesData, getColorsData, getMaterialsData } from "@/lib/products"
import { IFilters } from "@/lib/filter"

interface ProductFiltersProps {
  onFiltersChange: (filters: IFilters) => void
  activeFilters: IFilters
}

export function ProductFilters({ onFiltersChange, activeFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, colorsData, materialsData] = await Promise.all([
          getCategoriesData(),
          getColorsData(),
          getMaterialsData()
        ]);
        
        // Update the exported variables
        Object.assign(categories, categoriesData);
        Object.assign(colors, colorsData);
        Object.assign(materials, materialsData);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category: Category) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c: Category) => c !== category)
      : [...activeFilters.categories, category]

    onFiltersChange({ ...activeFilters, categories: newCategories })
  }

  const handleColorChange = (color: Color) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter((c: Color) => c !== color)
      : [...activeFilters.colors, color]

    onFiltersChange({ ...activeFilters, colors: newColors })
  }

  const handleMaterialChange = (material: Material) => {  
    const newMaterials = activeFilters.materials.includes(material)
      ? activeFilters.materials.filter((m: Material) => m !== material)
      : [...activeFilters.materials, material]

    onFiltersChange({ ...activeFilters, materials: newMaterials })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFiltersChange({ ...activeFilters, priceRange: value })
  }

  const clearAllFilters = () => {
    setPriceRange([0, 3000])
    onFiltersChange({
      categories: [],
      colors: [],
      materials: [],
      priceRange: [0, 3000],
      inStock: false,
    })
  }

  const getActiveFilterCount = () => {
    return (
      activeFilters.categories.length +
      activeFilters.colors.length +
      activeFilters.materials.length +
      (activeFilters.inStock ? 1 : 0)
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All ({getActiveFilterCount()})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.categories.map((category: Category) => (
            <Badge key={category.name} variant="secondary" className="flex items-center gap-1">
              {category.name}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange(category)} />
            </Badge>
          ))}
          {activeFilters.colors.map((color: Color) => (
            <Badge key={color.name} variant="secondary" className="flex items-center gap-1">
              {color.name}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleColorChange(color)} />
            </Badge>
          ))}
          {activeFilters.materials.map((material: Material) => (
            <Badge key={material.name} variant="secondary" className="flex items-center gap-1">
              {material.name}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleMaterialChange(material)} />
            </Badge>
          ))}
        </div>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={3000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            // Loading skeleton for categories
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : categories
            .filter((c) => c.name !== "All")
            .map((category) => (
              <div key={category.name} className="flex items-center space-x-2">
                <Checkbox
                  id={category.name}
                  checked={activeFilters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category.name} className="text-sm cursor-pointer">
                  {category.name}
                </label>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            // Loading skeleton for colors
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : colors
            .filter((c) => c.name !== "All")
            .map((color) => (
              <div key={color.name} className="flex items-center space-x-2">
                <Checkbox
                  id={color.name}
                  checked={activeFilters.colors.includes(color)}
                  onCheckedChange={() => handleColorChange(color)}
                />
                <label htmlFor={color.name} className="text-sm cursor-pointer">
                  {color.name}
                </label>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Materials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            // Loading skeleton for materials
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : materials
            .filter((m) => m.name !== "All")
            .map((material) => (
              <div key={material.name} className="flex items-center space-x-2">
                <Checkbox
                  id={material.name}
                  checked={activeFilters.materials.includes(material)}
                  onCheckedChange={() => handleMaterialChange(material)}
                />
                <label htmlFor={material.name} className="text-sm cursor-pointer">
                  {material.name}
                </label>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={activeFilters.inStock}
              onCheckedChange={(checked) => onFiltersChange({ ...activeFilters, inStock: !checked })}
            />
            <label htmlFor="inStock" className="text-sm cursor-pointer">
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
