"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import NameField from "@/components/shared/fields/NameField";
import BloodGroupField from "@/components/shared/fields/BloodGroupField";
import LocationField from "@/components/shared/fields/LocationField";
import DateField from "@/components/shared/fields/DateField";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CreateRequestForm({
    user,
    createRequest,
}) {
    const {
        register,
        control,
        watch,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            district: user?.district || "",
            upazila: user?.upazila || "",
            bloodGroup: user?.bloodGroup || "",
            neededBy: null,
        },
    });

    console.log(user);

    const onSubmit = async (data) => {
        const requestData = {
            ...data,
            userId: user.id,
        };

        const response = await createRequest(requestData);

        if (response?.success) {
            toast.success(response.message);
            reset();
        } else {
            toast.error(response?.message);
        }
    };

    return (
        <div className="mx-auto max-w-4xl py-8">
            <Card className="rounded-3xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                        Create Blood Request
                    </CardTitle>

                    <CardDescription>
                        Fill in the required information below.
                    </CardDescription>
                </CardHeader>

                <CardContent>
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
                                disabled={isSubmitting}
                                className="w-full h-12 text-lg"
                            >
                                {isSubmitting
                                    ? "Creating Request..."
                                    : "Create Request"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}