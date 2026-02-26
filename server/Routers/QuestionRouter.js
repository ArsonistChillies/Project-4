import express from "express";
import db from "../dataDBConnections.js";

const router = express.Router();

// Get all questions for a specific category
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT q.id, q.title, q.content, q.created_at, q.updated_at, 
              u.email as author_email, u.username as author_name
       FROM questions q
       LEFT JOIN users u ON q.user_id = u.id
       WHERE q.category_id = ?
       ORDER BY q.created_at DESC`,
      [categoryId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Get a single question with its details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT q.id, q.title, q.content, q.created_at, q.updated_at, q.category_id,
              u.email as author_email, u.username as author_name
       FROM questions q
       LEFT JOIN users u ON q.user_id = u.id
       WHERE q.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

// Create a new question
router.post("/", async (req, res) => {
  const { title, content, category_id, user_id } = req.body;

  try {
    // Validate input
    if (!title || !content || !category_id || !user_id) {
      return res.status(400).json({ 
        error: "Title, content, category_id, and user_id are required" 
      });
    }

    // Insert question
    const [result] = await db.query(
      "INSERT INTO questions (title, content, category_id, user_id) VALUES (?, ?, ?, ?)",
      [title, content, category_id, user_id]
    );

    // Fetch the created question
    const [newQuestion] = await db.query(
      `SELECT q.id, q.title, q.content, q.created_at, q.category_id,
              u.email as author_email, u.username as author_name
       FROM questions q
       LEFT JOIN users u ON q.user_id = u.id
       WHERE q.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newQuestion[0]);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Failed to create question" });
  }
});

// Update a question
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const [result] = await db.query(
      "UPDATE questions SET title = ?, content = ? WHERE id = ?",
      [title, content, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Fetch updated question
    const [updated] = await db.query(
      `SELECT q.id, q.title, q.content, q.created_at, q.updated_at,
              u.email as author_email, u.username as author_name
       FROM questions q
       LEFT JOIN users u ON q.user_id = u.id
       WHERE q.id = ?`,
      [id]
    );

    res.json(updated[0]);
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ error: "Failed to update question" });
  }
});

// Delete a question
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM questions WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ error: "Failed to delete question" });
  }
});

export default router;
