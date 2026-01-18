import MagneticSection from "../components/MagneticSection";
import SectionGlow from "../components/SectionGlow";
import TimelineItem from "../components/TimelineItem";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full px-6 md:px-24 py-32">
      <SectionGlow color="rgba(0,200,255,0.2)" />

      <MagneticSection>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 neon-title">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-white/80 leading-relaxed text-lg">
            I’m a software engineer with a strong bias toward systems that are observable, scalable, and production-ready.
            My work spans frontend architecture, backend systems, DevOps, and applied machine learning, with a consistent focus on building tools that solve real operational problems.
            I’ve designed interactive frontend systems such as an HR workflow designer and API-driven listing platforms, emphasizing clean state management, modular UI components, and user-centric flows.
            On the backend and infrastructure side, I’ve built network monitoring and observability systems, working with live traffic data, anomaly detection, and cloud-native tooling to surface actionable insights rather than raw metrics.
            <br /><br />
            Overall, I enjoy building software that sits at the intersection of engineering discipline and real-world usage—tools that developers, operators, or users can actually rely on.
          </p>

          <div>
            <TimelineItem year="2022" text="Joined 'SRM University' as a Computer Science Student." />
            <TimelineItem year="2023" text="Built Full Stack Projects as a member in SRM Next Gen AI group." />
            <TimelineItem year="2024" text="Worked as a Service Engineer under Senior's guidance." />
            <TimelineItem year="2025" text="Implemented many concepts such as SQL, AI, ML, DevOps and Excel ." />
            <TimelineItem year="2026" text="Joined 'Teleperformance' as Software Developer Intern." />
          </div>  
        </div>
      </MagneticSection>
    </section>
  );
}
