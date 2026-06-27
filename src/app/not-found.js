"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

export default function NotFound() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="mx-auto max-w-xl text-center">
                <div className="mb-6 inline-flex rounded-full bg-primary/10 p-6">
                    <HeartPulse className="size-16 text-primary" />
                </div>

                <h1 className="text-7xl font-extrabold tracking-tight text-primary">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold">
                    Page Not Found
                </h2>

                <p className="mt-4 text-lg text-muted-foreground">
                    The page you are looking for doesn't exist or may have been
                    moved.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/">
                            Back to Home
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg">
                        <Link href="#">
                            Find Donors
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}