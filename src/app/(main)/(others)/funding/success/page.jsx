import Link from "next/link";
import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    CheckCircle2,
    HeartHandshake,
    Mail,
} from "lucide-react";

export default async function Success({
    searchParams,
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error(
            "Please provide a valid session ID."
        );
    }

    const {
        status,
        customer_details,
    } = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["line_items", "payment_intent"],
        }
    );

    if (status === "open") {
        return redirect("/funding");
    }

    if (status === "complete") {
        return (
            <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">

                <Card className="w-full max-w-2xl rounded-3xl shadow-2xl">

                    <CardHeader className="items-center text-center">

                        <div className="mb-6 rounded-full bg-green-100 p-6 mx-auto">
                            <CheckCircle2 className="size-16 text-green-600" />
                        </div>

                        <CardTitle className="text-4xl font-extrabold text-green-600">
                            Donation Successful!
                        </CardTitle>

                        <CardDescription className="max-w-md text-base">
                            Thank you for supporting PulseCare.
                            Your generosity helps us connect blood
                            donors and save lives.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="space-y-8">

                        <div className="rounded-2xl border bg-muted/40 p-6">

                            <div className="flex items-center gap-4">

                                <div className="rounded-full bg-primary/10 p-3">
                                    <Mail className="size-6 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Confirmation Email Sent To
                                    </p>

                                    <p className="font-semibold">
                                        {customer_details?.email}
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-primary/5 p-6 text-center">

                            <HeartHandshake className="mx-auto mb-4 size-12 text-primary" />

                            <h3 className="text-2xl font-bold">
                                Thank You For Your Contribution
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                Every donation helps strengthen our
                                mission of making blood donation
                                accessible for everyone.
                            </p>

                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">

                            <Button
                                asChild
                                className="flex-1 h-12"
                            >
                                <Link href="/dashboard">
                                    Go To Dashboard
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="flex-1 h-12"
                            >
                                <Link href="/">
                                    Back To Home
                                </Link>
                            </Button>

                        </div>

                    </CardContent>

                </Card>

            </div>
        );
    }

    return null;
}