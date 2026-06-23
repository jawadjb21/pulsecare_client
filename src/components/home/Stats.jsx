"use client";

import {
    Users,
    HeartHandshake,
    HandCoins,
} from "lucide-react";
import StatCard from "./StatCard";

const stats = [
    {
        id: 1,
        title: "Registered Donors",
        value: 12500,
        suffix: "+",
        icon: Users,
    },
    {
        id: 2,
        title: "Funds Raised",
        value: 850000,
        prefix: "৳",
        suffix: "+",
        icon: HandCoins,
    },
    {
        id: 3,
        title: "Donations Completed",
        value: 3800,
        suffix: "+",
        icon: HeartHandshake,
    },
];

const Stats = () => {
    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.06),transparent_30%)]" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        Our Impact
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                        Our Achievements, and Counting
                    </h2>

                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                        Every donation represents hope. Together with our
                        community, we're making life-saving connections across
                        Bangladesh every single day.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {stats.map((stat, idx) => (
                        <StatCard
                            key={stat.id}
                            stat={stat}
                            index={idx}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;