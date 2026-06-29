import { getSession } from "@/lib/getSession";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    HeartHandshake,
    Mail,
    MapPin,
    Droplets,
} from "lucide-react";

export default async function FundingPage({
    searchParams,
}) {
    const user = await getSession();

    const { canceled } = await searchParams;

    return (
        <div className="mx-auto max-w-2xl py-4 h-screen">

            {canceled && (
                <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
                    Donation cancelled. You can try again anytime.
                </div>
            )}

            <Card className="overflow-hidden rounded-3xl shadow-xl">

                {/* Header */}
                <div className="bg-linear-to-r from-red-600 via-rose-500 to-red-500 p-8 text-white">

                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/20 p-4">
                            <HeartHandshake className="size-8" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">
                                Support PulseCare
                            </h1>

                            <p className="mt-1 text-white/90">
                                Help us save more lives through blood donation.
                            </p>
                        </div>
                    </div>

                </div>

                <CardHeader>
                    <CardTitle>
                        Donation Summary
                    </CardTitle>

                    <CardDescription>
                        Your contribution helps maintain and improve the platform.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">

                    {/* User Info */}
                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-2xl border p-4">
                            <div className="flex items-center gap-3">
                                <Mail className="text-primary" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Email
                                    </p>

                                    <p className="font-semibold">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border p-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="text-primary" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Location
                                    </p>

                                    <p className="font-semibold">
                                        {user?.upazila}, {user?.district}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Donor */}
                    <div className="rounded-2xl border p-5">

                        <h3 className="mb-4 text-xl font-bold">
                            Donor Information
                        </h3>

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-lg font-semibold">
                                    {user?.name}
                                </p>

                                <p className="text-muted-foreground">
                                    PulseCare Member
                                </p>
                            </div>

                            <Badge
                                variant="destructive"
                                className="px-4 py-2 text-base"
                            >
                                <Droplets className="mr-2 h-4 w-4" />
                                {user?.bloodGroup}
                            </Badge>

                        </div>
                    </div>

                    {/* Amount */}
                    <div className="rounded-2xl bg-primary/5 p-6 text-center">

                        <p className="text-muted-foreground">
                            Donation Amount
                        </p>

                        <h2 className="mt-2 text-5xl font-extrabold text-primary">
                            1000 HUF
                        </h2>

                    </div>

                    {/* Stripe Form */}
                    <form
                        action="/api/checkout_sessions"
                        method="POST"
                    >
                        <Button
                            type="submit"
                            className="h-14 w-full text-lg"
                        >
                            Donate 1000 HUF
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}