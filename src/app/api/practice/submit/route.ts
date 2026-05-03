import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Practice from "@/models/Practice";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { questionId, selectedAnswer } = body;

    const question = await Practice.findById(questionId);

    if (!question) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    const isCorrect =
      selectedAnswer.trim().toLowerCase() ===
      question.answer.trim().toLowerCase();

    return NextResponse.json({
      success: true,
      isCorrect,
      correctAnswer: question.answer,
      xpEarned: isCorrect ? 10 : 0,
    });
  } catch (error: any) {
    console.error("❌ Error submitting answer:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
