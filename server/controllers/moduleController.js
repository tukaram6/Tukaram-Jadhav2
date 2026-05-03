const Module = require("../models/Module");

// @desc    Get all modules
// @route   GET /api/modules
// @access  Public
const getModules = async (req, res, next) => {
  try {
    const modules = await Module.find().sort({ createdAt: -1 });
    console.log(`📦 Fetched ${modules.length} modules`);
    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules,
    });
  } catch (error) {
    console.error("❌ Error fetching modules:", error.message);
    next(error);
  }
};

// @desc    Get single module by ID
// @route   GET /api/modules/:id
// @access  Public
const getModuleById = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      console.log(`⚠️  Module not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    console.log(`📦 Fetched module: ${module.title}`);
    res.status(200).json({
      success: true,
      data: module,
    });
  } catch (error) {
    console.error("❌ Error fetching module:", error.message);
    next(error);
  }
};

// @desc    Create a new module
// @route   POST /api/modules
// @access  Public
const createModule = async (req, res, next) => {
  try {
    const { title, subject, description } = req.body;

    const module = await Module.create({ title, subject, description });

    console.log(`✅ Created module: ${module.title}`);
    res.status(201).json({
      success: true,
      data: module,
    });
  } catch (error) {
    console.error("❌ Error creating module:", error.message);
    next(error);
  }
};

module.exports = { getModules, getModuleById, createModule };
