import axios from "axios";

import { baseURL } from "../auth/context";

// signed upload
export async function uploadToCloudinary(file, fileType) {
    

    try {
        // 1️⃣ Get signature from backend
        const res = await axios.get(baseURL+"/auth/cloudinary-sign" );

        

        const { timestamp, signature, apiKey, cloudName, folder } = res.data;

        if(!signature || !timestamp || !apiKey || !cloudName) {
            console.error("Invalid signature response:", res.data.response.error);
            return null;
        }

        console.log(res.data)

        // 2️⃣ Prepare upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", folder);

        // 3️⃣ Upload directly to Cloudinary
        let uploadRes = null;

        if(fileType === 'image') uploadRes = await axios.post( `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );

        if(fileType === 'video') uploadRes = await axios.post( `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
            formData
        );

        if(fileType === 'audio') uploadRes = await axios.post( `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
            formData
        );

        

        return uploadRes.data.secure_url;

    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
}