import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { router as apiRouter } from "./routes";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
);

// Routes
app.use("/api/v1", apiRouter);

// 404 + error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
