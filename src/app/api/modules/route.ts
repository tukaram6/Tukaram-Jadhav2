import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Module from "@/models/Module";

export async function GET() {
  try {
    await connectDB();
    const modules = await Module.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      count: modules.length,
      data: modules,
    });
  } catch (error: any) {
    console.error("❌ Error fetching modules:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, subject, description } = body;

    if (!title || !subject || !description) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const module = await Module.create({ title, subject, description });
    return NextResponse.json({ success: true, data: module }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating module:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
