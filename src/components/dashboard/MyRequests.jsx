"use client";

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

// import UpdateRequestModal from "./UpdateRequestModal";

// Temporary mock data
const requests = [
    {
        _id: "1",
        recipientName: "Akbor",
        bloodGroup: "AB+",
        district: "Noakhali",
        upazila: "Companiganj",
        neededBy: "2026-06-25",
        status: "pending",
    },
    {
        _id: "2",
        recipientName: "Rahim",
        bloodGroup: "O-",
        district: "Dhaka",
        upazila: "Dhanmondi",
        neededBy: "2026-06-28",
        status: "inprogress",
    },
];

export default function MyRequests({ user }) {
    const handleUpdate = (request) => {
        console.log("Update:", request);
    };

    const handleDelete = (requestId) => {
        console.log("Delete:", requestId);

        // TODO:
        // Open confirmation dialog / call delete API
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
                            {requests.length > 0 ? (
                                requests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell className="font-semibold">
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

                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">

                                                <UpdateRequestModal request={request}>
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
                                                        handleDelete(request._id)
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
                                        No requests found.
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