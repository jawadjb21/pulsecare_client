"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import NameField from "@/components/shared/fields/NameField";
import EmailField from "@/components/shared/fields/EmailField";
import AvatarField from "@/components/shared/fields/AvatarField";
import BloodGroupField from "@/components/shared/fields/BloodGroupField";
import LocationField from "@/components/shared/fields/LocationField";
import RegisterPassword from "@/components/shared/fields/RegisterPassword";
import registerComponents from "@/data/registerComponents.json";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";


const RegisterPage = ({
    postImage,
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
        getValues,
    } = useForm();

    const componentsMap = {
        NameField, EmailField, AvatarField, BloodGroupField, LocationField, RegisterPassword
    };

    const propsMap = {
        control, errors, register, watch, getValues,
    };

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async (formData) => {
        debugger;
        try {
            setLoading(true);

            const { name, email, avatar, bloodGroup, district, upazila, password, confirmPsasword } = formData;

            const imageFile = avatar?.[0];

            // Store null for no image upload.
            let image = null;
            if (imageFile) {
                image = await postImage(imageFile);
            }

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                bloodGroup,
                district,
                upazila,
                password,
                image,
            });
            // Catches errors returned by better auth signup api.
            if (error) {
                console.error(error);
                setError("root", {
                    type: "manual",
                    message: error.message || "Registration failed."
                });
                return;
            }
            router.push("/dashboard");
        } catch (error) {
            // Handles exceptions.
            console.error(error);
            setError("root", {
                type: "manual",
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    // Error toast.
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
    }, [errors?.root]);


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
                            src={"/RegFormBanner.png"}
                            alt="Authentication Page Image"
                            width={550}
                            height={1000}
                            className="h-auto w-full max-w-lg object-contain"
                            loading="eager"
                        />
                    </div>

                    {/* Right Form Section */}
                    <div className="flex h-full flex-col p-6 sm:p-10">
                        <div className="mb-8 flex flex-col items-center">
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
                            <div className="flex-1 pr-2">
                                <form
                                    className="flex flex-col md:grid md:grid-cols-2 gap-8"
                                    onSubmit={handleSubmit(handleRegister)}
                                >
                                    {
                                        registerComponents.map(component => {
                                            if (component.loginOnly) return null;
                                            const Component = componentsMap[component["component"]];

                                            const props = {};

                                            component["props"].forEach(prop => props[prop] = propsMap[prop]);

                                            return <Component key={component.id} field={component.field} {...props}></Component>
                                        })
                                    }
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="h-12 w-full rounded-xl text-base font-semibold shadow-lg md:col-span-2"
                                    >
                                        {loading ? buttonText[1] : buttonText[0]}
                                    </Button>
                                </form>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-border" />
                                    </div>

                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-3 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 w-full rounded-xl border-border/60 bg-background/60 text-base font-medium shadow-sm transition-all hover:bg-muted md:col-span-2"
                                    onClick={handleGoogleSignIn}
                                >
                                    <FaGoogle className="mr-2 h-5 w-5" />
                                    Continue with Google
                                </Button>
                            </div>

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

export default RegisterPage;
