"use client";

export default function Crew() {
  const roles = [
    {
      title: "Frontend Developer",
      description: "Building reliable web interfaces with HTML, CSS, JavaScript, and Next.js. Focus on clean, functional UI that works across devices.",
      skills: ["HTML", "CSS", "JavaScript", "Next.js", "Responsive Design"],
    },
    {
      title: "Full-Stack / API Support",
      description: "Developing backend APIs and integrating databases. Comfortable with Firebase, MySQL, Supabase, and testing with Postman.",
      skills: ["PHP", "Python", "Java", "Firebase", "MySQL", "Postman", "REST APIs"],
    },
    {
      title: "Hardware & Systems Tech",
      description: "Hands-on with PC assembly, OS installation, and troubleshooting. Patient with hardware parts and system configuration.",
      skills: ["PC Assembly", "OS Installation", "Troubleshooting", "Hardware Knowledge"],
    },
    {
      title: "Unity Game Dev",
      description: "Creating game prototypes and simulations with Unity and C#. Experience with 3D environments and game logic.",
      skills: ["Unity", "C#", "Game Logic", "Prototyping"],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
          Roles
        </h1>
        <p className="text-gray-400">Roles and responsibilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <div
            key={index}
            className="p-6 rounded-lg glass-panel glass-panel-hover transition-all duration-200 hover:scale-105"
          >
            <h2 className="font-display text-2xl tracking-wider uppercase mb-3">
              {role.title}
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {role.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {role.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
