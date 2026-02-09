// Mock LLM service for generating trivia questions
// In a production environment, this would connect to a local LLM API

// LLM Provider configurations
export const LLM_PROVIDERS = [
  {
    id: 'ollama',
    name: 'Ollama',
    url: '/api/ollama/v1/chat/completions',
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
    url: '/api/lmstudio/v1/chat/completions',
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

const LLM_API_URL = import.meta.env.VITE_LLM_API_URL || '/api/ollama/v1/chat/completions';
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'llama3';

const questionTemplates = {
  javascript: [
    {
      // JavaScript Easy Questions
      easy: [
        { q: "What keyword is used to declare a variable in JavaScript?", correct: "var, let, or const", options: ["var, let, or const", "int", "variable", "declare"] },
        { q: "Which method is used to add an element to the end of an array?", correct: "push()", options: ["push()", "append()", "add()", "insert()"] },
        { q: "What does JSON stand for?", correct: "JavaScript Object Notation", options: ["JavaScript Object Notation", "Java Serialized Object Notation", "JavaScript Online Network", "Java Source Object Name"] },
        { q: "How do you write a single-line comment in JavaScript?", correct: "//", options: ["//", "/*", "#", "--"] },
        { q: "Which operator is used for strict equality in JavaScript?", correct: "===", options: ["===", "==", "=", "equals()"] },
        { q: "What is the correct way to create a function in JavaScript?", correct: "function myFunction() {}", options: ["function myFunction() {}", "def myFunction():", "func myFunction() {}", "fn myFunction() {}"] },
        { q: "Which method removes the last element from an array?", correct: "pop()", options: ["pop()", "remove()", "delete()", "removeLast()"] },
        { q: "What keyword is used to create a constant in JavaScript?", correct: "const", options: ["const", "constant", "final", "readonly"] },
        { q: "Which method converts a string to uppercase?", correct: "toUpperCase()", options: ["toUpperCase()", "upper()", "uppercase()", "toUpper()"] },
        { q: "What is the default value of an uninitialized variable?", correct: "undefined", options: ["undefined", "null", "0", "empty"] },
        { q: "Which method returns the length of a string?", correct: "length", options: ["length", "size()", "count()", "len()"] },
        { q: "How do you create an array in JavaScript?", correct: "[]", options: ["[]", "{}", "()", "array()"] },
        { q: "Which method adds an element to the beginning of an array?", correct: "unshift()", options: ["unshift()", "prepend()", "addFirst()", "push()"] },
        { q: "What does NaN stand for in JavaScript?", correct: "Not a Number", options: ["Not a Number", "Not a Null", "New Array Node", "Numeric and Null"] },
        { q: "Which method checks if a value exists in an array?", correct: "includes()", options: ["includes()", "contains()", "has()", "exists()"] },
        { q: "What is the result of typeof null in JavaScript?", correct: "object", options: ["object", "null", "undefined", "number"] },
        { q: "Which method combines two or more arrays?", correct: "concat()", options: ["concat()", "merge()", "combine()", "join()"] },
        { q: "What is the correct syntax for an if statement?", correct: "if (condition) {}", options: ["if (condition) {}", "if condition:", "if condition then", "if {condition}"] },
        { q: "Which keyword is used to exit a loop?", correct: "break", options: ["break", "exit", "stop", "return"] },
        { q: "What is the file extension for JavaScript files?", correct: ".js", options: [".js", ".java", ".javascript", ".jsx"] },
        { q: "Which method converts a string to lowercase?", correct: "toLowerCase()", options: ["toLowerCase()", "lower()", "lowercase()", "toLower()"] },
        { q: "What does the return statement do?", correct: "Returns a value from a function", options: ["Returns a value from a function", "Exits the program", "Restarts a loop", "Creates a variable"] },
      ],
      // JavaScript Medium Questions
      medium: [
        { q: "What is a closure in JavaScript?", correct: "A function that has access to variables in its outer scope", options: ["A function that has access to variables in its outer scope", "A method to close files", "A way to end loops", "A type of object"] },
        { q: "What does the 'this' keyword refer to in JavaScript?", correct: "The object that is executing the current function", options: ["The object that is executing the current function", "The global window object always", "The parent function", "A reserved keyword with no meaning"] },
        { q: "What is event bubbling in JavaScript?", correct: "When an event propagates from child to parent elements", options: ["When an event propagates from child to parent elements", "When events get cancelled", "A method to create new events", "A way to sort events"] },
        { q: "What is the difference between let and var?", correct: "let has block scope, var has function scope", options: ["let has block scope, var has function scope", "They are exactly the same", "let is faster", "var is deprecated"] },
        { q: "What is destructuring in JavaScript?", correct: "A way to extract values from arrays or objects", options: ["A way to extract values from arrays or objects", "A method to delete objects", "A way to break code", "A debugging technique"] },
        { q: "What is a Promise in JavaScript?", correct: "An object representing eventual completion of an async operation", options: ["An object representing eventual completion of an async operation", "A guarantee of execution", "A type of function", "A loop structure"] },
        { q: "What does the spread operator (...) do?", correct: "Expands an iterable into individual elements", options: ["Expands an iterable into individual elements", "Creates multiple copies", "Spreads code across files", "Optimizes performance"] },
        { q: "What is the purpose of async/await?", correct: "To handle asynchronous code more readably", options: ["To handle asynchronous code more readably", "To make code run faster", "To create animations", "To wait for user input"] },
        { q: "What is the difference between null and undefined?", correct: "null is assigned, undefined means not initialized", options: ["null is assigned, undefined means not initialized", "They are the same", "null is newer", "undefined is deprecated"] },
        { q: "What is array destructuring?", correct: "Extracting array values into distinct variables", options: ["Extracting array values into distinct variables", "Deleting array elements", "Sorting arrays", "Creating arrays"] },
        { q: "What is the purpose of map() method?", correct: "Creates a new array with transformed elements", options: ["Creates a new array with transformed elements", "Finds an element in array", "Sorts an array", "Deletes array elements"] },
        { q: "What is event delegation?", correct: "Using a parent element to handle events for its children", options: ["Using a parent element to handle events for its children", "Assigning events to delegates", "Removing event listeners", "Creating custom events"] },
        { q: "What is the difference between forEach and map?", correct: "map returns a new array, forEach doesn't", options: ["map returns a new array, forEach doesn't", "They are the same", "forEach is faster", "map is deprecated"] },
        { q: "What is a callback function?", correct: "A function passed as an argument to another function", options: ["A function passed as an argument to another function", "A function that calls back the server", "A recursive function", "A deprecated pattern"] },
        { q: "What is the purpose of filter() method?", correct: "Creates a new array with elements that pass a test", options: ["Creates a new array with elements that pass a test", "Removes all elements", "Sorts elements", "Finds one element"] },
        { q: "What is the ternary operator?", correct: "A shorthand for if-else: condition ? true : false", options: ["A shorthand for if-else: condition ? true : false", "A three-way comparison", "A mathematical operator", "A loop structure"] },
        { q: "What is the difference between slice and splice?", correct: "slice doesn't modify original, splice does", options: ["slice doesn't modify original, splice does", "They are the same", "slice is faster", "splice is deprecated"] },
        { q: "What is the purpose of reduce() method?", correct: "Reduces array to a single value", options: ["Reduces array to a single value", "Removes elements", "Sorts elements", "Filters elements"] },
        { q: "What is template literal in JavaScript?", correct: "A string enclosed in backticks with embedded expressions", options: ["A string enclosed in backticks with embedded expressions", "A code template", "A design pattern", "A deprecated feature"] },
        { q: "What is the difference between innerHTML and textContent?", correct: "innerHTML parses HTML, textContent doesn't", options: ["innerHTML parses HTML, textContent doesn't", "They are the same", "textContent is faster", "innerHTML is deprecated"] },
        { q: "What is the purpose of Object.keys()?", correct: "Returns an array of object's property names", options: ["Returns an array of object's property names", "Creates object keys", "Locks object properties", "Deletes object keys"] },
      ],
      // JavaScript Hard Questions
      hard: [
        { q: "What is the difference between '==' and '===' in JavaScript?", correct: "'===' checks type and value, '==' only checks value", options: ["'===' checks type and value, '==' only checks value", "They are exactly the same", "'==' is faster than '==='", "'===' is deprecated"] },
        { q: "What is the event loop in JavaScript?", correct: "A mechanism that handles asynchronous operations", options: ["A mechanism that handles asynchronous operations", "A loop that runs events", "A function that creates loops", "A way to iterate arrays"] },
        { q: "What does hoisting mean in JavaScript?", correct: "Variable and function declarations are moved to the top of their scope", options: ["Variable and function declarations are moved to the top of their scope", "A way to lift objects", "A method to increase performance", "A debugging technique"] },
        { q: "What is the prototype chain in JavaScript?", correct: "A mechanism for inheritance through object prototypes", options: ["A mechanism for inheritance through object prototypes", "A linked list of objects", "A debugging tool", "A performance optimization"] },
        { q: "What is currying in JavaScript?", correct: "Transforming a function to take arguments one at a time", options: ["Transforming a function to take arguments one at a time", "A cooking method", "A way to curry data", "A design pattern"] },
        { q: "What is memoization?", correct: "Caching function results for performance optimization", options: ["Caching function results for performance optimization", "A memory management technique", "A type of memory", "A debugging method"] },
        { q: "What is the difference between call, apply, and bind?", correct: "call takes args separately, apply takes array, bind returns new function", options: ["call takes args separately, apply takes array, bind returns new function", "They are the same", "call is fastest", "bind is deprecated"] },
        { q: "What is a WeakMap in JavaScript?", correct: "A Map with weak references that allows garbage collection", options: ["A Map with weak references that allows garbage collection", "A slow Map", "A deprecated Map", "A Map with limited features"] },
        { q: "What is the Temporal Dead Zone?", correct: "The period between entering scope and variable initialization", options: ["The period between entering scope and variable initialization", "A time zone", "A deprecated feature", "A performance issue"] },
        { q: "What is a Proxy in JavaScript?", correct: "An object that intercepts and customizes operations on another object", options: ["An object that intercepts and customizes operations on another object", "A network proxy", "A design pattern", "A deprecated feature"] },
        { q: "What is the difference between debouncing and throttling?", correct: "Debouncing delays execution, throttling limits execution rate", options: ["Debouncing delays execution, throttling limits execution rate", "They are the same", "Debouncing is faster", "Throttling is deprecated"] },
        { q: "What is the purpose of Symbol in JavaScript?", correct: "Creates unique, immutable identifiers", options: ["Creates unique, immutable identifiers", "A mathematical symbol", "A deprecated type", "A string type"] },
        { q: "What is a generator function?", correct: "A function that can pause and resume execution", options: ["A function that can pause and resume execution", "A function that generates code", "A random number generator", "A deprecated feature"] },
        { q: "What is the difference between shallow and deep copy?", correct: "Shallow copies references, deep copies all nested objects", options: ["Shallow copies references, deep copies all nested objects", "They are the same", "Shallow is always better", "Deep is deprecated"] },
        { q: "What is the purpose of Reflect API?", correct: "Provides methods for interceptable JavaScript operations", options: ["Provides methods for interceptable JavaScript operations", "Reflects code back", "A debugging tool", "A deprecated API"] },
      ]
    }
  ],
  // Python Questions
  python: [
    {
      // Python Easy Questions
      easy: [
        { q: "What keyword is used to define a function in Python?", correct: "def", options: ["def", "function", "func", "define"] },
        { q: "Which of these is a Python data type?", correct: "list", options: ["list", "array", "ArrayList", "vector"] },
        { q: "What symbol is used for comments in Python?", correct: "#", options: ["#", "//", "/*", "--"] },
        { q: "How do you start a for loop in Python?", correct: "for item in items:", options: ["for item in items:", "for (item in items)", "foreach item in items", "for item of items:"] },
        { q: "What is the correct file extension for Python files?", correct: ".py", options: [".py", ".python", ".pt", ".pyt"] },
        { q: "Which keyword is used to import modules?", correct: "import", options: ["import", "include", "require", "using"] },
        { q: "What is the output of print(type(5))?", correct: "<class 'int'>", options: ["<class 'int'>", "integer", "int", "number"] },
        { q: "How do you create a dictionary in Python?", correct: "{}", options: ["{}", "[]", "()", "dict()"] },
        { q: "What keyword is used for conditional statements?", correct: "if", options: ["if", "when", "condition", "check"] },
        { q: "Which operator is used for exponentiation in Python?", correct: "**", options: ["**", "^", "exp", "pow"] },
        { q: "How do you define a string in Python?", correct: "Both single and double quotes", options: ["Both single and double quotes", "Only double quotes", "Only single quotes", "Triple quotes only"] },
        { q: "What method adds an element to the end of a list?", correct: "append()", options: ["append()", "add()", "push()", "insert()"] },
        { q: "What is the correct way to create a class?", correct: "class MyClass:", options: ["class MyClass:", "def MyClass:", "Class MyClass:", "class MyClass()"] },
        { q: "Which keyword is used to handle exceptions?", correct: "try", options: ["try", "catch", "error", "handle"] },
        { q: "What is the result of 10 // 3 in Python?", correct: "3", options: ["3", "3.33", "3.0", "4"] },
        { q: "How do you create a tuple in Python?", correct: "()", options: ["()", "[]", "{}", "tuple()"] },
        { q: "What is the Boolean value for empty list?", correct: "False", options: ["False", "True", "None", "0"] },
        { q: "Which keyword is used to exit a function?", correct: "return", options: ["return", "exit", "break", "end"] },
        { q: "What is the correct syntax for multi-line strings?", correct: "Triple quotes", options: ["Triple quotes", "Multiple single quotes", "Backslash", "Plus operator"] },
        { q: "What does len() function return?", correct: "The length of an object", options: ["The length of an object", "The type of object", "The value of object", "The size in bytes"] },
        { q: "How do you check if a key exists in a dictionary?", correct: "key in dictionary", options: ["key in dictionary", "dictionary.hasKey(key)", "dictionary.contains(key)", "key exists dictionary"] },
      ],
      // Python Medium Questions
      medium: [
        { q: "What is a list comprehension in Python?", correct: "A concise way to create lists", options: ["A concise way to create lists", "A way to compress lists", "A method to understand lists", "A debugging tool"] },
        { q: "What does the 'self' keyword represent in Python classes?", correct: "The instance of the class", options: ["The instance of the class", "The parent class", "A global variable", "The class name"] },
        { q: "What is the difference between append() and extend() in Python lists?", correct: "append() adds one element, extend() adds multiple", options: ["append() adds one element, extend() adds multiple", "They are the same", "extend() is faster", "append() is deprecated"] },
        { q: "What is a lambda function?", correct: "An anonymous function defined with lambda keyword", options: ["An anonymous function defined with lambda keyword", "A Greek function", "A special loop", "A class method"] },
        { q: "What is the difference between == and is?", correct: "== compares values, is compares identity", options: ["== compares values, is compares identity", "They are the same", "is is deprecated", "== is faster"] },
        { q: "What is a dictionary comprehension?", correct: "A concise way to create dictionaries", options: ["A concise way to create dictionaries", "A way to compress dictionaries", "A method to understand dictionaries", "A debugging tool"] },
        { q: "What does *args do in a function definition?", correct: "Allows variable number of positional arguments", options: ["Allows variable number of positional arguments", "Multiplies arguments", "Creates a pointer", "Imports all arguments"] },
        { q: "What is the purpose of __init__?", correct: "Constructor method for initializing objects", options: ["Constructor method for initializing objects", "Main function", "Import initializer", "End of class"] },
        { q: "What is the difference between remove() and pop()?", correct: "remove() removes by value, pop() removes by index", options: ["remove() removes by value, pop() removes by index", "They are the same", "pop() is faster", "remove() is deprecated"] },
        { q: "What is a set in Python?", correct: "An unordered collection of unique elements", options: ["An unordered collection of unique elements", "An ordered list", "A key-value pair", "A function parameter"] },
        { q: "What does the 'with' statement do?", correct: "Ensures proper resource management and cleanup", options: ["Ensures proper resource management and cleanup", "Creates a namespace", "Imports modules", "Defines scope"] },
        { q: "What is the difference between shallow and deep copy?", correct: "Shallow copies references, deep copies all nested objects", options: ["Shallow copies references, deep copies all nested objects", "They are the same", "Shallow is faster", "Deep is deprecated"] },
        { q: "What is multiple inheritance in Python?", correct: "A class inheriting from multiple parent classes", options: ["A class inheriting from multiple parent classes", "Multiple classes in one file", "Inheriting multiple times", "A deprecated feature"] },
        { q: "What does enumerate() do?", correct: "Returns index and value pairs from an iterable", options: ["Returns index and value pairs from an iterable", "Counts elements", "Creates numbers", "Sorts items"] },
        { q: "What is the purpose of __str__ method?", correct: "Defines string representation of an object", options: ["Defines string representation of an object", "Converts to string", "String concatenation", "String comparison"] },
        { q: "What is the difference between tuple and list?", correct: "Tuples are immutable, lists are mutable", options: ["Tuples are immutable, lists are mutable", "They are the same", "Tuples are faster", "Lists are deprecated"] },
        { q: "What does zip() function do?", correct: "Combines multiple iterables into tuples", options: ["Combines multiple iterables into tuples", "Compresses files", "Creates archives", "Sorts elements"] },
        { q: "What is a class method?", correct: "A method that operates on the class itself", options: ["A method that operates on the class itself", "A method in a class", "A static method", "A deprecated method"] },
        { q: "What is the purpose of __name__ == '__main__'?", correct: "Checks if script is run directly", options: ["Checks if script is run directly", "Defines main function", "Imports main module", "Sets variable name"] },
        { q: "What does map() function do?", correct: "Applies a function to all items in an iterable", options: ["Applies a function to all items in an iterable", "Creates a map", "Maps keys to values", "Plots on map"] },
      ],
      // Python Hard Questions
      hard: [
        { q: "What is a generator in Python?", correct: "A function that yields values one at a time", options: ["A function that yields values one at a time", "A way to create random numbers", "A class constructor", "A module importer"] },
        { q: "What is the Global Interpreter Lock (GIL) in Python?", correct: "A mutex that protects Python objects from concurrent access", options: ["A mutex that protects Python objects from concurrent access", "A way to lock variables", "A security feature", "A debugging tool"] },
        { q: "What is a decorator in Python?", correct: "A function that modifies another function", options: ["A function that modifies another function", "A way to decorate strings", "A design pattern", "A type of class"] },
        { q: "What is the difference between @staticmethod and @classmethod?", correct: "@classmethod receives class as first arg, @staticmethod doesn't", options: ["@classmethod receives class as first arg, @staticmethod doesn't", "They are the same", "@staticmethod is deprecated", "@classmethod is faster"] },
        { q: "What is metaclass in Python?", correct: "A class of a class that defines how a class behaves", options: ["A class of a class that defines how a class behaves", "A parent class", "An abstract class", "A deprecated feature"] },
        { q: "What is the purpose of __slots__?", correct: "Restricts attributes and reduces memory usage", options: ["Restricts attributes and reduces memory usage", "Creates time slots", "Defines slots for values", "A deprecated feature"] },
        { q: "What is monkey patching?", correct: "Dynamically modifying a class or module at runtime", options: ["Dynamically modifying a class or module at runtime", "A debugging technique", "A testing method", "A deprecated practice"] },
        { q: "What is the difference between yield and return?", correct: "yield pauses execution, return terminates it", options: ["yield pauses execution, return terminates it", "They are the same", "yield is deprecated", "return is faster"] },
        { q: "What is context manager protocol?", correct: "Implementation of __enter__ and __exit__ methods", options: ["Implementation of __enter__ and __exit__ methods", "A design pattern", "A deprecated feature", "A testing framework"] },
        { q: "What is the purpose of __new__ method?", correct: "Creates and returns a new instance before __init__", options: ["Creates and returns a new instance before __init__", "Creates new variables", "A deprecated method", "Same as __init__"] },
        { q: "What is descriptor protocol?", correct: "Objects defining __get__, __set__, __delete__", options: ["Objects defining __get__, __set__, __delete__", "A design pattern", "A deprecated feature", "A testing method"] },
        { q: "What is the difference between asyncio.run() and asyncio.create_task()?", correct: "run() starts event loop, create_task() schedules coroutine", options: ["run() starts event loop, create_task() schedules coroutine", "They are the same", "run() is deprecated", "create_task() is faster"] },
        { q: "What is the purpose of __call__ method?", correct: "Makes an instance callable like a function", options: ["Makes an instance callable like a function", "Calls methods", "A deprecated method", "A constructor"] },
        { q: "What is the difference between __getattr__ and __getattribute__?", correct: "__getattribute__ called for all attributes, __getattr__ for missing ones", options: ["__getattribute__ called for all attributes, __getattr__ for missing ones", "They are the same", "__getattr__ is deprecated", "__getattribute__ is faster"] },
        { q: "What is weakref in Python?", correct: "A reference that doesn't prevent garbage collection", options: ["A reference that doesn't prevent garbage collection", "A weak pointer", "A deprecated feature", "A broken reference"] },
      ]
    }
  ],
  // Java Questions - Including comprehensive Abstract Data Types coverage
  java: [
    {
      // Java Easy Questions - Including basic ADT operations
      easy: [
        { q: "What is the extension of Java source files?", correct: ".java", options: [".java", ".class", ".jar", ".jav"] },
        { q: "Which keyword is used to create a class in Java?", correct: "class", options: ["class", "Class", "define", "struct"] },
        { q: "What is the main method signature in Java?", correct: "public static void main(String[] args)", options: ["public static void main(String[] args)", "void main()", "public void main()", "static main()"] },
        { q: "Which interface does ArrayList implement?", correct: "List", options: ["List", "Array", "Collection", "Vector"] },
        { q: "How do you add an element to an ArrayList?", correct: "add()", options: ["add()", "append()", "push()", "insert()"] },
        { q: "Which collection does not allow duplicate elements?", correct: "Set", options: ["Set", "List", "Map", "Queue"] },
        { q: "What method returns the size of a collection?", correct: "size()", options: ["size()", "length()", "count()", "getSize()"] },
        { q: "Which class provides a resizable array implementation?", correct: "ArrayList", options: ["ArrayList", "Array", "Vector", "LinkedArray"] },
        { q: "What does HashMap store?", correct: "Key-value pairs", options: ["Key-value pairs", "Only keys", "Only values", "Arrays"] },
        { q: "Which data structure follows FIFO?", correct: "Queue", options: ["Queue", "Stack", "List", "Set"] },
        { q: "Which data structure follows LIFO?", correct: "Stack", options: ["Stack", "Queue", "List", "Set"] },
        { q: "What method removes all elements from a collection?", correct: "clear()", options: ["clear()", "removeAll()", "delete()", "empty()"] },
        { q: "Which collection allows null elements?", correct: "ArrayList", options: ["ArrayList", "TreeSet", "TreeMap", "PriorityQueue"] },
        { q: "What is the default initial capacity of ArrayList?", correct: "10", options: ["10", "16", "8", "32"] },
        { q: "Which method checks if a collection is empty?", correct: "isEmpty()", options: ["isEmpty()", "empty()", "isNull()", "size() == 0"] },
        { q: "What package contains Java collections?", correct: "java.util", options: ["java.util", "java.collection", "java.lang", "java.io"] },
        { q: "Which collection maintains insertion order?", correct: "LinkedHashSet", options: ["LinkedHashSet", "HashSet", "TreeSet", "Set"] },
        { q: "What method retrieves but does not remove the head of a Queue?", correct: "peek()", options: ["peek()", "poll()", "get()", "head()"] },
        { q: "Which collection is sorted automatically?", correct: "TreeSet", options: ["TreeSet", "HashSet", "ArrayList", "LinkedList"] },
        { q: "What is the parent interface of List, Set, and Queue?", correct: "Collection", options: ["Collection", "Iterable", "Object", "Interface"] },
        { q: "Which method adds an element at the end of LinkedList?", correct: "add()", options: ["add()", "addLast()", "append()", "push()"] },
        { q: "What does the get() method do in ArrayList?", correct: "Returns element at specified index", options: ["Returns element at specified index", "Gets all elements", "Gets size", "Gets first element"] },
      ],
      // Java Medium Questions - Including ADT implementation differences and complexity
      medium: [
        { q: "What is the difference between ArrayList and LinkedList?", correct: "ArrayList uses an array, LinkedList uses nodes", options: ["ArrayList uses an array, LinkedList uses nodes", "They are the same", "LinkedList is always faster", "ArrayList is deprecated"] },
        { q: "What is method overloading in Java?", correct: "Multiple methods with the same name but different parameters", options: ["Multiple methods with the same name but different parameters", "Methods that load other methods", "A way to optimize methods", "Methods with too many parameters"] },
        { q: "What does the 'static' keyword mean in Java?", correct: "The member belongs to the class, not instances", options: ["The member belongs to the class, not instances", "The variable cannot change", "The method cannot be overridden", "It's used for constants only"] },
        { q: "What is the time complexity of ArrayList.get()?", correct: "O(1)", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"] },
        { q: "What is the time complexity of LinkedList.get()?", correct: "O(n)", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"] },
        { q: "When should you use LinkedList over ArrayList?", correct: "When you need frequent insertions/deletions in the middle", options: ["When you need frequent insertions/deletions in the middle", "Always", "Never", "When you need random access"] },
        { q: "What is the difference between HashMap and TreeMap?", correct: "HashMap is unordered, TreeMap is sorted", options: ["HashMap is unordered, TreeMap is sorted", "They are the same", "TreeMap is always faster", "HashMap is deprecated"] },
        { q: "What happens when you iterate and modify a collection?", correct: "ConcurrentModificationException is thrown", options: ["ConcurrentModificationException is thrown", "Nothing happens", "The collection is locked", "Changes are ignored"] },
        { q: "What is the difference between HashSet and TreeSet?", correct: "HashSet is unordered, TreeSet is sorted", options: ["HashSet is unordered, TreeSet is sorted", "They are the same", "TreeSet is faster", "HashSet is deprecated"] },
        { q: "What does the Queue.poll() method do?", correct: "Retrieves and removes head, returns null if empty", options: ["Retrieves and removes head, returns null if empty", "Only retrieves head", "Throws exception if empty", "Adds element"] },
        { q: "What is the difference between Queue and Deque?", correct: "Deque allows insertion/removal at both ends", options: ["Deque allows insertion/removal at both ends", "They are the same", "Queue is faster", "Deque is deprecated"] },
        { q: "When should you use HashMap over TreeMap?", correct: "When you don't need sorted keys", options: ["When you don't need sorted keys", "Always", "Never", "When you need sorting"] },
        { q: "What is the time complexity of HashMap.get()?", correct: "O(1) average case", options: ["O(1) average case", "O(n)", "O(log n)", "O(n²)"] },
        { q: "What is the time complexity of TreeSet.add()?", correct: "O(log n)", options: ["O(log n)", "O(1)", "O(n)", "O(n²)"] },
        { q: "What is an Iterator in Java?", correct: "An object to traverse collections", options: ["An object to traverse collections", "A loop type", "A collection type", "A deprecated feature"] },
        { q: "What is the difference between Iterator and ListIterator?", correct: "ListIterator can traverse in both directions", options: ["ListIterator can traverse in both directions", "They are the same", "Iterator is faster", "ListIterator is deprecated"] },
        { q: "What does Collections.sort() require?", correct: "Elements to implement Comparable or provide Comparator", options: ["Elements to implement Comparable or provide Comparator", "Nothing special", "Elements to be numbers", "A sorted collection"] },
        { q: "What is the difference between Comparable and Comparator?", correct: "Comparable is in the class, Comparator is external", options: ["Comparable is in the class, Comparator is external", "They are the same", "Comparable is deprecated", "Comparator is faster"] },
        { q: "What is the load factor in HashMap?", correct: "The measure of how full the HashMap can be", options: ["The measure of how full the HashMap can be", "The loading speed", "The size of the map", "The number of buckets"] },
        { q: "What is the default load factor of HashMap?", correct: "0.75", options: ["0.75", "0.5", "1.0", "0.8"] },
        { q: "What happens when HashMap exceeds load factor?", correct: "It is rehashed and capacity is doubled", options: ["It is rehashed and capacity is doubled", "It throws exception", "Nothing happens", "Elements are removed"] },
      ],
      // Java Hard Questions - Including advanced ADT concepts
      hard: [
        { q: "What is the difference between abstract class and interface in Java?", correct: "Abstract classes can have implementation, interfaces cannot (before Java 8)", options: ["Abstract classes can have implementation, interfaces cannot (before Java 8)", "They are exactly the same", "Interfaces are faster", "Abstract classes are deprecated"] },
        { q: "What is a Java Stream?", correct: "A sequence of elements supporting sequential and parallel operations", options: ["A sequence of elements supporting sequential and parallel operations", "A way to read files", "A network connection", "A type of collection"] },
        { q: "What is the purpose of the 'volatile' keyword in Java?", correct: "It ensures visibility of changes to variables across threads", options: ["It ensures visibility of changes to variables across threads", "It makes variables unchangeable", "It's used for optimization", "It prevents inheritance"] },
        { q: "How does HashMap handle collisions?", correct: "Using separate chaining with linked lists (or trees in Java 8+)", options: ["Using separate chaining with linked lists (or trees in Java 8+)", "It doesn't allow collisions", "Using linear probing", "It throws exception"] },
        { q: "What is the difference between HashMap and ConcurrentHashMap?", correct: "ConcurrentHashMap is thread-safe", options: ["ConcurrentHashMap is thread-safe", "They are the same", "HashMap is faster", "ConcurrentHashMap is deprecated"] },
        { q: "When does HashMap convert linked list to tree?", correct: "When bucket size exceeds 8 elements", options: ["When bucket size exceeds 8 elements", "Never", "Always", "When size exceeds 16"] },
        { q: "What is the purpose of CopyOnWriteArrayList?", correct: "Thread-safe list for read-heavy scenarios", options: ["Thread-safe list for read-heavy scenarios", "A way to copy lists", "A deprecated class", "A write-optimized list"] },
        { q: "What is WeakHashMap used for?", correct: "Map with weak keys that allows garbage collection", options: ["Map with weak keys that allows garbage collection", "A slow HashMap", "A deprecated class", "A limited HashMap"] },
        { q: "How does TreeMap maintain sorted order?", correct: "Using a Red-Black tree", options: ["Using a Red-Black tree", "Using a heap", "Using an array", "Using a hash table"] },
        { q: "What is the time complexity of TreeMap operations?", correct: "O(log n)", options: ["O(log n)", "O(1)", "O(n)", "O(n²)"] },
        { q: "What is the difference between fail-fast and fail-safe iterators?", correct: "Fail-fast throws exception, fail-safe works on copy", options: ["Fail-fast throws exception, fail-safe works on copy", "They are the same", "Fail-fast is slower", "Fail-safe is deprecated"] },
        { q: "What is a PriorityQueue in Java?", correct: "A queue ordered by natural ordering or Comparator", options: ["A queue ordered by natural ordering or Comparator", "A high-priority queue", "A FIFO queue", "A deprecated class"] },
        { q: "What data structure does PriorityQueue use internally?", correct: "Heap", options: ["Heap", "Tree", "Array", "Linked List"] },
        { q: "What is the purpose of Collections.synchronizedList()?", correct: "Creates a thread-safe wrapper for a list", options: ["Creates a thread-safe wrapper for a list", "Synchronizes methods", "A deprecated method", "Sorts a list"] },
        { q: "What is the difference between Vector and ArrayList?", correct: "Vector is synchronized, ArrayList is not", options: ["Vector is synchronized, ArrayList is not", "They are the same", "ArrayList is deprecated", "Vector is faster"] },
      ]
    }
  ],
  // C++ Questions
  cpp: [
    {
      // C++ Easy Questions
      easy: [
        { q: "What symbol is used for pointers in C++?", correct: "*", options: ["*", "&", "->", "#"] },
        { q: "Which header file is needed for input/output in C++?", correct: "iostream", options: ["iostream", "stdio.h", "input.h", "io.h"] },
        { q: "What keyword is used for inheritance in C++?", correct: ":", options: [":", "extends", "inherits", "->"] },
        { q: "What is the file extension for C++ source files?", correct: ".cpp", options: [".cpp", ".c", ".cc", ".cplus"] },
        { q: "Which operator is used to access members of a pointer?", correct: "->", options: ["->", ".", "*", "&"] },
        { q: "What keyword is used to define a class?", correct: "class", options: ["class", "struct", "object", "type"] },
        { q: "What is the correct syntax for a single-line comment?", correct: "//", options: ["//", "/*", "#", "--"] },
        { q: "Which namespace contains cout and cin?", correct: "std", options: ["std", "io", "cout", "system"] },
        { q: "What keyword is used to allocate memory dynamically?", correct: "new", options: ["new", "malloc", "alloc", "create"] },
        { q: "What keyword is used to free dynamically allocated memory?", correct: "delete", options: ["delete", "free", "remove", "destroy"] },
        { q: "What is the default access specifier for class members?", correct: "private", options: ["private", "public", "protected", "default"] },
        { q: "Which loop is guaranteed to execute at least once?", correct: "do-while", options: ["do-while", "while", "for", "foreach"] },
        { q: "What is the size of int typically in C++?", correct: "4 bytes", options: ["4 bytes", "2 bytes", "8 bytes", "16 bytes"] },
        { q: "What symbol is used for reference in C++?", correct: "&", options: ["&", "*", "@", "#"] },
        { q: "What keyword is used to define a constant?", correct: "const", options: ["const", "constant", "final", "readonly"] },
        { q: "Which operator is used for scope resolution?", correct: "::", options: ["::", ".", "->", "::"] },
        { q: "What is the main function return type?", correct: "int", options: ["int", "void", "main", "char"] },
        { q: "What is the correct way to declare an array?", correct: "int arr[10]", options: ["int arr[10]", "array<int, 10>", "int[] arr", "arr[10] int"] },
        { q: "What header is needed for string class?", correct: "string", options: ["string", "cstring", "str.h", "strings"] },
        { q: "What is the increment operator in C++?", correct: "++", options: ["++", "+=1", "inc", "add"] },
        { q: "What keyword is used to exit a loop early?", correct: "break", options: ["break", "exit", "stop", "return"] },
      ],
      // C++ Medium Questions
      medium: [
        { q: "What is RAII in C++?", correct: "Resource Acquisition Is Initialization", options: ["Resource Acquisition Is Initialization", "Random Access Integer Initialization", "Rapid Array Item Iteration", "Reference And Interface Implementation"] },
        { q: "What is the difference between new and malloc?", correct: "new calls constructor, malloc does not", options: ["new calls constructor, malloc does not", "They are the same", "malloc is faster", "new is deprecated"] },
        { q: "What is a virtual function in C++?", correct: "A function that can be overridden in derived classes", options: ["A function that can be overridden in derived classes", "A function that doesn't exist", "A simulated function", "An inline function"] },
        { q: "What is the difference between struct and class?", correct: "struct members are public by default, class members are private", options: ["struct members are public by default, class members are private", "They are the same", "struct is deprecated", "class is faster"] },
        { q: "What is a copy constructor?", correct: "A constructor that creates object from another object", options: ["A constructor that creates object from another object", "A constructor that copies files", "A deprecated feature", "A default constructor"] },
        { q: "What is function overloading?", correct: "Multiple functions with same name but different parameters", options: ["Multiple functions with same name but different parameters", "Functions that load others", "A deprecated feature", "An optimization technique"] },
        { q: "What is operator overloading?", correct: "Defining custom behavior for operators", options: ["Defining custom behavior for operators", "Using too many operators", "A deprecated feature", "An error condition"] },
        { q: "What is the difference between pass by value and pass by reference?", correct: "Pass by value copies, pass by reference uses original", options: ["Pass by value copies, pass by reference uses original", "They are the same", "Pass by value is faster", "Pass by reference is deprecated"] },
        { q: "What is a destructor?", correct: "A method called when object is destroyed", options: ["A method called when object is destroyed", "A method that destroys objects", "A deprecated feature", "A constructor"] },
        { q: "What is the purpose of inline functions?", correct: "Suggest compiler to expand function code at call site", options: ["Suggest compiler to expand function code at call site", "Functions in a line", "Deprecated functions", "Fast functions"] },
        { q: "What is multiple inheritance?", correct: "A class inheriting from multiple base classes", options: ["A class inheriting from multiple base classes", "Inheriting multiple times", "A deprecated feature", "Multiple classes in one file"] },
        { q: "What is the diamond problem?", correct: "Ambiguity in multiple inheritance", options: ["Ambiguity in multiple inheritance", "A shape problem", "A deprecated issue", "A design pattern"] },
        { q: "What is a pure virtual function?", correct: "A virtual function with no implementation (= 0)", options: ["A virtual function with no implementation (= 0)", "A very clean function", "A deprecated function", "A virtual function"] },
        { q: "What is an abstract class?", correct: "A class with at least one pure virtual function", options: ["A class with at least one pure virtual function", "A class without implementation", "A deprecated class", "A template class"] },
        { q: "What is the difference between delete and delete[]?", correct: "delete for single object, delete[] for arrays", options: ["delete for single object, delete[] for arrays", "They are the same", "delete[] is deprecated", "delete is faster"] },
        { q: "What is a friend function?", correct: "A function that can access private members of a class", options: ["A function that can access private members of a class", "A helpful function", "A deprecated feature", "A member function"] },
        { q: "What is static member variable?", correct: "A variable shared by all instances of a class", options: ["A variable shared by all instances of a class", "A variable that cannot change", "A deprecated feature", "A constant variable"] },
        { q: "What is namespace in C++?", correct: "A declarative region for identifiers", options: ["A declarative region for identifiers", "A space for names", "A deprecated feature", "A class container"] },
        { q: "What is the this pointer?", correct: "A pointer to the current object", options: ["A pointer to the current object", "A pointer to parent", "A deprecated pointer", "A null pointer"] },
        { q: "What is const correctness?", correct: "Proper use of const to prevent unintended modifications", options: ["Proper use of const to prevent unintended modifications", "Always using const", "A deprecated practice", "A design pattern"] },
      ],
      // C++ Hard Questions
      hard: [
        { q: "What is move semantics in C++?", correct: "A way to transfer resources without copying", options: ["A way to transfer resources without copying", "A way to move code around", "A relocation algorithm", "A memory management technique"] },
        { q: "What is the difference between std::unique_ptr and std::shared_ptr?", correct: "unique_ptr has exclusive ownership, shared_ptr allows multiple owners", options: ["unique_ptr has exclusive ownership, shared_ptr allows multiple owners", "They are the same", "shared_ptr is always better", "unique_ptr is deprecated"] },
        { q: "What is template metaprogramming?", correct: "Writing code that generates code at compile time", options: ["Writing code that generates code at compile time", "A way to create templates", "A debugging technique", "A design pattern"] },
        { q: "What is SFINAE?", correct: "Substitution Failure Is Not An Error", options: ["Substitution Failure Is Not An Error", "Super Fast Integer Algorithm", "Standard Function Interface", "Simple File Access"] },
        { q: "What is perfect forwarding?", correct: "Forwarding arguments while preserving their value category", options: ["Forwarding arguments while preserving their value category", "Perfect argument passing", "A deprecated feature", "A design pattern"] },
        { q: "What is the Rule of Three?", correct: "If you define copy constructor, copy assignment, or destructor, define all three", options: ["If you define copy constructor, copy assignment, or destructor, define all three", "Three design rules", "A deprecated rule", "Three inheritance levels"] },
        { q: "What is the Rule of Five?", correct: "Rule of Three plus move constructor and move assignment", options: ["Rule of Three plus move constructor and move assignment", "Five design rules", "A deprecated rule", "Five inheritance levels"] },
        { q: "What is std::forward used for?", correct: "Perfect forwarding in template functions", options: ["Perfect forwarding in template functions", "Moving forward in code", "A deprecated function", "Array forwarding"] },
        { q: "What is variadic template?", correct: "A template that accepts variable number of arguments", options: ["A template that accepts variable number of arguments", "A varying template", "A deprecated feature", "A template pattern"] },
        { q: "What is the difference between lvalue and rvalue?", correct: "lvalue has identity and cannot be moved, rvalue doesn't have identity", options: ["lvalue has identity and cannot be moved, rvalue doesn't have identity", "They are the same", "lvalue is deprecated", "rvalue is faster"] },
        { q: "What is std::move?", correct: "Casts lvalue to rvalue reference", options: ["Casts lvalue to rvalue reference", "Moves objects", "A deprecated function", "Copies objects"] },
        { q: "What is constexpr?", correct: "Specifies value can be evaluated at compile time", options: ["Specifies value can be evaluated at compile time", "A constant expression", "A deprecated keyword", "A runtime constant"] },
        { q: "What is memory alignment?", correct: "Arranging data in memory at specific boundaries", options: ["Arranging data in memory at specific boundaries", "Aligning code", "A deprecated concept", "A debugging technique"] },
        { q: "What is virtual table (vtable)?", correct: "A table of function pointers for dynamic dispatch", options: ["A table of function pointers for dynamic dispatch", "A virtual database", "A deprecated feature", "A lookup table"] },
        { q: "What is the difference between stack and heap memory?", correct: "Stack is automatic and faster, heap is dynamic and slower", options: ["Stack is automatic and faster, heap is dynamic and slower", "They are the same", "Heap is faster", "Stack is deprecated"] },
      ]
    }
  ],
  // SQL Questions
  sql: [
    {
      // SQL Easy Questions
      easy: [
        { q: "Which SQL statement is used to retrieve data?", correct: "SELECT", options: ["SELECT", "GET", "RETRIEVE", "FETCH"] },
        { q: "What keyword is used to filter results in SQL?", correct: "WHERE", options: ["WHERE", "FILTER", "IF", "WHEN"] },
        { q: "Which clause is used to sort results in SQL?", correct: "ORDER BY", options: ["ORDER BY", "SORT BY", "ARRANGE BY", "ORGANIZE BY"] },
        { q: "What keyword is used to insert new data?", correct: "INSERT", options: ["INSERT", "ADD", "CREATE", "NEW"] },
        { q: "What keyword is used to update existing data?", correct: "UPDATE", options: ["UPDATE", "MODIFY", "CHANGE", "EDIT"] },
        { q: "What keyword is used to delete data?", correct: "DELETE", options: ["DELETE", "REMOVE", "DROP", "ERASE"] },
        { q: "Which clause limits the number of returned rows?", correct: "LIMIT", options: ["LIMIT", "TOP", "COUNT", "MAX"] },
        { q: "What keyword is used to create a new table?", correct: "CREATE TABLE", options: ["CREATE TABLE", "NEW TABLE", "MAKE TABLE", "ADD TABLE"] },
        { q: "What keyword removes a table?", correct: "DROP TABLE", options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "DESTROY TABLE"] },
        { q: "Which aggregate function counts rows?", correct: "COUNT()", options: ["COUNT()", "SUM()", "TOTAL()", "NUM()"] },
        { q: "What keyword returns unique values only?", correct: "DISTINCT", options: ["DISTINCT", "UNIQUE", "DIFFERENT", "SINGLE"] },
        { q: "Which operator checks for NULL values?", correct: "IS NULL", options: ["IS NULL", "= NULL", "NULL", "EQUALS NULL"] },
        { q: "What keyword combines results from multiple SELECT statements?", correct: "UNION", options: ["UNION", "COMBINE", "MERGE", "JOIN"] },
        { q: "What wildcard matches any sequence of characters?", correct: "%", options: ["%", "*", "?", "_"] },
        { q: "Which keyword is used with aggregate functions to group results?", correct: "GROUP BY", options: ["GROUP BY", "GROUP", "COLLECT BY", "AGGREGATE BY"] },
        { q: "What keyword adds conditions to grouped results?", correct: "HAVING", options: ["HAVING", "WHERE", "FILTER", "IF"] },
        { q: "Which function returns the maximum value?", correct: "MAX()", options: ["MAX()", "MAXIMUM()", "TOP()", "HIGHEST()"] },
        { q: "What does SQL stand for?", correct: "Structured Query Language", options: ["Structured Query Language", "Simple Query Language", "Standard Question Language", "System Query Language"] },
        { q: "Which function returns the average value?", correct: "AVG()", options: ["AVG()", "AVERAGE()", "MEAN()", "AVE()"] },
        { q: "What keyword is used to define constraints?", correct: "CONSTRAINT", options: ["CONSTRAINT", "RULE", "CHECK", "VALIDATE"] },
        { q: "Which keyword makes a column required?", correct: "NOT NULL", options: ["NOT NULL", "REQUIRED", "MANDATORY", "MUST"] },
      ],
      // SQL Medium Questions
      medium: [
        { q: "What is a JOIN in SQL?", correct: "A way to combine rows from multiple tables", options: ["A way to combine rows from multiple tables", "A way to merge databases", "A connection between servers", "A type of index"] },
        { q: "What is the difference between INNER JOIN and LEFT JOIN?", correct: "INNER JOIN returns only matching rows, LEFT JOIN returns all left table rows", options: ["INNER JOIN returns only matching rows, LEFT JOIN returns all left table rows", "They are the same", "LEFT JOIN is faster", "INNER JOIN is deprecated"] },
        { q: "What is a primary key in SQL?", correct: "A unique identifier for table rows", options: ["A unique identifier for table rows", "The first column in a table", "The most important data", "A type of index"] },
        { q: "What is a foreign key?", correct: "A column that references primary key in another table", options: ["A column that references primary key in another table", "A key from another database", "A backup key", "A deprecated feature"] },
        { q: "What is the purpose of an index?", correct: "To speed up data retrieval", options: ["To speed up data retrieval", "To organize tables", "To create relationships", "To backup data"] },
        { q: "What is a subquery?", correct: "A query nested inside another query", options: ["A query nested inside another query", "A secondary query", "A backup query", "A deprecated feature"] },
        { q: "What is the difference between WHERE and HAVING?", correct: "WHERE filters rows, HAVING filters groups", options: ["WHERE filters rows, HAVING filters groups", "They are the same", "HAVING is faster", "WHERE is deprecated"] },
        { q: "What is a view in SQL?", correct: "A virtual table based on a query", options: ["A virtual table based on a query", "A way to view data", "A table copy", "A deprecated feature"] },
        { q: "What is normalization?", correct: "Organizing data to reduce redundancy", options: ["Organizing data to reduce redundancy", "Making data normal", "A type of query", "A deprecated practice"] },
        { q: "What is a composite key?", correct: "A primary key made of multiple columns", options: ["A primary key made of multiple columns", "A complex key", "A combined table", "A deprecated feature"] },
        { q: "What does TRUNCATE do?", correct: "Removes all rows from a table", options: ["Removes all rows from a table", "Shortens strings", "Removes columns", "Deletes table"] },
        { q: "What is the difference between DELETE and TRUNCATE?", correct: "DELETE can have WHERE clause, TRUNCATE cannot", options: ["DELETE can have WHERE clause, TRUNCATE cannot", "They are the same", "TRUNCATE is slower", "DELETE is deprecated"] },
        { q: "What is a stored procedure?", correct: "A saved SQL code that can be reused", options: ["A saved SQL code that can be reused", "A stored query", "A backup procedure", "A deprecated feature"] },
        { q: "What is a trigger?", correct: "Code that automatically executes on table events", options: ["Code that automatically executes on table events", "A button in SQL", "A deprecated feature", "A type of constraint"] },
        { q: "What is ACID in databases?", correct: "Atomicity, Consistency, Isolation, Durability", options: ["Atomicity, Consistency, Isolation, Durability", "A type of database", "A query language", "A deprecated standard"] },
        { q: "What is the difference between UNION and UNION ALL?", correct: "UNION removes duplicates, UNION ALL keeps all rows", options: ["UNION removes duplicates, UNION ALL keeps all rows", "They are the same", "UNION ALL is deprecated", "UNION is faster"] },
        { q: "What is a self-join?", correct: "A table joined with itself", options: ["A table joined with itself", "An automatic join", "A deprecated join", "A fast join"] },
        { q: "What is the purpose of COALESCE function?", correct: "Returns first non-NULL value", options: ["Returns first non-NULL value", "Combines columns", "Merges tables", "A deprecated function"] },
        { q: "What is a cross join?", correct: "Cartesian product of two tables", options: ["Cartesian product of two tables", "A join across databases", "A deprecated join", "An error condition"] },
        { q: "What is the difference between CHAR and VARCHAR?", correct: "CHAR is fixed length, VARCHAR is variable", options: ["CHAR is fixed length, VARCHAR is variable", "They are the same", "VARCHAR is deprecated", "CHAR is faster"] },
      ],
      // SQL Hard Questions
      hard: [
        { q: "What is a database index?", correct: "A data structure that improves query speed", options: ["A data structure that improves query speed", "A list of tables", "A way to organize databases", "A type of JOIN"] },
        { q: "What is a database transaction?", correct: "A sequence of operations performed as a single unit", options: ["A sequence of operations performed as a single unit", "A money transfer", "A type of query", "A database backup"] },
        { q: "What is query optimization?", correct: "Process of improving query performance", options: ["Process of improving query performance", "Writing better queries", "A deprecated practice", "A type of index"] },
        { q: "What is a clustered index?", correct: "An index that determines physical order of data", options: ["An index that determines physical order of data", "An index on multiple servers", "A grouped index", "A deprecated index"] },
        { q: "What is the difference between clustered and non-clustered index?", correct: "Clustered affects physical order, non-clustered doesn't", options: ["Clustered affects physical order, non-clustered doesn't", "They are the same", "Non-clustered is faster", "Clustered is deprecated"] },
        { q: "What is a deadlock?", correct: "When two transactions wait for each other indefinitely", options: ["When two transactions wait for each other indefinitely", "A locked database", "A failed query", "A deprecated error"] },
        { q: "What is database sharding?", correct: "Partitioning data across multiple databases", options: ["Partitioning data across multiple databases", "Breaking a database", "A deprecated practice", "A type of backup"] },
        { q: "What is a materialized view?", correct: "A view with physically stored query results", options: ["A view with physically stored query results", "A real table", "A deprecated view", "A temporary view"] },
        { q: "What is isolation level in transactions?", correct: "Degree of isolation from other transactions", options: ["Degree of isolation from other transactions", "A security level", "A deprecated setting", "A performance level"] },
        { q: "What is the N+1 query problem?", correct: "Making N additional queries in a loop", options: ["Making N additional queries in a loop", "A math problem", "A deprecated issue", "A type of error"] },
        { q: "What is denormalization?", correct: "Adding redundancy to improve read performance", options: ["Adding redundancy to improve read performance", "Opposite of normalization", "A deprecated practice", "An error condition"] },
        { q: "What is MVCC?", correct: "Multi-Version Concurrency Control", options: ["Multi-Version Concurrency Control", "Multiple Virtual CPU Cores", "Master View Cache Control", "Modern Vector Computation"] },
        { q: "What is a window function?", correct: "Function that performs calculation across table rows", options: ["Function that performs calculation across table rows", "A GUI function", "A deprecated function", "A type of aggregate"] },
        { q: "What is the purpose of EXPLAIN command?", correct: "Shows query execution plan", options: ["Shows query execution plan", "Explains errors", "Documents queries", "A deprecated command"] },
      ]
    }
  ],
  // Algorithms Questions
  algorithms: [
    {
      // Algorithms Easy Questions
      easy: [
        { q: "What is the time complexity of accessing an array element by index?", correct: "O(1)", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"] },
        { q: "Which data structure uses LIFO (Last In First Out)?", correct: "Stack", options: ["Stack", "Queue", "Array", "Tree"] },
        { q: "What is a linked list?", correct: "A sequence of nodes where each node points to the next", options: ["A sequence of nodes where each node points to the next", "A list of links", "An array of pointers", "A sorted list"] },
        { q: "Which data structure uses FIFO (First In First Out)?", correct: "Queue", options: ["Queue", "Stack", "Tree", "Graph"] },
        { q: "What is a binary tree?", correct: "A tree where each node has at most two children", options: ["A tree where each node has at most two children", "A tree with two nodes", "A sorted tree", "A tree of binary numbers"] },
        { q: "What is the time complexity of linear search?", correct: "O(n)", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"] },
        { q: "What is an algorithm?", correct: "A step-by-step procedure to solve a problem", options: ["A step-by-step procedure to solve a problem", "A type of data structure", "A programming language", "A mathematical formula"] },
        { q: "Which sorting algorithm is simplest but slowest?", correct: "Bubble sort", options: ["Bubble sort", "Quick sort", "Merge sort", "Heap sort"] },
        { q: "What is recursion?", correct: "A function calling itself", options: ["A function calling itself", "A loop", "An iteration", "A data structure"] },
        { q: "What is a graph?", correct: "A collection of nodes connected by edges", options: ["A collection of nodes connected by edges", "A chart", "A tree structure", "A sorted list"] },
        { q: "What is the space complexity of an algorithm?", correct: "Amount of memory used by the algorithm", options: ["Amount of memory used by the algorithm", "Physical space needed", "Time taken", "Number of operations"] },
        { q: "What is a hash table?", correct: "A data structure that maps keys to values", options: ["A data structure that maps keys to values", "A table of hashes", "A sorted table", "A tree structure"] },
        { q: "What is Big O notation?", correct: "A way to describe algorithm efficiency", options: ["A way to describe algorithm efficiency", "A big number", "A programming language", "A data structure"] },
        { q: "What is the root of a tree?", correct: "The top node with no parent", options: ["The top node with no parent", "The bottom node", "The middle node", "Any node"] },
        { q: "What is a leaf node?", correct: "A node with no children", options: ["A node with no children", "A node with leaves", "The root node", "Any node"] },
        { q: "What is an edge in a graph?", correct: "A connection between two nodes", options: ["A connection between two nodes", "The border", "A node", "A path"] },
        { q: "What is iteration?", correct: "Repeating a process using loops", options: ["Repeating a process using loops", "A single execution", "A function", "A data structure"] },
        { q: "What is a vertex in a graph?", correct: "A node in the graph", options: ["A node in the graph", "An edge", "A path", "A cycle"] },
        { q: "What is sorting?", correct: "Arranging elements in order", options: ["Arranging elements in order", "Searching for elements", "Deleting elements", "Adding elements"] },
        { q: "What is searching?", correct: "Finding an element in a data structure", options: ["Finding an element in a data structure", "Sorting elements", "Deleting elements", "Adding elements"] },
        { q: "What is a priority queue?", correct: "A queue where elements have priorities", options: ["A queue where elements have priorities", "A fast queue", "An important queue", "A sorted queue"] },
      ],
      // Algorithms Medium Questions
      medium: [
        { q: "What is the time complexity of binary search?", correct: "O(log n)", options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"] },
        { q: "What is a hash collision?", correct: "When two keys hash to the same index", options: ["When two keys hash to the same index", "When hash functions fail", "A type of error", "When data is corrupted"] },
        { q: "What is depth-first search (DFS)?", correct: "A graph traversal that goes as deep as possible before backtracking", options: ["A graph traversal that goes as deep as possible before backtracking", "A search that looks at depth", "A way to measure graph depth", "A sorting algorithm"] },
        { q: "What is breadth-first search (BFS)?", correct: "A graph traversal that explores all neighbors before going deeper", options: ["A graph traversal that explores all neighbors before going deeper", "A wide search", "A way to measure breadth", "A sorting algorithm"] },
        { q: "What is the time complexity of merge sort?", correct: "O(n log n)", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"] },
        { q: "What is a balanced binary search tree?", correct: "A BST where height difference of subtrees is at most 1", options: ["A BST where height difference of subtrees is at most 1", "A perfectly symmetric tree", "A sorted tree", "An equal tree"] },
        { q: "What is greedy algorithm?", correct: "Makes locally optimal choice at each step", options: ["Makes locally optimal choice at each step", "An algorithm that wants more", "A fast algorithm", "A deprecated algorithm"] },
        { q: "What is the difference between stack and queue?", correct: "Stack is LIFO, Queue is FIFO", options: ["Stack is LIFO, Queue is FIFO", "They are the same", "Stack is faster", "Queue is deprecated"] },
        { q: "What is a heap?", correct: "A complete binary tree with heap property", options: ["A complete binary tree with heap property", "A pile of data", "A sorted tree", "A type of array"] },
        { q: "What is the time complexity of insertion sort?", correct: "O(n²)", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"] },
        { q: "What is a binary search tree?", correct: "A binary tree where left < parent < right", options: ["A binary tree where left < parent < right", "A tree that searches", "A sorted array", "A two-way tree"] },
        { q: "What is memoization?", correct: "Caching results to avoid recomputation", options: ["Caching results to avoid recomputation", "Memorizing algorithms", "A type of memory", "A deprecated technique"] },
        { q: "What is the difference between DFS and BFS?", correct: "DFS uses stack, BFS uses queue", options: ["DFS uses stack, BFS uses queue", "They are the same", "DFS is faster", "BFS is deprecated"] },
        { q: "What is a cycle in a graph?", correct: "A path that starts and ends at the same node", options: ["A path that starts and ends at the same node", "A loop", "A circle", "An error"] },
        { q: "What is topological sort?", correct: "Ordering of directed graph nodes", options: ["Ordering of directed graph nodes", "Sorting by topology", "A type of sort", "A deprecated sort"] },
        { q: "What is Dijkstra's algorithm used for?", correct: "Finding shortest path in weighted graph", options: ["Finding shortest path in weighted graph", "Sorting numbers", "Searching trees", "A deprecated algorithm"] },
        { q: "What is time complexity of quicksort average case?", correct: "O(n log n)", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"] },
        { q: "What is a trie?", correct: "A tree for storing strings", options: ["A tree for storing strings", "A try-catch block", "A type of trial", "A deprecated structure"] },
        { q: "What is in-order traversal?", correct: "Left, Root, Right traversal of binary tree", options: ["Left, Root, Right traversal of binary tree", "Any order traversal", "Sorted traversal", "A deprecated method"] },
        { q: "What is amortized time complexity?", correct: "Average time per operation over sequence", options: ["Average time per operation over sequence", "Total time", "Worst case time", "Best case time"] },
      ],
      // Algorithms Hard Questions
      hard: [
        { q: "What is dynamic programming?", correct: "Solving problems by breaking them into overlapping subproblems", options: ["Solving problems by breaking them into overlapping subproblems", "Programming that changes at runtime", "A type of memory allocation", "A programming paradigm"] },
        { q: "What is the time complexity of quicksort in the worst case?", correct: "O(n²)", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"] },
        { q: "What is a balanced binary tree?", correct: "A tree where left and right subtrees differ in height by at most 1", options: ["A tree where left and right subtrees differ in height by at most 1", "A tree with equal nodes on each side", "A perfectly symmetric tree", "A sorted tree"] },
        { q: "What is the difference between divide and conquer and dynamic programming?", correct: "DP solves overlapping subproblems, D&C solves independent subproblems", options: ["DP solves overlapping subproblems, D&C solves independent subproblems", "They are the same", "D&C is faster", "DP is deprecated"] },
        { q: "What is an AVL tree?", correct: "A self-balancing binary search tree", options: ["A self-balancing binary search tree", "A type of graph", "A sorted array", "A deprecated tree"] },
        { q: "What is a Red-Black tree?", correct: "A self-balancing binary search tree with color properties", options: ["A self-balancing binary search tree with color properties", "A colorful tree", "A sorted tree", "A deprecated tree"] },
        { q: "What is NP-completeness?", correct: "Problems for which no polynomial-time solution is known", options: ["Problems for which no polynomial-time solution is known", "Not Programming problems", "Easy problems", "Deprecated problems"] },
        { q: "What is the traveling salesman problem?", correct: "Finding shortest route visiting all cities once", options: ["Finding shortest route visiting all cities once", "A salesman's problem", "A deprecated problem", "A sorting problem"] },
        { q: "What is backtracking?", correct: "Algorithm that tries solutions and backtracks on failure", options: ["Algorithm that tries solutions and backtracks on failure", "Going backwards", "A deprecated technique", "A type of recursion"] },
        { q: "What is branch and bound?", correct: "Algorithm that explores solution space with pruning", options: ["Algorithm that explores solution space with pruning", "Branching code", "A tree algorithm", "A deprecated technique"] },
        { q: "What is the knapsack problem?", correct: "Optimizing value within weight constraint", options: ["Optimizing value within weight constraint", "A packing problem", "A deprecated problem", "A sorting problem"] },
        { q: "What is A* algorithm?", correct: "Pathfinding algorithm using heuristics", options: ["Pathfinding algorithm using heuristics", "A star rating", "A deprecated algorithm", "A sorting algorithm"] },
        { q: "What is the Ford-Fulkerson algorithm?", correct: "Computes maximum flow in a network", options: ["Computes maximum flow in a network", "A car algorithm", "A deprecated algorithm", "A sorting algorithm"] },
        { q: "What is the difference between Prim's and Kruskal's?", correct: "Prim's grows tree from node, Kruskal's adds edges by weight", options: ["Prim's grows tree from node, Kruskal's adds edges by weight", "They are the same", "Prim's is faster", "Kruskal's is deprecated"] },
        { q: "What is space-time tradeoff?", correct: "Using more space to reduce time or vice versa", options: ["Using more space to reduce time or vice versa", "Space and time complexity", "A deprecated concept", "A physics concept"] },
      ]
    }
  ],
  // Web Development Questions
  webdev: [
    {
      // Web Dev Easy Questions
      easy: [
        { q: "What does HTML stand for?", correct: "HyperText Markup Language", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language"] },
        { q: "Which CSS property changes text color?", correct: "color", options: ["color", "text-color", "font-color", "foreground"] },
        { q: "What does CSS stand for?", correct: "Cascading Style Sheets", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"] },
        { q: "Which HTML tag is used for the largest heading?", correct: "<h1>", options: ["<h1>", "<heading>", "<head>", "<h6>"] },
        { q: "What is the correct HTML tag for a line break?", correct: "<br>", options: ["<br>", "<break>", "<lb>", "<newline>"] },
        { q: "Which HTML tag creates a hyperlink?", correct: "<a>", options: ["<a>", "<link>", "<href>", "<url>"] },
        { q: "What is the correct HTML for inserting an image?", correct: "<img>", options: ["<img>", "<image>", "<picture>", "<photo>"] },
        { q: "Which CSS property changes font size?", correct: "font-size", options: ["font-size", "text-size", "size", "font"] },
        { q: "What is the correct HTML for creating a checkbox?", correct: "<input type='checkbox'>", options: ["<input type='checkbox'>", "<checkbox>", "<check>", "<input checkbox>"] },
        { q: "Which HTML tag defines an unordered list?", correct: "<ul>", options: ["<ul>", "<ol>", "<list>", "<ulist>"] },
        { q: "What CSS property controls text alignment?", correct: "text-align", options: ["text-align", "align", "text-position", "alignment"] },
        { q: "Which HTML tag is used for a paragraph?", correct: "<p>", options: ["<p>", "<para>", "<paragraph>", "<text>"] },
        { q: "What is the purpose of the <head> tag?", correct: "Contains metadata and page information", options: ["Contains metadata and page information", "Creates a heading", "Starts the page", "Contains the header"] },
        { q: "Which CSS property adds space inside an element?", correct: "padding", options: ["padding", "margin", "spacing", "inner-space"] },
        { q: "What HTML tag creates a table?", correct: "<table>", options: ["<table>", "<tab>", "<grid>", "<data>"] },
        { q: "Which CSS property changes background color?", correct: "background-color", options: ["background-color", "bg-color", "color-background", "background"] },
        { q: "What is the correct HTML for a dropdown list?", correct: "<select>", options: ["<select>", "<dropdown>", "<list>", "<input type='dropdown'>"] },
        { q: "Which HTML attribute specifies an alternate text for an image?", correct: "alt", options: ["alt", "text", "title", "caption"] },
        { q: "What CSS property controls element visibility?", correct: "visibility", options: ["visibility", "display", "show", "visible"] },
        { q: "Which HTML tag defines a division or section?", correct: "<div>", options: ["<div>", "<section>", "<division>", "<container>"] },
        { q: "What is the purpose of DOCTYPE in HTML?", correct: "Declares document type and HTML version", options: ["Declares document type and HTML version", "Defines document title", "Creates a document", "Starts HTML"] },
      ],
      // Web Dev Medium Questions
      medium: [
        { q: "What is the box model in CSS?", correct: "The structure of content, padding, border, and margin", options: ["The structure of content, padding, border, and margin", "A way to create boxes", "A layout algorithm", "A design pattern"] },
        { q: "What is the difference between inline and block elements?", correct: "Block elements start on new lines, inline elements don't", options: ["Block elements start on new lines, inline elements don't", "Inline elements are faster", "They are the same", "Block elements are deprecated"] },
        { q: "What is AJAX?", correct: "Asynchronous JavaScript and XML for updating web pages", options: ["Asynchronous JavaScript and XML for updating web pages", "A JavaScript framework", "A server technology", "A programming language"] },
        { q: "What is the purpose of semantic HTML?", correct: "Using meaningful tags that describe content", options: ["Using meaningful tags that describe content", "Optimizing HTML", "A deprecated practice", "Creating semantics"] },
        { q: "What is CSS specificity?", correct: "Determines which CSS rule applies when multiple rules match", options: ["Determines which CSS rule applies when multiple rules match", "Making CSS specific", "A deprecated concept", "CSS performance"] },
        { q: "What is the purpose of media queries?", correct: "Apply different styles for different devices/screen sizes", options: ["Apply different styles for different devices/screen sizes", "Query media files", "Play media", "A deprecated feature"] },
        { q: "What is the difference between id and class in HTML?", correct: "id is unique, class can be reused", options: ["id is unique, class can be reused", "They are the same", "class is deprecated", "id is faster"] },
        { q: "What is flexbox in CSS?", correct: "A layout model for arranging items in rows or columns", options: ["A layout model for arranging items in rows or columns", "A flexible box", "A deprecated feature", "A JavaScript library"] },
        { q: "What is the purpose of viewport meta tag?", correct: "Controls page dimensions and scaling on mobile", options: ["Controls page dimensions and scaling on mobile", "Creates a viewport", "A deprecated tag", "Shows views"] },
        { q: "What is the difference between GET and POST?", correct: "GET requests data, POST submits data", options: ["GET requests data, POST submits data", "They are the same", "POST is deprecated", "GET is faster"] },
        { q: "What is responsive design?", correct: "Design that adapts to different screen sizes", options: ["Design that adapts to different screen sizes", "Fast responding design", "A deprecated practice", "Mobile-only design"] },
        { q: "What is the purpose of z-index?", correct: "Controls stacking order of elements", options: ["Controls stacking order of elements", "Z-axis positioning", "A deprecated property", "Element depth"] },
        { q: "What is the difference between margin and padding?", correct: "Margin is outside, padding is inside element", options: ["Margin is outside, padding is inside element", "They are the same", "Padding is deprecated", "Margin is faster"] },
        { q: "What is a CSS pseudo-class?", correct: "Defines special state of an element", options: ["Defines special state of an element", "A fake class", "A deprecated feature", "A JavaScript class"] },
        { q: "What is the purpose of position: relative?", correct: "Positions element relative to normal position", options: ["Positions element relative to normal position", "Makes position relative", "A deprecated value", "Positions relative to parent"] },
        { q: "What is CORS?", correct: "Cross-Origin Resource Sharing security mechanism", options: ["Cross-Origin Resource Sharing security mechanism", "Core Resource System", "A deprecated feature", "A server type"] },
        { q: "What is the purpose of data attributes in HTML?", correct: "Store custom data on elements", options: ["Store custom data on elements", "Data types", "A deprecated feature", "Database attributes"] },
        { q: "What is CSS grid?", correct: "A two-dimensional layout system", options: ["A two-dimensional layout system", "A grid pattern", "A deprecated feature", "A table layout"] },
        { q: "What is the difference between display: none and visibility: hidden?", correct: "display: none removes from layout, visibility: hidden keeps space", options: ["display: none removes from layout, visibility: hidden keeps space", "They are the same", "visibility is deprecated", "display is faster"] },
        { q: "What is the purpose of the async attribute in script tags?", correct: "Loads script asynchronously without blocking", options: ["Loads script asynchronously without blocking", "Makes script asynchronous", "A deprecated attribute", "Synchronizes scripts"] },
      ],
      // Web Dev Hard Questions
      hard: [
        { q: "What is the difference between localStorage and sessionStorage?", correct: "localStorage persists after browser close, sessionStorage doesn't", options: ["localStorage persists after browser close, sessionStorage doesn't", "They are the same", "sessionStorage is larger", "localStorage is deprecated"] },
        { q: "What is a Service Worker?", correct: "A script that runs in the background for offline functionality", options: ["A script that runs in the background for offline functionality", "A server-side worker", "A type of web server", "A JavaScript framework"] },
        { q: "What is the Shadow DOM?", correct: "A way to encapsulate DOM and styles in web components", options: ["A way to encapsulate DOM and styles in web components", "A hidden part of the DOM", "A DOM copy", "A deprecated API"] },
        { q: "What is Critical Rendering Path?", correct: "Steps browser takes to render page", options: ["Steps browser takes to render page", "A critical path in code", "A deprecated concept", "A routing path"] },
        { q: "What is Content Security Policy (CSP)?", correct: "Security standard to prevent XSS attacks", options: ["Security standard to prevent XSS attacks", "Content creation policy", "A deprecated security", "A server policy"] },
        { q: "What is the difference between bubbling and capturing?", correct: "Bubbling goes up from target, capturing goes down to target", options: ["Bubbling goes up from target, capturing goes down to target", "They are the same", "Bubbling is deprecated", "Capturing is faster"] },
        { q: "What is Tree Shaking?", correct: "Removing unused code from final bundle", options: ["Removing unused code from final bundle", "Shaking DOM tree", "A deprecated practice", "Testing technique"] },
        { q: "What is Progressive Web App (PWA)?", correct: "Web app with native-like features", options: ["Web app with native-like features", "A progressive website", "A deprecated concept", "A mobile app"] },
        { q: "What is the difference between cookie, localStorage, and sessionStorage?", correct: "Cookies sent to server, storage is client-only; session clears on close", options: ["Cookies sent to server, storage is client-only; session clears on close", "They are the same", "Cookies are deprecated", "localStorage is fastest"] },
        { q: "What is reflow and repaint?", correct: "Reflow recalculates layout, repaint redraws pixels", options: ["Reflow recalculates layout, repaint redraws pixels", "They are the same", "Reflow is deprecated", "Repaint is faster"] },
        { q: "What is Virtual DOM?", correct: "Lightweight copy of actual DOM for performance", options: ["Lightweight copy of actual DOM for performance", "A virtual reality DOM", "A deprecated concept", "A server-side DOM"] },
        { q: "What is HTTP/2 Server Push?", correct: "Server proactively sends resources to client", options: ["Server proactively sends resources to client", "A push notification", "A deprecated feature", "Pushing to server"] },
        { q: "What is Web Assembly (WASM)?", correct: "Low-level bytecode for high-performance web apps", options: ["Low-level bytecode for high-performance web apps", "Assembly language for web", "A deprecated technology", "A JavaScript framework"] },
        { q: "What is the difference between imperative and declarative programming in web?", correct: "Imperative describes how, declarative describes what", options: ["Imperative describes how, declarative describes what", "They are the same", "Imperative is deprecated", "Declarative is faster"] },
        { q: "What is Intersection Observer API?", correct: "Asynchronously observes element visibility changes", options: ["Asynchronously observes element visibility changes", "Observes intersections", "A deprecated API", "A collision detector"] },
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


export async function generateQuestions(categories, difficulty, count, provider = 'ollama', model = 'llama3', usePersonalization = true) {
  // If mock provider, skip LLM and use library directly
  if (provider === 'mock') {
    return generateMockQuestions(categories, difficulty, count);
  }

  const providerConfig = LLM_PROVIDERS.find(p => p.id === provider);
  const apiUrl = providerConfig?.url || import.meta.env.VITE_LLM_API_URL || '/api/ollama/v1/chat/completions';
  const modelName = model || import.meta.env.VITE_LLM_MODEL || 'llama3';

  // Fetch personalization context if enabled
  let personalizationContext = '';
  if (usePersonalization) {
    try {
      const { getPersonalizationContext } = await import('./performanceService.js');
      const context = await getPersonalizationContext();
      if (context) {
        personalizationContext = context;
      }
    } catch (error) {
      console.warn('Could not fetch personalization context:', error);
      // Continue without personalization
    }
  }

  const prompt = `Generate ${count} multiple-choice trivia questions about ${categories.join(', ')} at ${difficulty} difficulty level.${personalizationContext}

IMPORTANT: Return ONLY a valid JSON array with no extra text before or after. No markdown code blocks, no explanations.

Each question must be a JSON object with these exact keys:
- "q": The question text (string)
- "correct": The correct answer text (string) - must match one of the options exactly
- "options": An array of exactly 4 distinct answer options (strings) - one must be the correct answer
- "category": One of these categories: ${categories.join(', ')}

Example format:
[
  {
    "q": "What keyword is used to declare a variable in JavaScript?",
    "correct": "let",
    "options": ["let", "int", "variable", "declare"],
    "category": "javascript"
  }
]

Do NOT include letter prefixes like "A)", "B)" in the answers. Return only plain text answers.`;

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

    // Clean up if it's wrapped in markdown code blocks
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();

    // Remove thinking tags (e.g., <think>...</think>) that some models output
    content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    // Extract JSON if there's text before/after it
    // Look for array [...] or object {...}
    const jsonArrayMatch = content.match(/\[[\s\S]*\]/);
    const jsonObjectMatch = content.match(/\{[\s\S]*\}/);

    if (jsonArrayMatch) {
      content = jsonArrayMatch[0];
    } else if (jsonObjectMatch) {
      content = jsonObjectMatch[0];
    }

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

    console.log('Parsed questions from LLM:', parsedQuestions);

    const normalized = parsedQuestions
      .map(q => normalizeQuestion(q, categories))
      .filter(Boolean);

    console.log('Normalized questions:', normalized);

    const uniqueNormalized = dedupeByQuestionText(normalized);
    console.log('Unique normalized questions:', uniqueNormalized);

    if (uniqueNormalized.length === 0) {
      console.error('All questions were filtered out during normalization');
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
    const response = await fetch('/api/lmstudio/v1/models', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('LM Studio API returned error:', response.status, response.statusText);
      throw new Error('Failed to fetch models from LM Studio');
    }

    const data = await response.json();
    console.log('LM Studio API response:', data);

    // LM Studio returns models in format: { data: [{ id: "model-name", ... }] }
    if (data.data && Array.isArray(data.data)) {
      const models = data.data.map(model => ({
        id: model.id,
        name: model.id.split('/').pop() || model.id // Use just the model name without path
      }));
      console.log('Parsed LM Studio models:', models);
      return models;
    }

    console.warn('LM Studio returned unexpected format:', data);
    return [];
  } catch (error) {
    console.error('Failed to fetch LM Studio models:', error);
    return [];
  }
}

// Fetch available models from Ollama
export async function fetchOllamaModels() {
  try {
    const response = await fetch('/api/ollama/api/tags', {
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
