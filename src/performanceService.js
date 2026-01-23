// Performance tracking service for CodeTrivia
// Communicates with backend API to store and retrieve quiz performance data

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const DEFAULT_USER_ID = 1; // TODO: Replace with actual authentication

/**
 * Save a completed quiz session and all question results
 */
export async function saveQuizSession(sessionData) {
  try {
    const response = await fetch(`${API_BASE_URL}/performance/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: DEFAULT_USER_ID,
        ...sessionData
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to save session: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving quiz session:', error);
    // Don't throw - we don't want to block the user if tracking fails
    return { success: false, error: error.message };
  }
}

/**
 * Get overall performance summary
 */
export async function getPerformanceSummary() {
  try {
    const response = await fetch(`${API_BASE_URL}/performance/summary/${DEFAULT_USER_ID}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch summary: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching performance summary:', error);
    return [];
  }
}

/**
 * Get detailed statistics
 */
export async function getDetailedStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/performance/stats/${DEFAULT_USER_ID}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching detailed stats:', error);
    return null;
  }
}

/**
 * Get weak areas for focused practice
 */
export async function getWeakAreas(minQuestions = 3) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/performance/weak-areas/${DEFAULT_USER_ID}?minQuestions=${minQuestions}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weak areas: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching weak areas:', error);
    return [];
  }
}

/**
 * Build personalization context for LLM prompts
 */
export async function getPersonalizationContext() {
  try {
    const [summary, weakAreas] = await Promise.all([
      getPerformanceSummary(),
      getWeakAreas(3)
    ]);

    if (summary.length === 0 && weakAreas.length === 0) {
      return null; // No personalization data available yet
    }

    // Build context string for LLM prompt
    let context = '\nPERSONALIZATION CONTEXT:\n';

    if (weakAreas.length > 0) {
      context += 'The user needs more practice in these areas:\n';
      weakAreas.forEach(area => {
        context += `- ${area.category} (${area.difficulty}): ${area.accuracy_percentage.toFixed(1)}% accuracy (${area.total_questions} questions answered)\n`;
      });
      context += '\nFocus 60-70% of questions on these weak areas.\n';
    }

    if (summary.length > 0) {
      const strongAreas = summary
        .filter(s => s.accuracy_percentage >= 80 && s.total_questions >= 5)
        .slice(0, 3);

      if (strongAreas.length > 0) {
        context += '\nStrong areas (avoid over-practicing):\n';
        strongAreas.forEach(area => {
          context += `- ${area.category} (${area.difficulty}): ${area.accuracy_percentage.toFixed(1)}% accuracy\n`;
        });
      }
    }

    return context;
  } catch (error) {
    console.error('Error building personalization context:', error);
    return null;
  }
}
