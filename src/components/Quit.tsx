"use client";

export default function Quit() {
  const contactMethods = [
    {
      label: "Email",
      value: "jmdc7737@gmail.com",
      icon: "✉",
      link: "mailto:jmdc7737@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "John Mark Dela Cruz",
      icon: "💼",
      link: "https://www.linkedin.com/in/john-mark-dela-cruz-73696b3a6/",
    },
    {
      label: "GitHub",
      value: "github.com/jjimuu",
      icon: "💻",
      link: "https://github.com/jjimuu",
    },
    {
      label: "Facebook",
      value: "facebook.com/destinefanboi",
      icon: "📘",
      link: "https://www.facebook.com/destinefanboi",
    },
    {
      label: "Mobile",
      value: "09498422084",
      icon: "📱",
      link: "tel:+639498422084",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
          Contact
        </h1>
        <p className="text-gray-400">Get in touch</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.link}
            target={method.link.startsWith("http") ? "_blank" : undefined}
            rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="p-6 rounded-lg glass-panel glass-panel-hover block transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">{method.icon}</span>
              <div>
                <h3 className="font-display text-xl tracking-wider uppercase">
                  {method.label}
                </h3>
                <p className="text-gray-400 text-sm">{method.value}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-lg glass-panel">
        <p className="text-gray-300 leading-relaxed">
          Feel free to reach out for collaboration opportunities, questions, or just to say hello!
        </p>
      </div>
    </div>
  );
}
