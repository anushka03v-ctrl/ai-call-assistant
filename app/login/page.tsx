export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-5">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="border w-full p-3 mb-4"
      />

      <input
        type="password"
        placeholder="Password"
        className="border w-full p-3 mb-4"
      />

      <button className="bg-blue-600 text-white w-full p-3 rounded">
        Login
      </button>

    </div>
  );
}