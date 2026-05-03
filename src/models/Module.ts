import mongoose, { Schema, Document, Model } from "mongoose";

export interface IModule extends Document {
  title: string;
  subject: "math" | "science" | "programming";
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const moduleSchema = new Schema<IModule>(
  {
    title: {
      type: String,
      required: [true, "Module title is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      enum: ["math", "science", "programming"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model in development
const Module: Model<IModule> = mongoose.models.Module || mongoose.model<IModule>("Module", moduleSchema);

export default Module;
