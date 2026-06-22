"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeClosed } from '@gravity-ui/icons';
import React, { useState } from 'react';
import FormErrors from './FormErrors';

const LoginPasswordField = ({ errors, field, register}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label>Password</Label>
                </div>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-14 rounded-2xl border-border/60 bg-background/50 px-5 text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("password", {
                            required: "Please enter your password.",
                            minLength: {
                                value: 8,
                                message: "Please enter at least 8 characters.",
                            },
                        })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeClosed /> : <Eye />}
                    </button>
                </div>
                <FormErrors errors={errors} field={field[0]}></FormErrors>
            </div>
        </>
    );
};

export default LoginPasswordField;