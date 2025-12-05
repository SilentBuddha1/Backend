import { config } from 'dotenv';
config(); // Load environment variables from .env file
import express from 'express';
import { connectDB, disconnectDB } from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js"

console.log('DEBUG PORT ->', process.env.PORT);
console.log('DEBUG DATABASE_URL ->', process.env.DATABASE_URL ? '[set]' : '[missing]');

connectDB();

const app = express();

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);


app.get('/', (req,res) => {
   res.json({message: "Hello World"});
})

const PORT = Number(process.env.PORT) || 3000;

// Save the server instance so later handlers can call server.close()
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on('uncaughtException', async (err) => {
    console.error("Uncaught Exception: ", err);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    await disconnectDB();
    process.exit(0);
})