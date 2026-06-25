import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { getSession } from "@/lib/getSession";

export default async function DashboardLayout({ children }) {
    const user = await getSession();

    return (
        <DashboardSidebar user={user}>
            {children}
        </DashboardSidebar>
    );
}