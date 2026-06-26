"use server";

export const getMyRequests = async (
    userId,
    page = 1,
    limit = 3
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/user/${userId}?page=${page}&limit=${limit}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        const result = await response.json();

        return {
            requests: result.data,
            pagination: result.pagination,
        };

    } catch (error) {
        console.log(error);

        return {
            requests: [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalRequests: 0,
            },
        };
    }
};