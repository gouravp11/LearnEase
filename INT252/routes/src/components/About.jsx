const About = () => {
  return (
      <main className="min-h-screen bg-gray-100 pt-24 px-4 flex items-center justify-center">
        <div className="max-w-3xl bg-white shadow-md rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About MyApp
          </h1>

          <p className="text-gray-600 mb-4">
            MyApp is a simple React application built to demonstrate basic
            routing, reusable components, and clean UI using Tailwind CSS.
          </p>

          <p className="text-gray-600">
            This project focuses on simplicity and clarity, making it a great
            starting point for learning React fundamentals and building
            real-world layouts.
          </p>
        </div>
      </main>
  );
};

export default About;
