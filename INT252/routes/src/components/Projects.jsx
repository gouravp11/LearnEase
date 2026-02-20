const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio built using React and Tailwind CSS to showcase projects and skills.",
    },
    {
      title: "Task Manager App",
      description:
        "A simple task management application with add, delete, and complete task features.",
    },
    {
      title: "Weather App",
      description:
        "A weather forecast app that fetches real-time data using a public API.",
    },
  ];

  return (
      <main className="min-h-screen bg-gray-100 pt-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Projects
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
  );
};

export default Projects;
