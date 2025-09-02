import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const DATA = {
  name: "Ekansh Pandey",
  role: "Computer Science Aspirant",
  location: "S.R.M KTR, Chennai",
  tagline:
    "I am an aspiring developer currently studying at S.R.M University. My strong foundation in computer science, combined with hands-on experience from my role in a developer club, positions me well for creating engaging user interfaces and efficient back-end solutions. I am passionate about learning and implementing Artificial Intelligence into my projects. Available for internships and freelance.",
  socials: [
    { label: "GitHub", href: "https://github.com/FauxApokolips" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ekansh-pandey-392938301" },
    { label: "Email", href: "mailto:ekansh.pandey2004@gmail.com" },
  ],
  projects: [
    {
      title: "Financial & Banking Services (PHP MVC)",
      tech: ["PHP", "MVC", "REST API", "MySQL", "JWT"],
      desc:
        "Secure banking backend with modular MVC architecture, REST endpoints for accounts, KYC, transfers, and role-based access.",
      link: "https://project1.com",
      source: "https://project1.com/source-code",
    },
    {
      title: "Kubernetes Observability with Prometheus & Grafana",
      tech: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Grafana", "Promentheus", ],
      desc:
        "Cloud-ready app with automated pipelines, preview environments, and blue-green deploys for zero downtime.",
      link: "https://github.com/FauxApokolips/k8s-observability-project/blob/main/README.md ",
      source: "https://github.com/FauxApokolips/k8s-observability-project",
    },
    {
      title: "Real-Time Chat (React + Firebase)",
      tech: ["React", "Firestore", "Auth", "Vite"],
      desc:
        "Auth-gated chat rooms with presence, typing indicators, and optimistic UI synced via Firestore listeners.",
      link: "https://project3.com",
      source: "https://project3.com/source-code",
    },

    {
      title: "Doctor Listing API Testing",
      tech: ["React", "RESTFul API", "Tailwind", "MySQL"],
      desc:
        "The Doctor Listing Web Application is a lightweight frontend project designed to test and validate APIs that provide doctor-related data. It features an intuitive search and filter interface where users can look up doctors based on specialties, consultation type, or location.",
      link: "https://doctor-listing-api-testing-6v652bmtx-fauxapokolips-projects.vercel.app/",
      source: "https://github.com/FauxApokolips/Doctor-Listing-API-Testing",
    },
  ],
  skills: [
    ["JavaScript/TypeScript", "React", "Next.js", "Node.js", "Grafana", "Prometheuss"],
    ["Python", "FastAPI", "Pandas", "NumPy"],
    ["PostgreSQL", "MySQL", "MongoDB"],
    ["Docker", "Kubernetes", "CI/CD", "Git", "Terraform"],
    ["TailwindCSS", "Framer Motion", "Vite", "AWS", "PHP", "MVC"],
    ["C", "C++", "Java"],
  ],
  experience: [
    {
      company: "Next Gen AI",
      role: "Full Stack Developer",
      period: "May 2023 – Sep 2024",
      points: [
        "Designed and developed dynamic and responsive websites using HTML, CSS, JavaScript, and PHP.",
        "Worked with REST APIs to retrieve and display data from databases.",
        "Improved website performance and speed through optimization techniques by 55%."
      ],
    },

    { 
      company: "Teleperformance", 
      role: "Data/AI Intern",
      period: "Jun 2025 – Jul 2025",
      points: [
        "Built ETL pipelines with quality checks and reporting.",
        "Prototyped RAG microservice for legal documents.",
      ],
    },

    {
      company: "InHouse",
      role: "Project Lead",
      period: "Aug 2024 – Dec 2024",
      points: [
        "Researched biometric spoof detection with CV models.",
        "Improved dataset curation and evaluation scripts.",
      ],
    },
  ],
};

// ---------------- Section Wrapper ----------------
const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
  >
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-3xl font-semibold tracking-tight"
    >
      {title}
      <span className="block h-[2px] w-12 mt-2 bg-gradient-to-r from-white/80 to-white/20 rounded-full"></span>
    </motion.h2>
    <div className="mt-6">{children}</div>
  </section>
);
const ProjectCard = ({ p }) => (
  <motion.a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group block rounded-2xl border border-white/10 p-6 bg-white/[0.06] backdrop-blur hover:bg-white/[0.1] hover:shadow-xl hover:shadow-white/5 transition-transform duration-300 will-change-transform"
    whileHover={{ y: -6 }}
  >
    <div className="flex items-start justify-between gap-4">
      <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
      <span className="text-xs opacity-70">Visit ↗</span>
    </div>
    <p className="mt-2 text-sm text-neutral-300">{p.desc}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {p.tech.map((t) => (
        <span
          key={t}
          className="rounded-lg border border-white/10 px-2.5 py-1 text-xs bg-white/[0.06] group-hover:bg-white/[0.12] transition"
        >
          {t}
        </span>
      ))}
    </div>
  </motion.a>
);

export default function App() {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_0%,#0b0b0b,transparent),linear-gradient(#0b0b0b,#0a0a0a)] text-neutral-100">
      {/* Navbar */}
      <div className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">
            {DATA.name}
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:opacity-80">
              Projects
            </a>
            <a href="#skills" className="hover:opacity-80">
              Skills
            </a>
            <a href="#experience" className="hover:opacity-80">
              Experience
            </a>
            <a href="#contact" className="hover:opacity-80">
              Contact
            </a>
          </div>
          <button
            className="sm:hidden inline-flex items-center justify-center rounded-xl border border-white/10 px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </nav>
        {open && (
          <div className="sm:hidden border-t border-white/10 px-4 pb-4">
            <div className="flex flex-col gap-2">
              {["projects", "skills", "experience", "contact"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="py-2"
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hero */}
      <section
        id="home"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={fadeIn}>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              {DATA.name}
            </h1>
            <p className="mt-2 text-lg text-neutral-300">
              {DATA.role} · {DATA.location}
            </p>
            <p className="mt-6 text-neutral-300 leading-relaxed">
              {DATA.tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {DATA.socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={fadeIn}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div
  initial={{ opacity: 0, scale: 0.97 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  whileHover={{ y: -6, scale: 1.03 }}
  transition={{ type: "spring", stiffness: 200, damping: 18 }}
  className="relative group"
>
  <img
    src="/back.jpg"   
    alt="Ekansh Pandey"
    className="aspect-square object-cover rounded-3xl border border-white/10 shadow-2xl transition duration-500 group-hover:shadow-[0_0_25px_rgba(0,200,255,0.35)]"
  />
  <div className="absolute inset-0 m-6 rounded-2xl border border-dashed border-white/10 pointer-events-none transition group-hover:border-white/20" />
</motion.div>


        </motion.div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {DATA.projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {DATA.skills.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="rounded-2xl border border-white/10 p-4 bg-white/5"
            >
              <ul className="flex flex-wrap gap-2">
                {row.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-white/10 px-2.5 py-1 text-xs"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="space-y-4">
          {DATA.experience.map((e) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 p-6 bg-white/5 hover:shadow-lg hover:shadow-white/5 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-medium">
                  {e.role} · {e.company}
                </h3>
                <span className="text-sm opacity-70">{e.period}</span>
              </div>
              <ul className="mt-3 list-disc list-inside text-sm text-neutral-300 space-y-1">
                {e.points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
          <p className="text-neutral-300">
            Want to collaborate or chat about an opportunity? Drop a note:
          </p>
          <form
            className="mt-4 grid gap-3 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = Object.fromEntries(new FormData(form).entries());
              const subject = encodeURIComponent("Portfolio Inquiry");
              const body = encodeURIComponent(
                `Hi ${DATA.name},\n\nI'm reaching out regarding your portfolio.\n` +
                  `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
              );
              window.location.href = `mailto:ekansh.pandey2004@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            <input
              name="name"
              placeholder="Your name"
              className="sm:col-span-1 rounded-xl bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="sm:col-span-1 rounded-xl bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="sm:col-span-2 min-h-[120px] rounded-xl bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                className="rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90 active:scale-[0.98] shadow-sm"
              >
                Send Email
              </button>
              <a
                href="/resume.pdf"
                className="text-sm underline underline-offset-4"
              >
                Download Résumé (PDF)
              </a>
            </div>
          </form>
        </div>
      </Section>
      <div className="pointer-events-none fixed inset-0 opacity-[0.15] [background:radial-gradient(black_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000_100%)] opacity-60" />

      {/* Footer */}
      <footer className="py-10 text-center text-sm opacity-70">
        © {new Date().getFullYear()} {DATA.name}. Never regret what you loose.
      </footer>
    </div>
  );
}
