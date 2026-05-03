import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConcept extends Document {
  moduleId: mongoose.Types.ObjectId;
  order: number;
  title: string;
  explanation: string;
  example: string;
  keyTakeaway: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const conceptSchema = new Schema<IConcept>(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
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

const Concept: Model<IConcept> = mongoose.models.Concept || mongoose.model<IConcept>("Concept", conceptSchema);

export default Concept;
