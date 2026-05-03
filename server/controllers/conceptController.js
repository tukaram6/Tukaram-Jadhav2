const Concept = require("../models/Concept");

// @desc    Get concepts for a module
// @route   GET /api/concepts/:moduleId
// @access  Public
const getConceptsByModule = async (req, res, next) => {
  try {
    const concepts = await Concept.find({ moduleId: req.params.moduleId }).sort({
      createdAt: 1,
    });

    console.log(
      `📖 Fetched ${concepts.length} concepts for module: ${req.params.moduleId}`
    );

    res.status(200).json({
      success: true,
      count: concepts.length,
      data: concepts,
    });
  } catch (error) {
    console.error("❌ Error fetching concepts:", error.message);
    next(error);
  }
};

// @desc    Create a new concept
// @route   POST /api/concepts
// @access  Public
const createConcept = async (req, res, next) => {
  try {
    const { moduleId, title, explanation, example } = req.body;

    const concept = await Concept.create({
      moduleId,
      title,
      explanation,
      example,
    });

    console.log(`✅ Created concept: ${concept.title}`);
    res.status(201).json({
      success: true,
      data: concept,
    });
  } catch (error) {
    console.error("❌ Error creating concept:", error.message);
    next(error);
  }
};

module.exports = { getConceptsByModule, createConcept };
