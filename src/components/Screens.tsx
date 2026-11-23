import { useState } from "react";
import introImg from "../assets/intro.jpg";
import heroImg from "../assets/hero.jpg";
import celebImg from "../assets/celebration.jpg";
import bowImg from "../assets/rsvp-top.png";
import {
  BackIcon,
  BellIcon,
  CalendarIcon,
  CheckCircle,
  ClockIcon,
  CloseIcon,
  HandIcon,
  MailIcon,
  MenuIcon,
  MessageIcon,
  MusicIcon,
  PinIcon,
  UserIcon,
  UsersIcon,
} from "./icons";
import { Divider, Phone, Snow, fs } from "./Phone";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

/* ---------------------------------- 01 ---------------------------------- */
export function IntroScreen() {
  const [opened, setOpened] = useState(false);

  const unwrap = () => {
    setOpened(true);
    setTimeout(() => scrollTo("phone-hero"), 650);
    setTimeout(() => setOpened(false), 2400);
  };

  return (
    <Phone id="phone-intro">
      <button
        onClick={unwrap}
        className="absolute inset-0 block h-full w-full cursor-pointer text-left"
        aria-label="Tap to unwrap the invitation"
      >
        <img
          src={introImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
          style={{ transform: opened ? "scale(1.12)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />

        {/* twinkling sparkles */}
        {[
          [18, 30, 0],
          [78, 24, 0.8],
          [86, 52, 1.4],
          [10, 62, 0.4],
        ].map(([x, y, d], i) => (
          <span
            key={i}
            className="twinkle absolute text-[#f3d896]"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s`, ...fs(4) }}
          >
            ✦
          </span>
        ))}

        {/* seal burst */}
        {opened && (
          <span
            className="burst absolute rounded-full border-2 border-[#f3d896]"
            style={{ left: "47%", top: "46%", width: "14cqw", height: "14cqw", marginLeft: "-7cqw", marginTop: "-7cqw" }}
          />
        )}

        <div
          className="absolute left-[12%] top-[56%] origin-left -rotate-[9deg]"
          style={{ transform: "rotate(-9deg)" }}
        >
          <div className="gold-text font-script leading-[0.95]" style={fs(13)}>
            <div className="ml-[3cqw]">A little</div>
            <div className="ml-[0cqw]" style={fs(15)}>Christmas</div>
            <div className="ml-[7cqw]">gathering</div>
          </div>
          <Divider className="mt-[2cqw] -ml-[2cqw] scale-90" />
        </div>

        <div className="absolute bottom-[21%] left-0 right-0 flex flex-col items-center text-[#f3e3bd]">
          <HandIcon className="tap-anim h-[9cqw] w-[9cqw] text-[#f3d896]" />
          <span className="mt-[1cqw] drop-shadow-[0_1px_2px_rgba(0,0,0,.8)]" style={fs(4.4)}>
            {opened ? "Unwrapping…" : "Tap to Unwrap"}
          </span>
        </div>
      </button>
    </Phone>
  );
}

/* ---------------------------------- 02 ---------------------------------- */
export function HeroScreen() {
  const [music, setMusic] = useState(false);

  return (
    <Phone id="phone-hero">
      <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/10" />
      <Snow count={26} />

      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-[6cqw] pt-[6cqw] text-[#f3e3bd]">
        <MenuIcon className="h-[7cqw] w-[7cqw]" />
        <button
          onClick={() => setMusic((m) => !m)}
          aria-label="Toggle music"
          className={`flex h-[9cqw] w-[9cqw] items-center justify-center rounded-full border border-[#f3e3bd]/80 transition ${
            music ? "bg-[#f3d896]/90 text-forest-deep" : "bg-black/10"
          }`}
        >
          <MusicIcon className={`h-[5cqw] w-[5cqw] ${music ? "floaty" : ""}`} />
        </button>
      </div>

      <div className="absolute left-0 right-0 top-[27%] text-center">
        <div className="gold-text font-script leading-[0.8] rise" style={{ ...fs(16), transform: "translateX(-6cqw)" }}>
          Merry
        </div>
        <div className="gold-text font-script leading-[0.85] rise" style={{ ...fs(24), animationDelay: ".2s", marginTop: "-1cqw" }}>
          Christmas
        </div>
      </div>

      <div className="absolute left-0 right-0 top-[47%] text-center text-[#f6ead0] rise" style={{ animationDelay: ".5s" }}>
        <p className="leading-[1.15] drop-shadow-[0_1px_3px_rgba(0,0,0,.7)]" style={fs(6.2)}>
          Come share a little
          <br />
          magic with us
        </p>
        <Divider className="mt-[3cqw]" />
      </div>

      <div className="absolute bottom-[14.5%] left-0 right-0 flex justify-center">
        <div
          className="rounded-full border border-gold/70 bg-[#f6ead2]/90 px-[7cqw] py-[1.8cqw] text-[#3a2a17] shadow-[0_2px_10px_rgba(0,0,0,.35)] backdrop-blur"
          style={fs(5.2)}
        >
          25 December 2026
        </div>
      </div>

      <div className="absolute bottom-[5%] left-0 right-0 flex justify-center">
        <button
          onClick={() => scrollTo("phone-celebration")}
          className="rounded-full border border-[#e9c985]/60 bg-gradient-to-b from-[#b3222c] to-[#84151d] px-[7cqw] py-[2.6cqw] font-semibold tracking-wide text-[#fbeccb] shadow-[0_3px_12px_rgba(0,0,0,.5)] transition hover:brightness-110 active:scale-95"
          style={fs(4.8)}
        >
          Explore the Celebration →
        </button>
      </div>
    </Phone>
  );
}

/* ---------------------------------- 03 ---------------------------------- */
const details = [
  { icon: CalendarIcon, lines: ["25 December 2026", "(Friday)"] },
  { icon: ClockIcon, lines: ["7:00 PM Onwards"] },
  { icon: PinIcon, lines: ["The Christmas Garden", "Royal Celebration Hall"] },
  { icon: BellIcon, lines: ["Dress Code:", "Festive Wear"] },
];

export function CelebrationScreen() {
  return (
    <Phone id="phone-celebration">
      <img src={celebImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/30 to-transparent" />

      <div className="absolute left-0 right-0 top-[5.5%] flex justify-between px-[5cqw] text-[#f3d896]/80">
        <BackIcon className="h-[6cqw] w-[6cqw]" />
        <CloseIcon className="h-[6cqw] w-[6cqw] opacity-0" />
      </div>

      <div className="absolute left-[2%] right-[2%] top-[6%] text-center">
        <div className="font-script leading-[0.95] text-[#f8ecd0] drop-shadow-[0_2px_6px_rgba(0,0,0,.7)]" style={fs(15)}>
          <div className="rise">The joy is</div>
          <div className="rise" style={{ animationDelay: ".2s", marginLeft: "6cqw" }}>
            better together
          </div>
        </div>
        <Divider className="mt-[1cqw]" />
      </div>

      <p
        className="absolute left-0 right-0 top-[25%] text-center leading-[1.2] text-[#f8ecd0] drop-shadow-[0_1px_4px_rgba(0,0,0,.9)]"
        style={fs(4.3)}
      >
        Let’s celebrate the
        <br />
        true spirit of Christmas –
        <br />
        with love, laughter and hope.
      </p>

      <div
        className="parchment absolute bottom-[5.5%] left-[10%] right-[10%] px-[6cqw] py-[5cqw]"
        style={{ borderRadius: "3cqw" }}
      >
        <ul className="flex flex-col gap-[3.4cqw]">
          {details.map(({ icon: Icon, lines }, i) => (
            <li key={i} className="flex items-center gap-[4.5cqw] text-[#2f2216]">
              <Icon className="h-[7cqw] w-[7cqw] shrink-0 text-[#3c2c1a]" />
              <div className="leading-[1.1]" style={fs(4.1)}>
                {lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Phone>
  );
}

/* ---------------------------------- 04 ---------------------------------- */
export function RsvpScreen() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const field =
    "flex items-center gap-[4cqw] rounded-[2.4cqw] border border-[#d9bf8d]/80 bg-[#fbf3e1]/70 px-[4.5cqw] shadow-[inset_0_1px_3px_rgba(150,110,50,.15)] focus-within:border-cranberry/60";
  const input =
    "w-full min-w-0 bg-transparent py-[2.6cqw] text-[#3b2a18] outline-none placeholder:text-[#4a3722]/80";

  return (
    <Phone id="phone-rsvp">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1f4a30] to-[#143523]" />

      {/* snowy village at the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[13%]"
        style={{
          backgroundImage: `url(${introImg})`,
          backgroundSize: "100% auto",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-x-0 bottom-[11%] h-[6%] bg-gradient-to-b from-[#143523] to-transparent" />

      <div className="absolute left-0 right-0 top-[3.5%] z-30 flex justify-between px-[5cqw] text-[#f3e3bd]">
        <BackIcon className="h-[6cqw] w-[6cqw]" />
        <CloseIcon className="h-[6cqw] w-[6cqw]" />
      </div>

      {/* bow + bell */}
      <img
        src={bowImg}
        alt=""
        className="floaty pointer-events-none absolute left-1/2 top-[1.5%] z-20 w-[118cqw] max-w-none -translate-x-1/2"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)",
        }}
      />

      <form
        onSubmit={submit}
        className="parchment absolute left-[7%] right-[7%] top-[29%] bottom-[11%] z-10 flex flex-col px-[5cqw] pb-[4cqw] pt-[3cqw]"
        style={{ borderRadius: "2.5cqw 4cqw 2.5cqw 4cqw / 3cqw 2.5cqw 4cqw 2.5cqw" }}
      >
        {sent ? (
          <div className="rise flex h-full flex-col items-center justify-center text-center text-[#3b2a18]">
            <div className="font-script leading-[1] text-cranberry" style={fs(13)}>
              {attending === "yes" ? "See you there!" : "We’ll miss you"}
            </div>
            <Divider className="my-[3cqw]" />
            <p style={fs(4.6)} className="leading-[1.25]">
              {attending === "yes"
                ? `Thank you${name ? `, ${name}` : ""}! Your RSVP${
                    guests ? ` for ${guests} guest${guests === "1" ? "" : "s"}` : ""
                  } has been sent.`
                : `Thank you${name ? `, ${name}` : ""} for letting us know. Merry Christmas!`}
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-[5cqw] rounded-full border border-cranberry/50 px-[5cqw] py-[1.6cqw] text-cranberry"
              style={fs(4)}
            >
              Edit response
            </button>
          </div>
        ) : (
          <>
            <h3
              className="mt-[2cqw] text-center font-script leading-[0.95] text-[#8e1a24]"
              style={fs(12.5)}
            >
              Will you
              <br />
              <span className="ml-[6cqw]">join us?</span>
            </h3>
            <Divider className="my-[1.6cqw]" />

            <div className="grid grid-cols-2 gap-[3cqw]">
              <button
                type="button"
                onClick={() => setAttending("yes")}
                className={`flex items-center gap-[2cqw] rounded-[2.4cqw] border px-[2.5cqw] py-[2.6cqw] text-left leading-[1.05] transition ${
                  attending === "yes"
                    ? "border-[#7d1019] bg-gradient-to-b from-[#b3222c] to-[#84151d] text-[#fbeccb] shadow-md"
                    : "border-[#d9bf8d] bg-[#fbf3e1]/70 text-[#3b2a18]"
                }`}
                style={fs(3.3)}
              >
                <CheckCircle className="h-[6.5cqw] w-[6.5cqw] shrink-0" />
                <span>
                  Yes,
                  <br />
                  I’ll be there!
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAttending("no")}
                className={`flex items-center gap-[2cqw] rounded-[2.4cqw] border px-[2.5cqw] py-[2.6cqw] text-left leading-[1.05] transition ${
                  attending === "no"
                    ? "border-[#7d1019] bg-gradient-to-b from-[#b3222c] to-[#84151d] text-[#fbeccb] shadow-md"
                    : "border-[#d9bf8d] bg-[#fbf3e1]/70 text-[#3b2a18]"
                }`}
                style={fs(3.3)}
              >
                <span
                  className={`h-[5cqw] w-[5cqw] shrink-0 rounded-full border-[0.4cqw] ${
                    attending === "no" ? "border-[#fbeccb] bg-[#fbeccb]/30" : "border-[#4a3722]"
                  }`}
                />
                <span>
                  Sorry, can’t
                  <br />
                  make it.
                </span>
              </button>
            </div>

            <div className="mt-[3.4cqw] flex flex-col gap-[2.4cqw]" style={fs(4)}>
              <label className={field}>
                <UserIcon className="h-[7cqw] w-[7cqw] shrink-0 text-[#3b2a18]" />
                <input
                  className={input}
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className={field}>
                <UsersIcon className="h-[7cqw] w-[7cqw] shrink-0 text-[#3b2a18]" />
                <input
                  className={input}
                  placeholder="Number of Guests"
                  inputMode="numeric"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value.replace(/\D/g, "").slice(0, 2))}
                />
              </label>
              <label className={field}>
                <MessageIcon className="h-[7cqw] w-[7cqw] shrink-0 text-[#3b2a18]" />
                <input
                  className={input}
                  placeholder="A Special Message (Optional)"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-auto flex items-center justify-center gap-[3cqw] rounded-[3cqw] border border-[#6d0d16] bg-gradient-to-b from-[#b8242e] to-[#7f131b] py-[3cqw] font-semibold text-[#fbeccb] shadow-[0_2px_6px_rgba(90,10,20,.5)] transition hover:brightness-110 active:scale-[.98]"
              style={fs(4.6)}
            >
              <MailIcon className="h-[6.5cqw] w-[6.5cqw]" />
              Send RSVP →
            </button>
          </>
        )}
      </form>
    </Phone>
  );
}
