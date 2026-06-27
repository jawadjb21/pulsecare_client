"use client";

import { format } from "date-fns";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    MapPin,
    CalendarDays,
    User,
    Droplets,
    Clock3,
} from "lucide-react";

export default function RequestDetails({
    request,
}) {
    if (!request) {
        return (
            <Card className="rounded-3xl">
                <CardContent className="py-20 text-center">
                    Request not found.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-3xl shadow-xl">

            <CardHeader className="border-b">

                <Badge
                    variant="destructive"
                    className="w-fit px-4 py-1"
                >
                    <Droplets className="mr-2 h-4 w-4" />
                    {request.bloodGroup}
                </Badge>

                <CardTitle className="text-4xl">
                    Blood Donation Request
                </CardTitle>

                <CardDescription>
                    Request details and recipient information.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-8 p-8">

                <div className="grid gap-6 md:grid-cols-2">

                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center gap-4 p-6">
                            <User className="size-8 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Recipient Name
                                </p>

                                <h3 className="text-xl font-bold">
                                    {request.name}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center gap-4 p-6">
                            <MapPin className="size-8 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Location
                                </p>

                                <h3 className="text-xl font-bold">
                                    {request.upazila},{" "}
                                    {request.district}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center gap-4 p-6">
                            <CalendarDays className="size-8 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Donation Date
                                </p>

                                <h3 className="text-xl font-bold">
                                    {format(
                                        new Date(request.neededBy),
                                        "PPP"
                                    )}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center gap-4 p-6">
                            <Clock3 className="size-8 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Request Status
                                </p>

                                <Badge>
                                    {request.status}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <div className="flex justify-center">
                    <Button
                        size="lg"
                        className="px-10"
                    >
                        Donate
                    </Button>
                </div>

            </CardContent>

        </Card>
    );
}