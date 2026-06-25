import Profile from "@/components/dashboard/Profile";
import { getSession } from "@/lib/getSession";

export default async function page() {
    const user = await getSession();
    return (
        <div className="max-w-5xl mx-auto">
            <Profile user={user} />
        </div>
    );
}