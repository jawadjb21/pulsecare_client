"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getMyRequests = async (
    userId,
    page = 1,
    limit = 3
) => {
    try {
        const token = await auth.api.getToken({
            headers: await headers(),
        });

        if (!token?.token) {
            return {
                success: false,
                message: "Please login again.",
                requests: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalRequests: 0,
                },
            };
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/user/${userId}?page=${page}&limit=${limit}`,
            {
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            }
        );

        const result = await response.json();

        if (response.status === 401) {
            return {
                success: false,
                message: "Unauthorized. Please login again.",
                requests: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalRequests: 0,
                },
            };
        }

        if (response.status === 403) {
            return {
                success: false,
                message:
                    result.message ||
                    "You do not have permission to view these requests.",
                requests: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalRequests: 0,
                },
            };
        }

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to fetch requests."
            );
        }

        return {
            success: true,
            requests: result.data || [],
            pagination: result.pagination || {
                currentPage: 1,
                totalPages: 1,
                totalRequests: 0,
            },
        };

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: error.message || "Something went wrong.",
            requests: [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalRequests: 0,
            },
        };
    }
};