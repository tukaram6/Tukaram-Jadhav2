import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPractice extends Document {
  moduleId: mongoose.Types.ObjectId;
  questionNumber: number;
  question: string;
  options: string[];
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  hint: string;
  createdAt: Date;
  updatedAt: Date;
}

const practiceSchema = new Schema<IPractice>(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
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
        validator: function (v: string[]) {
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

practiceSchema.index({ moduleId: 1, questionNumber: 1 });

const Practice: Model<IPractice> = mongoose.models.Practice || mongoose.model<IPractice>("Practice", practiceSchema);

export default Practice;
