import Link from "next/link"
import { WishlistCounter } from "../wishlist-counter"
import { WhatsAppShareButton } from "../whatsapp-share-button"

export const NavBar = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">🛋️</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Cozy Sofas</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="#home" className="text-gray-700 hover:text-green-800 transition-colors">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-green-800 transition-colors">
                            Products
                        </Link>
                        <Link href="#features" className="text-gray-700 hover:text-green-800 transition-colors">
                            Features
                        </Link>
                        <Link href="#contact" className="text-gray-700 hover:text-green-800 transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <WishlistCounter />
                        <WhatsAppShareButton showItemCount={false} />
                    </div>
                </div>
            </div>
        </header>
    )
}
