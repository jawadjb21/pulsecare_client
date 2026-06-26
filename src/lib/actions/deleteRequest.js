"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/headers";

export const deleteRequest = async (requestId) => {
    const token = await auth.api.getToken({
        headers: await headers(),
    });

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${requestId}`,
            {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token.token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to delete request."
            );
        }

        revalidatePath("/dashboard/my-requests");

        return {
            success: true,
            message: data.message,
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: error.message,
        };
    }
};