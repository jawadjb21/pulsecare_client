"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function DashboardOverview({
    requests = [],
    totalPages = 1,
    currentPage = 1,
    totalRequests = 0,
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", page);

        router.push(`/dashboard?${params.toString()}`);
    };

    return (
        <Card className="rounded-3xl shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl">
                    Dashboard Overview
                </CardTitle>

                <CardDescription>
                    Showing your recent blood requests.
                </CardDescription>

                <p className="text-sm text-muted-foreground">
                    Total Requests:{" "}
                    <span className="font-semibold">
                        {totalRequests}
                    </span>
                </p>
            </CardHeader>

            <CardContent>
                <div className="overflow-x-auto rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Recipient</TableHead>
                                <TableHead>Blood Group</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Needed By</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {requests.length ? (
                                requests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell className="font-medium">
                                            {request.recipientName}
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
                                            {request.neededBy}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={
                                                    request.status === "pending"
                                                        ? "secondary"
                                                        : request.status ===
                                                            "inprogress"
                                                            ? "default"
                                                            : "outline"
                                                }
                                            >
                                                {request.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        No requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {totalPages > 1 && (
                    <Pagination className="mt-8">
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (currentPage > 1) {
                                            changePage(currentPage - 1);
                                        }
                                    }}
                                />
                            </PaginationItem>

                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={
                                            currentPage === index + 1
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            changePage(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (
                                            currentPage < totalPages
                                        ) {
                                            changePage(currentPage + 1);
                                        }
                                    }}
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                )}
            </CardContent>
        </Card>
    );
}