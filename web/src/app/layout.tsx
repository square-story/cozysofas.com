import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "Cozy Sofas",
  description: "Cozy Sofas - Discover our handcrafted collection of premium sofas designed for ultimate comfort and style. Each piece is meticulously crafted to elevate your home's aesthetic.",
  generator: "Discover our handcrafted collection of premium sofas designed for ultimate comfort and style. Each piece is meticulously crafted to elevate your home's aesthetic.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
