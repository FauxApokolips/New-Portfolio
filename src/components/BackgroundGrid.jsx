export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 -z-20 opacity-[0.05] 
                    bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),
                        linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]
                    bg-[size:50px_50px]" />
  );
}
