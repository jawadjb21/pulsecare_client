"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { cn } from "@/lib/utils";

import {
    Home,
    ClipboardList,
    PlusCircle,
    LogOut,
    Menu,
    User
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const links = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: Home,
    },
    {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        label: "My Requests",
        href: "/dashboard/my-requests",
        icon: ClipboardList,
    },
    {
        label: "Create Request",
        href: "/dashboard/create-request",
        icon: PlusCircle,
    }
];

export default function DashboardSidebar({ user, children }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/login"),
            },
        });
    };

    const SidebarContent = () => (
        <div className="flex h-full flex-col">

            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-3 border-b px-6 py-6"
            >
                <Image
                    src="/logo.png"
                    alt="PulseCare"
                    width={48}
                    height={48}
                />

                <span className="text-3xl font-extrabold">
                    PulseCare
                </span>
            </Link>

            {/* User */}
            <div className="border-b px-6 py-6">
                <div className="flex items-center gap-3">
                    <Image
                        src={user?.image || "/default-avatar.png"}
                        alt={user?.name || "User"}
                        width={55}
                        height={55}
                        className="rounded-full border-2 border-primary object-cover"
                    />

                    <div>
                        <h3 className="font-bold">
                            {user?.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-2 p-4">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-4 rounded-xl px-4 py-3 text-lg font-semibold transition-all",
                                pathname === link.href
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "hover:bg-muted"
                            )}
                        >
                            <Icon className="size-5" />

                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t p-4">
                <Button
                    variant="destructive"
                    className="w-full justify-start gap-3 text-lg"
                    onClick={handleLogout}
                >
                    <LogOut className="size-5" />

                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">

            {/* Mobile Header */}
            <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background px-4 py-4 lg:hidden">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="PulseCare"
                        width={38}
                        height={38}
                    />

                    <span className="text-2xl font-bold">
                        PulseCare
                    </span>
                </Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-[320px] p-0">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </header>

            <div className="flex">

                {/* Desktop Sidebar */}
                <aside className="hidden h-screen w-[320px] border-r lg:block">
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}