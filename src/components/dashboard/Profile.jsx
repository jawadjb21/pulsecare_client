"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
    Pencil,
    Mail,
    MapPin,
    Droplets,
    HeartHandshake,
    ClipboardList,
    ShieldCheck,
} from "lucide-react";

import UpdateProfileModal from "./UpdateProfileModal";

const Profile = ({ user }) => {
    console.log(user);
    return (
        <Card className="overflow-hidden rounded-3xl border shadow-xl">
            {/* Cover */}
            <div className="h-44 bg-linear-to-r from-red-600 via-rose-500 to-red-500" />

            <CardContent className="relative px-6 pb-8 md:px-10">

                {/* Avatar + Main Info */}
                <div className="-mt-20 flex flex-col items-center">

                    <Image
                        src={user?.image || "/default-avatar.png"}
                        alt={user?.name || "User"}
                        width={150}
                        height={150}
                        className="rounded-full border-[6px] border-background object-cover shadow-xl"
                    />

                    <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row">
                        <h1 className="text-center text-3xl font-extrabold">
                            {user?.name}
                        </h1>

                        <UpdateProfileModal user={user}>
                            <Button
                                size="sm"
                                variant="outline"
                                className="rounded-full"
                            >
                                <Pencil className="mr-2 size-4" />
                                Edit Profile
                            </Button>
                        </UpdateProfileModal>
                    </div>

                    <p className="mt-1 text-lg text-muted-foreground">
                        PulseCare Donor
                    </p>

                    <Badge
                        variant="destructive"
                        className="mt-5 rounded-full px-5 py-2 text-base"
                    >
                        <Droplets className="mr-2 h-4 w-4" />
                        {user?.bloodGroup || "N/A"}
                    </Badge>
                </div>

                {/* User Information */}
                <div className="mt-12 grid gap-5 md:grid-cols-2">

                    {/* Email */}
                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <Mail className="size-6 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email Address
                                </p>

                                <p className="font-semibold">
                                    {user?.email}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location */}
                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <MapPin className="size-6 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Location
                                </p>

                                <p className="font-semibold">
                                    {user?.upazila || "Unknown"},{" "}
                                    {user?.district || "Unknown"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats */}
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    <Card className="rounded-2xl text-center">
                        <CardContent className="p-6">
                            <HeartHandshake className="mx-auto mb-3 size-8 text-primary" />

                            <h3 className="text-4xl font-extrabold text-primary">
                                0
                            </h3>

                            <p className="mt-1 text-muted-foreground">
                                Donations Completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl text-center">
                        <CardContent className="p-6">
                            <ClipboardList className="mx-auto mb-3 size-8 text-primary" />

                            <h3 className="text-4xl font-extrabold text-primary">
                                0
                            </h3>

                            <p className="mt-1 text-muted-foreground">
                                Blood Requests
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl text-center">
                        <CardContent className="p-6">
                            <ShieldCheck className="mx-auto mb-3 size-8 text-green-600" />

                            <h3 className="text-2xl font-extrabold text-green-600">
                                Active
                            </h3>

                            <p className="mt-1 text-muted-foreground">
                                Donor Status
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;