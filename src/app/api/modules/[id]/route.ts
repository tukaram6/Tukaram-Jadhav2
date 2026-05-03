import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Module from "@/models/Module";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const module = await Module.findById(id);

    if (!module) {
      return NextResponse.json(
        { success: false, message: "Module not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: module });
  } catch (error: any) {
    console.error("❌ Error fetching module:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
