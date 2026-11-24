import { useEffect, useRef, useState } from "react";
import introVideo from "../assets/intro-video.mp4";
import introPoster from "../assets/intro-poster.jpg";
import heroImg from "../assets/hero.jpg";
import heroVideo from "../assets/hero-video.mp4";
import celebImg from "../assets/celebration.jpg";
import celebrationWreath from "../assets/celebration-wreath.png";
import rsvpBgImg from "../assets/rsvp-bg.jpg";
import {
  BackIcon,
  BellIcon,
  CalendarIcon,
  CheckCircle,
  ClockIcon,
  HandIcon,
  MailIcon,
  MessageIcon,
  PinIcon,
  UserIcon,
  UsersIcon,
} from "./icons";
import {
  DesignedByMirrorPatch,
  Divider,
  Holly,
  PageBottomGoldBorder,
  Snow,
} from "./Decorations";
import {
  playChristmasBell,
  playSnowFlurrySound,
} from "../utils/audio";

/* =========================================================================
   01. INTRO SCREEN: Animated Opening Video (Plays on User Tap)
   ========================================================================= */
export function IntroScreen({
  opened = false,
  onProceed,
}: {
  opened?: boolean;
  onProceed?: () => void;
  onStartMusic?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const proceedCalledRef = useRef(false);

  const proceedToHero = () => {
    if (proceedCalledRef.current) return;
    proceedCalledRef.current = true;
    const v = videoRef.current;
    if (v) {
      v.pause();
    }
    onProceed?.();
  };

  const handleScreenTap = () => {
    if (proceedCalledRef.current) return;

    if (!isPlaying) {
      setIsPlaying(true);
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        // User interacted, play intro video
        v.muted = false;
        v.play().catch(() => {
          if (v) {
            v.muted = true;
            v.play().catch(() => {});
          }
        });
      }
    } else {
      // Second tap skips straight to hero page
      proceedToHero();
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration && v.currentTime >= v.duration - 0.08) {
      proceedToHero();
    }
  };

  return (
    <div
      onClick={handleScreenTap}
      className="relative w-full h-[100svh] min-h-[100svh] lg:h-full lg:min-h-full flex flex-col items-center justify-center overflow-hidden bg-forest-deep select-none cursor-pointer"
      aria-label="Tap anywhere to open invitation"
    >
      {/* Background Animated Opening Video */}
      <video
        ref={videoRef}
        src={introVideo}
        poster={introPoster}
        playsInline
        preload="auto"
        onEnded={proceedToHero}
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />

      {/* Falling snow */}
      <Snow count={26} />

      {/* Decorative corner holly */}
      <Holly className="-left-4 -top-4 w-24 xs:w-28" />
      <Holly className="-right-4 -top-4 w-24 xs:w-28" flip="scaleX(-1)" />
      <Holly className="-bottom-4 -left-4 w-20 xs:w-24" flip="scaleY(-1)" />
      <Holly className="-bottom-4 -right-4 w-20 xs:w-24" flip="scale(-1,-1)" />

      {/* Tap to Open Indicator (Disappears once video starts playing) */}
      <div
        className={`absolute bottom-[20%] left-0 right-0 flex flex-col items-center text-[#f3e3bd] pointer-events-none transition-all duration-500 ${
          isPlaying ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
        }`}
      >
        <HandIcon className="tap-anim h-8 w-8 text-[#f3d896] drop-shadow" />
        <span className="mt-2 text-sm sm:text-base font-serif drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] tracking-wide">
          Tap to Open Invitation
        </span>
      </div>

      {/* Subtle Skip button if video is currently playing */}
      {isPlaying && !opened && (
        <div className="absolute top-6 right-6 z-30 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              proceedToHero();
            }}
            className="px-3.5 py-1.5 rounded-full bg-black/50 border border-gold/50 text-[#fcebc0] text-xs font-serif tracking-widest uppercase backdrop-blur hover:bg-black/70 active:scale-95 transition"
          >
            Skip →
          </button>
        </div>
      )}

      {/* Golden border line at bottom of page */}
      <PageBottomGoldBorder />
    </div>
  );
}

/* =========================================================================
   02. HERO SCREEN (Visual Scene - Animated Video Background with Typography)
   ========================================================================= */
const SNOW_FLURRY_PARTICLES = Array.from({ length: 26 }).map((_, i) => {
  const angle = (i / 26) * 2 * Math.PI + ((i * 17) % 7 - 3) * 0.08;
  const distance = 65 + ((i * 29) % 110);
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance - 25; // slight upward fountain bias
  const drift = ((i * 13) % 40) - 20;
  const size = 13 + (i % 4) * 4;
  const rot = (i * 47) % 360;
  const delay = (i % 5) * 0.035;
  const glyph = i % 3 === 0 ? "❄" : i % 3 === 1 ? "❅" : "•";
  return { tx, ty, drift, size, rot, delay, glyph };
});

export function HeroScreen({
  onProceed,
  isActive = false,
}: {
  onProceed?: () => void;
  onBack?: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
  isActive?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [snowmanWobble, setSnowmanWobble] = useState(false);
  const [snowBurstKey, setSnowBurstKey] = useState(0);

  // Instant playback with 0 delay the moment user enters or opens hero page
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isActive) {
      v.currentTime = 0;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If unmuted autoplay blocked by browser policy, ensure muted and play immediately
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    } else {
      v.pause();
    }
  }, [isActive]);

  // Visibility tracking for hero video when scrolling between sections
  useEffect(() => {
    const section = sectionRef.current;
    const v = videoRef.current;
    if (!section || !v) return;

    // Determine the scroll container (desktop phone container or null for viewport)
    const scrollContainer = section.closest(".overflow-y-auto") as HTMLElement | null;

    const checkHeroVisibility = () => {
      const rect = section.getBoundingClientRect();
      const parentRect = scrollContainer
        ? scrollContainer.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight, height: window.innerHeight };

      const visibleTop = Math.max(rect.top, parentRect.top);
      const visibleBottom = Math.min(rect.bottom, parentRect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const ratio = visibleHeight / Math.min(rect.height, parentRect.height);

      if (ratio >= 0.25) {
        if (isActive) {
          v.play().catch(() => {
            v.muted = true;
            v.play().catch(() => {});
          });
        }
      } else {
        v.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            if (isActive) {
              v.play().catch(() => {
                v.muted = true;
                v.play().catch(() => {});
              });
            }
          } else {
            v.pause();
          }
        });
      },
      {
        root: scrollContainer,
        threshold: [0, 0.15, 0.25, 0.5, 0.75],
      }
    );

    observer.observe(section);

    // Scroll listeners ensure immediate pause/play during fast scrolls
    const handleScroll = () => checkHeroVisibility();
    scrollContainer?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (isActive) {
      checkHeroVisibility();
    }

    return () => {
      observer.disconnect();
      scrollContainer?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  // Ensure user tap anywhere on hero page un-mutes/plays hero video
  const handleHeroInteraction = () => {
    const v = videoRef.current;
    if (v) {
      if (v.paused) {
        v.play().catch(() => {});
      }
      if (v.muted) {
        v.muted = false;
      }
    }
  };

  const handleSnowmanClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSnowFlurrySound();
    setSnowmanWobble(true);
    setSnowBurstKey((prev) => prev + 1);
    setTimeout(() => setSnowmanWobble(false), 750);
  };

  return (
    <div
      ref={sectionRef}
      onClick={handleHeroInteraction}
      className="relative w-full h-[100svh] min-h-[100svh] lg:h-full lg:min-h-full flex flex-col items-center justify-center overflow-hidden bg-forest-deep select-none px-4"
      aria-label="Christmas Hero page"
    >
      {/* Background Video: preloaded with autoPlay and playsInline for 0 delay */}
      <video
        ref={videoRef}
        src={heroVideo}
        poster={heroImg}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      {/* Snowfall */}
      <Snow count={26} />

      {/* Corner Holly */}
      <Holly className="-left-4 -top-4 w-24 xs:w-28" />
      <Holly className="-right-4 -top-4 w-24 xs:w-28" flip="scaleX(-1)" />

      {/* ⛄ Interactive Snowman (Tap for snow flurry!) */}
      <div
        onClick={handleSnowmanClick}
        className={`group absolute z-30 cursor-pointer pointer-events-auto flex items-center justify-center -translate-x-1/2 translate-y-1/2 ${
          snowmanWobble ? "animate-snowmanWobble" : ""
        }`}
        style={{ left: "67%", bottom: "14%", width: "90px", height: "110px" }}
        role="button"
        aria-label="Tap snowman for snow effect"
        title="Tap the snowman to trigger a flurry of snow!"
      >
        {/* Subtle idle frosty aura on hover */}
        <span className="absolute inset-0 rounded-full border border-white/20 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Gentle floating snowflake indicator above snowman */}
        <span className="absolute -top-3.5 text-white/80 text-sm drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] floaty select-none pointer-events-none">
          ❄
        </span>

        {/* Snow flurry explosion triggered on click */}
        {snowBurstKey > 0 && (
          <div key={snowBurstKey} className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Frost Icy Mist Shockwaves */}
            <div className="absolute w-28 h-28 rounded-full border-2 border-white/90 bg-cyan-100/25 shadow-[0_0_30px_rgba(255,255,255,0.9)] animate-frostShockwave" />
            <div className="absolute w-20 h-20 rounded-full bg-white/45 blur-md animate-frostShockwave" />

            {/* Flying Snowflakes and Powder Puffs */}
            {SNOW_FLURRY_PARTICLES.map((p, idx) => (
              <span
                key={idx}
                className="absolute text-white font-serif drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] animate-snowParticle"
                style={{
                  fontSize: `${p.size}px`,
                  animationDelay: `${p.delay}s`,
                  "--tx": `${p.tx}px`,
                  "--ty": `${p.ty}px`,
                  "--drift": `${p.drift}px`,
                  "--rot": `${p.rot}deg`,
                } as React.CSSProperties}
              >
                {p.glyph}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hero Typography: shifted a little bit to the top side */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto -translate-y-4 text-center pointer-events-none w-full max-w-xl mx-auto px-2">
        {/* Merry Christmas on the same line */}
        <div className="relative rise w-full flex items-center justify-center">
          <h1 className="gold-text font-title text-4xl xs:text-[44px] whitespace-nowrap tracking-wide leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Merry Christmas
          </h1>
        </div>

        {/* Come share a little magic with us on the same line */}
        <div
          className="mt-2 text-[#fcebc0] rise flex flex-col items-center w-full px-2"
          style={{ animationDelay: "0.35s" }}
        >
          <p className="font-display italic text-xs xs:text-sm whitespace-nowrap tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-normal text-center">
            Come share a little magic with us
          </p>
          <Divider className="mt-2 scale-90" />
        </div>
      </div>

      {/* Button to explore celebration */}
      {onProceed && (
        <div className="absolute bottom-4 sm:bottom-6 z-20 flex justify-center pointer-events-auto">
          <button
            onClick={onProceed}
            className="flex items-center gap-2 rounded-full border border-[#e9c985]/70 bg-gradient-to-b from-[#b3222c]/90 to-[#7f131b]/90 px-5 py-2 sm:px-7 sm:py-2.5 text-xs sm:text-sm font-serif font-semibold text-[#fbeccb] shadow-xl backdrop-blur transition hover:brightness-110 hover:scale-105 active:scale-95 ring-1 ring-gold/40 cursor-pointer"
          >
            <span>Explore Celebration</span>
            <span className="font-sans text-xs">↓</span>
          </button>
        </div>
      )}

      {/* Golden border line at bottom of page */}
      <PageBottomGoldBorder />
    </div>
  );
}

/* =========================================================================
   03. CELEBRATION SCREEN (Redesigned matching Hero & RSVP styling with Wreath)
   ========================================================================= */
const celebrationEventDetails = [
  {
    icon: CalendarIcon,
    tag: "WHEN",
    title: "Friday, 25 December 2026",
    subtitle: "Christmas Day Evening",
  },
  {
    icon: ClockIcon,
    tag: "TIME",
    title: "7:00 PM Onwards",
    subtitle: "Cocktail Hour & Festive Dinner",
  },
  {
    icon: PinIcon,
    tag: "WHERE",
    title: "The Christmas Garden",
    subtitle: "Royal Celebration Hall, Winter Avenue",
  },
  {
    icon: BellIcon,
    tag: "ATTIRE",
    title: "Festive & Elegant Wear",
    subtitle: "Warm Winter & Holiday Colors Encouraged",
  },
];

export function CelebrationScreen({
  onProceed,
  onBack,
}: {
  onProceed?: () => void;
  onBack?: () => void;
}) {
  const [wreathRing, setWreathRing] = useState(false);

  const handleWreathClick = () => {
    playChristmasBell();
    setWreathRing(true);
    setTimeout(() => setWreathRing(false), 850);
  };

  return (
    <div className="relative w-full h-[100svh] min-h-[100svh] lg:h-full lg:min-h-full flex flex-col items-center justify-center overflow-hidden bg-forest-deep select-none px-4 py-4 sm:py-6">
      {/* Background Image: matching Hero and RSVP painted festive scene */}
      <img
        src={celebImg}
        alt="Christmas celebration background"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45 pointer-events-none" />

      {/* Gentle Snowfall */}
      <Snow count={26} />

      {/* Corner Holly Ornaments */}
      <Holly className="-left-4 -top-4 w-24 xs:w-28" />
      <Holly className="-right-4 -top-4 w-24 xs:w-28" flip="scaleX(-1)" />
      <Holly className="-bottom-4 -left-4 w-20 xs:w-24" flip="scaleY(-1)" />
      <Holly className="-bottom-4 -right-4 w-20 xs:w-24" flip="scale(-1,-1)" />

      {/* Main Luxury Invitation Card Container matching RSVP page structure */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-[340px] sm:max-w-[390px] mx-auto my-auto">
        {/* 🎀 Watercolor Christmas Wreath Crest (Tap to ring chime) */}
        <button
          type="button"
          onClick={handleWreathClick}
          className={`relative z-30 w-32 h-32 sm:w-36 sm:h-36 -mb-7 mx-auto flex items-center justify-center cursor-pointer select-none transition-transform active:scale-95 ${
            wreathRing ? "animate-snowmanWobble" : ""
          }`}
          aria-label="Tap Christmas wreath to chime bell"
          title="Tap the wreath to ring the Christmas chime!"
        >
          {/* Subtle glow halo */}
          <span className="absolute inset-2 rounded-full bg-[#fdf2d5]/30 blur-md pointer-events-none" />
          <img
            src={celebrationWreath}
            alt="Watercolor Christmas Wreath with Red Bow"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] pointer-events-none"
          />
        </button>

        {/* Parchment Invitation Card matching RSVP card styling */}
        <div className="parchment flex flex-col w-full rounded-2xl p-4 sm:p-5 shadow-2xl border border-gold/60 backdrop-blur-md relative overflow-hidden">
          {/* Inner decorative gold hairline border */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-[#c9a266]/35 pointer-events-none" />

          {/* Header Typography matching RSVP card */}
          <div className="flex flex-col items-center text-center pt-5 pb-2">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8e1a24] font-serif font-bold">
              The Celebration
            </span>
            <h2 className="font-script text-2xl sm:text-3xl text-[#2a170d] leading-none mt-0.5">
              Eat, Drink & Be Merry
            </h2>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#b88a38] to-transparent my-1" />
            <p className="font-serif italic text-xs text-[#5c4630] max-w-xs mt-0.5">
              “The joy is better together”
            </p>
          </div>

          {/* Event Details: 4 rows matching RSVP input fields */}
          <div className="flex flex-col gap-2 w-full my-1">
            {celebrationEventDetails.map(({ icon: Icon, tag, title, subtitle }, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl border border-[#d9bf8d]/90 bg-[#fffdf6]/85 px-3 py-2 sm:py-2.5 shadow-[inset_0_1px_3px_rgba(150,110,50,0.12)] hover:bg-[#fffdf6] transition"
              >
                {/* Emerald & Gold Icon Medal */}
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-[#244b34] to-[#142d1e] text-[#fbeccb] shadow-md ring-1 ring-gold/60">
                  <Icon className="h-4 w-4" />
                </div>

                {/* Details Typography */}
                <div className="min-w-0 flex-1">
                  <div className="text-[8px] uppercase tracking-[0.2em] text-[#8c632e] font-semibold">
                    {tag}
                  </div>
                  <div className="font-serif text-xs sm:text-sm font-bold text-[#2a1d12] leading-tight truncate">
                    {title}
                  </div>
                  <div className="font-serif text-[10px] sm:text-[11px] text-[#5c4630] leading-tight truncate">
                    {subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons matching RSVP button style */}
          <div className="flex items-center gap-2 w-full mt-3">
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-1 rounded-full border border-gold/50 bg-[#163824]/85 px-3.5 py-2 sm:py-2.5 text-[#f3e3bd] font-serif text-xs backdrop-blur hover:bg-[#102c1c] active:scale-95 transition shadow-md"
            >
              <BackIcon className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={onProceed}
              className="group flex-1 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-[#b3222c] to-[#7f131b] py-2 sm:py-2.5 px-3.5 text-[#fbeccb] font-serif text-xs sm:text-sm font-semibold shadow-xl ring-2 ring-[#e9c985]/70 transition hover:brightness-110 active:scale-95"
            >
              <span>RSVP for Celebration</span>
              <span className="transition-transform group-hover:translate-x-1 font-sans text-xs">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Golden border line at bottom of page */}
      <PageBottomGoldBorder />
    </div>
  );
}

/* =========================================================================
   04. RSVP SCREEN (Interactive RSVP Form on Parchment Background)
   ========================================================================= */
export function RsvpScreen({
  onBack,
  onRestart,
}: {
  onBack?: () => void;
  onRestart?: () => void;
} = {}) {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const handleRingBell = () => {
    playChristmasBell();
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="relative w-full h-[100svh] min-h-[100svh] lg:h-full lg:min-h-full flex items-center justify-center overflow-hidden bg-forest-deep select-none px-4 py-4 sm:py-6">
      {/* Background Image: fills and adapts naturally to any phone screen aspect ratio */}
      <img
        src={rsvpBgImg}
        alt="Christmas RSVP background"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />

      {/* Falling snow */}
      <Snow count={26} />

      {/* Interactive Christmas Bell Hotspot (Click to ring bell) */}
      <button
        type="button"
        onClick={handleRingBell}
        className="absolute z-30 flex items-center justify-center cursor-pointer rounded-full transition active:scale-95"
        style={{
          top: "clamp(36px, 9%, 130px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(85px, 22vw, 130px)",
          height: "clamp(85px, 22vw, 130px)",
        }}
        aria-label="Ring Christmas Bell"
        title="Tap to Ring the Bell!"
      >
        {/* Subtle shimmer ring indicator */}
        <span
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isRinging
              ? "opacity-100 ring-4 ring-gold/70 shadow-[0_0_25px_rgba(252,235,192,0.9)]"
              : "opacity-0 hover:opacity-100 border border-gold/40"
          }`}
        />

        {/* Ring chime waves on click */}
        {isRinging && (
          <span className="burst pointer-events-none absolute h-24 w-24 rounded-full border-2 border-[#fcebc0] shadow-[0_0_35px_rgba(252,235,192,0.95)]" />
        )}
      </button>

      {/* RSVP Form Container: Sits perfectly in the central parchment paper area */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-[340px] sm:max-w-[390px] mx-auto my-auto pt-14 pb-5 sm:pt-16 sm:pb-7">
        {sent ? (
          /* Confirmation Success State */
          <div className="rise flex flex-col items-center justify-center text-center text-[#2a1d12] bg-[#fbf4e2]/90 border border-[#d9bf8d] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md w-full my-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#2a4d37] to-[#17301f] text-[#fcebc0] flex items-center justify-center mb-3 shadow-md ring-2 ring-gold/60">
              <CheckCircle className="h-7 w-7" />
            </div>
            <h3 className="font-script text-3xl sm:text-4xl text-[#8e1a24] leading-tight">
              {attending === "yes" ? "See you there!" : "We’ll miss you!"}
            </h3>
            <Divider className="my-2.5 scale-90" />
            <p className="font-serif text-sm sm:text-base text-[#4a3722] leading-relaxed max-w-xs">
              {attending === "yes"
                ? `Thank you${name ? `, ${name}` : ""}! Your RSVP for ${guests} guest${guests === "1" ? "" : "s"} has been received.`
                : `Thank you${name ? `, ${name}` : ""} for letting us know. Wishing you a blessed and Merry Christmas!`}
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-4 rounded-full border border-[#8e1a24]/50 px-5 py-1.5 text-xs sm:text-sm font-serif text-[#8e1a24] hover:bg-[#8e1a24]/10 transition active:scale-95"
            >
              Edit response
            </button>
            {onRestart && (
              <button
                type="button"
                onClick={onRestart}
                className="mt-2.5 text-xs font-serif text-[#7a5523] underline cursor-pointer"
              >
                Restart Invitation
              </button>
            )}
          </div>
        ) : (
          /* RSVP Input Form */
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            {/* Header: KINDLY REPLY BY 15 DECEMBER */}
            <div className="text-center mb-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#7a5523] font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                Kindly Reply by 15 December
              </span>
              <h2 className="font-script text-4xl sm:text-5xl text-[#8a141e] leading-none mt-0.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                Will you join us?
              </h2>
              <Divider className="my-1.5 scale-75" />
            </div>

            {/* Attending Toggle Options */}
            <div className="grid grid-cols-2 gap-2.5 w-full my-2.5">
              <button
                type="button"
                onClick={() => setAttending("yes")}
                className={`flex items-center gap-2 rounded-xl border p-2.5 sm:p-3 text-left transition active:scale-98 ${
                  attending === "yes"
                    ? "border-[#7d1019] bg-gradient-to-b from-[#b3222c] to-[#7f131b] text-[#fbeccb] shadow-md ring-1 ring-[#e9c985]/70"
                    : "border-[#d9bf8d] bg-[#fbf3e1]/80 text-[#3b2a18] hover:bg-[#fbf3e1]"
                }`}
              >
                <CheckCircle className={`h-5 w-5 shrink-0 ${attending === "yes" ? "text-[#fcebc0]" : "text-[#7a5523]/60"}`} />
                <span className="text-xs sm:text-sm font-serif font-semibold leading-tight">
                  Yes, I’ll be there!
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAttending("no")}
                className={`flex items-center gap-2 rounded-xl border p-2.5 sm:p-3 text-left transition active:scale-98 ${
                  attending === "no"
                    ? "border-[#7d1019] bg-gradient-to-b from-[#b3222c] to-[#7f131b] text-[#fbeccb] shadow-md ring-1 ring-[#e9c985]/70"
                    : "border-[#d9bf8d] bg-[#fbf3e1]/80 text-[#3b2a18] hover:bg-[#fbf3e1]"
                }`}
              >
                <span
                  className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                    attending === "no" ? "border-[#fbeccb] bg-[#fbeccb]/40" : "border-[#7a5523]"
                  }`}
                />
                <span className="text-xs sm:text-sm font-serif font-semibold leading-tight">
                  Sorry, can’t make it.
                </span>
              </button>
            </div>

            {/* Input Fields */}
            <div className="flex flex-col gap-2 w-full my-1.5">
              {/* Name */}
              <label className="flex items-center gap-3 rounded-xl border border-[#d9bf8d]/90 bg-[#fffdf6]/85 px-3.5 py-2.5 shadow-[inset_0_1px_3px_rgba(150,110,50,0.12)] focus-within:border-[#8e1a24] focus-within:ring-1 focus-within:ring-[#8e1a24]/30">
                <UserIcon className="h-5 w-5 shrink-0 text-[#7a5523]" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent text-[#2a1d12] placeholder:text-[#6a4f32]/80 outline-none text-xs sm:text-sm font-serif"
                />
              </label>

              {/* Number of Guests */}
              <label className="flex items-center gap-3 rounded-xl border border-[#d9bf8d]/90 bg-[#fffdf6]/85 px-3.5 py-2.5 shadow-[inset_0_1px_3px_rgba(150,110,50,0.12)] focus-within:border-[#8e1a24] focus-within:ring-1 focus-within:ring-[#8e1a24]/30">
                <UsersIcon className="h-5 w-5 shrink-0 text-[#7a5523]" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent text-[#2a1d12] outline-none text-xs sm:text-sm font-serif cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </label>

              {/* Special Message */}
              <label className="flex items-center gap-3 rounded-xl border border-[#d9bf8d]/90 bg-[#fffdf6]/85 px-3.5 py-2.5 shadow-[inset_0_1px_3px_rgba(150,110,50,0.12)] focus-within:border-[#8e1a24] focus-within:ring-1 focus-within:ring-[#8e1a24]/30">
                <MessageIcon className="h-5 w-5 shrink-0 text-[#7a5523]" />
                <input
                  type="text"
                  placeholder="A Special Message (Optional)"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-transparent text-[#2a1d12] placeholder:text-[#6a4f32]/80 outline-none text-xs sm:text-sm font-serif"
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-b from-[#b3222c] to-[#7f131b] py-2.5 sm:py-3 font-serif text-sm sm:text-base font-semibold text-[#fbeccb] shadow-xl ring-2 ring-[#e9c985]/70 transition hover:brightness-110 active:scale-98"
            >
              <MailIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Send RSVP →</span>
            </button>

            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="mt-2 text-xs font-serif text-[#7a5523] hover:text-[#2a1d12] flex items-center justify-center gap-1 cursor-pointer transition"
              >
                <BackIcon className="h-3 w-3" />
                <span>Back to Celebration</span>
              </button>
            )}
          </form>
        )}

        {/* Transparent Mirror Patch Footer (Designed by PATRIKASTUDIO) */}
        <div className="mt-3.5 sm:mt-4 flex justify-center w-full z-30">
          <DesignedByMirrorPatch />
        </div>
      </div>

      {/* Golden border line at bottom of page */}
      <PageBottomGoldBorder />
    </div>
  );
}
