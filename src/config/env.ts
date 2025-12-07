import dotenv from 'dotenv'
dotenv.config();

export const env = {
    PORT: process.env.PORT || "5000",
    MONGO_URI: process.env.MONGO_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    FACE_SERVICE_URL: process.env.FACE_SERVICE_URL || "http://localhost:8001"
};