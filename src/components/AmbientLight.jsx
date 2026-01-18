import React from "react";

export default function AmbientLight() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        boxShadow:
          "inset 0 0 140px rgba(0,0,0,0.85), inset 0 0 240px rgba(0,0,0,0.65)",
      }}
    />
  );
}
