import AllUsers from "@/components/dashboard/AllUsers";

import { getAllUsers } from "@/lib/actions/getAllUsers";

export default async function Page({
    searchParams,
}) {

    const params = await searchParams;

    const page =
        Number(params?.page) || 1;

    const {
        users,
        pagination,
    } = await getAllUsers(page);

    return (
        <AllUsers
            users={users}
            pagination={pagination}
        />
    );
}