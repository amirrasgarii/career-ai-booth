import { useState } from "react";

type ContactRevealProps = {
  /** Text shown before reveal, e.g. ["amir", "[ at ]", "gmail.com"]. */
  masked: string[];
  /** Fragments joined into the real value only once revealed. */
  parts: string[];
  /** "mailto:" | "tel:" | "" — prefix for the revealed link. */
  prefix?: string;
  /** Accessible name of the control. */
  label: string;
  /** Optional pretty display value (e.g. a spaced phone number). */
  display?: string;
};

/**
 * Shows a contact detail in an anti-scraper form ("amir [ at ] gmail.com").
 * The real value is only assembled and linked after a click.
 */
export function ContactReveal({
  masked,
  parts,
  prefix = "",
  label,
  display,
}: ContactRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const value = parts.join("");
  const shown = display ?? value;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked by the browser — the revealed link still works
    }
  };

  return (
    <span aria-live="polite" className="inline-flex">
      {revealed ? (
        <span className="inline-flex items-center gap-3">
          <a
            href={`${prefix}${value}`}
            aria-label={label}
            className="text-foreground/85 transition-colors hover:text-accent"
          >
            {shown}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label}`}
            className="rounded-full border border-border px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-faint transition-colors hover:border-accent/40 hover:text-accent"
          >
            {copied ? "copied" : "copy"}
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          aria-label={`${label} — click to reveal`}
          className="group inline-flex items-center gap-2 text-faint transition-colors hover:text-accent"
        >
          <span className="inline-flex items-baseline gap-1.5">
            {masked.map((token, i) =>
              token.startsWith("[") ? (
                <span key={i} className="text-accent/60 group-hover:text-accent">
                  {token}
                </span>
              ) : (
                <span key={i}>{token}</span>
              ),
            )}
          </span>
          <span className="rounded-full border border-border px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] transition-colors group-hover:border-accent/40 group-hover:text-accent">
            reveal
          </span>
        </button>
      )}
    </span>
  );
}
