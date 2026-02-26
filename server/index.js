import express from 'express';
import cors from 'cors';
import authRouter from './Routers/AuthRouter.js';
import categoriesRouter from './Routers/CategoriesRouter.js';
import questionRouter from './Routers/QuestionRouter.js';
import answerRouter from './Routers/AnswerRouter.js';

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// API Routes
server.use("/auth", authRouter);
server.use("/categories", categoriesRouter);
server.use("/questions", questionRouter);
server.use("/answers", answerRouter);

// Root endpoint
server.get("/", (req, res) => {
  res.json({ 
    message: "GardenHub API Server",
    version: "1.0.0",
    endpoints: {
      auth: "/auth (register, login)",
      categories: "/categories",
      questions: "/questions",
      answers: "/answers"
    }
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🌱 GardenHub API Server running on port ${PORT}`);
});