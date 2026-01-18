export default function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-24 relative">
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 tracking-wide">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
