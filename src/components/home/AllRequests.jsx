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

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";

export default function AllRequests({
    requests,
    pagination,
}) {
    return (
        <Card className="rounded-3xl shadow-xl">

            <CardHeader>
                <CardTitle className="text-4xl">
                    Blood Donation Requests
                </CardTitle>

                <CardDescription>
                    Browse all active blood donation requests.
                </CardDescription>
            </CardHeader>

            <CardContent>

                <div className="overflow-hidden rounded-2xl border">

                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Recipient</TableHead>

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

                                <TableHead>
                                    Details
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {requests.length > 0 ? (
                                requests.map((request) => (
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
                                            {format(
                                                new Date(
                                                    request.neededBy
                                                ),
                                                "PPP"
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <Badge>
                                                {request.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Button asChild>
                                                <Link
                                                    href={`/requests/${request._id}`}
                                                >
                                                    View
                                                </Link>
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        No donation requests found.
                                    </TableCell>
                                </TableRow>
                            )}

                        </TableBody>

                    </Table>

                </div>

                {/* Pagination */}

                {pagination.totalPages > 1 && (
                    <Pagination className="mt-8">

                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    href={`/requests?page=${Math.max(
                                        pagination.currentPage - 1,
                                        1
                                    )}`}
                                />
                            </PaginationItem>

                            {Array.from({
                                length: pagination.totalPages,
                            }).map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href={`/requests?page=${index + 1}`}
                                        isActive={
                                            pagination.currentPage ===
                                            index + 1
                                        }
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href={`/requests?page=${Math.min(
                                        pagination.currentPage + 1,
                                        pagination.totalPages
                                    )}`}
                                />
                            </PaginationItem>

                        </PaginationContent>

                    </Pagination>
                )}

            </CardContent>
        </Card>
    );
}