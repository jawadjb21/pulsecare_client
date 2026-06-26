"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const deleteUser = async (userId) => {
    try {
        const token = await auth.api.getToken({
            headers: await headers(),
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            }
        );

        const result = await response.json();

        revalidatePath("/dashboard/all-users");

        return result;

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "Failed to delete user.",
        };
    }
};