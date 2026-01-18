import { useRef } from "react";

export default function MagneticSection({ children }) {
  const ref = useRef();

  const move = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    ref.current.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px) scale(1.01)`;
  };

  const reset = () => {
    ref.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className="transition-transform duration-300"
    >
      {children}
    </div>
  );
}
