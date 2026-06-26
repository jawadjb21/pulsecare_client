"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getAllUsers = async (
    page = 1,
    limit = 10
) => {
    try {
        const token = await auth.api.getToken({
            headers: await headers(),
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users?page=${page}&limit=${limit}`,
            {
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const result = await response.json();

        return {
            users: result.data,
            pagination: result.pagination,
        };
    } catch (error) {
        console.log(error);

        return {
            users: [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalUsers: 0,
            },
        };
    }
};