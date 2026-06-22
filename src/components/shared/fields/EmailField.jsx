import React from 'react';
import FormErrors from './FormErrors';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import isEmail from "validator/lib/isEmail";


const EmailField = ({ errors, field, register }) => {
    return (
        <div className="space-y-2 md:col-span-1">
            <Label>Email Address</Label>

            <Input
                autoFocus
                type="text"
                placeholder="Enter your email"
                className="h-14 rounded-2xl border-border/60 bg-background/50 px-5 text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                {...register("email", {
                    required: "Please enter your email.",
                    validate: (value) =>
                        isEmail(value) || "Please enter a valid email.",
                })}
            />
            <FormErrors errors={errors} field={field[0]}></FormErrors>
        </div>
    );
};

export default EmailField;