import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Practice from "@/models/Practice";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    await connectDB();
    const questions = await Practice.find({ moduleId }).sort({ questionNumber: 1 });

    return NextResponse.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error: any) {
    console.error("❌ Error fetching practice questions:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    await connectDB();
    const body = await request.json();
    const { questionNumber, question, options, answer, difficulty, hint } = body;

    const practice = await Practice.create({
      moduleId,
      questionNumber,
      question,
      options,
      answer,
      difficulty,
      hint,
    });

    return NextResponse.json({ success: true, data: practice }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating practice question:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
