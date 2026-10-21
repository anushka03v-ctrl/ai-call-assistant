"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ConversationProvider,
  useConversation,
} from "@elevenlabs/react";

interface Assistant {
  businessId: string;
  assistantName: string;
  assistantInstructions: string;
  assistantStatus: string;
  elevenLabsAgentId: string;
}

function ConversationSection({
  assistant,
}: {
  assistant: Assistant;
}) {
  const conversation = useConversation();

  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const startConversation = async () => {
    try {
      setError("");
      setStarting(true);

      console.log("Starting conversation...");
      console.log(
        "Agent ID:",
        assistant.elevenLabsAgentId
      );

      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      console.log("Microphone permission granted");

      await conversation.startSession({
        agentId: assistant.elevenLabsAgentId,
      });

      console.log("Conversation started");

    } catch (error) {
      console.error(
        "Start conversation error:",
        error
      );

      setError(
        "Conversation start nahi ho payi. Browser microphone permission check karo."
      );
    } finally {
      setStarting(false);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();

      console.log("Conversation ended");
    } catch (error) {
      console.error(
        "End conversation error:",
        error
      );
    }
  };

  return (
    <div className="mt-8 border-t pt-8">

      <h2 className="text-2xl font-bold mb-3">
        AI Voice Conversation
      </h2>

      <p className="text-gray-600 mb-5">
        Talk directly with your AI Assistant.
      </p>

      <div className="flex gap-4">

        <button
          onClick={startConversation}
          disabled={
            starting ||
            conversation.status === "connected"
          }
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {starting
            ? "Starting..."
            : conversation.status === "connected"
            ? "Conversation Active"
            : "Start Conversation"}
        </button>

        <button
          onClick={endConversation}
          disabled={
            conversation.status !== "connected"
          }
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
        >
          End Conversation
        </button>

      </div>

      <div className="mt-5">

        <p>
          <strong>Status:</strong>{" "}
          {conversation.status}
        </p>

        {error && (
          <p className="text-red-600 mt-3">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

function AIAssistantPageContent() {

  const params = useParams();

  const id = params.id as string;

  const [assistant, setAssistant] =
    useState<Assistant | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    if (!id) return;

    async function fetchAssistant() {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/assistant?businessId=${id}`
        );

        const data = await response.json();

        console.log(
          "Assistant API response:",
          data
        );

        if (!response.ok) {

          setError(
            data.message ||
              "Failed to fetch assistant"
          );

          return;
        }

        setAssistant(data.assistant);

      } catch (error) {

        console.error(
          "Fetch assistant error:",
          error
        );

        setError(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    }

    fetchAssistant();

  }, [id]);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-xl">
          Loading AI Assistant...
        </p>

      </div>
    );

  }

  if (error) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-2xl font-bold text-red-600">
            Error
          </h1>

          <p className="mt-2 text-gray-600">
            {error}
          </p>

        </div>

      </div>
    );

  }

  if (!assistant) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p>
          Assistant not found.
        </p>

      </div>
    );

  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          {assistant.assistantName}
        </h1>

        <p className="text-gray-500 mb-8">
          AI Voice Assistant
        </p>

        <div className="space-y-5">

          <div>

            <h2 className="font-semibold text-gray-700">
              Business ID
            </h2>

            <p className="text-gray-600 break-all">
              {assistant.businessId}
            </p>

          </div>

          <div>

            <h2 className="font-semibold text-gray-700">
              Assistant Status
            </h2>

            <p className="text-green-600 font-semibold">
              {assistant.assistantStatus}
            </p>

          </div>

          <div>

            <h2 className="font-semibold text-gray-700">
              ElevenLabs Agent ID
            </h2>

            <p className="text-gray-600 break-all">
              {assistant.elevenLabsAgentId}
            </p>

          </div>

          <div>

            <h2 className="font-semibold text-gray-700">
              Instructions
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg mt-2 whitespace-pre-wrap">
              {assistant.assistantInstructions}
            </div>

          </div>

        </div>

        <ConversationSection
          assistant={assistant}
        />

      </div>

    </div>
  );
}

export default function AIAssistantPage() {

  return (
    <ConversationProvider>

      <AIAssistantPageContent />

    </ConversationProvider>
  );
}
