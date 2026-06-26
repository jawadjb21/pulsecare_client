"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const postRequest = async (formData) => {
    const token = await auth.api.getToken({
        headers: await headers(),
    });

    const data = {
        name: formData.name.trim(),
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        neededBy: formData.neededBy,
        userId: formData.userId,
    };

    try {
        const request = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token?.token}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!request.ok) {
            throw new Error("Failed to create request");
        }

        const response = await request.json();

        revalidatePath("/dashboard/my-requests");

        return response;
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: error.message,
        };
    }
};