
"use client";

import { useState, type FormEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed.");
        return;
      }

      setMessage(`Welcome, ${data.user.name}! Login successful.`);
      setPassword("");
    } catch {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold mb-5">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-3 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-3 mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full p-3 rounded disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="mt-4 text-sm" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Signup
        </a>
      </p>
    </div>
  );
}

