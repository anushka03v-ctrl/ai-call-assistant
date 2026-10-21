import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Business from "@/models/Business";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("Creating ElevenLabs Agent for Business:", id);

    // Connect MongoDB
    await connectDB();

    // Find business
    const business = await Business.findById(id);

    if (!business) {
      return NextResponse.json(
        {
          success: false,
          message: "Business not found",
        },
        { status: 404 }
      );
    }

    // Check ElevenLabs API key
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "ELEVENLABS_API_KEY is not configured",
        },
        { status: 500 }
      );
    }

    // AI Assistant instructions
    const instructions = `
You are an AI assistant for ${business.businessName}.

Business type: ${business.businessType}

Business information:

Owner name: ${business.ownerName}
Phone: ${business.phone}
Email: ${business.email}
Address: ${business.address}
Description: ${business.description}
Working hours: ${business.workingHours}

Language: ${business.language}

Your job is to help callers with information related to
${business.businessName}.

Only answer questions related to this business.

If the caller asks something unrelated, politely explain
that you can only help with ${business.businessName}.

Be polite, helpful and concise.
`;

    // Create ElevenLabs Agent
    const elevenLabsResponse = await fetch(
      "https://api.elevenlabs.io/v1/convai/agents/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          name: `${business.businessName} AI Assistant`,

          conversation_config: {
            agent: {
              prompt: {
                prompt: instructions,
              },
            },
          },

          tags: [
            "ai-call-assistant",
            business.businessType.toLowerCase(),
          ],
        }),
      }
    );

    const elevenLabsData = await elevenLabsResponse.json();

    console.log("ElevenLabs response:", elevenLabsData);

    // ElevenLabs error
    if (!elevenLabsResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create ElevenLabs Agent",
          error: elevenLabsData,
        },
        { status: elevenLabsResponse.status }
      );
    }

    // Get Agent ID
    const agentId = elevenLabsData.agent_id;

    if (!agentId) {
      return NextResponse.json(
        {
          success: false,
          message: "ElevenLabs did not return an Agent ID",
        },
        { status: 500 }
      );
    }

    // Save Agent information in MongoDB
    business.elevenLabsAgentId = agentId;

    business.assistantName =
      `${business.businessName} AI Assistant`;

    business.assistantInstructions = instructions;

    business.assistantStatus = "active";

    await business.save();

    console.log("Agent saved in MongoDB:", agentId);

    return NextResponse.json(
      {
        success: true,
        message: "AI Assistant created successfully",
        business: {
          id: business._id,
          businessName: business.businessName,
          assistantName: business.assistantName,
          assistantStatus: business.assistantStatus,
          elevenLabsAgentId: agentId,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("AI Assistant creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create AI Assistant",
      },
      { status: 500 }
    );
  }
}