"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const postRequest = async (formData) => {
    try {
        const token = await auth.api.getToken({
            headers: await headers(),
        });

        if (!token?.token) {
            return {
                success: false,
                message: "Unauthorized. Please login again.",
            };
        }

        const data = {
            name: formData.name.trim(),
            bloodGroup: formData.bloodGroup,
            district: formData.district,
            upazila: formData.upazila,
            neededBy: formData.neededBy,
        };

        const request = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`,
                },
                body: JSON.stringify(data),
            }
        );

        const response = await request.json();

        if (!request.ok) {
            return {
                success: false,
                message:
                    response.message || "Failed to create request",
            };
        }

        revalidatePath("/dashboard/my-requests");

        return response;
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};