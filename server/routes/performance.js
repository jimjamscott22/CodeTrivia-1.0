const express = require('express');
const router = express.Router();
const db = require('../db');

// Get user performance summary
router.get('/summary/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const [summary] = await db.query(`
      SELECT
        category,
        difficulty,
        total_questions,
        correct_answers,
        accuracy_percentage
      FROM category_performance
      WHERE user_id = ?
      ORDER BY accuracy_percentage ASC, total_questions DESC
    `, [userId]);

    res.json({ success: true, data: summary });
  } catch (error) {
    console.error('Error fetching performance summary:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get detailed statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Overall stats
    const [overallStats] = await db.query(`
      SELECT
        COUNT(*) as total_sessions,
        SUM(score) as total_correct,
        SUM(total_questions) as total_questions,
        ROUND(AVG(score / total_questions * 100), 2) as avg_accuracy
      FROM quiz_sessions
      WHERE user_id = ?
    `, [userId]);

    // Category breakdown
    const [categoryStats] = await db.query(`
      SELECT
        category,
        COUNT(*) as questions_answered,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_answers,
        ROUND(AVG(CASE WHEN is_correct = 1 THEN 100 ELSE 0 END), 2) as accuracy
      FROM question_results
      WHERE user_id = ?
      GROUP BY category
      ORDER BY accuracy ASC
    `, [userId]);

    // Recent performance trend (last 10 sessions)
    const [recentSessions] = await db.query(`
      SELECT
        id,
        difficulty,
        score,
        total_questions,
        ROUND(score / total_questions * 100, 2) as percentage,
        completed_at
      FROM quiz_sessions
      WHERE user_id = ?
      ORDER BY completed_at DESC
      LIMIT 10
    `, [userId]);

    res.json({
      success: true,
      data: {
        overall: overallStats[0],
        byCategory: categoryStats,
        recentSessions: recentSessions
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get weak areas for personalized practice
router.get('/weak-areas/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const minQuestions = parseInt(req.query.minQuestions) || 3; // Minimum questions to consider

    const [weakAreas] = await db.query(`
      SELECT
        category,
        difficulty,
        total_questions,
        correct_answers,
        accuracy_percentage,
        (100 - accuracy_percentage) as weakness_score
      FROM category_performance
      WHERE user_id = ? AND total_questions >= ?
      ORDER BY accuracy_percentage ASC, total_questions DESC
      LIMIT 5
    `, [userId, minQuestions]);

    res.json({ success: true, data: weakAreas });
  } catch (error) {
    console.error('Error fetching weak areas:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Save quiz session and results
router.post('/session', async (req, res) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const {
      userId,
      difficulty,
      questionCount,
      score,
      totalQuestions,
      llmProvider,
      llmModel,
      questions // Array of question results
    } = req.body;

    // Insert quiz session
    const [sessionResult] = await connection.query(`
      INSERT INTO quiz_sessions
      (user_id, difficulty, question_count, score, total_questions, llm_provider, llm_model)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [userId, difficulty, questionCount, score, totalQuestions, llmProvider, llmModel]);

    const sessionId = sessionResult.insertId;

    // Insert individual question results
    if (questions && questions.length > 0) {
      const questionValues = questions.map(q => [
        sessionId,
        userId,
        q.category,
        difficulty,
        q.question,
        q.correctAnswer,
        q.userAnswer,
        q.isCorrect ? 1 : 0
      ]);

      await connection.query(`
        INSERT INTO question_results
        (session_id, user_id, category, difficulty, question_text, correct_answer, user_answer, is_correct)
        VALUES ?
      `, [questionValues]);

      // Update category performance summary
      for (const q of questions) {
        await connection.query(`
          INSERT INTO category_performance
          (user_id, category, difficulty, total_questions, correct_answers, accuracy_percentage)
          VALUES (?, ?, ?, 1, ?, ?)
          ON DUPLICATE KEY UPDATE
            total_questions = total_questions + 1,
            correct_answers = correct_answers + ?,
            accuracy_percentage = (correct_answers + ?) / (total_questions + 1) * 100
        `, [
          userId,
          q.category,
          difficulty,
          q.isCorrect ? 1 : 0,
          q.isCorrect ? 100 : 0,
          q.isCorrect ? 1 : 0,
          q.isCorrect ? 1 : 0
        ]);
      }
    }

    await connection.commit();

    res.json({
      success: true,
      data: { sessionId }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving session:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
