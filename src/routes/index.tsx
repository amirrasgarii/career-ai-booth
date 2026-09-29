import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import vehicleCar from "@/assets/vehicle-car.png";
import vehicleTruck from "@/assets/vehicle-truck.png";
import vehicleBus from "@/assets/vehicle-bus.png";
import vehicleScooter from "@/assets/vehicle-scooter.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amir Asgari — Vehicle & Mobility Industry Resume" },
      {
        name: "description",
        content:
          "Resume of Amir Asgari: experience across Volvo Cars, Volvo Trucks, Scania and Voi — from passenger cars and heavy trucks to buses and electric micromobility.",
      },
      { property: "og:title", content: "Amir Asgari — Vehicle & Mobility Industry Resume" },
      {
        property: "og:description",
        content:
          "Experience across Volvo Cars, Volvo Trucks, Scania and Voi. Work history, education and contact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  focus: string;
  vehicle: string;
  vehicleAlt: string;
  accent: "accent" | "accent-2";
  bullets: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: "Volvo Cars",
    role: "Role title here",
    period: "20XX — 20XX",
    location: "Göteborg · Passenger vehicles",
    focus: "Cars",
    vehicle: vehicleCar,
    vehicleAlt: "Premium electric SUV, side profile",
    accent: "accent",
    bullets: [
      "Impact statement one — replace with your real achievement.",
      "Impact statement two — replace with your real achievement.",
      "Impact statement three — replace with your real achievement.",
    ],
  },
  {
    company: "Volvo Trucks",
    role: "Role title here",
    period: "20XX — 20XX",
    location: "Göteborg · Commercial vehicles",
    focus: "Trucks",
    vehicle: vehicleTruck,
    vehicleAlt: "Heavy-duty semi truck with trailer, side profile",
    accent: "accent-2",
    bullets: [
      "Impact statement one — replace with your real achievement.",
      "Impact statement two — replace with your real achievement.",
      "Impact statement three — replace with your real achievement.",
    ],
  },
  {
    company: "Scania",
    role: "Role title here",
    period: "20XX — 20XX",
    location: "Södertälje · Buses & heavy vehicles",
    focus: "Buses",
    vehicle: vehicleBus,
    vehicleAlt: "Modern city bus, side profile",
    accent: "accent",
    bullets: [
      "Impact statement one — replace with your real achievement.",
      "Impact statement two — replace with your real achievement.",
      "Impact statement three — replace with your real achievement.",
    ],
  },
  {
    company: "Voi",
    role: "Role title here",
    period: "20XX — 20XX",
    location: "Stockholm · Electric micromobility",
    focus: "Scooters",
    vehicle: vehicleScooter,
    vehicleAlt: "Electric kick scooter, side profile",
    accent: "accent-2",
    bullets: [
      "Impact statement one — replace with your real achievement.",
      "Impact statement two — replace with your real achievement.",
      "Impact statement three — replace with your real achievement.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Degree title here",
    school: "University name here",
    period: "20XX — 20XX",
  },
  {
    degree: "Degree title here",
    school: "University name here",
    period: "20XX — 20XX",
  },
];

function SectionHeading({
  marker,
  label,
  trailing,
}: {
  marker: string;
  label: string;
  trailing?: string;
}) {
  return (
    <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
      <span className="text-accent">({marker})</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-border rule-draw" />
      {trailing ? <span className="text-faint">{trailing}</span> : null}
    </div>
  );
}

function ExperienceSwitcher() {
  const [active, setActive] = useState(0);
  const current = EXPERIENCES[active];
  const accentText =
    current.accent === "accent" ? "text-accent" : "text-accent-2";
  const accentBg = current.accent === "accent" ? "bg-accent" : "bg-accent-2";
  const accentShadow =
    current.accent === "accent"
      ? "shadow-[0_0_16px] shadow-accent/70"
      : "shadow-[0_0_16px] shadow-accent-2/70";

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading marker="a" label="Experience" trailing="Volvo · Scania · Voi" />

      <div className="grid grid-cols-12 gap-8">
        {/* company selector rail */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div
            className="flex gap-2 overflow-x-auto pb-2 md:sticky md:top-24 md:flex-col md:overflow-visible md:pb-0"
            role="tablist"
            aria-label="Work experience"
          >
            {EXPERIENCES.map((exp, i) => {
              const isActive = i === active;
              return (
                <button
                  key={exp.company}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`group shrink-0 rounded-md border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.2em] transition-colors md:border-0 md:px-0 md:py-2 ${
                    isActive
                      ? "border-accent/40 text-foreground"
                      : "border-border text-faint hover:text-muted"
                  }`}
                >
                  <span
                    className={`mr-2 inline-block size-1.5 rounded-full align-middle transition-colors ${
                      isActive ? "bg-accent" : "bg-faint group-hover:bg-muted"
                    }`}
                  />
                  {exp.company}
                  <span className="mt-0.5 block text-[10px] tracking-[0.15em] text-faint">
                    {exp.period}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* vehicle turntable */}
        <div className="col-span-12 md:col-span-9 lg:col-span-5">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border glass">
            {/* turntable rings */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="turntable-spin size-[78%] rounded-full border border-dashed border-border" />
              <div className="absolute size-[58%] rounded-full border border-border/60" />
              <div
                className={`absolute bottom-[18%] h-6 w-[70%] rounded-[100%] blur-xl transition-colors duration-700 ${
                  current.accent === "accent" ? "bg-accent/20" : "bg-accent-2/20"
                }`}
              />
            </div>
            {/* the vehicle rotates in on every switch */}
            <img
              key={active}
              src={current.vehicle}
              alt={current.vehicleAlt}
              width={1024}
              height={768}
              loading={active === 0 ? "eager" : "lazy"}
              className="vehicle-enter relative z-10 w-[88%] drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
            />
            <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(EXPERIENCES.length).padStart(2, "0")}
            </div>
            <div
              className={`absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] ${accentText}`}
            >
              {current.focus}
            </div>
          </div>
        </div>

        {/* role details — re-animates on switch */}
        <div key={`details-${active}`} className="col-span-12 lg:col-span-5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span
              className={`tick-in font-mono text-[11px] tracking-[0.2em] ${accentText}`}
            >
              {current.period}
            </span>
            <span className="tick-in font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {current.company}
            </span>
          </div>
          <h3
            className="rise-in mt-3 font-display text-4xl font-medium tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            {current.role}
          </h3>
          <p
            className="rise-in mt-2 text-sm text-muted"
            style={{ animationDelay: "140ms" }}
          >
            {current.location}
          </p>
          <ul className="mt-6 max-w-[52ch] space-y-3 text-sm text-foreground/80">
            {current.bullets.map((bullet, i) => (
              <li
                key={i}
                className="rise-in flex gap-3"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                <span
                  className={`mt-1 size-1.5 shrink-0 rounded-full ${accentBg} ${accentShadow}`}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent/30 selection:text-foreground">
      {/* sticky top bar */}
      <header className="glass sticky top-0 z-30 border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="glow-pulse size-2 rounded-full bg-accent shadow-[0_0_12px] shadow-accent/70" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              A. Asgari — Mobility
            </span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em]">
            <span className="hidden text-faint sm:inline">Göteborg · SE</span>
            <a
              href="#contact"
              className="text-foreground/80 transition-colors hover:text-accent"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="aurora aurora-a pointer-events-none absolute -inset-[20%] opacity-50 blur-[70px]" />
        <div className="aurora aurora-b pointer-events-none absolute -inset-[20%] opacity-50 blur-[70px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20">
          <div className="rise-in flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            <span>Curriculum Vitae</span>
            <span className="h-px flex-1 bg-border rule-draw" />
            <span>Ref. 2026</span>
          </div>
          <h1
            className="rise-in mt-8 font-display text-[clamp(3.5rem,13vw,11rem)] font-medium leading-[0.9] tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            AMIR
            <br />
            ASGARI
          </h1>
          <div className="mt-10 grid grid-cols-12 items-end gap-6">
            <div
              className="rise-in col-span-12 md:col-span-6"
              style={{ animationDelay: "160ms" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                Vehicle &amp; Mobility Industry
              </p>
              <p className="mt-4 max-w-[42ch] text-pretty text-lg text-foreground/85">
                Experience across Swedish mobility — from passenger cars and
                heavy trucks to buses and the last electric mile.
              </p>
            </div>
            <div
              className="rise-in col-span-12 grid grid-cols-3 gap-4 md:col-span-6 md:justify-items-end"
              style={{ animationDelay: "240ms" }}
            >
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Location
                </div>
                <div className="mt-1 text-sm">Göteborg, SE</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Brands
                </div>
                <div className="mt-1 text-sm">4</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Focus
                </div>
                <div className="mt-1 text-sm">Vehicles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* experience switcher with rotating vehicles */}
      <ExperienceSwitcher />

      {/* education + assistant slot */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <SectionHeading marker="b" label="Education" />
            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree + edu.period}
                  className="flex items-baseline justify-between gap-4 border-b border-border pb-4"
                >
                  <div>
                    <div className="font-display text-2xl tracking-tight">
                      {edu.degree}
                    </div>
                    <div className="mt-1 text-sm text-muted">{edu.school}</div>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* reserved assistant slot */}
          <div className="col-span-12 md:col-span-6">
            <SectionHeading marker="c" label="Assistant" />
            <div className="glass grid min-h-[220px] place-items-center rounded-2xl border border-border p-6 text-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                  Coming soon
                </div>
                <div className="mt-3 font-display text-2xl tracking-tight text-foreground/70">
                  Ask my resume
                </div>
                <p className="mx-auto mt-2 max-w-[30ch] text-sm text-muted">
                  A conversational assistant will answer questions about this CV
                  here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* contact strip */}
      <footer id="contact" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-x-10 gap-y-3 font-mono text-[12px] tracking-[0.1em]">
              <a
                href="mailto:amir.asgari@example.com"
                className="text-foreground/80 transition-colors hover:text-accent"
              >
                amir.asgari@example.com
              </a>
              <a
                href="tel:+46700000000"
                className="text-foreground/80 transition-colors hover:text-accent"
              >
                +46 70 000 00 00
              </a>
              <a
                href="#"
                className="text-foreground/80 transition-colors hover:text-accent"
              >
                linkedin/in/amir-asgari
              </a>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-md bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent-2"
            >
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
            <span>© 2026 A. Asgari</span>
            <span className="h-px flex-1 bg-border" />
            <span>Printed spec · v1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
