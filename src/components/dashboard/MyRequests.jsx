"use client";

import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

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
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    CalendarDays,
    MapPin,
    Pencil,
    Trash2,
} from "lucide-react";

import UpdateRequestModal from "./UpdateRequestModal";

import { deleteRequest } from "@/lib/actions/deleteRequest";

export default function MyRequests({
    user,
    requests = [],
    pagination = {},
}) {
    const handleDelete = async (requestId) => {
        const response = await deleteRequest(requestId);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";

            case "inprogress":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

            case "completed":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <Card className="overflow-hidden rounded-3xl border-0 bg-linear-to-br from-background via-background to-muted/20 shadow-2xl">
            {/* Header */}
            <CardHeader className="border-b bg-card/50 px-8 py-8 backdrop-blur">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <CardTitle className="text-4xl font-black tracking-tight">
                            My Blood Requests
                        </CardTitle>

                        <CardDescription className="mt-2 text-base">
                            Track, manage and update your blood requests.
                        </CardDescription>
                    </div>

                    <div className="rounded-2xl bg-primary/10 px-6 py-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Total Requests
                        </p>

                        <h3 className="text-3xl font-black text-primary">
                            {pagination?.totalRequests || 0}
                        </h3>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8 p-8">
                {/* Table */}
                <div className="overflow-hidden rounded-3xl border bg-card shadow-md">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead>
                                    Recipient
                                </TableHead>

                                <TableHead className="text-center">
                                    Blood
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

                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {requests.length > 0 ? (
                                requests.map((request) => (
                                    <TableRow
                                        key={request._id}
                                        className="group hover:bg-primary/5"
                                    >
                                        {/* Recipient */}
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-black text-primary">
                                                    {request.name?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-bold">
                                                        {request.name}
                                                    </p>

                                                    <p className="text-sm text-muted-foreground">
                                                        Blood Recipient
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Blood Group */}
                                        <TableCell>
                                            <div className="flex justify-center">
                                                <Badge
                                                    variant="destructive"
                                                    className="rounded-full px-4 py-2"
                                                >
                                                    {request.bloodGroup}
                                                </Badge>
                                            </div>
                                        </TableCell>

                                        {/* Location */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-4 w-4 text-primary" />

                                                <div>
                                                    <p className="font-medium">
                                                        {request.upazila}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        {request.district}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Date */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <CalendarDays className="h-4 w-4 text-primary" />

                                                <span className="font-medium">
                                                    {request.neededBy
                                                        ? format(
                                                            new Date(
                                                                request.neededBy
                                                            ),
                                                            "PPP"
                                                        )
                                                        : "N/A"}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge
                                                className={`rounded-full capitalize ${getStatusClass(
                                                    request.status
                                                )}`}
                                            >
                                                {request.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <div className="flex justify-center gap-2">
                                                <UpdateRequestModal
                                                    request={request}
                                                >
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </UpdateRequestModal>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete Request?
                                                            </AlertDialogTitle>

                                                            <AlertDialogDescription>
                                                                This action
                                                                cannot be
                                                                undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>

                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        request._id
                                                                    )
                                                                }
                                                                className="bg-destructive hover:bg-destructive/90"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-52 text-center"
                                    >
                                        No blood requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {pagination?.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            asChild
                            variant="outline"
                            disabled={
                                pagination.currentPage === 1
                            }
                        >
                            <Link
                                href={`/dashboard/my-requests?page=${pagination.currentPage - 1}`}
                            >
                                Previous
                            </Link>
                        </Button>

                        <div className="rounded-full bg-muted px-5 py-2 text-sm font-medium">
                            Page {pagination.currentPage} of{" "}
                            {pagination.totalPages}
                        </div>

                        <Button
                            asChild
                            variant="outline"
                            disabled={
                                pagination.currentPage ===
                                pagination.totalPages
                            }
                        >
                            <Link
                                href={`/dashboard/my-requests?page=${pagination.currentPage + 1}`}
                            >
                                Next
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}