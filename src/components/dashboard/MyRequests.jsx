"use client";

import { format } from "date-fns";

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

import { Pencil, Trash2 } from "lucide-react";

import UpdateRequestModal from "./UpdateRequestModal";

export default function MyRequests({
    user,
    requests = [],
}) {

    const handleDelete = async (requestId) => {
        console.log("Delete:", requestId);

        // TODO:
        // Call delete API
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

            <CardContent>
                <div className="overflow-x-auto rounded-2xl border px-4">
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

                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {requests?.length > 0 ? (
                                requests.map((request) => (
                                    <TableRow key={request._id}>

                                        {/* Name */}
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

                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="hover:border-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        handleDelete(
                                                            request._id
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>

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
            </CardContent>
        </Card>
    );
}