"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/utils";


const defaultProps = {
    logo: {
        url: "/",
        src: "/logo.png",
        alt: "PulseCare Logo",
        title: "PulseCare",
    },

    description:
        "PulseCare connects blood donors with patients in need, making blood donation faster, safer, and more accessible across Bangladesh.",

    sections: [
        {
            title: "Quick Links",
            links: [
                { name: "Home", href: "/" },
                { name: "Find Donors", href: "/donors" },
                { name: "Request Blood", href: "/requests" },
                { name: "About Us", href: "/about" },
            ],
        },

        {
            title: "Donor Services",
            links: [
                { name: "Become a Donor", href: "/register" },
                { name: "Donation Requests", href: "/requests" },
                { name: "Eligibility Guide", href: "#" },
                { name: "Donation Tips", href: "#" },
            ],
        },

        {
            title: "Support",
            links: [
                { name: "Contact Us", href: "#" },
                { name: "FAQs", href: "#" },
                { name: "Emergency Support", href: "#" },
                { name: "Help Center", href: "#" },
            ],
        },
    ],

    socialLinks: [
        {
            icon: <FaFacebook className="size-5" />,
            href: "https://www.facebook.com",
            label: "Facebook",
        },
        {
            icon: <FaInstagram className="size-5" />,
            href: "https://www.instagram.com",
            label: "Instagram",
        },
        {
            icon: <FaSquareXTwitter className="size-5" />,
            href: "https://www.x.com",
            label: "Twitter",
        },
        {
            icon: <FaLinkedin className="size-5" />,
            href: "https://www.linkedin.com",
            label: "LinkedIn",
        },
        {
            icon: <FaGithub className="size-5" />,
            href: "https://www.github.com/jawadjb21",
            label: "GitHub",
        },
    ],

    copyright: `© ${new Date().getFullYear()} PulseCare. All rights reserved.`,

    legalLinks: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms & Conditions", href: "#" },
    ],
};

const Footer = (props) => {
    const {
        logo,
        sections,
        description,
        socialLinks,
        copyright,
        legalLinks,
        className,
    } = {
        ...defaultProps,
        ...props,
    };

    return (
        <footer
            className={cn(
                "border-t bg-muted/20 py-20 backdrop-blur-sm",
                className
            )}
        >
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
                    {/* Brand */}
                    <div className="max-w-md space-y-6">
                        <Link
                            href={logo?.url || "/"}
                            className="flex items-center gap-3"
                        >
                            <Image
                                src={logo?.src || "/logo.png"}
                                alt={logo?.alt || "PulseCare Logo"}
                                width={50}
                                height={50}
                                className="object-contain"
                            />

                            <span className="text-3xl font-bold tracking-tight">
                                {logo?.title}
                            </span>
                        </Link>

                        <p className="leading-relaxed text-muted-foreground">
                            {description}
                        </p>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>📍 Serving all 64 districts of Bangladesh</p>
                            <p>📧 support@pulsecare.com</p>
                            <p>📞 Emergency Hotline: +880 1234-567890</p>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-5 pt-2">
                            {socialLinks?.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-20">
                        {sections?.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="mb-5 text-lg font-semibold">
                                    {section.title}
                                </h3>

                                <ul className="space-y-3">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className="text-muted-foreground transition-colors hover:text-primary"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t pt-8 text-sm text-muted-foreground md:flex-row">
                    <p>{copyright}</p>

                    <div className="flex flex-wrap items-center gap-6">
                        {legalLinks?.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="transition-colors hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };