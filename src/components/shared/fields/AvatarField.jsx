import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import FormErrors from "./FormErrors";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

const AvatarField = ({ control, errors, register, field }) => {
    const selectedFile = useWatch({
        control,
        name: "avatar",
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!selectedFile?.[0]) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile[0]);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
    return (
        <Field className="space-y-2 md:col-span-2">
            <FieldLabel htmlFor="picture">
                Profile Picture
            </FieldLabel>

            <label
                htmlFor="picture"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background/50 p-8 transition-all hover:border-primary hover:bg-primary/5"
            >
                {selectedFile?.[0] ? (
                    <>
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            className="h-32 w-32 rounded-full object-cover"
                            height={500}
                            width={500}
                        />

                        <span className="mt-4 font-medium">
                            {selectedFile[0].name}
                        </span>
                    </>
                ) : (
                    <>
                        {/* Upload icon */}

                        <span className="font-medium">
                            Click to upload your picture
                        </span>

                        <span className="mt-1 text-sm text-muted-foreground">
                            PNG, JPG or WEBP (max 5MB)
                        </span>
                    </>
                )}

                <Input
                    id="picture"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register("avatar")}
                />
            </label>

            <FormErrors
                errors={errors}
                field={field[0]}
            />
        </Field>
    );
};

export default AvatarField;