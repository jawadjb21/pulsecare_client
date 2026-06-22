export const postImage = async (imageFile) => {
    try {
        const imageResponse = await fetch(`${process.env.IMAGE_API}?key=${process.env.IMAGE_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-type": "image/*"
            },
            body: imageFile,
        });

        const imageURL = await imageResponse.json()?.data?.url;

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