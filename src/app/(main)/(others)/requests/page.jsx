import AllRequests from "@/components/home/AllRequests";
import { getAllRequests } from "@/lib/actions/getAllRequests";

export default async function Page({
    searchParams,
}) {
    const params = await searchParams;

    const page = Number(params.page) || 1;

    const {
        requests,
        pagination,
    } = await getAllRequests(page);

    return (
        <div className="container mx-auto py-10">
            <AllRequests
                requests={requests}
                pagination={pagination}
            />
        </div>
    );
}