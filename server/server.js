const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());

// Request logger (debug)
app.use((req, _res, next) => {
  console.log(`➡️  ${req.method} ${req.originalUrl}`);
  next();
});

// --------------- Routes ---------------
app.use("/api/modules", require("./routes/moduleRoutes"));
app.use("/api/concepts", require("./routes/conceptRoutes"));
app.use("/api/practice", require("./routes/practiceRoutes"));

// Health-check endpoint
app.get("/", (_req, res) => {
  res.json({
    message: "🚀 LearnByDoing API is running",
    endpoints: {
      modules: "/api/modules",
      concepts: "/api/concepts/:moduleId",
      practice: "/api/practice/:moduleId",
    },
  });
});

// --------------- Error Handling ---------------
// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("💥 Server Error:", err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --------------- Start Server ---------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🟢 Server running on port ${PORT}`);
  console.log(`   Local:  http://localhost:${PORT}`);
  console.log(`   API:    http://localhost:${PORT}/api/modules\n`);
});
