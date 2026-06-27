"use server";

export const getAllRequests = async (
    page = 1,
    limit = 6
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests?page=${page}&limit=${limit}`,
            {
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

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