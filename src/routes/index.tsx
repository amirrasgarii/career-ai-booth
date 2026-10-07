import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import vehicleCar from "@/assets/vehicle-car.png";
import vehicleTruck from "@/assets/vehicle-truck.png";
import vehicleScania from "@/assets/vehicle-scania.png";
import vehicleScooter from "@/assets/vehicle-scooter.png";
import { ResumeAssistant } from "@/components/ResumeAssistant";
import { ContactReveal } from "@/components/ContactReveal";
import cvAsset from "@/assets/amir-askari-cv.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amir Askari — Senior Embedded System Engineer" },
      {
        name: "description",
        content:
          "Resume of Amir Askari, Senior Embedded System Engineer: 10+ years across Volvo Cars, Volvo Trucks, Scania and Voi — automotive software and electric micromobility.",
      },
      { property: "og:title", content: "Amir Askari — Senior Embedded System Engineer" },
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
  current?: boolean;
  bullets: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: "Scania",
    role: "Lead Engineer",
    period: "2025 — Present",
    location: "Södertälje · Heavy trucks",
    focus: "Super",
    vehicle: vehicleScania,
    vehicleAlt: "Scania Super high-line truck, side profile",
    accent: "accent",
    current: true,
    bullets: [
      "Lead engineer for a new onboard and offboard calculation project — started it from scratch and built it out on AWS.",
      "Offboard/cloud calculation services in Python on AWS, alongside the onboard models (C, MATLAB/Simulink).",
      "Own the architecture and delivery across vehicle and cloud, coordinating development activities.",
    ],
  },
  {
    company: "Voi",
    role: "Senior Embedded Software Engineer",
    period: "2023 — 2025",
    location: "Stockholm · Electric micromobility",
    focus: "Scooters",
    vehicle: vehicleScooter,
    vehicleAlt: "Electric kick scooter, side profile",
    accent: "accent-2",
    bullets: [
      "Firmware engineering: embedded software design, development and testing for vehicle and IoT.",
      "Implemented new vehicle/IoT features in C and Python on Zephyr RTOS.",
      "Worked within CI-driven development for the scooter fleet.",
    ],
  },
  {
    company: "Scania",
    role: "Senior Embedded Software Engineer",
    period: "2022 — 2023",
    location: "Södertälje · Heavy trucks",
    focus: "Super",
    vehicle: vehicleScania,
    vehicleAlt: "Scania Super high-line truck, side profile",
    accent: "accent",
    bullets: [
      "Designed, developed and tested gear-selection software in the transmission ECU (MATLAB/Simulink, C).",
      "Developed gear-selection scenarios across vehicle configurations.",
      "Project responsible for the dual electric vehicle.",
    ],
  },
  {
    company: "Volvo Trucks",
    role: "Embedded Software Engineer",
    period: "2019 — 2022",
    location: "Göteborg · Commercial vehicles",
    focus: "Trucks",
    vehicle: vehicleTruck,
    vehicleAlt: "Heavy-duty semi truck with trailer, side profile",
    accent: "accent-2",
    bullets: [
      "Designed, developed and tested software for transmission electronic control units (C++).",
      "Contributed to the Volvo Powertrain platform framework and its software test framework.",
      "Led planning activities for a scrum team.",
    ],
  },
  {
    company: "Volvo Cars",
    role: "Embedded Software Engineer",
    period: "2015 — 2019",
    location: "Göteborg · Passenger vehicles",
    focus: "XC40",
    vehicle: vehicleCar,
    vehicleAlt: "Volvo XC40 compact SUV, side profile",
    accent: "accent",
    bullets: [
      "Designed, built and tested concepts from idea to functional prototype in cars and driving simulators.",
      "Developed HMI for self-driving cars and VR simulators (C++, QML, Unity).",
      "Contributed to UI/UX projects (DUX) and built electronics prototypes with Arduino and Raspberry Pi.",
    ],
  },
];

type Education = {
  degree: string;
  school: string;
  period: string;
  note?: string;
};

const EDUCATION: Education[] = [
  {
    degree: "MSc, Embedded Electronic System Design",
    school: "Chalmers University of Technology",
    period: "2014 — 2016",
    note: "Master's thesis: Using high-speed sampling and DSP for evaluating sensor signals — Volvo Group Trucks Technology.",
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
  const current = EXPERIENCES[active] ?? EXPERIENCES[0]!;
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
                  key={`${exp.company}-${i}`}
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
                      exp.current
                        ? "glow-pulse bg-accent"
                        : isActive
                          ? "bg-accent"
                          : "bg-faint group-hover:bg-muted"
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
            {current.current ? (
              <span className="tick-in inline-flex items-center gap-2 rounded-full border border-accent/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                <span className="glow-pulse size-1 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/70" />
                Current role
              </span>
            ) : null}
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
              A. Askari — Mobility
            </span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em]">
            <span className="hidden text-faint sm:inline">Stockholm · SE</span>
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
            ASKARI
          </h1>
          <div className="mt-10 grid grid-cols-12 items-end gap-6">
            <div
              className="rise-in col-span-12 md:col-span-6"
              style={{ animationDelay: "160ms" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                Senior Embedded System Engineer
              </p>
              <p className="mt-4 max-w-[42ch] text-pretty text-lg text-foreground/85">
                Embedded software across Swedish mobility — from passenger cars
                and heavy trucks to the last electric mile.
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
                <div className="mt-1 text-sm">Stockholm, SE</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Brands
                </div>
                <div className="mt-1 text-sm">4</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  In industry
                </div>
                <div className="mt-1 text-sm">2015 — now</div>
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
              {EDUCATION.map((edu, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-4 border-b border-border pb-4"
                >
                  <div>
                    <div className="font-display text-2xl tracking-tight">
                      {edu.degree}
                    </div>
                    <div className="mt-1 text-sm text-muted">{edu.school}</div>
                    {edu.note ? (
                      <p className="mt-3 max-w-[54ch] text-xs leading-relaxed text-faint">
                        {edu.note}
                      </p>
                    ) : null}
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ask-my-resume assistant */}
          <div className="col-span-12 md:col-span-6">
            <SectionHeading marker="c" label="Assistant" trailing="Live" />
            <ResumeAssistant />
          </div>
        </div>
      </section>

      {/* contact strip */}
      <footer id="contact" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-x-10 gap-y-3 font-mono text-[12px] tracking-[0.1em]">
              <ContactReveal
                label="Email"
                masked={["amir", "[ at ]", "gmail.com"]}
                // "\u0040" is @ — kept out of the page source so scrapers can't match it
                parts={["amir.asgari", "\u0040", "gmail.com"]}
                prefix="mailto:"
              />
              <ContactReveal
                label="Phone number"
                masked={["+46", "[ hidden ]"]}
                parts={["+46", "73", "217", "85", "27"]}
                display="+46 73 217 85 27"
                prefix="tel:"
              />
              <a
                href="https://www.linkedin.com/in/amir-askari-67bb0b8b/"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/80 transition-colors hover:text-accent"
              >
                linkedin.com/in/amir-askari
              </a>
            </div>
            <a
              href={cvAsset.url}
              download="Amir-Askari-CV.pdf"
              className="inline-flex items-center gap-3 rounded-md bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent-2"
            >
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
            <span>© 2026 A. Askari</span>
            <span className="h-px flex-1 bg-border" />
            <span>Printed spec · v1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
