import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    XCircle,
    HeartHandshake,
    RotateCcw,
} from "lucide-react";

export default function CancelPage() {
    return (
        <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">

            <Card className="w-full max-w-2xl rounded-3xl shadow-2xl">

                <CardHeader className="items-center text-center">

                    <div className="mb-6 rounded-full bg-red-100 p-6 mx-auto">
                        <XCircle className="size-16 text-red-600" />
                    </div>

                    <CardTitle className="text-4xl font-extrabold text-red-600">
                        Payment Cancelled
                    </CardTitle>

                    <CardDescription className="max-w-md text-base">
                        Your donation process was cancelled. No charges
                        were made to your account.
                    </CardDescription>

                </CardHeader>

                <CardContent className="space-y-8">

                    <div className="rounded-2xl border bg-muted/40 p-6 text-center">

                        <HeartHandshake className="mx-auto mb-4 size-12 text-primary" />

                        <h3 className="text-2xl font-bold">
                            Every Contribution Matters
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            We understand that plans can change. You can
                            always come back later and continue supporting
                            PulseCare's mission of saving lives through
                            blood donation.
                        </p>

                    </div>

                    <div className="rounded-2xl bg-red-50 p-5 text-center">

                        <p className="font-medium text-red-700">
                            No payment has been processed.
                        </p>

                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">

                        <Button
                            asChild
                            className="h-12 flex-1"
                        >
                            <Link href="/funding">
                                <RotateCcw className="mr-2 h-5 w-5" />
                                Try Again
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="h-12 flex-1"
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