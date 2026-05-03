import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Concept from "@/models/Concept";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    await connectDB();
    const concepts = await Concept.find({ moduleId }).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      count: concepts.length,
      data: concepts,
    });
  } catch (error: any) {
    console.error("❌ Error fetching concepts:", error.message);
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
    const { title, explanation, example, order } = body;

    const concept = await Concept.create({
      moduleId,
      title,
      explanation,
      example,
      order,
    });

    return NextResponse.json({ success: true, data: concept }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating concept:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
