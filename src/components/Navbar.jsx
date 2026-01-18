import { useEffect, useState } from "react";

const items = ["hero", "about", "projects", "experience", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handle = () => {
      const pos = window.scrollY + 200;
      items.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= pos && section.offsetTop + section.offsetHeight > pos) {
          setActive(id);
        }
      });
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[10000] border-b border-white/10 
                    backdrop-blur-xl bg-black/30">
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
        <span className="font-bold text-sm tracking-widest">EP</span>

        <div className="flex gap-8 text-xs uppercase tracking-wide">
          {items.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`relative group ${
                active === item ? "text-cyan-400" : "text-neutral-300"
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] 
                              bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            
          ))}
        </div>
      </div>
    </nav>
  );
}
