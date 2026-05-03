const Practice = require("../models/Practice");
const Module = require("../models/Module");

// @desc    Get practice questions for a module
// @route   GET /api/practice/:moduleId
// @access  Public
const getPracticeByModule = async (req, res, next) => {
  try {
    const questions = await Practice.find({
      moduleId: req.params.moduleId,
    }).sort({ questionNumber: 1 });

    console.log(
      `🧠 Fetched ${questions.length} practice questions for module: ${req.params.moduleId}`
    );

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error("❌ Error fetching practice questions:", error.message);
    next(error);
  }
};

// @desc    Get practice questions for a subject
// @route   GET /api/practice/subject/:subject
// @access  Public
const getPracticeBySubject = async (req, res, next) => {
  try {
    const { subject } = req.params;

    // Find all modules for this subject
    const modules = await Module.find({ subject });
    const moduleIds = modules.map((m) => m._id);

    // Get all questions for those modules
    const questions = await Practice.find({
      moduleId: { $in: moduleIds },
    }).sort({ questionNumber: 1 });

    console.log(
      `🧠 Fetched ${questions.length} practice questions for subject: ${subject}`
    );

    res.status(200).json({
      success: true,
      subject,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error("❌ Error fetching practice by subject:", error.message);
    next(error);
  }
};

// @desc    Submit an answer and check if correct
// @route   POST /api/practice/submit
// @access  Public
const submitAnswer = async (req, res, next) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    const question = await Practice.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const isCorrect =
      selectedAnswer.trim().toLowerCase() ===
      question.answer.trim().toLowerCase();

    console.log(
      `${isCorrect ? "✅" : "❌"} Answer submitted for Q${question.questionNumber}: ${selectedAnswer} (correct: ${question.answer})`
    );

    res.status(200).json({
      success: true,
      isCorrect,
      correctAnswer: question.answer,
      xpEarned: isCorrect ? 10 : 0,
    });
  } catch (error) {
    console.error("❌ Error submitting answer:", error.message);
    next(error);
  }
};

// @desc    Create a practice question
// @route   POST /api/practice
// @access  Public
const createPractice = async (req, res, next) => {
  try {
    const { moduleId, questionNumber, question, options, answer, difficulty, hint } =
      req.body;

    const practice = await Practice.create({
      moduleId,
      questionNumber,
      question,
      options,
      answer,
      difficulty,
      hint,
    });

    console.log(`✅ Created practice question: ${practice.question}`);
    res.status(201).json({
      success: true,
      data: practice,
    });
  } catch (error) {
    console.error("❌ Error creating practice question:", error.message);
    next(error);
  }
};

module.exports = { getPracticeByModule, getPracticeBySubject, submitAnswer, createPractice };
