import { useState, useEffect } from 'react';
import { getDetailedStats, getPerformanceSummary } from './performanceService';
import './Stats.css';

function Stats({ onClose }) {
  const [stats, setStats] = useState(null);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, summaryData] = await Promise.all([
        getDetailedStats(),
        getPerformanceSummary()
      ]);
      setStats(statsData);
      setSummary(summaryData);
    } catch (err) {
      console.error('Error loading stats:', err);
      setError('Failed to load statistics. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-overlay">
        <div className="stats-modal">
          <div className="loading">Loading statistics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-overlay">
        <div className="stats-modal">
          <h2>📊 Performance Statistics</h2>
          <div className="error-message">{error}</div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (!stats || !stats.overall || stats.overall.total_sessions === 0) {
    return (
      <div className="stats-overlay">
        <div className="stats-modal">
          <h2>📊 Performance Statistics</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
            No quiz data yet. Complete some quizzes to see your statistics!
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  const { overall, byCategory, recentSessions } = stats;

  // Find weak and strong areas
  const weakAreas = summary
    .filter(s => s.total_questions >= 5)
    .sort((a, b) => a.accuracy_percentage - b.accuracy_percentage)
    .slice(0, 3);

  const strongAreas = summary
    .filter(s => s.total_questions >= 5 && s.accuracy_percentage >= 70)
    .sort((a, b) => b.accuracy_percentage - a.accuracy_percentage)
    .slice(0, 3);

  return (
    <div className="stats-overlay">
      <div className="stats-modal">
        <div className="stats-header">
          <h2>📊 Your Performance Statistics</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="stats-content">
          {/* Overall Stats */}
          <div className="stats-section">
            <h3>Overall Performance</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{overall.total_sessions}</div>
                <div className="stat-label">Total Sessions</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{overall.total_questions}</div>
                <div className="stat-label">Questions Answered</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{overall.total_correct}</div>
                <div className="stat-label">Correct Answers</div>
              </div>
              <div className="stat-card highlight">
                <div className="stat-value">{overall.avg_accuracy}%</div>
                <div className="stat-label">Average Accuracy</div>
              </div>
            </div>
          </div>

          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <div className="stats-section">
              <h3>🎯 Focus Areas (Need Practice)</h3>
              <div className="category-list">
                {weakAreas.map((area, idx) => (
                  <div key={idx} className="category-item weak">
                    <div className="category-name">
                      {area.category} ({area.difficulty})
                    </div>
                    <div className="category-stats">
                      <span className="accuracy">{area.accuracy_percentage.toFixed(1)}%</span>
                      <span className="count">{area.total_questions} questions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strong Areas */}
          {strongAreas.length > 0 && (
            <div className="stats-section">
              <h3>⭐ Strong Areas</h3>
              <div className="category-list">
                {strongAreas.map((area, idx) => (
                  <div key={idx} className="category-item strong">
                    <div className="category-name">
                      {area.category} ({area.difficulty})
                    </div>
                    <div className="category-stats">
                      <span className="accuracy">{area.accuracy_percentage.toFixed(1)}%</span>
                      <span className="count">{area.total_questions} questions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Breakdown */}
          {byCategory && byCategory.length > 0 && (
            <div className="stats-section">
              <h3>By Category</h3>
              <div className="category-table">
                {byCategory.map((cat, idx) => (
                  <div key={idx} className="category-row">
                    <div className="category-name">{cat.category}</div>
                    <div className="category-bar-container">
                      <div
                        className="category-bar"
                        style={{ width: `${cat.accuracy}%` }}
                      ></div>
                    </div>
                    <div className="category-accuracy">{cat.accuracy}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Sessions */}
          {recentSessions && recentSessions.length > 0 && (
            <div className="stats-section">
              <h3>Recent Sessions</h3>
              <div className="recent-sessions">
                {recentSessions.map((session, idx) => (
                  <div key={idx} className="session-item">
                    <span className="session-difficulty">{session.difficulty}</span>
                    <span className="session-score">
                      {session.score}/{session.total_questions}
                    </span>
                    <span className="session-percentage">{session.percentage}%</span>
                    <span className="session-date">
                      {new Date(session.completed_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="stats-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Stats;
