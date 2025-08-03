"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"
import { UserInfoModal } from "@/components/user-info-modal"
import { formatWishlistForWhatsApp, openWhatsApp } from "@/lib/whatsapp-utils"

interface UserInfo {
  name: string
  phone: string
  email: string
  address: string
  message: string
}

interface WhatsAppShareButtonProps {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
  showItemCount?: boolean
}

export function WhatsAppShareButton({
  variant = "default",
  size = "default",
  className = "",
  showItemCount = true,
}: WhatsAppShareButtonProps) {
  const { wishlistItems, wishlistCount } = useWishlist()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleShareClick = () => {
    if (wishlistCount === 0) {
      alert("Your wishlist is empty. Add some items first!")
      return
    }
    setIsModalOpen(true)
  }

  const handleUserInfoSubmit = async (userInfo: UserInfo) => {
    setIsLoading(true)

    try {
      // Format the message
      const whatsappMessage = formatWishlistForWhatsApp(wishlistItems, userInfo)

      // Company WhatsApp number (replace with actual number)
      const companyWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Open WhatsApp
      openWhatsApp(whatsappMessage, companyWhatsApp)

      // Close modal
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error sharing to WhatsApp:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleShareClick}
        className={`${variant === "default"
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
          } ${className}`}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Share via WhatsApp
        {showItemCount && wishlistCount > 0 && (
          <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
            {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
          </span>
        )}
      </Button>

      <UserInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUserInfoSubmit}
        isLoading={isLoading}
      />
    </>
  )
}
