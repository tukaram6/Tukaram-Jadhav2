const mongoose = require("mongoose");

const conceptSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Module ID is required"],
    },
    order: {
      type: Number,
      required: [true, "Concept order is required"],
      default: 1,
    },
    title: {
      type: String,
      required: [true, "Concept title is required"],
      trim: true,
    },
    explanation: {
      type: String,
      required: [true, "Explanation is required"],
    },
    example: {
      type: String,
      default: "",
    },
    keyTakeaway: {
      type: String,
      default: "",
    },
    readingTime: {
      type: Number,
      default: 2,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

conceptSchema.index({ moduleId: 1, order: 1 });

module.exports = mongoose.model("Concept", conceptSchema);
