import axios from "axios";
import { env } from "../config/env";

export async function recognizeFaces(base64Image: string) {
    const res = await axios.post(`${env.FACE_SERVICE_URL}/recognize`, {
        image: base64Image
    });

    // { recognized: ["<mongoId1>", "<mongoId2>", ...] }
    return res.data as { recognized: string[] };
}

export async function registerFace(faceId: string, base64Image: string) {
    const res = await axios.post(`${env.FACE_SERVICE_URL}/register`, {
        faceId,
        image: base64Image
    });

    return res.data;
}
