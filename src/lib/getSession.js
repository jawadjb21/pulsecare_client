"use server";
import { headers } from "next/headers";
import { auth } from "./auth"

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    if (!user) return {
        "user": false,
        "message": "No user found",
    }
    return user;
}