import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-5xl font-bold">
        AI Call Assistant
      </h1>

      <p>
        AI Voice Assistant for Doctor, Restaurant, Gym & Salon
      </p>

      <div className="flex gap-5">

        <Link href="/login">
          <button className="bg-black text-white px-5 py-2 rounded">
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className="bg-blue-600 text-white px-5 py-2 rounded">
            Signup
          </button>
        </Link>

      </div>

    </main>
  );
}