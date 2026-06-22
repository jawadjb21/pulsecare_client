"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import EmailField from "@/components/shared/fields/EmailField";
import LoginPasswordField from "@/components/shared/fields/LoginPasswordField";
import registerComponents from "@/data/registerComponents.json";
import { FaGoogle } from "react-icons/fa";


const LoginPage = ({
    heading = "Welcome Back",
    description = "Please login to your PulseCare account.",
    buttonText = ["Login", "Please Wait..."],
    signupText = "Need an account?",
    signupUrl = "/register",
    className,
}) => {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm();

    const componentsMap = {
        EmailField, LoginPasswordField
    };

    const propsMap = {
        control, errors, register
    };

    const [loading, setLoading] = useState(false);

    const handleLogin = async (formData) => {
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

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
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

                            <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                                {
                                    registerComponents.map(component => {
                                        if (!component.login) return null;

                                        const Component = componentsMap[component["component"]];

                                        const props = {};

                                        component["props"].forEach(prop => props[prop] = propsMap[prop]);

                                        return <Component key={component.id
                                        } field={component.field} {...props}></Component>
                                    })
                                }
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl text-base font-semibold shadow-lg"
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


                            {/* Footer */}
                            <div className="mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                                <p>{signupText}</p>

                                <Link
                                    href={signupUrl}
                                    className="font-semibold text-primary hover:underline"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default LoginPage;
