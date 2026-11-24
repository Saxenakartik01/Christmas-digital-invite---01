import type { CSSProperties } from "react";
import hollyImg from "../assets/holly.png";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-gold text-lg sm:text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        ✦
      </span>
      <span className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

export function Snow({ count = 26 }: { count?: number }) {
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={
            {
              left: `${f.left}%`,
              width: `${f.size}vw`,
              height: `${f.size}vw`,
              maxWidth: "8px",
              maxHeight: "8px",
              minWidth: "2.5px",
              minHeight: "2.5px",
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}vw`,
              opacity: 0.8,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Holly({
  className = "",
  flip = "",
}: {
  className?: string;
  flip?: string;
}) {
  return (
    <img
      src={hollyImg}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute select-none mix-blend-multiply z-20 ${className}`}
      style={{ transform: flip }}
    />
  );
}

export function PageBottomGoldBorder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-30 pointer-events-none flex flex-col items-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Radiant golden glow bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d8b056] to-transparent shadow-[0_0_10px_rgba(216,176,86,0.7)]" />
      {/* High-sheen ultra-fine center shimmer */}
      <div className="h-px w-[70%] -mt-[1px] bg-gradient-to-r from-transparent via-[#fff5d0] to-transparent opacity-95" />
    </div>
  );
}

/* =========================================================================
   TRANSPARENT MIRROR PATCH: Designed by PATRIKASTUDIO
   Sleek frosted glass / translucent mirror badge linking to patrikastudio.com
   ========================================================================= */
export function DesignedByMirrorPatch({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://patrikastudio.com/"
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full backdrop-blur-md bg-white/15 hover:bg-white/25 border border-white/35 hover:border-gold/80 shadow-[0_4px_20px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-95 text-[#fdf4dc] hover:text-white cursor-pointer select-none overflow-hidden max-w-[calc(100vw-110px)] lg:max-w-none ${className}`}
      title="Designed by PATRIKASTUDIO - Visit patrikastudio.com"
    >
      {/* Mirror specular gloss sweep animation */}
      <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
        <span className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-mirrorShimmer pointer-events-none" />
      </span>

      {/* Decorative Gold Stars */}
      <span className="relative z-10 text-[9px] text-[#e5c17d] group-hover:rotate-45 transition-transform duration-300">
        ✦
      </span>

      {/* Label Text */}
      <span className="relative z-10 text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.22em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] text-[#f3e3bd] group-hover:text-white transition-colors">
        Designed by <span className="font-bold text-white tracking-[0.24em] underline decoration-[#c9a266]/60 underline-offset-2 group-hover:decoration-white">PATRIKASTUDIO</span>
      </span>

      <span className="relative z-10 text-[9px] text-[#e5c17d] group-hover:-rotate-45 transition-transform duration-300">
        ✦
      </span>
    </a>
  );
}


