import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const pathName = request.nextUrl.pathname;
    if (pathName.startsWith("/_next") || pathName.includes(".")) {
        return NextResponse.next();
    }
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
    matcher: ["/dashboard/:path*", "/funding/:path*", "/requests/:path+"],
}