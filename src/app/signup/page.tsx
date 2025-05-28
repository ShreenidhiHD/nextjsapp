export default function Signup() {
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your password"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}
