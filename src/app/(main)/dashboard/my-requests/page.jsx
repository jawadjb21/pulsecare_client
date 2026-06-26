import MyRequests from "@/components/dashboard/MyRequests";
import { getSession } from "@/lib/getSession";
import { getMyRequests } from "@/lib/actions/getMyRequests";

const page = async () => {
    const user = await getSession();

    const requests = await getMyRequests(user.id);

    return (
        <MyRequests
            user={user}
            requests={requests}
        />
    );
};

export default page;