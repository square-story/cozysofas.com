"use client"

import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { WishlistToast } from "@/components/wishlist-toast"
import { WishlistProvider, useWishlist } from "@/lib/wishlist-context"
import type { ReactNode } from "react"

function WishlistWrapper({ children }: { children: ReactNode }) {
  const { showToast, toastData, hideToast } = useWishlist()

  return (
    <>
      {children}
      <WishlistToast
        show={showToast}
        productName={toastData?.productName || ""}
        action={toastData?.action || "added"}
        onClose={hideToast}
      />
    </>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <WishlistProvider>
          <WishlistWrapper>{children}</WishlistWrapper>
        </WishlistProvider>
      </body>
    </html>
  )
}
