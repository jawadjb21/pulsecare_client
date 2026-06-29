"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const donateToRequest = async (requestId) => {
    try {
        const token = await auth.api.getToken({
            headers: await headers(),
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${requestId}/donate`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            }
        );

        const result = await response.json();

        revalidatePath("/blood-requests");
        revalidatePath(`/requests/${requestId}`);
        revalidatePath("/dashboard");

        return result;

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "Failed to donate.",
        };
    }
};