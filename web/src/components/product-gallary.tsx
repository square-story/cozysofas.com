"use client"

import { Product } from "@/lib/products"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, MessageCircle, Phone, RotateCcw, Share2, Shield, Star, Truck } from "lucide-react"
import { Badge } from "./ui/badge"
import { WishlistButton } from "./wishlist-button"

interface IProductGallary {
    product: Product
}

export const ProductGallary = ({ product }: IProductGallary) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                        src={product.images[selectedImageIndex] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />

                    {/* Image Navigation */}
                    {product.images.length > 1 && (
                        <>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                                onClick={() =>
                                    setSelectedImageIndex(
                                        selectedImageIndex === 0 ? product.images.length - 1 : selectedImageIndex - 1,
                                    )
                                }
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                onClick={() =>
                                    setSelectedImageIndex(
                                        selectedImageIndex === product.images.length - 1 ? 0 : selectedImageIndex + 1,
                                    )
                                }
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                        {product.isBestSeller && <Badge className="bg-red-500 text-white">Best Seller</Badge>}
                        {product.originalPrice && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                Save ₹{product.originalPrice - product.price}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? "border-amber-600" : "border-gray-200"
                                    }`}
                            >
                                <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`${product.name} ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>

                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Color Selection */}
                <div>
                    <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
                    <div className="flex gap-2">
                        {product.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-4 py-2 rounded-lg border-2 text-sm ${selectedColor === color
                                    ? "border-amber-600 bg-amber-50 text-amber-800"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div>
                    <h3 className="font-semibold mb-3">Quantity</h3>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                            -
                        </Button>
                        <span className="w-12 text-center font-semibold">{quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                            +
                        </Button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">

                    <div className="flex gap-3">
                        <WishlistButton product={product} size="lg" className="flex-1" />
                        <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                            <Share2 className="w-5 h-5 mr-2" />
                            Share
                        </Button>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            WhatsApp
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                            <Phone className="w-5 h-5 mr-2" />
                            Call Us
                        </Button>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                    <div className="text-center">
                        <Truck className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                        <div className="text-sm font-medium">Free Delivery</div>
                        <div className="text-xs text-gray-600">Orders over $500</div>
                    </div>
                    <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                        <div className="text-sm font-medium">10-Year Warranty</div>
                        <div className="text-xs text-gray-600">Full coverage</div>
                    </div>
                    <div className="text-center">
                        <RotateCcw className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                        <div className="text-sm font-medium">30-Day Returns</div>
                        <div className="text-xs text-gray-600">Easy returns</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
