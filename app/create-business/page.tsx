"use client";

import { useState } from "react";

export default function CreateBusiness() {
  const [ownerName, setOwnerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Restaurant");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [language, setLanguage] = useState("English");
  const [voice, setVoice] = useState("Rachel");

  const handleSubmit = async () => {
    // Required fields check
    if (!ownerName || !businessName || !phone || !email) {
      alert("Please fill all required fields.");
      return;
    }

    // Form data
    const formData = {
      ownerName,
      businessName,
      businessType,
      phone,
      email,
      address,
      description,
      workingHours,
      language,
      voice,
    };

    try {
      // Send data to backend API
      const response = await fetch("/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Check API response
      if (!response.ok) {
        alert(data.message || "Failed to create business.");
        return;
      }

      alert("Business Created Successfully!");

      console.log("Saved Business:", data.business);

      // Clear form
      setOwnerName("");
      setBusinessName("");
      setBusinessType("Restaurant");
      setPhone("");
      setEmail("");
      setAddress("");
      setDescription("");
      setWorkingHours("");
      setLanguage("English");
      setVoice("Rachel");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create AI Assistant
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Add your business details to create an AI voice assistant
        </p>

        m{/* Owner Name */}
        <input
          type="text"
          placeholder="Owner Name *"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Business Name */}
        <input
          type="text"
          placeholder="Business Name *"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Business Type */}
        <select
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Restaurant">Restaurant</option>
          <option value="Doctor">Doctor</option>
          <option value="Gym">Gym</option>
          <option value="Salon">Salon</option>
        </select>

        {/* Phone */}
        <input
          type="tel"
          placeholder="Business Phone Number *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Business Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Business Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <textarea
          placeholder="Business Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Working Hours */}
        <input
          type="text"
          placeholder="Working Hours (Example: 10 AM - 7 PM)"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Language */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>

        {/* Voice */}
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Rachel">Rachel</option>
          <option value="Sarah">Sarah</option>
          <option value="Adam">Adam</option>
        </select>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Create AI Assistant
        </button>

      </div>
    </div>
  );
}