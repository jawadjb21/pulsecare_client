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
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme/ThemeToggle";
import ProfileDropdown from "../home/ProfileDropdown";

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
  const menu = navLinks.slice(0, 5);
  const auth = navLinks.slice(5,);

  const pathname = usePathname();

  return (
    <section
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="container mx-auto">

        {/* DESKTOP */}
        <nav className="hidden h-20 items-center justify-between lg:flex">

          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-3">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={42}
              height={42}
            />

            <span className="text-3xl font-extrabold tracking-tight">
              {logo.title}
            </span>
          </Link>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {menu.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-lg px-4 py-2 text-xl font-extrabold transition-all duration-200",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground shadow-md hover:bg-primary"
                        : "hover:bg-muted hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              auth.map((item) => (
                <Button
                  key={item.id}
                  asChild
                  className="text-lg p-5 cursor-pointer"
                  variant={item.variant || "default"}
                  size="sm"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))
            )}
          </div>
        </nav>

        {/* MOBILE */}
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

          <div className="flex items-center gap-3">
            <ModeToggle />

            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[320px]">

                  <SheetHeader>
                    <SheetTitle>
                      <Link
                        href={logo.url}
                        className="flex items-center gap-3"
                      >
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

                  <div className="mt-8 flex flex-col gap-4 px-4">

                    {/* Nav links */}
                    {menu.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          "rounded-xl px-4 py-3 text-xl font-bold transition-all",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "hover:bg-muted hover:text-primary"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="my-2 border-t" />

                    {/* Login/Register */}
                    <div className="flex flex-col gap-3">
                      {auth.map((item) => (
                        <Button
                          key={item.id}
                          asChild
                          variant={item.variant || "default"}
                          className="h-12 text-lg"
                        >
                          <Link href={item.href}>
                            {item.label}
                          </Link>
                        </Button>
                      ))}
                    </div>

                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };