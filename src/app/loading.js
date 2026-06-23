import { HeartPulse } from "lucide-react";

export default function Loading() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />

                    <div className="relative rounded-full bg-primary/10 p-6">
                        <HeartPulse className="size-14 animate-pulse text-primary" />
                    </div>
                </div>

                <h2 className="mt-6 text-2xl font-semibold">
                    Loading PulseCare
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Connecting you with life-saving donors...
                </p>
            </div>
        </section>
    );
}