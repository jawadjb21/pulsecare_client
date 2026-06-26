"use client";

import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import NameField from "@/components/shared/fields/NameField";
import BloodGroupField from "@/components/shared/fields/BloodGroupField";
import LocationField from "@/components/shared/fields/LocationField";
import DateField from "@/components/shared/fields/DateField";

export default function UpdateRequestModal({
    request,
    children,
}) {
    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: request?.recipientName || "",
            district: request?.district || "",
            upazila: request?.upazila || "",
            bloodGroup: request?.bloodGroup || "",
            neededBy: request?.neededBy
                ? new Date(request.neededBy)
                : null,
        },
    });

    const onSubmit = async (data) => {
        console.log(data);

        // TODO:
        // Update request API call
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl">
                        Update Blood Request
                    </DialogTitle>

                    <DialogDescription>
                        Modify the information you want to update.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-6 md:grid-cols-2"
                >
                    <NameField
                        register={register}
                        errors={errors}
                        field={["name"]}
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
                        watch={watch}
                        errors={errors}
                        field={["district", "upazila"]}
                    />

                    <DateField
                        control={control}
                        errors={errors}
                        field={["neededBy"]}
                    />

                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Updating..."
                                : "Update Request"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}