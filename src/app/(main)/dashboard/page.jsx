import DashboardOverview from "@/components/dashboard/Dashboard";
import { getSession } from "@/lib/getSession";
import { getDashboardOverview } from "@/lib/actions/getDashboardOverview";

export default async function DashboardPage() {
    const user = await getSession();

    const data = await getDashboardOverview();

    return (
        <DashboardOverview
            user={user}
            stats={data.stats}
            requests={data.recentRequests}
        />
    );
}