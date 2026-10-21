import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Business from "@/models/Business";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const businessId = searchParams.get("businessId");

    if (!businessId) {
      return NextResponse.json(
        {
          success: false,
          message: "Business ID is required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const business = await Business.findById(businessId);

    if (!business) {
      return NextResponse.json(
        {
          success: false,
          message: "Business not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      assistant: {
        businessId: business._id,
        assistantName: business.assistantName,
        assistantInstructions: business.assistantInstructions,
        assistantStatus: business.assistantStatus,
        elevenLabsAgentId: business.elevenLabsAgentId,
      },
    });
  } catch (error) {
    console.error("Assistant API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch assistant",
      },
      { status: 500 }
    );
  }
}
