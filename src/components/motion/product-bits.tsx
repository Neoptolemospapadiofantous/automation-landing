/**
 * The product, drawn as page elements: the chat window, a visitor's message,
 * our answer, the lead it becomes and the calendar slot it lands in. Used as
 * the depth layers of the hero and of the pinned enquiry story. Plain server
 * markup — the motion lives in the client components that place them.
 *
 * Illustrative only: one example enquiry to a car-hire desk, and the window
 * says `example` (AGENTS.md rule 2 — mocks never pass for real figures).
 */
import type { ReactNode } from "react";

export type EnquiryCopy = {
  site: string;
  example: string;
  closed: string;
  time: string;
  visitor: string;
  answeredIn: string;
  answer: string;
  leadTitle: string;
  leadName: string;
  leadPhone: string;
  leadFit: string;
  calDay: string;
  calSlots: [string, string, string];
  calBooked: string;
  calWhat: string;
  prior: [string, string];
};

export const ENQUIRY_EN: EnquiryCopy = {
  site: "larnaca-car-hire.cy",
  example: "example",
  closed: "Office closed",
  time: "23:40",
  visitor: "Hi, do you have an automatic for tomorrow, 8am, at Larnaca airport?",
  answeredIn: "answered in 3 s",
  answer: "Yes, a Yaris automatic is free from 08:00. Shall I hold it and send you the pickup details?",
  leadTitle: "Lead captured",
  leadName: "Andreas P.",
  leadPhone: "+357 99 •• •• 41",
  leadFit: "fit 86/100",
  calDay: "Wed 1 Oct",
  calSlots: ["07:00", "08:00", "09:00"],
  calBooked: "Booked",
  calWhat: "Airport pickup · Yaris auto",
  prior: ["Is there a deposit on the Yaris?", "€200, returned when you drop the car off."],
};

// Two-part shadow: a tight contact shadow for a crisp edge, a long soft one
// for distance.
const shadow =
  "shadow-[0_1px_2px_rgba(20,20,18,0.22),0_4px_10px_-4px_rgba(20,20,18,0.18),0_36px_70px_-28px_rgba(20,20,18,0.32)]";

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`border-ink/90 bg-bg rounded-[14px] border-[1.5px] ${shadow} ${className}`}>{children}</div>
  );
}

export function Meta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] tracking-[0.1em] text-ink-mute uppercase ${className}`}>{children}</span>
  );
}

/** The chat window. `thread` slots let the story reveal messages inside it. */
export function ChatWindow({ copy, children }: { copy: EnquiryCopy; children?: ReactNode }) {
  return (
    <Card className="flex h-full w-full flex-col overflow-hidden">
      <div className="border-border-line flex items-center gap-3 border-b px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <i className="bg-border-hi block h-2.5 w-2.5 rounded-full" />
          <i className="bg-border-hi block h-2.5 w-2.5 rounded-full" />
          <i className="bg-border-hi block h-2.5 w-2.5 rounded-full" />
        </span>
        <Meta className="normal-case tracking-[0.04em]">
          {copy.site} · <b className="text-violet font-medium">{copy.example}</b>
        </Meta>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4 text-[13.5px] leading-[1.45]">
        <p className="bg-surface-hi text-ink-dim max-w-[80%] self-start rounded-[12px] rounded-bl-[4px] px-3 py-2">
          {copy.prior[0]}
        </p>
        <p className="bg-surface text-ink-dim border-border-line max-w-[80%] self-end rounded-[12px] rounded-br-[4px] border px-3 py-2">
          {copy.prior[1]}
        </p>
        {children}
      </div>
    </Card>
  );
}

export function VisitorBubble({ copy }: { copy: EnquiryCopy }) {
  return (
    <Card className="flex flex-col gap-2 px-4 py-3.5">
      <span className="flex items-center justify-between gap-3">
        <Meta>{copy.time} · visitor</Meta>
        <span className="border-ink rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase">
          {copy.closed}
        </span>
      </span>
      <p className="text-ink text-[15px] leading-[1.45]">{copy.visitor}</p>
    </Card>
  );
}

export function AnswerBubble({ copy }: { copy: EnquiryCopy }) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-[14px] border-[1.5px] border-[#141412] bg-[#F5C518] px-4 py-3.5 text-[#141412] ${shadow}`}
    >
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase">
        {copy.time} · {copy.answeredIn}
      </span>
      <p className="text-[15px] leading-[1.45]">{copy.answer}</p>
    </div>
  );
}

export function TypingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`bg-surface-hi inline-flex gap-1.5 self-end rounded-full px-3 py-2 ${className}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <i key={i} className="typing-dot bg-ink-mute block h-1.5 w-1.5 rounded-full" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

export function LeadCard({ copy }: { copy: EnquiryCopy }) {
  return (
    <Card className="flex flex-col gap-2.5 px-4 py-3.5">
      <Meta>{copy.leadTitle}</Meta>
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F5C518] text-[13px] font-semibold text-[#141412]">
          AP
        </span>
        <span className="flex flex-col">
          <b className="text-ink text-[15px] font-semibold">{copy.leadName}</b>
          <span className="text-ink-dim text-[13px] tabular-nums">{copy.leadPhone}</span>
        </span>
      </div>
      <span className="bg-surface-hi block h-1.5 overflow-hidden rounded-full">
        <i data-fit className="bg-ink block h-full w-[86%] origin-left rounded-full" />
      </span>
      <Meta>{copy.leadFit}</Meta>
    </Card>
  );
}

export function CalendarCard({ copy }: { copy: EnquiryCopy }) {
  return (
    <Card className="flex flex-col gap-2 px-4 py-3.5">
      <span className="flex items-center justify-between">
        <Meta>{copy.calDay}</Meta>
        <span data-booked className="font-mono text-[11px] font-semibold tracking-[0.1em] text-violet uppercase">
          ✓ {copy.calBooked}
        </span>
      </span>
      {copy.calSlots.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <span className="text-ink-mute w-11 font-mono text-[11px] tabular-nums">{s}</span>
          {i === 1 ? (
            <span
              data-slot
              className="flex-1 rounded-[8px] border-[1.5px] border-[#141412] bg-[#F5C518] px-2.5 py-1.5 text-[12.5px] text-[#141412]"
            >
              {copy.calWhat}
            </span>
          ) : (
            <span className="border-border-line flex-1 rounded-[8px] border border-dashed px-2.5 py-1.5 text-[12.5px]">
              &nbsp;
            </span>
          )}
        </div>
      ))}
    </Card>
  );
}
