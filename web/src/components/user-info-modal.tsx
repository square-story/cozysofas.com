"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MessageCircle, User, Phone, Mail, MapPin } from "lucide-react"

interface UserInfo {
  name: string
  phone: string
  email: string
  address: string
  message: string
}

interface UserInfoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userInfo: UserInfo) => void
  isLoading?: boolean
}

export function UserInfoModal({ isOpen, onClose, onSubmit, isLoading = false }: UserInfoModalProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<UserInfo>>({})

  // Load saved user info from localStorage on mount
  useState(() => {
    if (typeof window !== "undefined") {
      const savedUserInfo = localStorage.getItem("userInfo")
      if (savedUserInfo) {
        setUserInfo(JSON.parse(savedUserInfo))
      }
    }
  })

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfo> = {}

    if (!userInfo.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!userInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-()]+$/.test(userInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!userInfo.address.trim()) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Save user info to localStorage for future use
    localStorage.setItem("userInfo", JSON.stringify(userInfo))

    onSubmit(userInfo)
  }

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            Share via WhatsApp
          </DialogTitle>
          <DialogDescription>
            Please provide your contact information to share your wishlist via WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              value={userInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              value={userInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Delivery Address *
            </Label>
            <Textarea
              id="address"
              value={userInfo.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter your complete delivery address"
              rows={3}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              value={userInfo.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Any specific requirements or questions..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              {isLoading ? (
                "Preparing..."
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Share on WhatsApp
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
