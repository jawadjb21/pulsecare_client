"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getDashboardOverview = async () => {
    try {
        const token = await auth.api.getToken({
            headers: await headers(),
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/overview`,
            {
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        console.log(error);

        return {
            stats: {
                totalRequests: 0,
                pendingRequests: 0,
                completedRequests: 0,
            },
            recentRequests: [],
        };
    }
};