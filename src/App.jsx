import { useState, useEffect } from 'react';
import './App.css';
import { generateQuestions, CATEGORIES, DIFFICULTIES, QUESTION_COUNTS, LLM_PROVIDERS, fetchLMStudioModels, fetchOllamaModels } from './llmService';

function App() {
  const [gameState, setGameState] = useState('setup'); // setup, loading, quiz, results
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [llmProvider, setLlmProvider] = useState('lmstudio');
  const [llmModel, setLlmModel] = useState('local-model');
  const [availableModels, setAvailableModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const fetchAvailableModels = async (providerId) => {
    setLoadingModels(true);
    try {
      let models = [];
      
      if (providerId === 'lmstudio') {
        models = await fetchLMStudioModels();
      } else if (providerId === 'ollama') {
        models = await fetchOllamaModels();
      } else if (providerId === 'mock') {
        // For mock provider, use the default mock model
        models = [{ id: 'mock', name: 'Built-in Questions' }];
      }
      
      setAvailableModels(models);
      
      // Set default model
      if (models.length > 0) {
        setLlmModel(models[0].id);
      } else {
        // Fallback to provider defaults if no models found
        const provider = LLM_PROVIDERS.find(p => p.id === providerId);
        if (provider && provider.models.length > 0) {
          setLlmModel(provider.models[0].id);
          setAvailableModels(provider.models);
        }
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      // Fallback to provider defaults
      const provider = LLM_PROVIDERS.find(p => p.id === providerId);
      if (provider && provider.models.length > 0) {
        setLlmModel(provider.models[0].id);
        setAvailableModels(provider.models);
      }
    } finally {
      setLoadingModels(false);
    }
  };

  const handleProviderChange = (providerId) => {
    setLlmProvider(providerId);
    fetchAvailableModels(providerId);
  };

  // Fetch models on initial load
  useEffect(() => {
    fetchAvailableModels(llmProvider);
  }, []);

  const startGame = async () => {
    if (selectedCategories.length === 0) {
      setErrorMessage('Please select at least one category.');
      return;
    }

    setErrorMessage('');
    setGameState('loading');
    try {
      const generatedQuestions = await generateQuestions(
        selectedCategories,
        difficulty,
        questionCount,
        llmProvider,
        llmModel
      );
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setGameState('quiz');
    } catch (error) {
      console.error('Error generating questions:', error);
      setErrorMessage('Failed to generate questions. Please try again.');
      setGameState('setup');
    }
  };

  const selectAnswer = (answer) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setGameState('results');
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setSelectedCategories([]);
    setDifficulty('medium');
    setQuestionCount(10);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setErrorMessage('');
    // Don't reset provider/model - keep current selection
  };

  const renderSetup = () => (
    <div className="app">
      <h1 className="app-title">⚡ CodeTrivia ⚡</h1>
      <p className="app-subtitle">Test Your Programming Knowledge</p>
      
      <div className="card">
        <div className="setup-section">
          <h2>📚 Select Categories</h2>
          <div className="category-grid">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategories.includes(cat.id) ? 'selected' : ''}`}
                onClick={() => toggleCategory(cat.id)}
                aria-pressed={selectedCategories.includes(cat.id)}
              >
                <div>{cat.emoji}</div>
                <div>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>🎯 Choose Difficulty</h2>
          <div className="difficulty-buttons">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff}
                className={`difficulty-btn ${difficulty === diff ? 'selected' : ''}`}
                onClick={() => setDifficulty(diff)}
                aria-pressed={difficulty === diff}
              >
                {diff.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>🔢 Number of Questions</h2>
          <div className="question-count-buttons">
            {QUESTION_COUNTS.map(count => (
              <button
                key={count}
                className={`count-btn ${questionCount === count ? 'selected' : ''}`}
                onClick={() => setQuestionCount(count)}
                aria-pressed={questionCount === count}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>🤖 LLM Provider</h2>
          <div className="difficulty-buttons">
            {LLM_PROVIDERS.map(provider => (
              <button
                key={provider.id}
                className={`difficulty-btn ${llmProvider === provider.id ? 'selected' : ''}`}
                onClick={() => handleProviderChange(provider.id)}
                aria-pressed={llmProvider === provider.id}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>🧠 Model</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select
              className="model-dropdown"
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
              disabled={loadingModels || llmProvider === 'mock'}
            >
              {availableModels.length > 0 ? (
                availableModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))
              ) : (
                <option value="">No models available</option>
              )}
            </select>
            {llmProvider !== 'mock' && (
              <button
                className="refresh-btn"
                onClick={() => fetchAvailableModels(llmProvider)}
                disabled={loadingModels}
                title="Refresh available models"
              >
                {loadingModels ? '⟳' : '🔄'}
              </button>
            )}
          </div>
          {llmProvider !== 'mock' && availableModels.length === 0 && !loadingModels && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              No models detected. Make sure {llmProvider === 'lmstudio' ? 'LM Studio' : 'Ollama'} is running with a model loaded.
            </p>
          )}
        </div>

        {errorMessage && (
          <div className="error-message" role="alert" aria-live="polite">
            {errorMessage}
          </div>
        )}

        <button className="start-button" onClick={startGame}>
          🎮 START GAME
        </button>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="app">
      <h1 className="app-title">⚡ CodeTrivia ⚡</h1>
      <div className="card">
        <div className="loading" role="status" aria-live="polite">
          <div className="loading-spinner"></div>
          <p className="loading-text">Generating your questions...</p>
          <p className="loading-text" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            Categories: {selectedCategories.map(id => 
              CATEGORIES.find(c => c.id === id)?.name
            ).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (questions.length === 0) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="app">
        <h1 className="app-title">⚡ CodeTrivia ⚡</h1>
        
        <div className="card">
          <div className="quiz-progress" aria-live="polite">
            Question <span>{currentQuestionIndex + 1}</span> of <span>{questions.length}</span>
            {' | '}
            Score: <span>{score}</span>
          </div>
          
          <div className="quiz-question">
            {currentQuestion.question}
          </div>
          
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => selectAnswer(option)}
                disabled={selectedAnswer !== null}
                aria-pressed={selectedAnswer === option}
              >
                {option}
              </button>
            ))}
          </div>
          
          {selectedAnswer !== null && (
            <div style={{ marginTop: '2rem' }}>
              <p style={{ 
                fontSize: '1.3rem', 
                color: selectedAnswer === currentQuestion.correctAnswer ? 'var(--primary-green)' : '#ff4444',
                marginBottom: '1rem'
              }}>
                {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Wrong!'}
              </p>
              {selectedAnswer !== currentQuestion.correctAnswer && (
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Correct answer: {currentQuestion.correctAnswer}
                </p>
              )}
              <button onClick={nextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
              </button>
              <button className="secondary-button" onClick={resetGame}>
                Restart Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    
    if (percentage === 100) {
      message = '🏆 Perfect Score! You\'re a coding master!';
    } else if (percentage >= 80) {
      message = '🌟 Excellent! You really know your stuff!';
    } else if (percentage >= 60) {
      message = '👍 Good job! Keep learning!';
    } else if (percentage >= 40) {
      message = '📚 Not bad! Time to study more!';
    } else {
      message = '💪 Keep practicing! You\'ll get better!';
    }
    
    return (
      <div className="app">
        <h1 className="app-title">⚡ CodeTrivia ⚡</h1>
        
        <div className="card results-card">
          <h2 className="results-message">{message}</h2>
          <div className="results-score">
            {score} / {questions.length}
          </div>
          <div className="results-details">
            You got {percentage}% correct!
          </div>
          
          <button className="play-again-btn" onClick={resetGame}>
            🎮 Play Again
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {gameState === 'setup' && renderSetup()}
      {gameState === 'loading' && renderLoading()}
      {gameState === 'quiz' && renderQuiz()}
      {gameState === 'results' && renderResults()}
    </>
  );
}

export default App;
