import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import Logo from "./Logo";

interface Footer7Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    sections?: Array<{
        title: string;
        links: Array<{ name: string; href: string }>;
    }>;
    description?: string;
    socialLinks?: Array<{
        icon: React.ReactElement;
        href: string;
        label: string;
    }>;
    copyright?: string;
    legalLinks?: Array<{
        name: string;
        href: string;
    }>;
}


const defaultSocialLinks = [
    { icon: <Instagram className="size-10" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="size-10" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="size-10" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="size-10" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
];

const Footer = ({
    description = "Discover our handcrafted collection of premium sofas designed for ultimate comfort and style. Each piece is meticulously crafted to elevate your home's aesthetic.",
    socialLinks = defaultSocialLinks,
    copyright = `© ${new Date().getFullYear()} CozySofas. All rights reserved.`,
    legalLinks = defaultLegalLinks,
}: Footer7Props) => {
    return (
        <footer className="py-10">
            <div className="container mx-auto px-4 py-2">
                {/* Top section */}
                <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between lg:items-start">
                    {/* Logo + Description */}
                    <div className="flex w-full flex-col gap-6 lg:w-1/2">
                        <Logo />
                        <p className="text-muted-foreground max-w-full md:max-w-[70%] text-sm">
                            {description}
                        </p>
                    </div>

                    {/* Social Links */}
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-muted-foreground lg:gap-8 lg:grid-cols-4 lg:w-1/2">
                        {socialLinks.map((social, idx) => (
                            <li
                                key={idx}
                                className="hover:text-primary flex justify-center lg:justify-start"
                            >
                                <a
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom section */}
                <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center">
                    <p className="order-2 md:order-1">{copyright}</p>
                    <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
                        {legalLinks.map((link, idx) => (
                            <li key={idx} className="hover:text-primary">
                                <a href={link.href}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};


export { Footer };
