const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const Module = require("./models/Module");
const Concept = require("./models/Concept");
const Practice = require("./models/Practice");

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Module.deleteMany({});
    await Concept.deleteMany({});
    await Practice.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // ══════════════════════════════════════════
    //  MODULES
    // ══════════════════════════════════════════
    const modules = await Module.insertMany([
      {
        title: "Algebra Basics",
        subject: "math",
        description:
          "Understanding variables, expressions, and linear equations with step-by-step problem solving.",
      },
      {
        title: "Newton's Laws of Motion",
        subject: "science",
        description:
          "Learn the three fundamental laws that govern how every object in the universe moves.",
      },
      {
        title: "Python Fundamentals",
        subject: "programming",
        description:
          "Get started with Python — variables, data types, control flow, and basic I/O.",
      },
    ]);
    console.log(`✅ Seeded ${modules.length} modules`);

    // ══════════════════════════════════════════
    //  CONCEPTS  (richer, with reading info)
    // ══════════════════════════════════════════
    const concepts = await Concept.insertMany([
      // ── Algebra Concepts ──────────────────
      {
        moduleId: modules[0]._id,
        order: 1,
        title: "What is Algebra?",
        explanation:
          "Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It allows us to describe relationships, find unknown values, and solve real-world problems. Unlike arithmetic, which deals with specific numbers, algebra generalizes patterns so they work with any value.\n\nFor example, instead of saying '3 + 4 = 7', algebra lets us say 'a + b = c', where a, b, and c can be any numbers that satisfy the relationship.",
        example:
          "If a rectangle has a length of L and a width of W, then its area is A = L × W. This single formula works for every rectangle, no matter its size.",
        keyTakeaway:
          "Algebra turns specific calculations into general rules using symbols and variables.",
        readingTime: 3,
      },
      {
        moduleId: modules[0]._id,
        order: 2,
        title: "Variables and Constants",
        explanation:
          "A variable is a symbol (usually a letter like x, y, or z) that represents an unknown or changing value. A constant is a fixed value that never changes — like the number 5, or π (pi).\n\nIn the expression 2x + 5:\n• '2' is a coefficient (it multiplies the variable)\n• 'x' is a variable (the unknown)\n• '5' is a constant (always equals 5)\n• '2x' is a term (a product of a number and a variable)\n\nVariables let us write equations that describe patterns. Once we solve the equation, the variable takes on a concrete value.",
        example:
          "In x + 3 = 7, the variable x represents 4 because 4 + 3 = 7.\nIn y = 2x + 1, if x = 3 then y = 2(3) + 1 = 7.",
        keyTakeaway:
          "Variables are placeholders for unknowns; constants are fixed values that never change.",
        readingTime: 3,
      },
      {
        moduleId: modules[0]._id,
        order: 3,
        title: "Solving Linear Equations",
        explanation:
          "A linear equation is an equation where the highest power of the variable is 1 (no x², x³, etc.). To solve one, you isolate the variable on one side of the equals sign using inverse operations.\n\nThe golden rule: whatever you do to one side of the equation, you must do to the other side.\n\nStep-by-step strategy:\n1. Simplify each side (distribute, combine like terms)\n2. Move variable terms to one side using addition/subtraction\n3. Move constants to the other side\n4. Divide both sides by the coefficient of the variable\n5. Check your answer by substituting back into the original equation",
        example:
          "Solve 2x + 5 = 15:\n  Step 1: Subtract 5 from both sides → 2x = 10\n  Step 2: Divide both sides by 2 → x = 5\n  Check: 2(5) + 5 = 10 + 5 = 15 ✓",
        keyTakeaway:
          "Isolate the variable by doing the same operation to both sides, then check your answer.",
        readingTime: 4,
      },
      {
        moduleId: modules[0]._id,
        order: 4,
        title: "Expressions vs. Equations",
        explanation:
          "An expression is a mathematical phrase that combines numbers, variables, and operations — but it has NO equals sign. An equation states that two expressions are equal and ALWAYS has an equals sign.\n\nExpressions can be simplified but not 'solved'. Equations can be solved to find the value of the variable.\n\n• Expression: 3x + 7  (no equals sign, cannot be solved)\n• Equation: 3x + 7 = 22  (has equals sign, can be solved → x = 5)\n\nThis distinction matters because the operations you can perform are different. You simplify expressions, but you solve equations.",
        example:
          "Expression: 4a + 2b - a → simplified to 3a + 2b\nEquation: 4a + 2b = 14, if a = 2 then 8 + 2b = 14 → 2b = 6 → b = 3",
        keyTakeaway:
          "Expressions have no equals sign (simplify them). Equations have an equals sign (solve them).",
        readingTime: 3,
      },

      // ── Newton's Laws Concepts ────────────
      {
        moduleId: modules[1]._id,
        order: 1,
        title: "Introduction to Forces",
        explanation:
          "A force is a push or a pull that acts on an object. Forces can make objects start moving, stop moving, speed up, slow down, or change direction. Force is measured in Newtons (N), named after Sir Isaac Newton himself.\n\nForces are vector quantities — they have both magnitude (strength) and direction. When multiple forces act on an object, we combine them into a single 'net force' (also called resultant force). If the net force is zero, the forces are balanced and the object's motion doesn't change.",
        example:
          "When you kick a football, your foot exerts a force on the ball, launching it forward. Gravity pulls it down, and air resistance slows it — three forces acting at once.",
        keyTakeaway:
          "A force is a push or pull measured in Newtons; the net force determines how an object's motion changes.",
        readingTime: 3,
      },
      {
        moduleId: modules[1]._id,
        order: 2,
        title: "First Law — The Law of Inertia",
        explanation:
          "Newton's First Law states: 'An object at rest stays at rest, and an object in motion stays in motion at a constant speed in a straight line, unless acted upon by an unbalanced (net) force.'\n\nThis property of matter is called inertia — the tendency of an object to resist changes in its state of motion. The more massive an object is, the more inertia it has, and the harder it is to start, stop, or redirect.\n\nReal-world insight: This is why you lurch forward when a car suddenly brakes — your body wants to keep moving forward (inertia), even though the car has stopped.",
        example:
          "A book on a desk won't move unless someone pushes it. A hockey puck on smooth ice keeps sliding at a constant speed because friction is very low.",
        keyTakeaway:
          "Objects resist changes in motion. No net force = no change in velocity.",
        readingTime: 4,
      },
      {
        moduleId: modules[1]._id,
        order: 3,
        title: "Second Law — F = ma",
        explanation:
          "Newton's Second Law states: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.'\n\nFormula: F = m × a\n• F = Force (in Newtons, N)\n• m = Mass (in kilograms, kg)\n• a = Acceleration (in metres per second squared, m/s²)\n\nKey takeaways from this formula:\n1. More force on the same mass → more acceleration\n2. Same force on more mass → less acceleration\n3. If net force is zero → acceleration is zero (connects back to First Law)\n\nThis law is the most useful for calculations because it quantifies the relationship between force, mass, and acceleration.",
        example:
          "A 10 kg box pushed with a 50 N force: a = F/m = 50/10 = 5 m/s².\nThe same 50 N on a 25 kg box: a = 50/25 = 2 m/s² — heavier objects accelerate less.",
        keyTakeaway:
          "Force = mass × acceleration. Heavier objects need more force to achieve the same acceleration.",
        readingTime: 4,
      },
      {
        moduleId: modules[1]._id,
        order: 4,
        title: "Third Law — Action and Reaction",
        explanation:
          "Newton's Third Law states: 'For every action, there is an equal and opposite reaction.'\n\nThis means forces always come in pairs. When object A pushes on object B, object B pushes back on object A with equal strength but in the opposite direction. These pairs act on different objects, which is why they don't cancel each other out.\n\nCommon misconception: People think action-reaction forces cancel out, but they act on DIFFERENT objects, so they don't. The forces only cancel when both forces act on the SAME object.",
        example:
          "When you jump, your feet push down on the ground (action). The ground pushes you upward with an equal force (reaction), launching you into the air.\n\nA rocket expels gas downward (action); the gas pushes the rocket upward (reaction).",
        keyTakeaway:
          "Every force has an equal and opposite partner acting on a different object.",
        readingTime: 4,
      },

      // ── Python Concepts ───────────────────
      {
        moduleId: modules[2]._id,
        order: 1,
        title: "What is Python?",
        explanation:
          "Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It is known for its clean, readable syntax that resembles plain English, making it one of the easiest languages for beginners to learn.\n\nKey features:\n• Interpreted — code runs line by line, no compilation step needed\n• Dynamically typed — you don't need to declare variable types\n• Multi-paradigm — supports procedural, object-oriented, and functional programming\n• Massive ecosystem — thousands of libraries for web, data science, AI, automation, and more\n\nPython is used by companies like Google, Netflix, Instagram, and NASA.",
        example:
          "A complete Python program:\n\nname = input('What is your name? ')\nprint(f'Hello, {name}! Welcome to Python.')",
        keyTakeaway:
          "Python is beginner-friendly, versatile, and one of the most popular programming languages in the world.",
        readingTime: 3,
      },
      {
        moduleId: modules[2]._id,
        order: 2,
        title: "Variables and Data Types",
        explanation:
          "In Python, a variable is a name that stores a value. You create one simply by writing a name, an equals sign, and a value — no special keyword needed.\n\nPython automatically detects the type of data you store. The main built-in types are:\n\n• int — whole numbers (42, -7, 0)\n• float — decimal numbers (3.14, -0.5)\n• str — text strings ('Hello', \"World\")\n• bool — True or False\n• list — ordered collections ([1, 2, 3])\n• dict — key-value pairs ({'name': 'Alice', 'age': 25})\n\nYou can check a value's type with type() and convert between types using int(), float(), str(), etc.",
        example:
          'name = "Alice"      # str\nage = 25             # int\nheight = 5.6         # float\nis_student = True    # bool\nscores = [90, 85]    # list\n\nprint(type(age))     # <class \'int\'>',
        keyTakeaway:
          "Python variables need no type declaration. Common types: int, float, str, bool, list, dict.",
        readingTime: 4,
      },
      {
        moduleId: modules[2]._id,
        order: 3,
        title: "The print() Function",
        explanation:
          "The print() function is your primary tool for displaying output in Python. It sends text, numbers, or variable values to the console.\n\nUseful features of print():\n• Multiple arguments — print('Hello', 'World') outputs 'Hello World' (space-separated)\n• f-strings (formatted strings) — print(f'I am {age} years old') inserts variables directly\n• sep parameter — changes the separator between arguments\n• end parameter — changes what's printed at the end (default is newline)\n\nDebugging tip: Use print() to inspect variable values at different points in your code. It's the simplest debugging technique.",
        example:
          'print("Hello World")               # Hello World\nprint("A", "B", "C")               # A B C\nprint("A", "B", sep="-")            # A-B\nprint("Hello", end=" ")             # no newline\nprint(f"Score: {85}%")              # Score: 85%',
        keyTakeaway:
          "print() displays output. Use f-strings for formatted output and sep/end for custom formatting.",
        readingTime: 3,
      },
      {
        moduleId: modules[2]._id,
        order: 4,
        title: "Control Flow — if, elif, else",
        explanation:
          "Control flow lets your program make decisions. Python uses if, elif (else if), and else statements to run different code blocks based on conditions.\n\nRules:\n• The condition must evaluate to True or False\n• Use colon (:) at the end of each condition line\n• The code block underneath must be indented (4 spaces is standard)\n• elif and else are optional\n• You can chain multiple elif blocks\n\nComparison operators: == (equal), != (not equal), < > <= >= (comparisons)\nLogical operators: and, or, not (combine conditions)",
        example:
          'score = 85\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(f"Your grade: {grade}")  # Your grade: B',
        keyTakeaway:
          "Use if/elif/else for decision-making. Indentation is mandatory in Python.",
        readingTime: 4,
      },
    ]);
    console.log(`✅ Seeded ${concepts.length} concepts`);

    // ══════════════════════════════════════════
    //  PRACTICE QUESTIONS  (numbered, with hints)
    // ══════════════════════════════════════════
    const practices = await Practice.insertMany([
      // ── Algebra Questions (Q1–Q15) ─────────
      {
        moduleId: modules[0]._id,
        questionNumber: 1,
        question: "Solve for x:  2x + 5 = 15",
        options: ["3", "5", "7", "10"],
        answer: "5",
        difficulty: "easy",
        hint: "Subtract 5 from both sides first, then divide by 2.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 2,
        question: "What is the value of y in:  3y − 9 = 0 ?",
        options: ["0", "3", "9", "-3"],
        answer: "3",
        difficulty: "easy",
        hint: "Add 9 to both sides, then divide by 3.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 3,
        question: "Simplify the expression:  4a + 2a − a",
        options: ["5a", "6a", "4a", "7a"],
        answer: "5a",
        difficulty: "easy",
        hint: "Combine like terms: 4 + 2 − 1 = ?",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 4,
        question: "If x = 4, what is the value of  3x² − 2x + 1 ?",
        options: ["41", "45", "37", "49"],
        answer: "41",
        difficulty: "medium",
        hint: "Substitute x = 4: 3(16) − 2(4) + 1 = 48 − 8 + 1.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 5,
        question:
          "Which of the following is an equation (not an expression)?",
        options: ["3x + 7", "5y − 2", "4z + 1 = 9", "a² + b²"],
        answer: "4z + 1 = 9",
        difficulty: "easy",
        hint: "An equation always has an equals sign (=).",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 6,
        question:
          "Solve for m:  5(m − 2) = 3m + 4",
        options: ["5", "7", "9", "3"],
        answer: "7",
        difficulty: "medium",
        hint: "Distribute first: 5m − 10 = 3m + 4. Then move variables to one side.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 7,
        question:
          "What is the coefficient of x in the expression  −8x + 3 ?",
        options: ["3", "8", "-8", "x"],
        answer: "-8",
        difficulty: "easy",
        hint: "The coefficient is the number directly multiplying the variable.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 8,
        question: "Solve:  x/4 + 3 = 7",
        options: ["4", "10", "16", "28"],
        answer: "16",
        difficulty: "medium",
        hint: "Subtract 3 from both sides → x/4 = 4 → multiply both sides by 4.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 9,
        question: "Solve for x:  3x − 4 = 11",
        options: ["3", "4", "5", "6"],
        answer: "5",
        difficulty: "easy",
        hint: "Add 4 to both sides, then divide by 3.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 10,
        question: "Find the value of x if  2(x + 3) = 14",
        options: ["4", "5", "7", "10"],
        answer: "4",
        difficulty: "medium",
        hint: "Divide both sides by 2 first, then subtract 3.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 11,
        question: "Simplify:  2(3x + 4) − 5x",
        options: ["x + 8", "x + 4", "11x + 8", "x - 8"],
        answer: "x + 8",
        difficulty: "medium",
        hint: "Distribute the 2: 6x + 8 − 5x.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 12,
        question: "If a = 5 and b = 2, find the value of  a² − b²",
        options: ["21", "23", "25", "29"],
        answer: "21",
        difficulty: "easy",
        hint: "Substitute the values: 5² − 2² = 25 − 4.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 13,
        question: "Solve for x:  7x + 2 = 5x + 10",
        options: ["2", "4", "6", "8"],
        answer: "4",
        difficulty: "medium",
        hint: "Subtract 5x from both sides, then subtract 2.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 14,
        question: "What is the value of x in  4x/2 = 10 ?",
        options: ["2", "5", "10", "20"],
        answer: "5",
        difficulty: "easy",
        hint: "Simplify 4x/2 to 2x, then solve 2x = 10.",
      },
      {
        moduleId: modules[0]._id,
        questionNumber: 15,
        question: "Solve for y:  15 − 3y = 6",
        options: ["3", "5", "7", "9"],
        answer: "3",
        difficulty: "medium",
        hint: "Subtract 15 from both sides, then divide by -3.",
      },

      // ── Newton's Laws Questions (Q1–Q15) ──
      {
        moduleId: modules[1]._id,
        questionNumber: 1,
        question: "Which law is known as the Law of Inertia?",
        options: [
          "First Law",
          "Second Law",
          "Third Law",
          "Law of Gravitation",
        ],
        answer: "First Law",
        difficulty: "easy",
        hint: "Inertia is the tendency of objects to resist changes in motion.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 2,
        question: "F = ma is a statement of Newton's _____ Law.",
        options: ["First", "Second", "Third", "Fourth"],
        answer: "Second",
        difficulty: "easy",
        hint: "This law relates force, mass, and acceleration.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 3,
        question:
          "A 5 kg box is pushed with a force of 20 N. What is its acceleration?",
        options: ["2 m/s²", "4 m/s²", "10 m/s²", "100 m/s²"],
        answer: "4 m/s²",
        difficulty: "medium",
        hint: "Use F = ma → a = F/m = 20/5.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 4,
        question:
          "When you jump, the ground pushes you up. This is an example of which law?",
        options: [
          "First Law",
          "Second Law",
          "Third Law",
          "None of the above",
        ],
        answer: "Third Law",
        difficulty: "easy",
        hint: "Think about action and reaction pairs.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 5,
        question:
          "An object moving at constant velocity has a net force of:",
        options: ["0 N", "1 N", "10 N", "Cannot be determined"],
        answer: "0 N",
        difficulty: "medium",
        hint: "Constant velocity means zero acceleration. Apply F = ma.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 6,
        question:
          "Why do passengers lurch forward when a bus suddenly stops?",
        options: [
          "Due to gravity",
          "Due to inertia",
          "Due to friction",
          "Due to air resistance",
        ],
        answer: "Due to inertia",
        difficulty: "easy",
        hint: "Their body tends to continue moving even though the bus has stopped.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 7,
        question:
          "If the mass of an object doubles but the force stays the same, the acceleration will:",
        options: [
          "Double",
          "Stay the same",
          "Halve",
          "Quadruple",
        ],
        answer: "Halve",
        difficulty: "medium",
        hint: "a = F/m. If m doubles, a = F/(2m) = (F/m)/2.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 8,
        question:
          "A rocket expels gas downward and moves upward. Which law explains this?",
        options: [
          "First Law",
          "Second Law",
          "Third Law",
          "Law of Conservation of Energy",
        ],
        answer: "Third Law",
        difficulty: "easy",
        hint: "Gas going down (action) → rocket going up (reaction).",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 9,
        question: "A force of 10 N acts on a 2 kg mass. What is the acceleration?",
        options: ["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
        answer: "5 m/s²",
        difficulty: "easy",
        hint: "Apply F = ma → a = 10/2.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 10,
        question: "Which law explains why you need to wear seatbelts in a car?",
        options: ["First Law", "Second Law", "Third Law", "Gravity"],
        answer: "First Law",
        difficulty: "easy",
        hint: "Your body wants to keep moving forward when the car stops (Inertia).",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 11,
        question: "If you push a wall with 100 N force, how much force does the wall push back with?",
        options: ["0 N", "50 N", "100 N", "200 N"],
        answer: "100 N",
        difficulty: "easy",
        hint: "Newton's Third Law: Action and Reaction are equal.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 12,
        question: "Friction is a force that ____ motion between two surfaces.",
        options: ["increases", "opposes", "creates", "helps"],
        answer: "opposes",
        difficulty: "easy",
        hint: "Friction always acts in the direction opposite to motion.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 13,
        question: "Mass is a measure of an object's ____.",
        options: ["Weight", "Volume", "Inertia", "Speed"],
        answer: "Inertia",
        difficulty: "medium",
        hint: "More mass means more resistance to change in motion.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 14,
        question: "Acceleration is defined as the rate of change of ____.",
        options: ["Distance", "Velocity", "Mass", "Force"],
        answer: "Velocity",
        difficulty: "easy",
        hint: "It measures how quickly speed or direction changes.",
      },
      {
        moduleId: modules[1]._id,
        questionNumber: 15,
        question: "Weight is the force of ____ acting on an object.",
        options: ["Friction", "Inertia", "Gravity", "Magnetism"],
        answer: "Gravity",
        difficulty: "easy",
        hint: "W = mg, where g is acceleration due to gravity.",
      },

      // ── Python Questions (Q1–Q15) ──────────
      {
        moduleId: modules[2]._id,
        questionNumber: 1,
        question: 'What does  print("Hello")  output?',
        options: ["Hello", '"Hello"', "print(Hello)", "Error"],
        answer: "Hello",
        difficulty: "easy",
        hint: "print() displays its argument without the surrounding quotes.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 2,
        question: "Which of these is a valid Python variable name?",
        options: ["2name", "my-var", "my_var", "class"],
        answer: "my_var",
        difficulty: "easy",
        hint: "Variable names can't start with a number, can't use hyphens, and can't be reserved keywords.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 3,
        question: 'What is the data type of the value  3.14 ?',
        options: ["int", "float", "str", "bool"],
        answer: "float",
        difficulty: "easy",
        hint: "Decimal numbers in Python are called floating-point numbers.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 4,
        question:
          'What will  print(type(True))  output?',
        options: [
          "<class 'bool'>",
          "<class 'int'>",
          "<class 'str'>",
          "True",
        ],
        answer: "<class 'bool'>",
        difficulty: "medium",
        hint: "True and False are boolean values in Python.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 5,
        question:
          'What is the output of:  print(10 // 3) ?',
        options: ["3", "3.33", "3.0", "4"],
        answer: "3",
        difficulty: "medium",
        hint: "// is integer (floor) division — it drops the decimal part.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 6,
        question:
          'Which keyword is used for an "otherwise" condition in Python?',
        options: ["otherwise", "elif", "else", "except"],
        answer: "else",
        difficulty: "easy",
        hint: "It catches everything that doesn't match the if or elif conditions.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 7,
        question:
          'What does  len("Python")  return?',
        options: ["5", "6", "7", "Error"],
        answer: "6",
        difficulty: "easy",
        hint: "Count each character: P-y-t-h-o-n.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 8,
        question:
          'x = [1, 2, 3]\nx.append(4)\nprint(x)\n\nWhat is the output?',
        options: [
          "[1, 2, 3, 4]",
          "[4, 1, 2, 3]",
          "[1, 2, 3]",
          "Error",
        ],
        answer: "[1, 2, 3, 4]",
        difficulty: "medium",
        hint: "append() adds an element to the end of a list.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 9,
        question: "How do you start a single-line comment in Python?",
        options: ["//", "/*", "#", "--"],
        answer: "#",
        difficulty: "easy",
        hint: "Python uses the hash character for comments.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 10,
        question: "What is the result of  2 ** 3  in Python?",
        options: ["6", "8", "9", "5"],
        answer: "8",
        difficulty: "easy",
        hint: "** is the exponentiation operator (2 raised to the power of 3).",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 11,
        question: "Which function is used to get input from the user?",
        options: ["get()", "scan()", "input()", "read()"],
        answer: "input()",
        difficulty: "easy",
        hint: "It reads a line from input and returns it as a string.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 12,
        question: "How do you check if 'a' is equal to 'b' in Python?",
        options: ["a = b", "a == b", "a === b", "a is b"],
        answer: "a == b",
        difficulty: "easy",
        hint: "Double equals is the equality comparison operator.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 13,
        question: "What does the 'break' statement do in a loop?",
        options: ["Skips the current iteration", "Exits the loop entirely", "Restarts the loop", "Pauses the loop"],
        answer: "Exits the loop entirely",
        difficulty: "medium",
        hint: "It terminates the loop and moves to the next statement after the loop.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 14,
        question: "Which data type is used for a collection of unique elements?",
        options: ["list", "tuple", "set", "dict"],
        answer: "set",
        difficulty: "medium",
        hint: "Sets do not allow duplicate values.",
      },
      {
        moduleId: modules[2]._id,
        questionNumber: 15,
        question: 'What is the output of  print("Python"[0]) ?',
        options: ["P", "y", "n", "Error"],
        answer: "P",
        difficulty: "easy",
        hint: "Python uses zero-based indexing for strings.",
      },
    ]);
    console.log(`✅ Seeded ${practices.length} practice questions`);

    console.log("\n🎉 Database seeded successfully!");
    console.log(`   📦 ${modules.length} modules`);
    console.log(`   📖 ${concepts.length} concepts`);
    console.log(`   🧠 ${practices.length} practice questions\n`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedData();
