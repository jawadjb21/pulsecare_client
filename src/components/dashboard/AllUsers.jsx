"use client";

import Link from "next/link";
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
    UserCheck,
    ShieldBan,
} from "lucide-react";

import { updateUser } from "@/lib/actions/updateUser";
import { deleteUser } from "@/lib/actions/deleteUser";

export default function AllUsers({
    users = [],
    pagination,
}) {

    const handlePromote = async (userId) => {
        const response = await updateUser(userId, {
            role: "volunteer",
        });

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const handleBan = async (userId) => {
        const response = await updateUser(userId, {
            status: "banned",
        });

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const handleDelete = async (userId) => {
        const response = await deleteUser(userId);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <Card className="rounded-3xl shadow-xl">
            <CardHeader>
                <CardTitle className="text-3xl">
                    All Users
                </CardTitle>

                <CardDescription>
                    Manage all registered users.
                </CardDescription>
            </CardHeader>

            <CardContent>

                <div className="overflow-hidden rounded-2xl border">
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Blood Group</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.id}>

                                        <TableCell className="font-semibold">
                                            {user.name}
                                        </TableCell>

                                        <TableCell>
                                            {user.email}
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="destructive">
                                                {user.bloodGroup}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            {user.upazila}, {user.district}
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="secondary">
                                                {user.role}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.status === "active"
                                                        ? "default"
                                                        : "destructive"
                                                }
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex justify-center gap-2">

                                                {user.role !== "volunteer" && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            handlePromote(user._id)
                                                        }
                                                    >
                                                        <UserCheck className="mr-2 h-4 w-4" />
                                                        Volunteer
                                                    </Button>
                                                )}

                                                {user.status !== "banned" && (
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleBan(user._id)
                                                        }
                                                    >
                                                        <ShieldBan className="mr-2 h-4 w-4" />
                                                        Ban
                                                    </Button>
                                                )}

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                >
                                                    Delete
                                                </Button>

                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center"
                                    >
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}

                        </TableBody>

                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">

                    {Array.from({
                        length: pagination.totalPages,
                    }).map((_, index) => (
                        <Button
                            key={index}
                            asChild
                            variant={
                                pagination.currentPage === index + 1
                                    ? "default"
                                    : "outline"
                            }
                        >
                            <Link
                                href={`/dashboard/all-users?page=${index + 1}`}
                            >
                                {index + 1}
                            </Link>
                        </Button>
                    ))}

                </div>

            </CardContent>
        </Card>
    );
}