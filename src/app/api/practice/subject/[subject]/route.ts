import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Practice from "@/models/Practice";
import Module from "@/models/Module";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ subject: string }> }
) {
  try {
    const { subject } = await params;
    await connectDB();

    // Find all modules for this subject
    const modules = await Module.find({ subject });
    const moduleIds = modules.map((m) => m._id);

    // Get all questions for those modules
    const questions = await Practice.find({
      moduleId: { $in: moduleIds },
    }).sort({ questionNumber: 1 });

    return NextResponse.json({
      success: true,
      subject,
      count: questions.length,
      data: questions,
    });
  } catch (error: any) {
    console.error("❌ Error fetching practice by subject:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
