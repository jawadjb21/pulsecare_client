import CreateRequestForm from "@/components/dashboard/CreateRequest";
import { getSession } from "@/lib/getSession";
import { postRequest } from "@/lib/actions/postRequest";

const page = async () => {
    const user = await getSession();

    return (
        <CreateRequestForm
            user={user}
            createRequest={postRequest}
        />
    );
};

export default page;