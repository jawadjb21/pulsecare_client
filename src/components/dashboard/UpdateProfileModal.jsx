"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import NameField from "@/components/shared/fields/NameField";
import EmailField from "@/components/shared/fields/EmailField";
import AvatarField from "@/components/shared/fields/AvatarField";
import BloodGroupField from "@/components/shared/fields/BloodGroupField";
import LocationField from "@/components/shared/fields/LocationField";

export default function UpdateProfileModal({
    user,
    children,
}) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            bloodGroup: user?.bloodGroup || "",
            district: user?.district || "",
            upazila: user?.upazila || "",
        },
    });

    // In case user data arrives asynchronously
    useEffect(() => {
        reset({
            name: user?.name || "",
            email: user?.email || "",
            bloodGroup: user?.bloodGroup || "",
            district: user?.district || "",
            upazila: user?.upazila || "",
        });
    }, [user, reset]);

    const handleUpdate = async (data) => {
        console.log(data);

        // TODO:
        // upload avatar if changed
        // call update API
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl">
                        Update Profile
                    </DialogTitle>

                    <DialogDescription>
                        Modify only the fields you want to change.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleUpdate)}
                    className="mt-6 grid gap-6 md:grid-cols-2"
                >
                    <NameField
                        register={register}
                        errors={errors}
                        field={["name"]}
                    />

                    <EmailField
                        register={register}
                        errors={errors}
                        field={["email"]}
                    />

                    <AvatarField
                        control={control}
                        register={register}
                        errors={errors}
                        field={["avatar"]}
                    />

                    <BloodGroupField
                        control={control}
                        register={register}
                        errors={errors}
                        field={["bloodGroup"]}
                    />

                    <LocationField
                        control={control}
                        register={register}
                        errors={errors}
                        watch={watch}
                        field={["district", "upazila"]}
                    />

                    <Button
                        type="submit"
                        className="md:col-span-2 h-12 text-lg"
                    >
                        Update Profile
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}