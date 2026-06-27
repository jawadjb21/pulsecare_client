import { redirect } from "next/navigation";

import MyRequests from "@/components/dashboard/MyRequests";

import { getSession } from "@/lib/getSession";
import { getMyRequests } from "@/lib/actions/getMyRequests";

export default async function Page({ searchParams }) {
    const user = await getSession();

    // Redirect if user is not logged in
    if (!user) {
        redirect("/login");
    }

    const params = await searchParams;

    const currentPage = Number(params?.page) || 1;

    const {
        requests,
        pagination,
    } = await getMyRequests(
        user.id,
        currentPage
    );

    return (
        <div className="mx-auto max-w-7xl">
            <MyRequests
                user={user}
                requests={requests}
                pagination={pagination}
            />
        </div>
    );
}