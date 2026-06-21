"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { Eye, EyeClosed } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import FormErrors from "@/components/shared/fields/FormErrors";
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import bloodGroups from "@/data/bloodGroups.json";


const LoginPage = ({
    heading = "Create your Account",
    description = "Register to create your PulseCare account.",
    buttonText = ["Register", "Please Wait..."],
    signupText = "Already a donor?",
    signupUrl = "/login",
    className,
}) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setError,
    } = useForm();

    const checkPassword = watch("password");

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async (formData) => {
        debugger;
        try {
            setLoading(true);
            const { email, password } = formData;

            const { data, error } = await authClient.signIn.email({
                /**
                 * The user email
                 */
                email,
                /**
                 * The user password
                 */
                password,
                /**
                 * A URL to redirect to after the user verifies their email (optional)
                 */
                callbackURL: "/dashboard",
                /**
                 * remember the user session after the browser is closed.
                 *
                 */
                rememberMe: true,
            });

            if (error) {
                setError("root", {
                    type: "manual",
                    message: "Invalid Email or Password",
                });
                console.error(error);
                return;
            }
        } catch (error) {
            console.error(error);
            setError("root", {
                type: "manual",
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (errors?.root?.message) {
            toast.error(errors.root.message, {
                className: "text-destructive",
                position: "top-center",
                action: {
                    label: "Okay",
                    onClick: () => {
                        console.warn("Clicked okay on failed authenticaion");
                    },
                },
            });
        }
    }, [errors.root]);

    return (
        <section
            className={cn(
                "min-h-screen bg-background bg-[radial-gradient(circle_at_top_left,rgba(215,38,61,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(215,38,61,0.08),transparent_30%)]",
                className,
            )}
        >
            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
                <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/50 bg-card/40 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
                    {/* Left Illustration Section */}
                    <div className="hidden items-center justify-center bg-muted/20 p-12 lg:flex">
                        <Image
                            src={"/AuthBanner.png"}
                            alt="Authentication Page Image"
                            width={550}
                            height={550}
                            className="h-auto w-full max-w-lg object-contain"
                        />
                    </div>

                    {/* Right Form Section */}
                    <div className="flex items-center justify-center p-6 sm:p-10">
                        <div className="w-full max-w-md">
                            {/* Logo */}
                            <div className="mb-8 flex flex-col items-center">
                                <Image
                                    src={"/logo.png"}
                                    alt="Logo"
                                    width={60}
                                    height={60}
                                    className="mb-4"
                                />

                                <h1 className="text-center text-4xl font-bold tracking-tight">
                                    {heading}
                                </h1>

                                <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </div>

                            <form
                                className="flex flex-col md:grid md:grid-cols-2 gap-8"
                                onSubmit={handleSubmit(handleRegister)}
                            >
                                {/* Name */}
                                <div className="space-y-2 md:col-span-1">
                                    <Label>Name</Label>

                                    <Input
                                        autoFocus
                                        type="text"
                                        placeholder="Enter your name."
                                        className="h-14 rounded-2xl border-border/60 bg-background/50 px-5 text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"                                        {...register("name", {
                                            required: "Please enter your email.",
                                            pattern: {
                                                value: /^[A-Z ]+$/i,
                                                message: "Please enter a valid name with only characters and spaces."
                                            },
                                        })}
                                    />
                                    <FormErrors errors={errors} field={"name"}></FormErrors>
                                </div>

                                {/* Email */}
                                <div className="space-y-2 md:col-span-1">
                                    <Label>Email Address</Label>

                                    <Input
                                        autoFocus
                                        type="text"
                                        placeholder="Enter your email"
                                        className="h-14 rounded-2xl border-border/60 bg-background/50 px-5 text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"                                        {...register("email", {
                                            required: "Please enter your email.",
                                            validate: (value) =>
                                                isEmail(value) || "Please enter a valid email.",
                                        })}
                                    />
                                    {errors?.email && (
                                        <span className="block rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                {/* Avatar */}
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
                                </Field>

                                {/* Blood group */}
                                <div className="space-y-2 col-span-2">
                                    <Label>Blood Group</Label>
                                    <Controller
                                        name="blood"
                                        control={control}
                                        rules={{
                                            required: "Please choose a blood group."
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select value={value} onValueChange={onChange}>
                                                <SelectTrigger className="h-14 w-full rounded-2xl border-border/60 bg-background/50 px-5 shadow-sm">
                                                    <SelectValue placeholder="Select your blood group" />
                                                </SelectTrigger>

                                                <SelectContent className="rounded-2xl">
                                                    <SelectGroup>
                                                        <SelectLabel>Blood Group</SelectLabel>

                                                        {bloodGroups.map((bloodGroup, idx) => (
                                                            <SelectItem
                                                                key={idx}
                                                                value={bloodGroup.value}
                                                            >
                                                                {bloodGroup.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <FormErrors errors={errors} field={"blood"}></FormErrors>
                                </div>

                                {/* District */}


                                {/* Password */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Password</Label>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="h-14 rounded-2xl border-border/60 bg-background/50 px-5 text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"                                            {...register("password", {
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
                                    {errors?.password?.message && (
                                        <span className="block rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Confirm Password</Label>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="h-14 rounded-2xl border-border/60 bg-background/50 px-5 text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"                                            {...register("password", {
                                                required: "Please enter your password.",
                                                validate: value => { value === checkPassword || "The passwords don't match." }
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeClosed /> : <Eye />}
                                        </button>
                                    </div>
                                    {errors?.password?.message && (
                                        <span className="block rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl text-base font-semibold shadow-lg"
                                >
                                    {loading ? buttonText[1] : buttonText[0]}
                                </Button>
                            </form>

                            {/* Footer */}
                            <div className="mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                                <p>{signupText}</p>

                                <Link
                                    href={signupUrl}
                                    className="font-semibold text-primary hover:underline"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
