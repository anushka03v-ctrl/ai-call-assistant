
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();

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

  const [loading, setLoading] = useState(false);

  // Create Business
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Business creation failed.");
        return;
      }

      alert(data.message || "Business created successfully!");

      const businessId = data.business?._id || data.businessId;

      if (businessId) {
        router.push(`/ai-assistent/${businessId}`);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Business creation error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        alert("Logout failed. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-start mb-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-black mb-3">
          Create AI Assistant
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Add your business details to create an AI voice assistant.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Owner Name *"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <input
            type="text"
            placeholder="Business Name *"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          >
            <option value="Restaurant">Restaurant</option>
            <option value="Doctor">Doctor</option>
            <option value="Gym">Gym</option>
            <option value="Salon">Salon</option>
          </select>

          <input
            type="tel"
            placeholder="Business Phone Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <input
            type="email"
            placeholder="Business Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <input
            type="text"
            placeholder="Business Address *"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <textarea
            placeholder="Describe your business and services *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <input
            type="text"
            placeholder="Working Hours *"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>

          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          >
            <option value="Rachel">Rachel</option>
            <option value="Sarah">Sarah</option>
            <option value="Adam">Adam</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl"
          >
            {loading ? "Creating Assistant..." : "Create AI Assistant"}
          </button>

        </form>
      </div>
    </div>
  );
}
