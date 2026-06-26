"use server";

export const getMyRequests = async (userId) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/user/${userId}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};