"use server";

export const getRequestById = async (id) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${id}`,
            {
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result.data;

    } catch (error) {
        console.log(error);

        return null;
    }
};