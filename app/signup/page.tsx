export default function Signup() {
  return (
    <div className="max-w-md mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-5">
        Signup
      </h1>

      <input
        type="text"
        placeholder="Name"
        className="border w-full p-3 mb-4"
      />

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

      <button className="bg-green-600 text-white w-full p-3 rounded">
        Signup
      </button>

    </div>
  );
}