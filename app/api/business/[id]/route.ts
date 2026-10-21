import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Business from "@/models/Business";

export async function GET(request: Request) {
  try {
    // URL se query parameters nikalna
    const { searchParams } = new URL(request.url);

    // businessId lena
    const businessId = searchParams.get("businessId");

    // Agar businessId nahi mila
    if (!businessId) {
      return NextResponse.json(
        {
          success: false,
          message: "Business ID is required",
        },
        { status: 400 }
      );
    }

    // MongoDB se connect
    await connectDB();

    // Business ko ID se find karna
    const business = await Business.findById(businessId);

    // Agar business nahi mila
    if (!business) {
      return NextResponse.json(
        {
          success: false,
          message: "Business not found",
        },
        { status: 404 }
      );
    }

    // Assistant ki information return karna
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
    // Error console mein print
    console.error("Assistant API error:", error);

    // Error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch assistant",
      },
      { status: 500 }
    );
  }
}



