"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    LayoutDashboard,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const ProfileDropdown = ({ user }) => {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-11 w-11 rounded-full p-0 cursor-pointer"
                >
                    <Image
                        src={user?.image || "/default-avatar.png"}
                        alt={user?.name || "User"}
                        width={44}
                        height={44}
                        className="rounded-full object-cover border"
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-64 rounded-2xl p-2"
                align="end"
            >
                {/* User Info */}
                <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 py-2">
                        <Image
                            src={user?.image || "/default-avatar.png"}
                            alt={user?.name || "User"}
                            width={48}
                            height={48}
                            className="rounded-full object-cover border"
                        />

                        <div className="flex flex-col overflow-hidden">
                            <p className="truncate font-semibold">
                                {user?.name}
                            </p>

                            <p className="truncate text-sm text-muted-foreground">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link
                            href="/dashboard"
                            className="cursor-pointer"
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link
                            href="/dashboard/profile"
                            className="cursor-pointer"
                        >
                            <User className="mr-2 h-4 w-4" />
                            My Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link
                            href="#"
                            className="cursor-pointer"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;