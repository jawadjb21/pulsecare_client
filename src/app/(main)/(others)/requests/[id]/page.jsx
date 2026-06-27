import RequestDetails from "@/components/dashboard/RequestDetails";
import { getRequestById } from "@/lib/actions/getRequestById";

export default async function Page({
    params,
}) {
    const { id } = await params;

    const request = await getRequestById(id);

    return (
        <div className="container mx-auto py-10">
            <RequestDetails request={request} />
        </div>
    );
}