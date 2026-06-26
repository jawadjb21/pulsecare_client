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
            <div className="h-32 bg-linear-to-r from-red-600 via-rose-500 to-red-500" />

            <CardContent className="relative px-6 pb-6 md:px-8">

                {/* Avatar + Main Info */}
                <div className="-mt-14 flex flex-col items-center">

                    <Image
                        src={user?.image || "/default-avatar.png"}
                        alt={user?.name || "User"}
                        width={110}
                        height={110}
                        className="rounded-full border-4 border-background object-cover shadow-xl"
                    />

                    <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
                        <h1 className="text-center text-2xl font-extrabold">
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

                    <p className="text-base text-muted-foreground">
                        PulseCare Donor
                    </p>

                    <Badge
                        variant="destructive"
                        className="mt-3 rounded-full px-4 py-1 text-sm"
                    >
                        <Droplets className="mr-2 h-4 w-4" />
                        {user?.bloodGroup || "N/A"}
                    </Badge>
                </div>

                {/* User Information */}
                <div className="mt-8 grid gap-4 md:grid-cols-2">

                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-full bg-primary/10 p-2">
                                <Mail className="size-5 text-primary" />
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Email Address
                                </p>

                                <p className="font-semibold">
                                    {user?.email}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-full bg-primary/10 p-2">
                                <MapPin className="size-5 text-primary" />
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
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
            </CardContent>
        </Card>
    );
};

export default Profile;