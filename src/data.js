export const DATA = {
  name: "Ekansh Pandey",
  location: "Gurugram, India",
  resumeUrl: "/Ekansh_s_Resume.pdf",

  contact: {
    email: "ekansh.pandey2004@gmail.com",
  },

  timeline: [
    { year: "2023", text: "Built secure banking backend using PHP MVC + JWT." },
    { year: "2024", text: "Shifted to Docker, CI/CD, Kubernetes & Observability." },
    { year: "2025", text: "Working on ETL, RAG, Server Automation & AI-driven tooling." },
  ],

  projects: [
    {
      title: "Secure Banking Backend",
      description:
        "Role-based authentication, JWT security, MySQL, and complete transaction architecture.",
      tech: ["PHP", "MySQL", "JWT", "MVC"],
      link: "https://github.com/",
      category: "Backend",
    },
    {
      title: "Kubernetes + Observability Stack",
      description:
        "Automated deployments with Prometheus, Grafana, Alertmanager & monitoring dashboards.",
      tech: ["Kubernetes", "Docker", "Prometheus", "Grafana"],
      link: "#",
      category: "DevOps",
    },
    {
      title: "Legal RAG Chatbot",
      description:
        "AI assistant using Retrieval-Augmented Generation for legal queries.",
      tech: ["Python", "LangChain", "FAISS", "LLMs"],
      link: "#",
      category: "AI",
    },
  ],

  experience: [
   { 
    role: "Software Developer",
    company: "Teleperformance",
    period: "January 2026 – Present",
    responsibilities: [
      "Developing production-grade applications using Python, SQL, and .NET Core.",
      "Working on machine learning–driven features for data processing and intelligent automation.",
      "Implemented REST API–based communication to ensure seamless data flow between frontend and backend systems.",
    ],
  },
    {
      role: "Service Engineer",
      company: "SRM NextGen AI",
      period: "October 2024 – March 2025",
      responsibilities: [
        "Developed APIs using PHP, SQL & MVC architecture.",
        "Enhanced backend reliability and performance.",
        "Fixed 30+ backend issues improving system stability.",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "SRM NextGen AI",
      period: "May 2023 – September 2024",
      responsibilities: [
        "Deployed mobile-first web applications with HTML, CSS, JavaScript, and PHP resulting in a 20% increase in mobile conversion rates.",
        "Achieved seamless data exchange between frontend and backend by consuming REST APIs.",
        "Delivered 6 backend services in Python (FastAPI) using PostgreSQL; implemented role-based access for secure endpoints.",
      ],
    },
  ],
};
