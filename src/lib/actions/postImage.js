"use server";
export const postImage = async (imageFile) => {
    try {
        if(!imageFile) return null;
        const formData = new FormData();
        formData.append("image", imageFile);
        const imageResponse = await fetch(`${process.env.IMAGE_API}?key=${process.env.IMAGE_API_KEY}`, {
            method: "POST",
            body: formData,
        });

        const result = await imageResponse.json();
        const imageURL = result?.data?.url;
        console.log(imageURL);

        return imageURL;
    } catch (error) {
        console.error("Error");
        return {
            "ok": false,
            "message": "Couldn't save image to server."
        }
    };
}