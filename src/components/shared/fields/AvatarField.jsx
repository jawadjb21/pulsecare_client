import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react';
import FormErrors from './FormErrors';

const AvatarField = ({ errors, register, field }) => {
    return (
        <Field className="space-y-2 md:col-span-2">
            <FieldLabel htmlFor="picture">Profile Picture</FieldLabel>

            <label
                htmlFor="picture"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background/50 p-8 transition-all hover:border-primary hover:bg-primary/5"
            >
                <svg
                    className="mb-4 h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>

                <span className="font-medium">
                    Click to upload your picture
                </span>

                <span className="mt-1 text-sm text-muted-foreground">
                    PNG, JPG or WEBP (max 5MB)
                </span>

                <Input
                    id="picture"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register("avatar")}
                />
            </label>
            <FormErrors errors={errors} field={field[0]}></FormErrors>
        </Field>
    );
};

export default AvatarField;