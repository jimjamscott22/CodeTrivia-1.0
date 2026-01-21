// Mock LLM service for generating trivia questions
// In a production environment, this would connect to a local LLM API

// LLM Provider configurations
export const LLM_PROVIDERS = [
  {
    id: 'ollama',
    name: 'Ollama',
    url: 'http://localhost:11434/v1/chat/completions',
    models: [
      { id: 'llama3.2', name: 'Llama 3.2' },
      { id: 'llama3.1', name: 'Llama 3.1' },
      { id: 'llama3', name: 'Llama 3' },
      { id: 'qwen2.5', name: 'Qwen 2.5' },
      { id: 'phi3', name: 'Phi 3' },
      { id: 'mistral', name: 'Mistral' },
      { id: 'gemma2', name: 'Gemma 2' }
    ]
  },
  {
    id: 'lmstudio',
    name: 'LM Studio',
    url: 'http://localhost:1234/v1/chat/completions',
    models: [
      { id: 'local-model', name: 'Local Model (Auto)' },
      { id: 'llama-3.2-3b-instruct', name: 'Llama 3.2 3B Instruct' },
      { id: 'llama-3.1-8b-instruct', name: 'Llama 3.1 8B Instruct' },
      { id: 'qwen2.5-7b-instruct', name: 'Qwen 2.5 7B Instruct' },
      { id: 'phi-3-mini-4k-instruct', name: 'Phi 3 Mini 4K Instruct' },
      { id: 'mistral-7b-instruct', name: 'Mistral 7B Instruct' }
    ]
  },
  {
    id: 'mock',
    name: 'Mock (No LLM)',
    url: null,
    models: [{ id: 'mock', name: 'Built-in Questions' }]
  }
];

const LLM_API_URL = import.meta.env.VITE_LLM_API_URL || 'http://localhost:11434/v1/chat/completions';
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'llama3';

const questionTemplates = {
  javascript: [
    {
      easy: [
        { q: "What keyword is used to declare a variable in JavaScript?", correct: "var, let, or const", options: ["var, let, or const", "int", "variable", "declare"] },
        { q: "Which method is used to add an element to the end of an array?", correct: "push()", options: ["push()", "append()", "add()", "insert()"] },
        { q: "What does JSON stand for?", correct: "JavaScript Object Notation", options: ["JavaScript Object Notation", "Java Serialized Object Notation", "JavaScript Online Network", "Java Source Object Name"] },
      ],
      medium: [
        { q: "What is a closure in JavaScript?", correct: "A function that has access to variables in its outer scope", options: ["A function that has access to variables in its outer scope", "A method to close files", "A way to end loops", "A type of object"] },
        { q: "What does the 'this' keyword refer to in JavaScript?", correct: "The object that is executing the current function", options: ["The object that is executing the current function", "The global window object always", "The parent function", "A reserved keyword with no meaning"] },
        { q: "What is event bubbling in JavaScript?", correct: "When an event propagates from child to parent elements", options: ["When an event propagates from child to parent elements", "When events get cancelled", "A method to create new events", "A way to sort events"] },
      ],
      hard: [
        { q: "What is the difference between '==' and '===' in JavaScript?", correct: "'===' checks type and value, '==' only checks value", options: ["'===' checks type and value, '==' only checks value", "They are exactly the same", "'==' is faster than '==='", "'===' is deprecated"] },
        { q: "What is the event loop in JavaScript?", correct: "A mechanism that handles asynchronous operations", options: ["A mechanism that handles asynchronous operations", "A loop that runs events", "A function that creates loops", "A way to iterate arrays"] },
        { q: "What does hoisting mean in JavaScript?", correct: "Variable and function declarations are moved to the top of their scope", options: ["Variable and function declarations are moved to the top of their scope", "A way to lift objects", "A method to increase performance", "A debugging technique"] },
      ]
    }
  ],
  python: [
    {
      easy: [
        { q: "What keyword is used to define a function in Python?", correct: "def", options: ["def", "function", "func", "define"] },
        { q: "Which of these is a Python data type?", correct: "list", options: ["list", "array", "ArrayList", "vector"] },
        { q: "What symbol is used for comments in Python?", correct: "#", options: ["#", "//", "/*", "--"] },
      ],
      medium: [
        { q: "What is a list comprehension in Python?", correct: "A concise way to create lists", options: ["A concise way to create lists", "A way to compress lists", "A method to understand lists", "A debugging tool"] },
        { q: "What does the 'self' keyword represent in Python classes?", correct: "The instance of the class", options: ["The instance of the class", "The parent class", "A global variable", "The class name"] },
        { q: "What is the difference between append() and extend() in Python lists?", correct: "append() adds one element, extend() adds multiple", options: ["append() adds one element, extend() adds multiple", "They are the same", "extend() is faster", "append() is deprecated"] },
      ],
      hard: [
        { q: "What is a generator in Python?", correct: "A function that yields values one at a time", options: ["A function that yields values one at a time", "A way to create random numbers", "A class constructor", "A module importer"] },
        { q: "What is the Global Interpreter Lock (GIL) in Python?", correct: "A mutex that protects Python objects from concurrent access", options: ["A mutex that protects Python objects from concurrent access", "A way to lock variables", "A security feature", "A debugging tool"] },
        { q: "What is a decorator in Python?", correct: "A function that modifies another function", options: ["A function that modifies another function", "A way to decorate strings", "A design pattern", "A type of class"] },
      ]
    }
  ],
  java: [
    {
      easy: [
        { q: "What is the extension of Java source files?", correct: ".java", options: [".java", ".class", ".jar", ".jav"] },
        { q: "Which keyword is used to create a class in Java?", correct: "class", options: ["class", "Class", "define", "struct"] },
        { q: "What is the main method signature in Java?", correct: "public static void main(String[] args)", options: ["public static void main(String[] args)", "void main()", "public void main()", "static main()"] },
      ],
      medium: [
        { q: "What is the difference between ArrayList and LinkedList?", correct: "ArrayList uses an array, LinkedList uses nodes", options: ["ArrayList uses an array, LinkedList uses nodes", "They are the same", "LinkedList is always faster", "ArrayList is deprecated"] },
        { q: "What is method overloading in Java?", correct: "Multiple methods with the same name but different parameters", options: ["Multiple methods with the same name but different parameters", "Methods that load other methods", "A way to optimize methods", "Methods with too many parameters"] },
        { q: "What does the 'static' keyword mean in Java?", correct: "The member belongs to the class, not instances", options: ["The member belongs to the class, not instances", "The variable cannot change", "The method cannot be overridden", "It's used for constants only"] },
      ],
      hard: [
        { q: "What is the difference between abstract class and interface in Java?", correct: "Abstract classes can have implementation, interfaces cannot (before Java 8)", options: ["Abstract classes can have implementation, interfaces cannot (before Java 8)", "They are exactly the same", "Interfaces are faster", "Abstract classes are deprecated"] },
        { q: "What is a Java Stream?", correct: "A sequence of elements supporting sequential and parallel operations", options: ["A sequence of elements supporting sequential and parallel operations", "A way to read files", "A network connection", "A type of collection"] },
        { q: "What is the purpose of the 'volatile' keyword in Java?", correct: "It ensures visibility of changes to variables across threads", options: ["It ensures visibility of changes to variables across threads", "It makes variables unchangeable", "It's used for optimization", "It prevents inheritance"] },
      ]
    }
  ],
  cpp: [
    {
      easy: [
        { q: "What symbol is used for pointers in C++?", correct: "*", options: ["*", "&", "->", "#"] },
        { q: "Which header file is needed for input/output in C++?", correct: "iostream", options: ["iostream", "stdio.h", "input.h", "io.h"] },
        { q: "What keyword is used for inheritance in C++?", correct: ":", options: [":", "extends", "inherits", "->"] },
      ],
      medium: [
        { q: "What is RAII in C++?", correct: "Resource Acquisition Is Initialization", options: ["Resource Acquisition Is Initialization", "Random Access Integer Initialization", "Rapid Array Item Iteration", "Reference And Interface Implementation"] },
        { q: "What is the difference between new and malloc?", correct: "new calls constructor, malloc does not", options: ["new calls constructor, malloc does not", "They are the same", "malloc is faster", "new is deprecated"] },
        { q: "What is a virtual function in C++?", correct: "A function that can be overridden in derived classes", options: ["A function that can be overridden in derived classes", "A function that doesn't exist", "A simulated function", "An inline function"] },
      ],
      hard: [
        { q: "What is move semantics in C++?", correct: "A way to transfer resources without copying", options: ["A way to transfer resources without copying", "A way to move code around", "A relocation algorithm", "A memory management technique"] },
        { q: "What is the difference between std::unique_ptr and std::shared_ptr?", correct: "unique_ptr has exclusive ownership, shared_ptr allows multiple owners", options: ["unique_ptr has exclusive ownership, shared_ptr allows multiple owners", "They are the same", "shared_ptr is always better", "unique_ptr is deprecated"] },
        { q: "What is template metaprogramming?", correct: "Writing code that generates code at compile time", options: ["Writing code that generates code at compile time", "A way to create templates", "A debugging technique", "A design pattern"] },
      ]
    }
  ],
  sql: [
    {
      easy: [
        { q: "Which SQL statement is used to retrieve data?", correct: "SELECT", options: ["SELECT", "GET", "RETRIEVE", "FETCH"] },
        { q: "What keyword is used to filter results in SQL?", correct: "WHERE", options: ["WHERE", "FILTER", "IF", "WHEN"] },
        { q: "Which clause is used to sort results in SQL?", correct: "ORDER BY", options: ["ORDER BY", "SORT BY", "ARRANGE BY", "ORGANIZE BY"] },
      ],
      medium: [
        { q: "What is a JOIN in SQL?", correct: "A way to combine rows from multiple tables", options: ["A way to combine rows from multiple tables", "A way to merge databases", "A connection between servers", "A type of index"] },
        { q: "What is the difference between INNER JOIN and LEFT JOIN?", correct: "INNER JOIN returns only matching rows, LEFT JOIN returns all left table rows", options: ["INNER JOIN returns only matching rows, LEFT JOIN returns all left table rows", "They are the same", "LEFT JOIN is faster", "INNER JOIN is deprecated"] },
        { q: "What is a primary key in SQL?", correct: "A unique identifier for table rows", options: ["A unique identifier for table rows", "The first column in a table", "The most important data", "A type of index"] },
      ],
      hard: [
        { q: "What is a database index?", correct: "A data structure that improves query speed", options: ["A data structure that improves query speed", "A list of tables", "A way to organize databases", "A type of JOIN"] },
        { q: "What is the difference between UNION and UNION ALL?", correct: "UNION removes duplicates, UNION ALL keeps all rows", options: ["UNION removes duplicates, UNION ALL keeps all rows", "They are the same", "UNION ALL is deprecated", "UNION is faster"] },
        { q: "What is a database transaction?", correct: "A sequence of operations performed as a single unit", options: ["A sequence of operations performed as a single unit", "A money transfer", "A type of query", "A database backup"] },
      ]
    }
  ],
  algorithms: [
    {
      easy: [
        { q: "What is the time complexity of accessing an array element by index?", correct: "O(1)", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"] },
        { q: "Which data structure uses LIFO (Last In First Out)?", correct: "Stack", options: ["Stack", "Queue", "Array", "Tree"] },
        { q: "What is a linked list?", correct: "A sequence of nodes where each node points to the next", options: ["A sequence of nodes where each node points to the next", "A list of links", "An array of pointers", "A sorted list"] },
      ],
      medium: [
        { q: "What is the time complexity of binary search?", correct: "O(log n)", options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"] },
        { q: "What is a hash collision?", correct: "When two keys hash to the same index", options: ["When two keys hash to the same index", "When hash functions fail", "A type of error", "When data is corrupted"] },
        { q: "What is depth-first search (DFS)?", correct: "A graph traversal that goes as deep as possible before backtracking", options: ["A graph traversal that goes as deep as possible before backtracking", "A search that looks at depth", "A way to measure graph depth", "A sorting algorithm"] },
      ],
      hard: [
        { q: "What is dynamic programming?", correct: "Solving problems by breaking them into overlapping subproblems", options: ["Solving problems by breaking them into overlapping subproblems", "Programming that changes at runtime", "A type of memory allocation", "A programming paradigm"] },
        { q: "What is the time complexity of quicksort in the worst case?", correct: "O(n²)", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"] },
        { q: "What is a balanced binary tree?", correct: "A tree where left and right subtrees differ in height by at most 1", options: ["A tree where left and right subtrees differ in height by at most 1", "A tree with equal nodes on each side", "A perfectly symmetric tree", "A sorted tree"] },
      ]
    }
  ],
  webdev: [
    {
      easy: [
        { q: "What does HTML stand for?", correct: "HyperText Markup Language", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language"] },
        { q: "Which CSS property changes text color?", correct: "color", options: ["color", "text-color", "font-color", "foreground"] },
        { q: "What does CSS stand for?", correct: "Cascading Style Sheets", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"] },
      ],
      medium: [
        { q: "What is the box model in CSS?", correct: "The structure of content, padding, border, and margin", options: ["The structure of content, padding, border, and margin", "A way to create boxes", "A layout algorithm", "A design pattern"] },
        { q: "What is the difference between inline and block elements?", correct: "Block elements start on new lines, inline elements don't", options: ["Block elements start on new lines, inline elements don't", "Inline elements are faster", "They are the same", "Block elements are deprecated"] },
        { q: "What is AJAX?", correct: "Asynchronous JavaScript and XML for updating web pages", options: ["Asynchronous JavaScript and XML for updating web pages", "A JavaScript framework", "A server technology", "A programming language"] },
      ],
      hard: [
        { q: "What is the difference between localStorage and sessionStorage?", correct: "localStorage persists after browser close, sessionStorage doesn't", options: ["localStorage persists after browser close, sessionStorage doesn't", "They are the same", "sessionStorage is larger", "localStorage is deprecated"] },
        { q: "What is a Service Worker?", correct: "A script that runs in the background for offline functionality", options: ["A script that runs in the background for offline functionality", "A server-side worker", "A type of web server", "A JavaScript framework"] },
        { q: "What is the Shadow DOM?", correct: "A way to encapsulate DOM and styles in web components", options: ["A way to encapsulate DOM and styles in web components", "A hidden part of the DOM", "A DOM copy", "A deprecated API"] },
      ]
    }
  ]
};

const QUESTION_LIBRARY = Object.freeze(
  Object.entries(questionTemplates).flatMap(([category, difficultySets]) => {
    const set = difficultySets[0] || {};
    return ['easy', 'medium', 'hard'].flatMap(difficulty => {
      const questions = Array.isArray(set[difficulty]) ? set[difficulty] : [];
      return questions.map(question => ({
        ...question,
        category,
        difficulty
      }));
    });
  })
);

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getQuestionKey(questionText) {
  return String(questionText || '').trim().toLowerCase();
}

function dedupeByQuestionText(questions) {
  const seen = new Set();
  return questions.filter(question => {
    const key = getQuestionKey(question.question);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getLibraryQuestions(categories, difficulty, includeAllDifficulties = false) {
  const filtered = QUESTION_LIBRARY.filter(question => {
    if (!categories.includes(question.category)) return false;
    if (includeAllDifficulties) return true;
    return question.difficulty === difficulty;
  });

  return filtered
    .map(question => {
      const normalized = normalizeQuestion(question, categories);
      if (!normalized) return null;
      return {
        ...normalized,
        difficulty: question.difficulty
      };
    })
    .filter(Boolean);
}

function normalizeQuestion(rawQuestion, categories) {
  if (!rawQuestion || typeof rawQuestion !== 'object') return null;

  const questionText = String(rawQuestion.q || '').trim();
  const correct = String(rawQuestion.correct || '').trim();
  if (!questionText || !correct) return null;

  const category = categories.includes(rawQuestion.category)
    ? rawQuestion.category
    : categories[0];

  const options = Array.isArray(rawQuestion.options)
    ? rawQuestion.options.map(option => String(option).trim()).filter(Boolean)
    : [];

  if (!options.includes(correct)) {
    options.unshift(correct);
  }

  const distinctOptions = Array.from(new Set(options));
  if (distinctOptions.length < 4) return null;

  return {
    question: questionText,
    options: distinctOptions.slice(0, 4),
    correctAnswer: correct,
    category
  };
}

async function generateMockQuestions(categories, difficulty, count) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const primaryPool = dedupeByQuestionText(
    getLibraryQuestions(categories, difficulty)
  );
  const primaryKeys = new Set(primaryPool.map(question => getQuestionKey(question.question)));
  const extendedPool = dedupeByQuestionText(
    getLibraryQuestions(categories, difficulty, true)
  ).filter(question => !primaryKeys.has(getQuestionKey(question.question)));

  const availableQuestions = [...primaryPool, ...extendedPool];
  const selected = shuffleArray(availableQuestions).slice(0, Math.min(count, availableQuestions.length));

  if (selected.length < count) {
    console.warn(
      `Only ${selected.length} unique questions available for ${difficulty}. Requested ${count}.`
    );
  }

  return selected.map((question, index) => ({
    id: index + 1,
    question: question.question,
    options: shuffleArray(question.options),
    correctAnswer: question.correctAnswer,
    category: question.category
  }));
}


export async function generateQuestions(categories, difficulty, count, provider = 'ollama', model = 'llama3') {
  // If mock provider, skip LLM and use library directly
  if (provider === 'mock') {
    return generateMockQuestions(categories, difficulty, count);
  }

  const providerConfig = LLM_PROVIDERS.find(p => p.id === provider);
  const apiUrl = providerConfig?.url || import.meta.env.VITE_LLM_API_URL || 'http://localhost:11434/v1/chat/completions';
  const modelName = model || import.meta.env.VITE_LLM_MODEL || 'llama3';

  const prompt = `Generate ${count} multiple-choice trivia questions about ${categories.join(', ')} at ${difficulty} difficulty level. 
  Return a raw JSON array (no markdown code blocks) of objects with these keys:
  - "q": Request question text
  - "correct": The correct answer text
  - "options": An array of 4 distinct options including the correct answer
  - "category": The specific category ID from this list: ${categories.join(', ')}
  
  Ensure the JSON is valid.`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: "You are a helpful assistant that generates trivia questions in strictly valid JSON format." },
          { role: "user", content: prompt }
        ],
        stream: false,
        temperature: 0.7,
        format: "json"
      })
    });

    if (!response.ok) {
      throw new Error(`LLM API Error: ${response.statusText}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Clean up if it's wrapped in markdown
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedQuestions;
    try {
        parsedQuestions = JSON.parse(content);
    } catch (e) {
        console.error("Failed to parse LLM response JSON:", content);
        throw e;
    }

    if (!Array.isArray(parsedQuestions)) {
         if (parsedQuestions.questions && Array.isArray(parsedQuestions.questions)) {
             parsedQuestions = parsedQuestions.questions;
         } else {
             throw new Error("LLM did not return an array of questions");
         }
    }
    
    const normalized = parsedQuestions
      .map(q => normalizeQuestion(q, categories))
      .filter(Boolean);

    const uniqueNormalized = dedupeByQuestionText(normalized);
    if (uniqueNormalized.length === 0) {
      throw new Error('LLM returned no valid questions');
    }

    const libraryQuestions = getLibraryQuestions(categories, difficulty);
    const usedKeys = new Set(uniqueNormalized.map(q => getQuestionKey(q.question)));
    const fallbackQuestions = libraryQuestions.filter(
      q => !usedKeys.has(getQuestionKey(q.question))
    );

    const needed = Math.max(0, count - uniqueNormalized.length);
    let fallback = shuffleArray(fallbackQuestions).slice(0, needed);

    if (fallback.length < needed) {
      const extraNeeded = needed - fallback.length;
      const extendedQuestions = getLibraryQuestions(categories, difficulty, true).filter(
        q => !usedKeys.has(getQuestionKey(q.question))
      );
      const fallbackKeys = new Set(fallback.map(q => getQuestionKey(q.question)));
      const extraPool = extendedQuestions.filter(
        q => !fallbackKeys.has(getQuestionKey(q.question))
      );
      fallback = [...fallback, ...shuffleArray(extraPool).slice(0, extraNeeded)];
    }

    const combined = shuffleArray([...uniqueNormalized, ...fallback]);

    if (combined.length < count) {
      console.warn(
        `Only ${combined.length} unique questions available. Requested ${count}.`
      );
    }

    // Validate and format
    return combined.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: shuffleArray(q.options),
      correctAnswer: q.correctAnswer,
      category: q.category
    }));

  } catch (error) {
    console.warn("Failed to fetch from LLM, falling back to mock data:", error);
    return generateMockQuestions(categories, difficulty, count);
  }
}

export const CATEGORIES = [
  { id: 'javascript', name: 'JavaScript', emoji: '🟨' },
  { id: 'python', name: 'Python', emoji: '🐍' },
  { id: 'java', name: 'Java', emoji: '☕' },
  { id: 'cpp', name: 'C++', emoji: '⚙️' },
  { id: 'sql', name: 'SQL', emoji: '🗄️' },
  { id: 'algorithms', name: 'Algorithms', emoji: '🧮' },
  { id: 'webdev', name: 'Web Dev', emoji: '🌐' }
];

export const DIFFICULTIES = ['easy', 'medium', 'hard'];

export const QUESTION_COUNTS = [5, 10, 15, 20];

// Fetch available models from LM Studio
export async function fetchLMStudioModels() {
  try {
    const response = await fetch('http://localhost:1234/v1/models', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models from LM Studio');
    }

    const data = await response.json();
    
    // LM Studio returns models in format: { data: [{ id: "model-name", ... }] }
    if (data.data && Array.isArray(data.data)) {
      return data.data.map(model => ({
        id: model.id,
        name: model.id.split('/').pop() || model.id // Use just the model name without path
      }));
    }
    
    return [];
  } catch (error) {
    console.warn('Failed to fetch LM Studio models:', error);
    return [];
  }
}

// Fetch available models from Ollama
export async function fetchOllamaModels() {
  try {
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models from Ollama');
    }

    const data = await response.json();
    
    // Ollama returns models in format: { models: [{ name: "model-name", ... }] }
    if (data.models && Array.isArray(data.models)) {
      return data.models.map(model => ({
        id: model.name,
        name: model.name
      }));
    }
    
    return [];
  } catch (error) {
    console.warn('Failed to fetch Ollama models:', error);
    return [];
  }
}
