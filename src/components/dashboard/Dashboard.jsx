"use client";

import Link from "next/link";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    ClipboardList,
    Clock3,
    CheckCircle2,
} from "lucide-react";

export default function DashboardOverview({
    user,
    stats,
    requests,
}) {
    return (
        <div className="space-y-8">

            {/* Welcome */}

            <Card className="rounded-3xl bg-linear-to-r from-red-600 to-rose-500 text-white">
                <CardContent className="p-8">
                    <h1 className="text-4xl font-bold">
                        Welcome back, {user?.name}
                    </h1>

                    <p className="mt-2 text-white/90">
                        Manage your blood donation requests
                        and help save lives.
                    </p>
                </CardContent>
            </Card>

            {/* Stats */}

            <div className="grid gap-6 md:grid-cols-3">

                <Card className="rounded-3xl">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-muted-foreground">
                                Total Requests
                            </p>

                            <h2 className="text-4xl font-bold">
                                {stats.totalRequests}
                            </h2>
                        </div>

                        <ClipboardList className="size-10 text-primary" />
                    </CardContent>
                </Card>

                <Card className="rounded-3xl">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-muted-foreground">
                                Pending
                            </p>

                            <h2 className="text-4xl font-bold">
                                {stats.pendingRequests}
                            </h2>
                        </div>

                        <Clock3 className="size-10 text-yellow-500" />
                    </CardContent>
                </Card>

                <Card className="rounded-3xl">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-muted-foreground">
                                Completed
                            </p>

                            <h2 className="text-4xl font-bold">
                                {stats.completedRequests}
                            </h2>
                        </div>

                        <CheckCircle2 className="size-10 text-green-500" />
                    </CardContent>
                </Card>

            </div>

            {/* Recent Requests */}

            {requests.length > 0 && (
                <Card className="rounded-3xl shadow-lg">

                    <CardHeader>
                        <CardTitle>
                            Recent Blood Requests
                        </CardTitle>

                        <CardDescription>
                            Your latest 3 donation requests.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>

                        <div className="overflow-hidden rounded-2xl border">
                            <Table>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Recipient
                                        </TableHead>

                                        <TableHead>
                                            Blood Group
                                        </TableHead>

                                        <TableHead>
                                            Location
                                        </TableHead>

                                        <TableHead>
                                            Needed By
                                        </TableHead>

                                        <TableHead>
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {requests.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell className="font-semibold">
                                                {request.name}
                                            </TableCell>

                                            <TableCell>
                                                <Badge variant="destructive">
                                                    {request.bloodGroup}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                {request.upazila},{" "}
                                                {request.district}
                                            </TableCell>

                                            <TableCell>
                                                {new Date(
                                                    request.neededBy
                                                ).toLocaleDateString()}
                                            </TableCell>

                                            <TableCell>
                                                <Badge>
                                                    {request.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button asChild>
                                <Link href="/dashboard/my-requests">
                                    View All Requests
                                </Link>
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            )}

        </div>
    );
}