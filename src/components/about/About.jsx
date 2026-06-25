"use client";

import { motion } from "framer-motion";
import {
    HeartPulse,
    Users,
    ShieldCheck,
    MapPin,
} from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
};

export default function AboutPage() {
    return (
        <main className="overflow-hidden">

            {/* HERO */}
            <section className="relative py-32">
                <div className="container mx-auto px-4 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .8 }}
                        className="text-5xl font-extrabold md:text-7xl"
                    >
                        Connecting Hearts,
                        <span className="block text-primary">
                            Saving Lives
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .4 }}
                        className="mx-auto mt-8 max-w-3xl text-xl text-muted-foreground"
                    >
                        PulseCare bridges the gap between blood donors and
                        patients, making life-saving donations accessible
                        when every second counts.
                    </motion.p>
                </div>
            </section>

            {/* STORY */}
            <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ duration: .7 }}
                className="py-24"
            >
                <div className="container mx-auto max-w-4xl px-4">

                    <h2 className="mb-8 text-center text-4xl font-bold">
                        Our Story
                    </h2>

                    <p className="text-center text-lg leading-9 text-muted-foreground">
                        PulseCare was founded with a simple mission:
                        no patient should struggle to find blood during
                        an emergency. We saw families desperately
                        searching social media and hospitals for donors.
                        PulseCare was created to connect donors and
                        recipients instantly through a trusted platform.
                    </p>
                </div>
            </motion.section>

            {/* MISSION + VISION */}
            <section className="py-24">
                <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">

                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border p-10"
                    >
                        <HeartPulse className="mb-6 size-12 text-primary" />

                        <h3 className="mb-4 text-3xl font-bold">
                            Our Mission
                        </h3>

                        <p className="text-muted-foreground">
                            To build a reliable blood donation ecosystem
                            that connects donors and recipients instantly.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border p-10"
                    >
                        <Users className="mb-6 size-12 text-primary" />

                        <h3 className="mb-4 text-3xl font-bold">
                            Our Vision
                        </h3>

                        <p className="text-muted-foreground">
                            A future where every patient can receive blood
                            without delay and every willing donor can
                            easily save lives.
                        </p>
                    </motion.div>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24">
                <div className="container mx-auto px-4">

                    <h2 className="mb-16 text-center text-4xl font-bold">
                        How PulseCare Works
                    </h2>

                    <div className="grid gap-8 md:grid-cols-3">

                        {[
                            {
                                icon: Users,
                                title: "Register",
                                desc: "Create your profile as a donor."
                            },
                            {
                                icon: MapPin,
                                title: "Find Donors",
                                desc: "Search verified donors nearby."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Save Lives",
                                desc: "Connect and donate quickly."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 70 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * .2 }}
                                className="rounded-3xl border p-8 text-center"
                            >
                                <item.icon className="mx-auto mb-6 size-12 text-primary" />

                                <h3 className="mb-4 text-2xl font-bold">
                                    {item.title}
                                </h3>

                                <p className="text-muted-foreground">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section className="py-24">
                <div className="container mx-auto px-4">

                    <motion.div
                        initial={{ scale: .8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="rounded-[40px] border p-16 text-center"
                    >
                        <h2 className="mb-10 text-4xl font-bold">
                            Our Core Values
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4">

                            {[
                                "Trust",
                                "Compassion",
                                "Accessibility",
                                "Community",
                                "Transparency",
                            ].map((value) => (
                                <div
                                    key={value}
                                    className="rounded-full bg-primary/10 px-8 py-4 text-lg font-semibold text-primary"
                                >
                                    {value}
                                </div>
                            ))}

                        </div>
                    </motion.div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-32">
                <div className="container mx-auto px-4 text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: .8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-extrabold">
                            Ready to Save Lives?
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            Join thousands of donors and become part of
                            a community dedicated to saving lives.
                        </p>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}