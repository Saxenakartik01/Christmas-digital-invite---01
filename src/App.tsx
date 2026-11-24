import { useEffect, useRef, useState } from "react";
import {
  CelebrationScreen,
  HeroScreen,
  IntroScreen,
  RsvpScreen,
} from "./components/Screens";
import { MusicIcon } from "./components/icons";
import { DesignedByMirrorPatch, Holly, Snow } from "./components/Decorations";
import festiveMusic from "./assets/festive-music.mp3";

interface StoryboardStep {
  id: "intro" | "hero" | "celebration" | "rsvp";
  num: string;
  navTitle: string;
  navSub: string;
  title: string;
  subtitle: string;
  description: string;
  hint: string;
}

const STORYBOARD_STEPS: StoryboardStep[] = [
  {
    id: "intro",
    num: "01",
    navTitle: "THE INTRO",
    navSub: "Interactive Envelope",
    title: "THE INTRO",
    subtitle: "(Interactive Envelope)",
    description:
      "Tap-to-unwrap animation triggers the opening of the envelope and transitions into the festive house",
    hint: "Tap the envelope to break the seal.",
  },
  {
    id: "hero",
    num: "02",
    navTitle: "INSIDE THE HOUSE",
    navSub: "A Festive Welcome",
    title: "INSIDE THE HOUSE",
    subtitle: "(A Festive Welcome)",
    description:
      "Experience the warmth of Christmas with living holiday music, falling snow, and a cheerful snowman.",
    hint: "Tap the snowman to trigger a flurry of snow.",
  },
  {
    id: "celebration",
    num: "03",
    navTitle: "THE CHRISTMAS PARTY",
    navSub: "Celebration",
    title: "THE CHRISTMAS PARTY",
    subtitle: "(Celebration)",
    description:
      "Cocktails, festive dinner, location details, and winter attire guidance for Christmas Day.",
    hint: "Tap the watercolor wreath to ring the chime.",
  },
  {
    id: "rsvp",
    num: "04",
    navTitle: "RSVP FORM",
    navSub: "The Invitation",
    title: "RSVP FORM",
    subtitle: "(The Invitation)",
    description:
      "Kindly confirm your attendance for the Christmas Day dinner and celebration.",
    hint: "Tap the golden bell to chime and submit your RSVP.",
  },
];

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeStepId, setActiveStepId] = useState<"intro" | "hero" | "celebration" | "rsvp">("intro");

  const bgMusicRef = useRef<HTMLAudioElement>(null);
  const phoneScrollRef = useRef<HTMLDivElement>(null);
  const musicDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (musicDelayTimerRef.current) {
        clearTimeout(musicDelayTimerRef.current);
      }
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const container = phoneScrollRef.current;
    if (container) {
      if (id === "hero") {
        container.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: offset, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const startMusic = () => {
    const audio = bgMusicRef.current;
    if (audio) {
      audio.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(() => {
        const unlock = () => {
          audio.play().then(() => {
            setIsMusicPlaying(true);
          }).catch(() => {});
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("touchstart", unlock);
        };
        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("touchstart", unlock, { once: true });
      });
    }
  };

  const toggleMusic = () => {
    const audio = bgMusicRef.current;
    if (!audio) return;
    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(() => {});
    }
  };

  // Lock scroll until intro page is opened
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (phoneScrollRef.current) {
        phoneScrollRef.current.scrollTop = 0;
      }
      window.scrollTo(0, 0);

      const preventScroll = (e: TouchEvent | WheelEvent | KeyboardEvent) => {
        if ("key" in e && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"].includes(e.key)) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventScroll);

      return () => {
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventScroll);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isOpened]);

  // Forward desktop mouse wheel outside the phone directly to the phone content
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 1024 && phoneScrollRef.current && isOpened) {
        if (!phoneScrollRef.current.contains(e.target as Node)) {
          phoneScrollRef.current.scrollTop += e.deltaY;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpened]);

  // Desktop keyboard arrow navigation for smooth scrolling inside phone
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpened) return;
      if (window.innerWidth >= 1024 && phoneScrollRef.current) {
        if (["ArrowDown", "PageDown"].includes(e.key)) {
          phoneScrollRef.current.scrollBy({ top: 160, behavior: "smooth" });
        } else if (["ArrowUp", "PageUp"].includes(e.key)) {
          phoneScrollRef.current.scrollBy({ top: -160, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpened]);

  // Track active section on desktop (inside phoneScrollRef)
  useEffect(() => {
    if (!isOpened) {
      setActiveStepId("intro");
      return;
    }

    const container = phoneScrollRef.current;
    if (!container) return;

    const handleScrollTracking = () => {
      const heroEl = document.getElementById("hero");
      const celebEl = document.getElementById("celebration");
      const rsvpEl = document.getElementById("rsvp");
      if (!heroEl || !celebEl || !rsvpEl) return;

      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      const celebRect = celebEl.getBoundingClientRect();
      const rsvpRect = rsvpEl.getBoundingClientRect();

      if (rsvpRect.top <= centerY) {
        setActiveStepId("rsvp");
      } else if (celebRect.top <= centerY) {
        setActiveStepId("celebration");
      } else {
        setActiveStepId("hero");
      }
    };

    container.addEventListener("scroll", handleScrollTracking, { passive: true });
    handleScrollTracking();
    return () => container.removeEventListener("scroll", handleScrollTracking);
  }, [isOpened]);

  const handleOpenIntro = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    if (musicDelayTimerRef.current) {
      clearTimeout(musicDelayTimerRef.current);
    }

    // Song plays exactly 0.7 seconds (700ms) after intro page video ends
    musicDelayTimerRef.current = setTimeout(() => {
      startMusic();
    }, 700);

    setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
      setActiveStepId("hero");
      if (phoneScrollRef.current) {
        phoneScrollRef.current.scrollTop = 0;
      }
    }, 400);
  };

  const handleRestart = () => {
    if (musicDelayTimerRef.current) {
      clearTimeout(musicDelayTimerRef.current);
    }
    phoneScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
    setIsMusicPlaying(false);
    setTimeout(() => {
      setIsOpened(false);
      setActiveStepId("intro");
    }, 600);
  };

  const handleStepClick = (stepId: "intro" | "hero" | "celebration" | "rsvp") => {
    if (stepId === "intro") {
      handleRestart();
      return;
    }

    if (!isOpened) {
      handleOpenIntro();
      setTimeout(() => {
        scrollTo(stepId);
      }, 760);
    } else {
      scrollTo(stepId);
    }
  };

  const currentStep = STORYBOARD_STEPS.find((s) => s.id === activeStepId) || STORYBOARD_STEPS[0];

  return (
    <div className="relative w-full h-[100svh] min-h-[100svh] lg:h-screen lg:h-[100svh] flex items-center justify-center bg-[#0a1e12] text-[#fbf2dc] overflow-hidden select-none">
      {/* Background festive music uploaded by user */}
      <audio
        ref={bgMusicRef}
        src={festiveMusic}
        loop
        preload="auto"
      />

      {/* ===================================================================
          DESKTOP LUXURY SHOWCASE BACKGROUND (Visible on Laptop & Desktop)
          =================================================================== */}
      <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#153d26_0%,#0c2215_55%,#05130b_100%)] pointer-events-none" />
      <div className="hidden lg:block absolute w-[720px] h-[920px] bg-amber-400/8 blur-[130px] rounded-full pointer-events-none" />
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
        <Snow count={28} />
      </div>

      {/* 4 Corner Pine & Red Berries Foliage on Desktop */}
      <div className="hidden lg:block pointer-events-none">
        <Holly className="-left-6 -top-6 w-56 xl:w-72" />
        <Holly className="-right-6 -top-6 w-56 xl:w-72" flip="scaleX(-1)" />
        <Holly className="-bottom-6 -left-6 w-52 xl:w-64" flip="scaleY(-1)" />
        <Holly className="-bottom-6 -right-6 w-52 xl:w-64" flip="scale(-1,-1)" />
      </div>

      {/* ===================================================================
          3-COLUMN SHOWCASE CONTAINER (Matches reference design)
          - Left: Storyboard Brand Header & 4-Step Nav
          - Center: Sleek Smartphone Frame with live interactive experience
          - Right: Dynamic Step Number, Description & Hint
          =================================================================== */}
      <div className="relative z-20 w-full h-[100svh] min-h-[100svh] lg:min-h-0 lg:h-full flex items-center justify-center px-0 lg:px-4 xl:px-10 max-w-[1440px] mx-auto">
        
        {/* ----------------- LEFT COLUMN: STORYBOARD NAV ----------------- */}
        <div className="hidden lg:flex w-[270px] xl:w-[320px] flex-col justify-center select-none z-30 pr-4 xl:pr-8">
          {/* Back to Storyboard label */}
          <button
            onClick={() => handleStepClick("intro")}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#d4af37]/80 hover:text-[#f3e3bd] transition cursor-pointer mb-5 text-left font-serif"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>STORYBOARD</span>
          </button>

          {/* Main Title */}
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl xl:text-3xl text-[#f7ecd5] tracking-[0.12em] leading-[1.18] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              A MAGICAL<br />
              CHRISTMAS 2026
            </h1>
            <span className="text-[10px] xl:text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#c59d5f] mt-2 mb-8">
              AN INTERACTIVE JOURNEY
            </span>
          </div>

          {/* Navigation Steps */}
          <div className="flex flex-col gap-2.5">
            {STORYBOARD_STEPS.map((step) => {
              const isActive = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`group flex items-center gap-3.5 text-left rounded-xl px-4 py-3 transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#183925]/90 border border-[#d4af37]/60 shadow-[0_4px_20px_rgba(0,0,0,0.45)] text-[#fbf2dc]"
                      : "text-[#cbb692]/70 hover:text-[#fbf2dc] hover:bg-[#13301f]/50 border border-transparent"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider ${
                      isActive ? "text-[#f3d896]" : "text-[#cbb692]/50 group-hover:text-[#f3d896]"
                    }`}
                  >
                    {step.num}
                  </span>
                  <div className="min-w-0 flex-1 flex flex-col">
                    <span
                      className={`font-serif text-xs xl:text-sm font-bold tracking-[0.08em] uppercase ${
                        isActive ? "text-[#fef6e4]" : "text-[#d8c7a8] group-hover:text-[#fef6e4]"
                      }`}
                    >
                      {step.navTitle}
                    </span>
                    <span
                      className={`font-serif text-[11px] truncate ${
                        isActive ? "text-[#d4af37]" : "text-[#9d896d] group-hover:text-[#c59d5f]"
                      }`}
                    >
                      {step.navSub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ----------------- CENTER COLUMN: SMARTPHONE FRAME ----------------- */}
        <div className="relative w-full h-[100svh] min-h-[100svh] lg:min-h-0 lg:w-[380px] xl:w-[410px] lg:h-[min(840px,calc(100vh-48px))] flex flex-col lg:rounded-[52px] lg:border-[3px] lg:border-[#c9a266]/75 lg:shadow-[0_25px_90px_rgba(0,0,0,0.92),0_0_55px_rgba(201,162,102,0.18)] transition-all bg-forest-deep overflow-hidden lg:ring-1 lg:ring-black">
          
          {/* Top Dynamic Island (Desktop/Laptop only) */}
          <div className="hidden lg:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-50 pointer-events-none items-center justify-end pr-2.5 shadow-md">
            <div className="w-2.5 h-2.5 rounded-full bg-[#181d2a] ring-1 ring-[#2c344d]/70 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#0d1017]" />
            </div>
          </div>

          {/* Floating Discreet Music Toggle: Controls Play / Pause of the uploaded festive music */}
          {isOpened && (
            <button
              onClick={toggleMusic}
              aria-label={isMusicPlaying ? "Pause music" : "Play festive music"}
              className={`fixed lg:absolute z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold/60 backdrop-blur-md shadow-2xl transition active:scale-95 animate-fadeIn ${
                isMusicPlaying
                  ? "bg-[#fcebc0] text-[#12291d] shadow-[0_0_15px_rgba(252,235,192,0.8)] ring-2 ring-gold"
                  : "bg-[#12291d]/85 text-[#f3e3bd] hover:bg-[#12291d]"
              }`}
              style={{
                bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
                right: "max(1rem, env(safe-area-inset-right, 1rem))",
              }}
              title={isMusicPlaying ? "Pause Festive Music" : "Play Festive Music"}
            >
              <MusicIcon className={`h-5 w-5 ${isMusicPlaying ? "floaty" : ""}`} />
            </button>
          )}

          {/* 01. INTRO PAGE COVER: Placed on Hero page with animated video */}
          {!isOpened && (
            <div
              className={`fixed lg:absolute inset-0 z-40 w-full min-h-screen min-h-[100svh] lg:min-h-full lg:h-full transition-all duration-400 ease-out cursor-pointer lg:rounded-[46px] overflow-hidden ${
                isOpening
                  ? "opacity-0 scale-105 pointer-events-none filter blur-xs"
                  : "opacity-100 scale-100"
              }`}
              aria-label="Christmas invitation intro"
            >
              <IntroScreen
                opened={isOpening}
                onProceed={handleOpenIntro}
              />
            </div>
          )}

          {/* PHONE INNER SCREEN: Continuous, smooth natural scroll container */}
          <div
            ref={phoneScrollRef}
            className={`relative w-full h-full min-h-full lg:rounded-[46px] ${
              isOpened ? "overflow-y-auto" : "overflow-hidden"
            } overflow-x-hidden scroll-smooth smooth-scroll-container no-scrollbar bg-forest-deep`}
          >
            {/* 02. Hero Section: Plays immediately on opening with 0 delay */}
            <section id="hero" className="w-full h-[100svh] min-h-[100svh] lg:h-full lg:min-h-full relative flex-shrink-0">
              <HeroScreen
                onProceed={() => scrollTo("celebration")}
                isActive={isOpened || isOpening}
              />
            </section>

            {/* 03. Celebration Details Section */}
            <section id="celebration" className="w-full h-[100svh] min-h-[100svh] lg:h-full lg:min-h-full relative flex-shrink-0">
              <CelebrationScreen
                onProceed={() => scrollTo("rsvp")}
                onBack={() => scrollTo("hero")}
              />
            </section>

            {/* 04. RSVP Section */}
            <section id="rsvp" className="w-full h-[100svh] min-h-[100svh] lg:h-full lg:min-h-full relative flex-shrink-0">
              <RsvpScreen
                onBack={() => scrollTo("celebration")}
                onRestart={handleRestart}
              />
            </section>
          </div>
        </div>

        {/* ----------------- RIGHT COLUMN: DYNAMIC STEP INFO ----------------- */}
        <div className="hidden lg:flex w-[270px] xl:w-[320px] flex-col justify-center select-none z-30 pl-4 xl:pl-8">
          {/* Large Step Number */}
          <span className="font-serif text-5xl xl:text-6xl text-[#d4af37]/90 font-light tracking-wider leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {currentStep.num}
          </span>

          {/* Step Title */}
          <h2 className="font-serif text-lg xl:text-xl font-bold tracking-[0.1em] uppercase text-[#f7ecd5] mt-3 drop-shadow">
            {currentStep.title}
          </h2>

          {/* Subtitle */}
          <span className="font-serif italic text-xs xl:text-sm text-[#c59d5f] mt-0.5">
            {currentStep.subtitle}
          </span>

          {/* Description */}
          <p className="font-serif text-xs xl:text-sm text-[#e0cfb3]/85 leading-relaxed mt-4 max-w-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            {currentStep.description}
          </p>

          {/* Interactive Hint */}
          <div className="flex items-start gap-2.5 mt-6 text-xs text-[#d4af37] font-serif bg-[#13301f]/75 border border-[#d4af37]/30 rounded-xl px-3.5 py-2.5 max-w-xs backdrop-blur-sm shadow-md">
            <span className="text-sm shrink-0">👆</span>
            <span className="leading-snug text-[#f3e3bd]">{currentStep.hint}</span>
          </div>

          {/* Transparent Mirror Patch (Shown on Step 04 - RSVP Form / End) */}
          {currentStep.id === "rsvp" && (
            <div className="mt-6 flex items-center animate-fadeIn">
              <DesignedByMirrorPatch />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
