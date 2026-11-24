import { useState } from "react";
import {
  BackIcon,
  BellIcon,
  CalendarIcon,
  ClockIcon,
  PinIcon,
} from "./icons";
import { Holly, PageBottomGoldBorder, Snow } from "./Decorations";
import { playChristmasBell } from "../utils/audio";
import celebImg from "../assets/celebration.jpg";
import celebrationWreath from "../assets/celebration-wreath.png";

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
    <section className="relative min-h-screen min-h-[100svh] md:min-h-full w-full flex flex-col items-center justify-center overflow-hidden bg-forest-deep select-none px-4 py-8">
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
      <Holly className="-left-4 -top-4 w-28 sm:w-52" />
      <Holly className="-right-4 -top-4 w-28 sm:w-52" flip="scaleX(-1)" />
      <Holly className="-bottom-4 -left-4 w-24 sm:w-44" flip="scaleY(-1)" />
      <Holly className="-bottom-4 -right-4 w-24 sm:w-44" flip="scale(-1,-1)" />

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
    </section>
  );
}
