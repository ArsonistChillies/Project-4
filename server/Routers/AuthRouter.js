import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../dataDBConnections.js";

const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await db.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, password_hash]
    );

    const userId = result.insertId;

    // Generate JWT token
    const token = jwt.sign(
      { userId, email },
      process.env.JWT_SECRET || "default_secret_change_in_production",
      { expiresIn: "7d" }
    );

    // Return user data
    res.status(201).json({
      id: userId,
      email,
      token
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Query user by email
    const [users] = await db.query(
      "SELECT id, email, password_hash FROM users WHERE email = ?",
      [email]
    );

    // Check if user exists
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // Compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret_change_in_production",
      { expiresIn: "7d" }
    );

    // Return user data
    res.json({
      id: user.id,
      email: user.email,
      token
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
