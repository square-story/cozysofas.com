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
      <button onClick={handleShareClick} className="group relative flex h-[45px] w-[45px] items-center justify-start overflow-hidden rounded-full bg-[#00d757] shadow-md transition-all duration-300 hover:w-[150px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]">
      {/* Icon */}
      <div className="flex w-full items-center justify-center transition-all duration-300 group-hover:w-[30%] group-hover:pl-2">
        <svg
          className="w-[25px]"
          viewBox="0 0 16 16"
        >
          <path
            fill="white"
            d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="absolute right-0 w-0 opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:w-[70%] group-hover:pr-2 group-hover:opacity-100">
        Whatsapp
      </div>
    </button>

      <UserInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUserInfoSubmit}
        isLoading={isLoading}
      />
    </>
  )
}
