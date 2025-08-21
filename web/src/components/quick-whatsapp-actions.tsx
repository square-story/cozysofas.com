"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Clock } from "lucide-react"
import { WhatsAppShareButton } from "@/components/whatsapp-share-button"

export function QuickWhatsAppActions() {
  const handleQuickInquiry = () => {
    const message = `Hi Cozy Sofas! 👋🏻

I'm interested in learning more about your sofa collection. Could you please help me with:

• Available designs and colors
• Pricing information
• Delivery options
• Current promotions

Thank you!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCustomDesign = () => {
    const message = `Hi Cozy Sofas! 🛋️

I'm interested in custom furniture design services. I'd like to discuss:

• Custom sofa designs
• Material options
• Size requirements
• Timeline and pricing

Looking forward to hearing from you!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <MessageCircle className="w-11 h-11 text-green-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Quick WhatsApp Actions</h3>
          <p className="text-sm text-gray-600">Get instant help from our furniture experts</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {/* General Inquiry */}
          <Button
            variant="outline"
            onClick={handleQuickInquiry}
            className="group flex items-center justify-center gap-2 rounded-xl border-2 border-green-200 bg-white px-5 py-3 text-green-700 transition-all duration-300 hover:border-green-400 hover:bg-green-50 hover:shadow-md active:scale-95"
          >
            <span className="font-medium">General Inquiry</span>
          </Button>

          {/* Custom Design */}
          <Button
            variant="outline"
            onClick={handleCustomDesign}
            className="group flex items-center justify-center gap-2 rounded-xl border-2 border-green-200 bg-white px-5 py-3 text-green-700 transition-all duration-300 hover:border-green-400 hover:bg-green-50 hover:shadow-md active:scale-95"
          >
            <span className="font-medium">Custom Design</span>
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-center pt-4 border-t border-green-200">
          <WhatsAppShareButton className="w-full" showItemCount={true} />
        </div>

        <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          Usually responds within 5 minutes
        </div>
      </CardContent>
    </Card>
  )
}
