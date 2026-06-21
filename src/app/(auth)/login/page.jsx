"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { Eye, EyeClosed } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const LoginPage = ({
  heading = "Welcome Back",
  description = "Please login to your PulseCare account.",
  buttonText = ["Login", "Please Wait..."],
  signupText = "Need an account?",
  signupUrl = "/register",
  className,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
                {/* Email */}
                <div className="space-y-2">
                  <Label>Email Address</Label>

                  <Input
                    autoFocus
                    type="text"
                    placeholder="Enter your email"
                    className="h-12 rounded-xl border-border/50 bg-background/70 px-4 focus-visible:ring-primary"
                    {...register("email", {
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

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Password</Label>

                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 rounded-xl border-border/50 bg-background/70 px-4 focus-visible:ring-primary"
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
                  Sign up
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
