import type { CSSProperties, ReactNode } from "react";

export const fs = (n: number): CSSProperties => ({ fontSize: `${n}cqw` });

export function Phone({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className="mx-auto w-full max-w-[380px]"
      style={{ containerType: "inline-size" }}
    >
      <div
        style={{
          borderRadius: "13cqw",
          padding: "1.1cqw",
          background:
            "linear-gradient(145deg,#f3d99b 0%,#b98a4a 35%,#e9c985 60%,#9c7138 100%)",
          boxShadow:
            "0 3cqw 7cqw rgba(60,35,10,.35), 0 0.6cqw 1.5cqw rgba(60,35,10,.35)",
        }}
      >
        <div
          className="relative overflow-hidden bg-forest-deep"
          style={{ borderRadius: "12cqw", aspectRatio: "1 / 2.02" }}
        >
          {children}
          {/* glass sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,.07) 0%, rgba(255,255,255,0) 28%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-[2cqw] ${className}`}>
      <span className="h-px w-[14cqw] bg-gradient-to-r from-transparent to-gold" />
      <span className="text-gold" style={fs(4.5)}>
        ✦
      </span>
      <span className="h-px w-[14cqw] bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

export function Snow({ count = 22 }: { count?: number }) {
  const flakes = Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
    return {
      left: r(1) * 100,
      size: 0.6 + r(2) * 1.2,
      dur: 7 + r(3) * 9,
      delay: -r(4) * 14,
      drift: (r(5) - 0.5) * 12,
    };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={
            {
              left: `${f.left}%`,
              width: `${f.size}cqw`,
              height: `${f.size}cqw`,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}cqw`,
              opacity: 0.8,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
