import MyRequests from "@/components/dashboard/MyRequests";
import { getSession } from "@/lib/getSession";
import { getMyRequests } from "@/lib/actions/getMyRequests";

export default async function Page({ searchParams }) {
    const user = await getSession();

    // unwrap searchParams first
    const params = await searchParams;

    const page = Number(params.page) || 1;

    const { requests, pagination } =
        await getMyRequests(user.id, page);

    return (
        <MyRequests
            user={user}
            requests={requests}
            pagination={pagination}
        />
    );
}