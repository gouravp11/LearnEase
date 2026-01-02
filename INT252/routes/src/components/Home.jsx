const Home = () => {
  return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full items-center">
          {/* Left: Text + Image */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to MyApp
            </h1>
            <p className="text-gray-600 mb-6">
              A simple React homepage with a navbar and a clean form layout.
            </p>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Workspace"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>

          {/* Right: Form */}
          <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
  );
};

export default Home;
