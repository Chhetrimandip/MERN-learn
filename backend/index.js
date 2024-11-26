import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load env variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/products", productRoutes);

// Start server and connect to DB
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
});
