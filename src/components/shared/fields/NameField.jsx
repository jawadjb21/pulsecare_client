import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import FormErrors from './FormErrors';

const NameField = ({ errors, field, register }) => {
    return (
        <div className="space-y-2 md:col-span-1">
            <Label>Name</Label>

            <Input
                autoFocus
                type="text"
                placeholder="Enter your name."
                className="h-14 rounded-2xl border-border/60 bg-background/50 px-5 text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                {...register("name", {
                    required: "Please enter your name.",
                    pattern: {
                        value: /^[A-Z ]+$/i,
                        message:
                            "Please enter a valid name with only characters and spaces.",
                    },
                })}
            />
            <FormErrors errors={errors} field={field[0]}></FormErrors>
        </div>);
};

export default NameField;