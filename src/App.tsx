import hollyImg from "./assets/holly.png";
import {
  CelebrationScreen,
  HeroScreen,
  IntroScreen,
  RsvpScreen,
} from "./components/Screens";

const Star = ({ className = "" }: { className?: string }) => (
  <span className={`text-gold ${className}`}>✦</span>
);

const Line = ({ dir = "r" }: { dir?: "r" | "l" }) => (
  <span
    className={`hidden h-px flex-1 sm:block ${
      dir === "r"
        ? "bg-gradient-to-r from-transparent to-gold/70"
        : "bg-gradient-to-l from-transparent to-gold/70"
    }`}
  />
);

function Holly({ className = "", flip = "" }: { className?: string; flip?: string }) {
  return (
    <img
      src={hollyImg}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute select-none mix-blend-multiply ${className}`}
      style={{ transform: flip }}
    />
  );
}

function Label({ children }: { children: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 lg:mb-6">
      <Line dir="r" />
      <span className="mx-auto rounded-full bg-gradient-to-b from-[#2a4d37] to-[#17301f] px-7 py-1.5 text-[17px] font-semibold tracking-[0.08em] text-[#f3e3bd] shadow-[0_2px_6px_rgba(30,20,5,.35)] ring-1 ring-gold/70 sm:mx-0">
        {children}
      </span>
      <Line dir="l" />
    </div>
  );
}

const swatches = [
  { name: "Forest", color: "#1d3b2a" },
  { name: "Cranberry", color: "#9d1b25" },
  { name: "Ivory", color: "#fbf3e1" },
  { name: "Antique Gold", color: "#d2a862" },
];

export default function App() {
  return (
    <div className="page-bg relative min-h-screen overflow-hidden">
      {/* corner holly */}
      <Holly className="-left-6 -top-6 w-[210px] sm:w-[270px] lg:w-[340px]" />
      <Holly className="-right-6 -top-6 w-[210px] sm:w-[270px] lg:w-[340px]" flip="scaleX(-1)" />
      <Holly className="-bottom-6 -left-6 w-[170px] sm:w-[220px] lg:w-[280px]" flip="scaleY(-1)" />
      <Holly className="-bottom-6 -right-6 w-[170px] sm:w-[220px] lg:w-[280px]" flip="scale(-1,-1)" />

      <main className="relative z-10 mx-auto max-w-[1600px] px-5 pb-10 pt-8 sm:px-10 lg:px-[4.5%]">
        {/* header */}
        <header className="mb-8 text-center lg:mb-8">
          <div className="flex items-center justify-center gap-4">
            <Line dir="r" />
            <Star className="hidden text-2xl sm:block" />
            <h1 className="font-title text-[46px] leading-none text-[#2a1b10] sm:text-[64px] lg:text-[72px]">
              Christmas Digital Invite
            </h1>
            <Star className="hidden text-2xl sm:block" />
            <Line dir="l" />
          </div>
          <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.32em] text-[#2a1b10] sm:text-[16px]">
            Complete Storyboard Design
          </p>
        </header>

        {/* storyboard */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[3.2%]">
          <section>
            <Label>01. INTRO</Label>
            <IntroScreen />
          </section>
          <section>
            <Label>02. HERO</Label>
            <HeroScreen />
          </section>
          <section>
            <Label>03. CELEBRATION</Label>
            <CelebrationScreen />
          </section>
          <section>
            <Label>04. RSVP</Label>
            <RsvpScreen />
          </section>
        </div>

        {/* footer legend */}
        <footer className="mt-10 flex flex-col items-center justify-center gap-4 text-[17px] text-[#2a1b10] lg:flex-row lg:gap-6">
          <Line dir="r" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {swatches.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5">
                <span
                  className="h-9 w-9 rounded-full shadow-[inset_0_-3px_6px_rgba(0,0,0,.25),0_1px_3px_rgba(0,0,0,.3)] ring-2 ring-white/70"
                  style={{ background: s.color }}
                />
                {s.name}
              </div>
            ))}
          </div>
          <span className="hidden h-9 w-px bg-[#2a1b10] lg:block" />
          <p className="text-center text-[15px] tracking-wide lg:text-[16px]">
            Hand-composed illustration • Gentle motion • Mobile-first • One-tap RSVP
          </p>
          <Line dir="l" />
        </footer>
      </main>
    </div>
  );
}
