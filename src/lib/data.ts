export interface Module {
  id: string
  subject: string
  title: string
  description: string
  content: string
  concepts: {
    title: string
    explanation: string
    example: string
    keyTakeaway: string
    readingTime: number
  }[]
  activity: {
    title: string
    instructions: string
    type: 'quiz' | 'code' | 'answer'
    task: string
    correctAnswer: string
  }
}

export const SUBJECTS = [
  {
    id: 'math',
    title: 'Mathematics',
    description: 'Learn math concepts with interactive examples and step-by-step solutions.',
    icon: 'Calculator',
    color: 'bg-blue-500/10 text-blue-500',
    moduleCount: 8,
    conceptCount: 32,
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Understand science through experiments and real-world applications.',
    icon: 'TestTube',
    color: 'bg-green-500/10 text-green-500',
    moduleCount: 6,
    conceptCount: 24,
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Write code, run programs, and build projects to master programming.',
    icon: 'Code',
    color: 'bg-purple-500/10 text-purple-500',
    moduleCount: 10,
    conceptCount: 40,
  },
]

export const MOCK_MODULES: Module[] = [
  {
    id: 'algebra-1',
    subject: 'math',
    title: 'Algebra Basics',
    description: 'Understanding variables, expressions, and linear equations with step-by-step problem solving.',
    content: 'Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It allows us to describe relationships, find unknown values, and solve real-world problems. Unlike arithmetic, which deals with specific numbers, algebra generalizes patterns so they work with any value.\n\nFor example, instead of saying "3 + 4 = 7", algebra lets us say "a + b = c", where a, b, and c can be any numbers that satisfy the relationship.',
    concepts: [
      {
        title: 'What is Algebra?',
        explanation: 'Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It allows us to describe relationships, find unknown values, and solve real-world problems.',
        example: 'If a rectangle has a length of L and a width of W, then its area is A = L × W.',
        keyTakeaway: 'Algebra turns specific calculations into general rules using symbols and variables.',
        readingTime: 3,
      },
      {
        title: 'Variables and Constants',
        explanation: 'A variable is a symbol (usually a letter like x, y, or z) that represents an unknown or changing value. A constant is a fixed value that never changes — like the number 5, or π.',
        example: 'In x + 3 = 7, the variable x represents 4 because 4 + 3 = 7.',
        keyTakeaway: 'Variables are placeholders for unknowns; constants are fixed values that never change.',
        readingTime: 3,
      },
      {
        title: 'Solving Linear Equations',
        explanation: 'A linear equation is an equation where the highest power of the variable is 1. To solve one, you isolate the variable on one side of the equals sign using inverse operations. The golden rule: whatever you do to one side, you must do to the other.',
        example: 'Solve 2x + 5 = 15:\n  Step 1: Subtract 5 → 2x = 10\n  Step 2: Divide by 2 → x = 5\n  Check: 2(5) + 5 = 15 ✓',
        keyTakeaway: 'Isolate the variable by doing the same operation to both sides, then check your answer.',
        readingTime: 4,
      },
      {
        title: 'Expressions vs. Equations',
        explanation: 'An expression is a mathematical phrase with NO equals sign. An equation states that two expressions are equal and ALWAYS has an equals sign. Expressions can be simplified but not "solved". Equations can be solved.',
        example: 'Expression: 4a + 2b − a → simplified to 3a + 2b\nEquation: 4a + 2b = 14',
        keyTakeaway: 'Expressions have no equals sign (simplify them). Equations have an equals sign (solve them).',
        readingTime: 3,
      },
    ],
    activity: {
      title: 'Solve for X',
      instructions: 'Find the value of x in the equation: 2x + 5 = 15',
      type: 'answer',
      task: '2x + 5 = 15',
      correctAnswer: '5',
    },
  },
  {
    id: 'newtons-laws',
    subject: 'science',
    title: "Newton's Laws of Motion",
    description: 'Learn the three fundamental laws that govern how every object in the universe moves.',
    content: "A force is a push or a pull that acts on an object. Forces can make objects start moving, stop moving, speed up, slow down, or change direction. Force is measured in Newtons (N), named after Sir Isaac Newton.\n\nForces are vector quantities — they have both magnitude (strength) and direction. When multiple forces act on an object, we combine them into a single 'net force'. If the net force is zero, the forces are balanced and the object's motion doesn't change.",
    concepts: [
      {
        title: 'Introduction to Forces',
        explanation: 'A force is a push or a pull that acts on an object. Forces can make objects start moving, stop moving, speed up, slow down, or change direction. Force is measured in Newtons (N).',
        example: 'When you kick a football, your foot exerts a force on the ball, launching it forward.',
        keyTakeaway: 'A force is a push or pull measured in Newtons; the net force determines how motion changes.',
        readingTime: 3,
      },
      {
        title: 'First Law — The Law of Inertia',
        explanation: "An object at rest stays at rest, and an object in motion stays in motion at a constant speed in a straight line, unless acted upon by an unbalanced force. This property is called inertia — the tendency to resist changes in motion.",
        example: 'A book on a desk won\'t move unless someone pushes it. You lurch forward when a car brakes suddenly.',
        keyTakeaway: 'Objects resist changes in motion. No net force = no change in velocity.',
        readingTime: 4,
      },
      {
        title: 'Second Law — F = ma',
        explanation: 'The acceleration of an object is directly proportional to the net force and inversely proportional to its mass. Formula: F = m × a. More force → more acceleration. More mass → less acceleration.',
        example: 'A 10 kg box pushed with 50 N: a = 50/10 = 5 m/s². The same 50 N on 25 kg: a = 50/25 = 2 m/s².',
        keyTakeaway: 'Force = mass × acceleration. Heavier objects need more force for the same acceleration.',
        readingTime: 4,
      },
      {
        title: 'Third Law — Action and Reaction',
        explanation: "For every action, there is an equal and opposite reaction. Forces always come in pairs acting on different objects. They don't cancel because they act on DIFFERENT objects.",
        example: 'When you jump, your feet push down on the ground (action), the ground pushes you up (reaction).',
        keyTakeaway: 'Every force has an equal and opposite partner acting on a different object.',
        readingTime: 4,
      },
    ],
    activity: {
      title: 'Quick Quiz',
      instructions: 'Which of Newton\'s laws is known as the Law of Inertia?',
      type: 'quiz',
      task: 'First Law, Second Law, Third Law, Law of Gravitation',
      correctAnswer: 'First Law',
    },
  },
  {
    id: 'python-intro',
    subject: 'programming',
    title: 'Python Fundamentals',
    description: 'Get started with Python — variables, data types, control flow, and basic I/O.',
    content: "Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It is known for its clean, readable syntax that resembles plain English, making it one of the easiest languages for beginners to learn.\n\nKey features: Interpreted (runs line by line), dynamically typed (no type declarations), multi-paradigm (procedural, OOP, functional), and has a massive ecosystem of libraries for web, data science, AI, and more.",
    concepts: [
      {
        title: 'What is Python?',
        explanation: 'Python is a high-level, interpreted programming language known for its clean, readable syntax. It is dynamically typed, multi-paradigm, and has thousands of libraries for web, data science, AI, and automation.',
        example: "name = input('What is your name? ')\nprint(f'Hello, {name}!')",
        keyTakeaway: 'Python is beginner-friendly, versatile, and one of the most popular languages in the world.',
        readingTime: 3,
      },
      {
        title: 'Variables and Data Types',
        explanation: 'A variable is a name that stores a value. Python detects the type automatically. Main types: int (whole numbers), float (decimals), str (text), bool (True/False), list (ordered collections), dict (key-value pairs).',
        example: 'name = "Alice"  # str\nage = 25         # int\nheight = 5.6     # float\nis_student = True  # bool',
        keyTakeaway: 'Python variables need no type declaration. Common types: int, float, str, bool, list, dict.',
        readingTime: 4,
      },
      {
        title: 'The print() Function',
        explanation: 'print() displays output to the console. Supports multiple arguments, f-strings for formatting, sep parameter for custom separators, and end parameter to control line endings.',
        example: 'print("Hello World")\nprint("A", "B", sep="-")  # A-B\nprint(f"Score: {85}%")     # Score: 85%',
        keyTakeaway: 'print() displays output. Use f-strings for formatted output and sep/end for custom formatting.',
        readingTime: 3,
      },
      {
        title: 'Control Flow — if, elif, else',
        explanation: 'Control flow lets your program make decisions. Python uses if, elif, and else statements. Conditions must evaluate to True or False. Code blocks must be indented (4 spaces standard).',
        example: 'score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "F"',
        keyTakeaway: 'Use if/elif/else for decision-making. Indentation is mandatory in Python.',
        readingTime: 4,
      },
    ],
    activity: {
      title: 'Print Message',
      instructions: 'Write a Python command to print "Hello World". Type the full command including print().',
      type: 'code',
      task: 'print("Hello World")',
      correctAnswer: 'print("Hello World")',
    },
  },
  {
    id: 'geometry-essentials',
    subject: 'math',
    title: 'Geometry Essentials',
    description: 'Explore shapes, angles, area, and perimeter with visual explanations and hands-on calculations.',
    content: 'Geometry is the branch of mathematics that deals with shapes, sizes, positions, and properties of space. From the pyramids of Egypt to modern architecture, geometry is everywhere around us.\n\nUnderstanding geometry helps you calculate areas, volumes, and angles — skills used in engineering, design, navigation, and everyday life.',
    concepts: [
      {
        title: 'Points, Lines, and Planes',
        explanation: 'A point is an exact location in space with no size. A line extends infinitely in both directions and has no thickness. A plane is a flat surface that extends infinitely in all directions. These are the basic building blocks of geometry.',
        example: 'A dot on paper represents a point. The edge of a ruler represents a line segment. The surface of a table represents a plane.',
        keyTakeaway: 'Points, lines, and planes are the fundamental elements from which all geometric shapes are built.',
        readingTime: 3,
      },
      {
        title: 'Types of Angles',
        explanation: 'An angle is formed by two rays sharing a common endpoint (vertex). Acute angles are less than 90°, right angles are exactly 90°, obtuse angles are between 90° and 180°, and straight angles are exactly 180°.',
        example: 'The corner of a book = 90° (right angle)\nA clock at 2:00 = 60° (acute angle)\nA clock at 4:00 = 120° (obtuse angle)',
        keyTakeaway: 'Angles are classified by their measure: acute (<90°), right (=90°), obtuse (>90°), straight (=180°).',
        readingTime: 3,
      },
      {
        title: 'Area and Perimeter',
        explanation: 'Perimeter is the total distance around a shape. Area is the amount of space inside a shape. For a rectangle: Perimeter = 2(l + w), Area = l × w. For a circle: Circumference = 2πr, Area = πr².',
        example: 'Rectangle 5m × 3m:\n  Perimeter = 2(5 + 3) = 16m\n  Area = 5 × 3 = 15 m²\nCircle with radius 4m:\n  Circumference = 2π(4) ≈ 25.13m\n  Area = π(4²) ≈ 50.27 m²',
        keyTakeaway: 'Perimeter measures the boundary length; area measures the enclosed space. Know the formulas!',
        readingTime: 4,
      },
      {
        title: 'The Pythagorean Theorem',
        explanation: 'In a right triangle, the square of the hypotenuse (longest side) equals the sum of the squares of the other two sides: a² + b² = c². This theorem is fundamental in mathematics, physics, and engineering.',
        example: 'A right triangle with sides 3 and 4:\n  c² = 3² + 4² = 9 + 16 = 25\n  c = √25 = 5\nThe hypotenuse is 5 units long.',
        keyTakeaway: 'a² + b² = c² works for every right triangle. It connects algebra and geometry beautifully.',
        readingTime: 4,
      },
    ],
    activity: {
      title: 'Find the Hypotenuse',
      instructions: 'A right triangle has sides of length 6 and 8. What is the length of the hypotenuse?',
      type: 'answer',
      task: 'a² + b² = c² → 6² + 8² = c²',
      correctAnswer: '10',
    },
  },
  {
    id: 'quadratic-equations',
    subject: 'math',
    title: 'Quadratic Equations',
    description: 'Master quadratic expressions, factoring techniques, and the quadratic formula.',
    content: 'A quadratic equation is a polynomial equation of degree 2, meaning the highest power of the variable is 2. The standard form is ax² + bx + c = 0, where a ≠ 0.\n\nQuadratic equations appear in projectile motion, area optimization, profit maximization, and countless real-world scenarios. Learning to solve them unlocks a whole new level of mathematical problem-solving.',
    concepts: [
      {
        title: 'What is a Quadratic Equation?',
        explanation: 'A quadratic equation has the form ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0. The graph of a quadratic is a parabola — a U-shaped curve that opens up (if a > 0) or down (if a < 0).',
        example: 'x² + 5x + 6 = 0 → a=1, b=5, c=6\n2x² − 3x + 1 = 0 → a=2, b=−3, c=1\n−x² + 4 = 0 → a=−1, b=0, c=4',
        keyTakeaway: 'Quadratics are degree-2 equations. Their graph is always a parabola.',
        readingTime: 3,
      },
      {
        title: 'Solving by Factoring',
        explanation: 'Factoring breaks a quadratic into two binomial factors. Find two numbers that multiply to give c and add to give b. Then set each factor to zero and solve.',
        example: 'x² + 5x + 6 = 0\nFind numbers that multiply to 6 and add to 5: (2, 3)\n(x + 2)(x + 3) = 0\nx = −2 or x = −3',
        keyTakeaway: 'Factoring is the fastest method when it works. Look for two numbers that multiply to c and add to b.',
        readingTime: 4,
      },
      {
        title: 'The Quadratic Formula',
        explanation: 'The quadratic formula x = (−b ± √(b²−4ac)) / 2a works for ALL quadratic equations. The discriminant (b²−4ac) tells you the nature of roots: positive = 2 real roots, zero = 1 repeated root, negative = no real roots.',
        example: '2x² − 4x − 6 = 0 (a=2, b=−4, c=−6)\nDiscriminant = 16 − 4(2)(−6) = 16 + 48 = 64\nx = (4 ± 8) / 4\nx = 3 or x = −1',
        keyTakeaway: 'The quadratic formula is your universal tool. The discriminant reveals how many solutions exist.',
        readingTime: 5,
      },
      {
        title: 'Real-World Applications',
        explanation: 'Quadratics model projectile trajectories (h = −½gt² + v₀t + h₀), area optimization, revenue/profit curves, and acceleration problems. Whenever a quantity depends on the square of another, quadratics appear.',
        example: 'A ball thrown upward at 20 m/s from ground:\nh(t) = −5t² + 20t\nMax height at t = 2s: h = −5(4) + 40 = 20m\nHits ground at t = 4s: h = 0',
        keyTakeaway: 'Quadratics are everywhere in physics and business. The vertex gives the maximum or minimum value.',
        readingTime: 4,
      },
    ],
    activity: {
      title: 'Factor the Quadratic',
      instructions: 'Solve x² + 7x + 12 = 0. What are the two solutions? Enter the larger value.',
      type: 'answer',
      task: 'x² + 7x + 12 = 0',
      correctAnswer: '-3',
    },
  },
  {
    id: 'chemistry-basics',
    subject: 'science',
    title: 'Chemistry Foundations',
    description: 'Understand atoms, elements, the periodic table, and chemical bonding from the ground up.',
    content: 'Chemistry is the science of matter — what things are made of and how they interact. Everything you can see, touch, smell, or taste is made of atoms, the tiny building blocks of matter.\n\nFrom the water you drink (H₂O) to the oxygen you breathe (O₂), chemistry explains the composition and behavior of every substance in the universe.',
    concepts: [
      {
        title: 'Atoms and Elements',
        explanation: 'An atom is the smallest unit of matter that retains the properties of an element. It consists of a nucleus (protons + neutrons) surrounded by electrons. An element is a substance made of only one type of atom — there are 118 known elements.',
        example: 'Hydrogen (H): 1 proton, 0 neutrons, 1 electron\nCarbon (C): 6 protons, 6 neutrons, 6 electrons\nOxygen (O): 8 protons, 8 neutrons, 8 electrons',
        keyTakeaway: 'Atoms are the building blocks of matter. The number of protons defines which element an atom is.',
        readingTime: 4,
      },
      {
        title: 'The Periodic Table',
        explanation: 'The periodic table organizes all 118 elements by increasing atomic number. Rows (periods) show energy levels, columns (groups) show elements with similar properties. Metals are on the left, nonmetals on the right, and metalloids in between.',
        example: 'Group 1 (Alkali Metals): Li, Na, K — all very reactive\nGroup 18 (Noble Gases): He, Ne, Ar — all very stable\nGroup 17 (Halogens): F, Cl, Br — all need 1 electron',
        keyTakeaway: 'The periodic table groups elements by their properties. Column = similar behavior, Row = energy level.',
        readingTime: 4,
      },
      {
        title: 'Chemical Bonds',
        explanation: 'Atoms bond to achieve stability (full outer electron shell). Ionic bonds transfer electrons (metal + nonmetal). Covalent bonds share electrons (nonmetal + nonmetal). Metallic bonds share a "sea" of electrons (metal + metal).',
        example: 'NaCl (table salt): Na gives 1 electron to Cl → ionic bond\nH₂O (water): O shares electrons with 2 H atoms → covalent bond\nFe (iron metal): Fe atoms share electrons freely → metallic bond',
        keyTakeaway: 'Ionic bonds transfer electrons, covalent bonds share them. Both create stable compounds.',
        readingTime: 5,
      },
      {
        title: 'Chemical Reactions',
        explanation: 'A chemical reaction rearranges atoms to form new substances. Reactants → Products. The law of conservation of mass means atoms are never created or destroyed — equations must be balanced.',
        example: 'Combustion of methane:\nCH₄ + 2O₂ → CO₂ + 2H₂O\nReactants: 1C, 4H, 4O\nProducts: 1C, 4H, 4O ✓ Balanced!',
        keyTakeaway: 'In chemical reactions, atoms rearrange but are never created or destroyed. Always balance equations.',
        readingTime: 4,
      },
    ],
    activity: {
      title: 'Element Identification',
      instructions: 'What is the chemical symbol for Sodium?',
      type: 'quiz',
      task: 'So, Na, Sd, S',
      correctAnswer: 'Na',
    },
  },
  {
    id: 'electricity-circuits',
    subject: 'science',
    title: 'Electricity & Circuits',
    description: 'Learn how electric current flows, Ohm\'s Law, and how to build simple circuits.',
    content: 'Electricity is the flow of electric charge through a conductor. It powers nearly every device in modern life — from light bulbs to smartphones to electric cars.\n\nUnderstanding electricity means understanding voltage (the push), current (the flow), and resistance (the opposition). These three quantities are connected by Ohm\'s Law, one of the most important equations in physics and engineering.',
    concepts: [
      {
        title: 'Electric Current',
        explanation: 'Electric current (I) is the flow of electrons through a conductor, measured in Amperes (A). Conventional current flows from positive to negative, while electrons actually flow from negative to positive. Current requires a complete circuit to flow.',
        example: 'A light bulb circuit: electrons flow from the battery\'s negative terminal, through the wire and bulb, back to the positive terminal. If the wire is cut, the circuit is "open" and no current flows.',
        keyTakeaway: 'Current is the flow of charge measured in Amps. It needs a complete loop (circuit) to flow.',
        readingTime: 3,
      },
      {
        title: 'Voltage and Resistance',
        explanation: 'Voltage (V) is the "electrical pressure" that pushes current through a circuit, measured in Volts. Resistance (R) opposes the flow of current, measured in Ohms (Ω). Higher resistance means less current for the same voltage.',
        example: 'A battery is like a water pump: Voltage = water pressure, Current = water flow rate, Resistance = pipe narrowness. A 9V battery provides more "push" than a 1.5V battery.',
        keyTakeaway: 'Voltage pushes, resistance opposes, and current is the result. Think of water flowing through pipes.',
        readingTime: 4,
      },
      {
        title: 'Ohm\'s Law: V = IR',
        explanation: 'Ohm\'s Law states that Voltage = Current × Resistance (V = I × R). This fundamental relationship lets you calculate any one quantity if you know the other two. It applies to most conductors under normal conditions.',
        example: 'A 12V battery connected to a 4Ω resistor:\nI = V/R = 12/4 = 3 Amps\n\nIf resistance doubles (8Ω): I = 12/8 = 1.5 Amps\nDouble resistance = half the current!',
        keyTakeaway: 'V = IR is the foundation of circuit analysis. Know any two values to find the third.',
        readingTime: 4,
      },
      {
        title: 'Series vs. Parallel Circuits',
        explanation: 'In series circuits, components are connected end-to-end — same current flows through all. In parallel circuits, components are connected side-by-side — same voltage across all. Series: R_total = R₁ + R₂. Parallel: 1/R_total = 1/R₁ + 1/R₂.',
        example: 'Two 10Ω resistors in series: R_total = 20Ω\nTwo 10Ω resistors in parallel: R_total = 5Ω\n\nParallel always gives LESS total resistance!',
        keyTakeaway: 'Series adds resistance, parallel reduces it. Most home wiring is parallel so devices work independently.',
        readingTime: 5,
      },
    ],
    activity: {
      title: 'Ohm\'s Law Calculation',
      instructions: 'A circuit has a 24V battery and a 6Ω resistor. What is the current in Amps?',
      type: 'answer',
      task: 'V = IR → 24 = I × 6 → I = ?',
      correctAnswer: '4',
    },
  },
  {
    id: 'javascript-intro',
    subject: 'programming',
    title: 'JavaScript Essentials',
    description: 'Learn the language of the web — variables, functions, DOM manipulation, and events.',
    content: 'JavaScript is the programming language of the web. Every website you visit uses JavaScript to make pages interactive — from dropdown menus to real-time chat to complex web applications like Gmail and Google Maps.\n\nOriginally created in just 10 days by Brendan Eich in 1995, JavaScript has grown into one of the most versatile and widely-used programming languages in the world, running in browsers, servers (Node.js), mobile apps, and even desktop applications.',
    concepts: [
      {
        title: 'Variables: let, const, var',
        explanation: 'Variables store data. Modern JavaScript uses let (reassignable) and const (fixed) instead of the older var. Use const by default, and let only when you need to reassign. Variable names are case-sensitive and follow camelCase convention.',
        example: 'const name = "Alice";   // Cannot be reassigned\nlet score = 0;          // Can be reassigned\nscore = 10;             // ✓ Works\n// name = "Bob";        // ✗ Error!',
        keyTakeaway: 'Use const by default, let when reassignment is needed. Avoid var in modern JavaScript.',
        readingTime: 3,
      },
      {
        title: 'Functions',
        explanation: 'Functions are reusable blocks of code. JavaScript supports function declarations, function expressions, and arrow functions (=>). Arrow functions are concise and commonly used in modern code.',
        example: '// Function declaration\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// Arrow function\nconst add = (a, b) => a + b;\n\nconsole.log(greet("Alice")); // Hello, Alice!\nconsole.log(add(3, 5));      // 8',
        keyTakeaway: 'Functions make code reusable. Arrow functions (=>) are the modern, concise syntax.',
        readingTime: 4,
      },
      {
        title: 'Arrays and Objects',
        explanation: 'Arrays store ordered lists of items: [1, 2, 3]. Objects store key-value pairs: {name: "Alice", age: 25}. Arrays use index numbers (starting at 0), objects use dot notation or brackets to access values.',
        example: 'const fruits = ["apple", "banana", "cherry"];\nfruits[0]; // "apple"\nfruits.push("date"); // adds to end\n\nconst user = { name: "Alice", age: 25 };\nuser.name; // "Alice"\nuser.age;  // 25',
        keyTakeaway: 'Arrays = ordered lists (use indexes). Objects = key-value pairs (use dot notation).',
        readingTime: 4,
      },
      {
        title: 'DOM Manipulation',
        explanation: 'The DOM (Document Object Model) is a tree representation of an HTML page. JavaScript can read, modify, add, or remove any element. Use document.querySelector() to select elements and .textContent, .innerHTML, .style to modify them.',
        example: '// Select an element\nconst heading = document.querySelector("h1");\n\n// Change its content\nheading.textContent = "New Title";\n\n// Change its style\nheading.style.color = "blue";\n\n// Add a click event\nheading.addEventListener("click", () => {\n  alert("Clicked!");\n});',
        keyTakeaway: 'The DOM lets JavaScript interact with HTML. querySelector + addEventListener = interactive web pages.',
        readingTime: 5,
      },
    ],
    activity: {
      title: 'Declare a Variable',
      instructions: 'Declare a constant variable called "language" and assign it the value "JavaScript" using the const keyword. Write the full line of code.',
      type: 'code',
      task: 'const ____ = "____"',
      correctAnswer: 'const language = "JavaScript"',
    },
  },
  {
    id: 'data-structures',
    subject: 'programming',
    title: 'Data Structures 101',
    description: 'Understand arrays, linked lists, stacks, queues, and when to use each one.',
    content: 'Data structures are ways of organizing and storing data so that it can be accessed and modified efficiently. Choosing the right data structure can mean the difference between a program that runs in milliseconds and one that takes hours.\n\nEvery application you use relies on data structures: your browser history is a stack, a print queue is a queue, a contact list is an array, and a file system is a tree.',
    concepts: [
      {
        title: 'Arrays',
        explanation: 'An array is a contiguous block of memory storing elements of the same type. Access by index is O(1) — instant. Insertion/deletion in the middle is O(n) — slow because elements must shift. Arrays are the most commonly used data structure.',
        example: 'const grades = [95, 87, 92, 78, 88];\n// Access: grades[0] → 95 (instant)\n// Search: find 92 → check each element (O(n))\n// Push: grades.push(100) → fast (O(1) amortized)',
        keyTakeaway: 'Arrays offer instant access by index but slow insertion/deletion in the middle. Best for ordered collections.',
        readingTime: 4,
      },
      {
        title: 'Stacks (LIFO)',
        explanation: 'A stack follows Last-In-First-Out (LIFO) — the last element added is the first removed. Think of a stack of plates. Two operations: push (add to top) and pop (remove from top). Both are O(1).',
        example: 'Stack operations:\npush("A") → [A]\npush("B") → [A, B]\npush("C") → [A, B, C]\npop()     → returns "C", stack = [A, B]\npop()     → returns "B", stack = [A]',
        keyTakeaway: 'Stacks are LIFO. Used for undo systems, browser back buttons, and function call stacks.',
        readingTime: 4,
      },
      {
        title: 'Queues (FIFO)',
        explanation: 'A queue follows First-In-First-Out (FIFO) — the first element added is the first removed. Think of a line at a store. Two operations: enqueue (add to back) and dequeue (remove from front).',
        example: 'Queue operations:\nenqueue("A") → [A]\nenqueue("B") → [A, B]\nenqueue("C") → [A, B, C]\ndequeue()    → returns "A", queue = [B, C]\ndequeue()    → returns "B", queue = [C]',
        keyTakeaway: 'Queues are FIFO. Used for print queues, task scheduling, and breadth-first search.',
        readingTime: 4,
      },
      {
        title: 'Choosing the Right Structure',
        explanation: 'Array: ordered data, fast random access. Stack: undo/redo, parsing, DFS. Queue: scheduling, BFS, message processing. Linked List: frequent insertions/deletions. Hash Map: fast key-value lookups. Tree: hierarchical data.',
        example: 'Browser history → Stack (back = pop)\nPrint jobs → Queue (first submitted = first printed)\nContacts → Array or Hash Map (fast lookup by name)\nFile system → Tree (folders contain folders)',
        keyTakeaway: 'Pick the data structure that matches your access pattern. The right choice makes your code fast and clean.',
        readingTime: 3,
      },
    ],
    activity: {
      title: 'Stack or Queue?',
      instructions: 'The browser\'s back button uses which data structure?',
      type: 'quiz',
      task: 'Stack, Queue, Array, Linked List',
      correctAnswer: 'Stack',
    },
  },
]
