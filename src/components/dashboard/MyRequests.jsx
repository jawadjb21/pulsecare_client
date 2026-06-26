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
    CardHeader,
    CardTitle,
    CardDescription,
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

import { Pencil, Trash2 } from "lucide-react";

import UpdateRequestModal from "./UpdateRequestModal";
import { deleteRequest } from "@/lib/actions/deleteRequest";

export default function MyRequests({
    user,
    requests = [],
    pagination,
}) {

    const handleDelete = async (requestId) => {
        const response = await deleteRequest(requestId);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case "pending":
                return "secondary";

            case "inprogress":
                return "default";

            case "completed":
                return "outline";

            default:
                return "secondary";
        }
    };

    return (
        <Card className="rounded-3xl shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl">
                    My Blood Requests
                </CardTitle>

                <CardDescription>
                    View and manage all your blood requests.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Recipient</TableHead>
                                <TableHead>Blood Group</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Needed By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {requests?.length > 0 ? (
                                requests.map((request) => (
                                    <TableRow key={request._id}>

                                        {/* Recipient */}
                                        <TableCell className="font-semibold">
                                            {request.name}
                                        </TableCell>

                                        {/* Blood Group */}
                                        <TableCell>
                                            <Badge variant="destructive">
                                                {request.bloodGroup}
                                            </Badge>
                                        </TableCell>

                                        {/* Location */}
                                        <TableCell>
                                            {request.upazila},{" "}
                                            {request.district}
                                        </TableCell>

                                        {/* Date */}
                                        <TableCell>
                                            {request.neededBy
                                                ? format(
                                                    new Date(
                                                        request.neededBy
                                                    ),
                                                    "PPP"
                                                )
                                                : "N/A"}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge
                                                variant={getStatusVariant(
                                                    request.status
                                                )}
                                            >
                                                {request.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">

                                                {/* Update */}
                                                <UpdateRequestModal
                                                    request={request}
                                                >
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="hover:border-primary hover:text-primary"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </UpdateRequestModal>

                                                {/* Delete */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="hover:border-destructive hover:text-destructive"
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
                                                                undone. This
                                                                will permanently
                                                                delete your
                                                                blood request.
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
                                        className="h-32 text-center text-muted-foreground"
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

                        <span className="text-sm font-medium">
                            Page {pagination.currentPage} of{" "}
                            {pagination.totalPages}
                        </span>

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