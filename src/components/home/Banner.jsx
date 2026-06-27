import React from "react";

import {
    ArrowRight,
    HeartPulse,
    MapPin,
    ShieldCheck,
} from "lucide-react";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const flipWordsDefault = [
    "Save Lives",
    "Find Donors",
    "Donate Blood",
];

const defaultProps = {
    badge: "Trusted Blood Donation Platform",

    headingBeforeFlip: "Together We Can",

    headingAfterFlip: "Across Bangladesh",

    description:
        "PulseCare connects blood donors with patients in need. Find verified donors instantly, donate blood, and become part of a life-saving community.",

    buttonPrimary: {
        text: "Request blood",
        href: "/requests",
    },

    buttonSecondary: {
        text: "Find Donors",
        href: "#",
    },

    features: [
        {
            title: "Verified Donors",
            icon: ShieldCheck,
        },
        {
            title: "Find Nearby Donors",
            icon: MapPin,
        },
        {
            title: "Save Lives Together",
            icon: HeartPulse,
        },
    ],

    flipWords: flipWordsDefault,
};

const flipRowClassName =
    "relative text-5xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl";

const Banner = (props) => {
    const {
        badge,
        description,
        buttonPrimary,
        buttonSecondary,
        features,
        flipWords,
        headingBeforeFlip,
        headingAfterFlip,
        className,
    } = {
        ...defaultProps,
        ...props,
    };

    return (
        <section
            className={cn(
                "relative overflow-hidden py-12 lg:py-18",
                className
            )}
        >
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.08),transparent_30%)]" />

            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 backdrop-blur">
                        <HeartPulse className="size-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                            {badge}
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-8 text-balance text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
                        {headingBeforeFlip}
                    </h1>

                    <div className="mt-4 flex justify-center">
                        <div className="min-w-105 h-22.5 flex items-center justify-center">
                            <ContainerTextFlip
                                className={flipRowClassName}
                                words={flipWords}
                            />
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-muted-foreground md:text-5xl">
                        {headingAfterFlip}
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        {description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Button asChild size="lg" className="h-14 px-8 text-lg">
                            <Link href={buttonPrimary.href}>
                                {buttonPrimary.text}
                                <ArrowRight className="ml-2 size-5" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 text-lg"
                        >
                            <Link href={buttonSecondary.href}>
                                {buttonSecondary.text}
                            </Link>
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="mt-20 grid gap-6 md:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl border bg-card/50 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
                                        <Icon className="size-7 text-primary" />
                                    </div>

                                    <h3 className="mt-4 text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Banner };