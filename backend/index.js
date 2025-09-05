require("dotenv").config()
const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
const { connectToMongoDb } = require('./connect');
const cors = require('cors');
const path = require('path');

const app = express();

connectToMongoDb(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', userRouter);

// Health check (useful for Render debugging)
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
