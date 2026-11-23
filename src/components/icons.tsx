import type { ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const Base = ({ children, ...p }: P & { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    {children}
  </svg>
);

export const MenuIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);
export const MusicIcon = (p: P) => (
  <Base {...p}>
    <path d="M9 18V6l10-2v12" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
  </Base>
);
export const BackIcon = (p: P) => (
  <Base {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Base>
);
export const CloseIcon = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);
export const CalendarIcon = (p: P) => (
  <Base {...p}>
    <rect x="4" y="5" width="16" height="15" rx="1.5" />
    <path d="M4 10h16M8 3v4M16 3v4M8 13h2M12 13h2M16 13h0M8 16.5h2M12 16.5h2" />
  </Base>
);
export const ClockIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.5 2" />
  </Base>
);
export const PinIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Base>
);
export const BellIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 3.5c-3.2 0-5 2.4-5 5.5v3.5L5 17h14l-2-4.5V9c0-3.1-1.8-5.5-5-5.5z" />
    <path d="M10 19.5a2 2 0 004 0" />
  </Base>
);
export const UserIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20c.5-4 3.3-6 7-6s6.5 2 7 6" />
  </Base>
);
export const UsersIcon = (p: P) => (
  <Base {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3 19c.4-3.3 2.8-5 6-5s5.6 1.7 6 5" />
    <circle cx="17" cy="9.5" r="2.3" />
    <path d="M16.5 14.2c2.6-.1 4.2 1.4 4.5 4.3" />
  </Base>
);
export const MessageIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 5h16v11H9l-5 4V5z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </Base>
);
export const MailIcon = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="M3.5 7l8.5 6.5L20.5 7" />
  </Base>
);
export const CheckCircle = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.3l2.9 2.9L16.5 9.5" />
  </Base>
);
export const HandIcon = (p: P) => (
  <Base {...p}>
    <path d="M9 11V5.5a1.5 1.5 0 013 0V11" />
    <path d="M12 10.5V9a1.5 1.5 0 013 0v2" />
    <path d="M15 11a1.5 1.5 0 013 0v4c0 3-2 5.5-5.5 5.5-2.5 0-3.8-1.2-5-3L5 13.5a1.4 1.4 0 012.2-1.6L9 14" />
    <path d="M4 5.5a5 5 0 00-.5 2.5M20 5.5a5 5 0 01.5 2.5" strokeDasharray="1 2" />
  </Base>
);
