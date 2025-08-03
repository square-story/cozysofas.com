"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { categories, colors, materials } from "@/lib/products"

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void
  activeFilters: any
}

export function ProductFilters({ onFiltersChange, activeFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 3000])

  const handleCategoryChange = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c: string) => c !== category)
      : [...activeFilters.categories, category]

    onFiltersChange({ ...activeFilters, categories: newCategories })
  }

  const handleColorChange = (color: string) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter((c: string) => c !== color)
      : [...activeFilters.colors, color]

    onFiltersChange({ ...activeFilters, colors: newColors })
  }

  const handleMaterialChange = (material: string) => {
    const newMaterials = activeFilters.materials.includes(material)
      ? activeFilters.materials.filter((m: string) => m !== material)
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
          {activeFilters.categories.map((category: string) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange(category)} />
            </Badge>
          ))}
          {activeFilters.colors.map((color: string) => (
            <Badge key={color} variant="secondary" className="flex items-center gap-1">
              {color}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleColorChange(color)} />
            </Badge>
          ))}
          {activeFilters.materials.map((material: string) => (
            <Badge key={material} variant="secondary" className="flex items-center gap-1">
              {material}
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
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories
            .filter((c) => c !== "All")
            .map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={activeFilters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
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
          {colors
            .filter((c) => c !== "All")
            .map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={color}
                  checked={activeFilters.colors.includes(color)}
                  onCheckedChange={() => handleColorChange(color)}
                />
                <label htmlFor={color} className="text-sm cursor-pointer">
                  {color}
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
          {materials
            .filter((m) => m !== "All")
            .map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={material}
                  checked={activeFilters.materials.includes(material)}
                  onCheckedChange={() => handleMaterialChange(material)}
                />
                <label htmlFor={material} className="text-sm cursor-pointer">
                  {material}
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
              onCheckedChange={(checked) => onFiltersChange({ ...activeFilters, inStock: checked })}
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
