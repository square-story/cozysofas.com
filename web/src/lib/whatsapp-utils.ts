import type { Product } from "@/lib/products"

interface UserInfo {
  name: string
  phone: string
  email: string
  address: string
  message: string
}

export function formatWishlistForWhatsApp(wishlistItems: Product[], userInfo: UserInfo): string {
  const currentDate = new Date().toLocaleDateString()
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)

  let message = `🛋️ *COZY FURNITURE - WISHLIST INQUIRY*\n\n`

  // Customer Information
  message += `👤 *Customer Information:*\n`
  message += `• Name: ${userInfo.name}\n`
  message += `• Phone: ${userInfo.phone}\n`
  message += `• Email: ${userInfo.email}\n`
  message += `• Address: ${userInfo.address}\n`
  message += `• Date: ${currentDate}\n\n`

  // Wishlist Items
  message += `❤️ *Wishlist Items (${wishlistItems.length} items):*\n\n`

  wishlistItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`
    message += `   💰 Price: $${item.price.toLocaleString()}`

    if (item.originalPrice) {
      message += ` (Save $${item.originalPrice - item.price})`
    }

    message += `\n`
    message += `   📏 Size: ${item.Dimensions.Width}"W × ${item.Dimensions.Height}"H × ${item.Dimensions.Depth}"D\n`
    message += `   🎨 Available Colors: ${item.colors.join(", ")}\n`

    if (!item.inStock) {
      message += `   ❌ Currently Out of Stock\n`
    }

    message += `\n`
  })

  // Summary
  message += `💰 *Total Wishlist Value: $${totalValue.toLocaleString()}*\n\n`

  // Additional Message
  if (userInfo.message.trim()) {
    message += `💬 *Additional Message:*\n${userInfo.message}\n\n`
  }

  // Call to Action
  message += `📞 *Next Steps:*\n`
  message += `• I'm interested in getting quotes for these items\n`
  message += `• Please provide availability and delivery information\n`
  message += `• I'd like to discuss payment options\n\n`

  message += `🚚 *Services I'm interested in:*\n`
  message += `• Free delivery (orders over $500)\n`
  message += `• Professional setup service\n`
  message += `• 10-year warranty coverage\n\n`

  message += `Thank you for your time! Looking forward to hearing from you. 😊`

  return message
}

export function openWhatsApp(message: string, phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""): void {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  // Open in new window/tab
  window.open(whatsappUrl, "_blank")
}

export function validatePhoneNumber(phone: string): boolean {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "")

  // Check if it's a valid length (10-15 digits)
  return cleanPhone.length >= 10 && cleanPhone.length <= 15
}

export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "")

  // Add country code if not present (assuming US +1 for demo)
  if (cleanPhone.length === 10) {
    return `1${cleanPhone}`
  }

  return cleanPhone
}
