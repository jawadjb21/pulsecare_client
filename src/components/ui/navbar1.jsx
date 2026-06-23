"use client";

import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import navLinks from "@/data/navLinks.json";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../theme/ThemeToggle";
import { authClient } from "@/lib/auth-client";

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "PulseCare Logo",
    title: "PulseCare",
  },
  user = null,
  className,
}) => {

  const menu = navLinks.slice(0, 6);
  let auth = []
  if (!user) {
    auth = navLinks.slice(6, 8);
  } else {
    auth = navLinks.slice(8);
  }

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  }

  return (
    <section
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden h-20 items-center justify-between lg:flex">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-3">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={42}
              height={42}
              className="object-contain"
            />

            <span className="text-3xl font-extrabold tracking-tight">
              {logo.title}
            </span>
          </Link>

          {/* Nav Links */}
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {menu.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn("rounded-lg px-4 py-2 text-xl font-extrabold transition-colors hover:bg-muted hover:text-primary",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted hover:text-primary"
                      )}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {user ? auth.map(item => (
              <Button
                key={item.id}
                variant={item.variant || "default"}
                size="sm"
                className={"text-lg p-5 cursor-pointer"}
                onClick={() => handleLogout()}>
                {item.label}
              </Button>
            )) :
              auth.map((item) => (
                <Button
                  key={item.id}
                  asChild
                  className={"text-lg p-5 cursor-pointer"}
                  variant={item.variant || "default"}
                  size="sm"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))
            }
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex h-20 items-center justify-between px-2 lg:hidden">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={40}
              height={40}
            />

            <span className="text-2xl font-extrabold">
              {logo.title}
            </span>
          </Link>
          <div className="flex justify-between items-center gapx-2">
            <div className="flex justify-end px-4">
              <ModeToggle />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-75">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-3">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={36}
                        height={36}
                      />

                      <span className="text-xl font-bold">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col px-4 gap-5">
                  {/* Menu Items */}
                  {menu.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-secondary-foreground text-2xl font-extrabold transition-all duration-200",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted hover:text-primary"
                      )}>
                      {item.label}
                    </Link>
                  ))}

                  {/* Divider */}
                  <div className="my-2 border-t" />

                  {/* Auth Buttons */}
                  <div className="flex flex-col gap-3">
                    {user ? auth.map(item => (
                      <Button
                        key={item.id}
                        className={"text-lg p-5 cursor-pointer"}
                        variant={item.variant || "default"}
                        onClick={() => handleLogout()}
                      >
                        {item.label}
                      </Button>
                    )) : auth.map((item) => (
                      <Button
                        key={item.id}
                        asChild
                        className={"text-lg p-5 cursor-pointer"}
                        variant={item.variant || "default"}
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section >
  );
};

export { Navbar1 };