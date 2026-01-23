-- CodeTrivia Database Schema
-- For tracking user quiz performance and personalizing question generation

-- Users table (simple authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Quiz sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  question_count INT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  llm_provider VARCHAR(50),
  llm_model VARCHAR(100),
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_completed (user_id, completed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Individual question results
CREATE TABLE IF NOT EXISTS question_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  user_id INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  question_text TEXT NOT NULL,
  correct_answer VARCHAR(500) NOT NULL,
  user_answer VARCHAR(500),
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_category (user_id, category),
  INDEX idx_user_correct (user_id, is_correct)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Category performance summary (materialized view updated via triggers or cron)
CREATE TABLE IF NOT EXISTS category_performance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  total_questions INT DEFAULT 0,
  correct_answers INT DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0.00,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_category_difficulty (user_id, category, difficulty),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_accuracy (user_id, accuracy_percentage)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default user (you can customize this later)
INSERT INTO users (username) VALUES ('default_user')
ON DUPLICATE KEY UPDATE username=username;
