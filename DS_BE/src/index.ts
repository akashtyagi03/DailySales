import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import shopRoutes from "./routes/shop.routes";
import userRoutes from "./routes/user.routes";
import product from "./routes/product.routes";
import shiftRoutes from "./routes/Shift.routes";
import reportRoutes from "./routes/report.routes";
import alertRoutes from "./routes/alert.routes";

const app = express();

const PORT = Number(process.env.PORT || 3000);
const MONGO_URI = process.env.MONGODB_URL;
if (!MONGO_URI) {
    console.error("MONGODB_URL is not defined in environment variables");
    process.exit(1);
}

app.use(express.json());
// Allow one or more frontend origins (comma-separated in FRONTEND_ORIGIN)
const rawFrontendOrigins = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const allowedOrigins = rawFrontendOrigins.split(",").map((s) => s.trim()).filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // allow non-browser or same-origin requests (no origin)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS origin denied: ${origin}`));
        },
    })
);

app.get("/", (_req, res) => {
    res.send("DailySales backend running");
});

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/shops", shopRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", product);
app.use("/api/shifts", shiftRoutes)
app.use("/api/reports", reportRoutes);
app.use("/api/alerts",  alertRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDB(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    });
