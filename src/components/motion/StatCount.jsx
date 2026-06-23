"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

export default function HTMLContent() {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, 100, { duration: 5 })
        return () => controls.stop()
    }, [])

    return (
        <motion.div
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: 64,
                lineHeight: 1,
                color: "var(--hue-6)",
            }}
        >
            {rounded}
        </motion.div>
    )
}
