import React from 'react';
import CountUp from "react-countup";
import { motion } from "framer-motion";

const StatCard = ({ stat, index }) => {
    const Icon = stat.icon;

    return (
        <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.15,
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            className="rounded-3xl border bg-card/60 p-8 text-center shadow-sm backdrop-blur transition-all"
        >
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Icon className="size-8 text-primary" />
            </div>

            <h3 className="text-4xl font-extrabold text-primary">
                {stat.prefix}

                <CountUp
                    end={stat.value}
                    duration={3}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                />

                {stat.suffix}
            </h3>

            <p className="mt-3 text-lg font-medium text-muted-foreground">
                {stat.title}
            </p>
        </motion.div>
    );
};

export default StatCard;