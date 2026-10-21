import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Business from "@/models/Business";

// GET all businesses
export async function GET() {
  try {
    await connectDB();

    const businesses = await Business.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        businesses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch businesses error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch businesses",
      },
      { status: 500 }
    );
  }
}

// POST new business
export async function POST(request: Request) {
  try {
    await connectDB();

    const data = await request.json();

    console.log("Business data:", data);

    const business = await Business.create(data);

    console.log("Business saved:", business._id);

    return NextResponse.json(
      {
        success: true,
        message: "Business created successfully",
        business,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Business creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create business",
      },
      { status: 500 }
    );
  }
}