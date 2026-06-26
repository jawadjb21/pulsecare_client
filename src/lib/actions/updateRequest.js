"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/headers";

export const updateRequest = async (
    requestId,
    formData
) => {
    const token = await auth.api.getToken({
        headers: await headers(),
    });

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${requestId}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token.token}`,
                },

                body: JSON.stringify({
                    name: formData.name.trim(),
                    bloodGroup: formData.bloodGroup,
                    district: formData.district,
                    upazila: formData.upazila,
                    neededBy: formData.neededBy,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Update failed"
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