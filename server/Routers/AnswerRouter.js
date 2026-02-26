import express from "express";
import db from "../dataDBConnections.js";

const router = express.Router();

// Get all answers for a specific question
router.get("/question/:questionId", async (req, res) => {
  const { questionId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT a.id, a.content, a.created_at, a.updated_at,
              u.email as author_email, u.username as author_name
       FROM answers a
       LEFT JOIN users u ON a.user_id = u.id
       WHERE a.question_id = ?
       ORDER BY a.created_at ASC`,
      [questionId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching answers:", err);
    res.status(500).json({ error: "Failed to fetch answers" });
  }
});

// Create a new answer
router.post("/", async (req, res) => {
  const { content, question_id, user_id } = req.body;

  try {
    // Validate input
    if (!content || !question_id || !user_id) {
      return res.status(400).json({ 
        error: "Content, question_id, and user_id are required" 
      });
    }

    // Verify question exists
    const [questions] = await db.query(
      "SELECT id FROM questions WHERE id = ?",
      [question_id]
    );

    if (questions.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Insert answer
    const [result] = await db.query(
      "INSERT INTO answers (content, question_id, user_id) VALUES (?, ?, ?)",
      [content, question_id, user_id]
    );

    // Fetch the created answer
    const [newAnswer] = await db.query(
      `SELECT a.id, a.content, a.created_at,
              u.email as author_email, u.username as author_name
       FROM answers a
       LEFT JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newAnswer[0]);
  } catch (err) {
    console.error("Error creating answer:", err);
    res.status(500).json({ error: "Failed to create answer" });
  }
});

// Update an answer
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const [result] = await db.query(
      "UPDATE answers SET content = ? WHERE id = ?",
      [content, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Fetch updated answer
    const [updated] = await db.query(
      `SELECT a.id, a.content, a.created_at, a.updated_at,
              u.email as author_email, u.username as author_name
       FROM answers a
       LEFT JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [id]
    );

    res.json(updated[0]);
  } catch (err) {
    console.error("Error updating answer:", err);
    res.status(500).json({ error: "Failed to update answer" });
  }
});

// Delete an answer
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM answers WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.json({ message: "Answer deleted successfully" });
  } catch (err) {
    console.error("Error deleting answer:", err);
    res.status(500).json({ error: "Failed to delete answer" });
  }
});

export default router;