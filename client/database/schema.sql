-- GardenHub Forum Database Schema
-- 3-Tier Architecture - Data Layer
-- Database: Flower

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- ============================================
-- TABLE: users
-- Stores registered user accounts
-- ============================================
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: categories
-- Stores forum categories (botanical topics)
-- ============================================
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: questions
-- Stores user questions posted in categories
-- ============================================
CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  INDEX idx_category (category_id),
  INDEX idx_user (user_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: answers
-- Stores user answers to questions
-- ============================================
CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  question_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_question (question_id),
  INDEX idx_user (user_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SEED DATA: Initial Categories
-- ============================================
INSERT INTO categories (name, description) VALUES
('Flowers & Ornamentals', 'Discuss roses, tulips, daisies, and all flowering plants that beautify your garden. Share tips on planting, care, and seasonal blooms.'),
('Vegetables & Herbs', 'From tomatoes to basil, share your vegetable garden successes and herb growing techniques. Discuss companion planting and harvest tips.'),
('Trees & Shrubs', 'Talk about woody plants, from fruit trees to decorative shrubs. Share pruning techniques, planting advice, and landscape design ideas.'),
('Indoor Plants', 'Houseplant enthusiasts unite! Discuss succulents, ferns, tropical plants, and how to keep them thriving indoors.'),
('Gardening Techniques', 'Share methods for composting, soil improvement, irrigation, raised beds, container gardening, and sustainable practices.'),
('Pest & Disease Management', 'Identify and solve problems with pests, diseases, and plant health issues. Share organic and conventional treatment methods.');

-- ============================================
-- VERIFICATION QUERIES (commented out)
-- ============================================

-- Check all tables exist
-- SHOW TABLES;

-- Verify categories were inserted
-- SELECT * FROM categories;

-- Check table structures
-- DESCRIBE users;
-- DESCRIBE categories;
-- DESCRIBE questions;
-- DESCRIBE answers;
