const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Module ID is required"],
    },
    questionNumber: {
      type: Number,
      required: [true, "Question number is required"],
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: {
        validator: function (v) {
          return v.length >= 2;
        },
        message: "At least 2 options are required",
      },
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    hint: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to sort questions in order within a module
practiceSchema.index({ moduleId: 1, questionNumber: 1 });

module.exports = mongoose.model("Practice", practiceSchema);
