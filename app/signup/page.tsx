
"use client";

import { useState, type FormEvent } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed.");
        return;
      }

      setSuccess(true);
      setMessage("Account created successfully! You can now log in.");

      setName("");
      setEmail("");
      setPassword("");
    } catch {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Sign up for your AI Call Assistant
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Creating account..." : "Signup"}
          </button>

          {message && (
            <p
              role="status"
              className={`text-center text-sm ${
                success ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
