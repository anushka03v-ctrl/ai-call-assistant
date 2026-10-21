import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  ownerName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  workingHours: string;
  language: string;
  voice: string;

  // AI Assistant fields
  assistantName?: string;
  assistantInstructions?: string;
  assistantStatus?: "not_created" | "ready" | "active";
  elevenLabsAgentId?: string;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    ownerName: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },

    businessType: {
      type: String,
      required: true,
      enum: ["Restaurant", "Doctor", "Gym", "Salon"],
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    workingHours: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "English",
    },

    voice: {
      type: String,
      default: "Rachel",
    },

    // AI Assistant fields
    assistantName: {
      type: String,
      default: "",
    },

    assistantInstructions: {
      type: String,
      default: "",
    },

    assistantStatus: {
      type: String,
      enum: ["not_created", "ready", "active"],
      default: "not_created",
    },

    elevenLabsAgentId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Business =
  mongoose.models.Business ||
  mongoose.model<IBusiness>("Business", BusinessSchema);

export default Business;