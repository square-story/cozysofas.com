import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="relative h-full w-full bg-primary text-white py-16">
            <div className="absolute bottom-0 left-0 right-0 top-0  bg-[linear-gradient(to_right,#ffffff30_2px,transparent_2px),linear-gradient(to_bottom,#ffffff30_2px,transparent_2px)]  bg-[size:32px_32px]  [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
            />
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">🛋️</span>
                            </div>
                            <span className="text-2xl font-bold">Cozy Sofas</span>
                        </div>
                        <p className="text-gray-400">
                            Transforming homes with premium, handcrafted furniture that combines comfort, style, and durability.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Warranty
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Size Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Care Instructions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-3 text-gray-400">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>123 Furniture St, Design City, DC 12345</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>hello@cozysofas.in</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp: (555) 987-6543</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} cozy sofas. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer