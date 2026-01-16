# CodeTrivia

⚡ **A bold, fun programming trivia game built with React** ⚡

Test your coding knowledge across multiple programming languages and topics!

## Features

- 🎮 **Interactive Quiz Game** - Answer multiple-choice questions about programming
- 📚 **7 Categories** - JavaScript, Python, Java, C++, SQL, Algorithms, and Web Development
- 🎯 **3 Difficulty Levels** - Easy, Medium, and Hard
- 🔢 **Customizable Quiz Length** - Choose from 5, 10, 15, or 20 questions
- 🌟 **Real-time Score Tracking** - See your score as you progress
- 🎨 **Bold Game Console Aesthetic** - Green-themed UI inspired by retro gaming

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### LLM Configuration (Optional)

By default, the app calls a local LLM endpoint at `http://localhost:11434/v1/chat/completions` using the `llama3` model. You can override these with Vite environment variables:

```bash
VITE_LLM_API_URL=http://localhost:11434/v1/chat/completions
VITE_LLM_MODEL=llama3
```

## How to Play

1. **Select Categories** - Choose one or more programming topics you want to be quizzed on
2. **Choose Difficulty** - Pick Easy, Medium, or Hard based on your skill level
3. **Set Question Count** - Decide how many questions you want to answer
4. **Start Game** - Click "START GAME" to begin
5. **Answer Questions** - Select the correct answer from 4 options
6. **See Results** - View your final score and percentage

## Tech Stack

- React 19
- Vite
- CSS3 (with custom animations and effects)
- Mock LLM Service (simulates question generation)

## Project Structure

```text
src/
├── App.jsx          # Main application component
├── App.css          # Styling for the game
├── llmService.js    # Mock LLM service for generating questions
├── index.css        # Global styles
└── main.jsx         # Application entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- Integration with a real local LLM for dynamic question generation
- User accounts and score tracking
- Multiplayer mode
- More categories and questions
- Leaderboards

---

Made with ⚡ and 💚
