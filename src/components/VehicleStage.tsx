import { useEffect, useRef, useState } from "react";

type StageEntry = {
  company: string;
  vehicle: string;
  vehicleAlt: string;
  accent: "accent" | "accent-2";
  frames?: string[];
};

/** How long each angle is held while the turntable runs on its own. */
const AUTO_MS = 650;
/** How many pixels of drag it takes to advance one angle. */
const PX_PER_STEP = 22;

export function VehicleStage({
  entry,
  active,
  position,
  total,
}: {
  entry: StageEntry;
  active: number;
  position: number;
  total: number;
}) {
  const frames = entry.frames;
  const count = frames?.length ?? 0;
  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [handed, setHanded] = useState(false);
  const drag = useRef<{ x: number; frame: number } | null>(null);

  // a new job starts on the side profile, and the turntable runs on its own again
  useEffect(() => {
    setFrame(0);
    setHanded(false);
    drag.current = null;
    setDragging(false);
  }, [active]);

  // keep every angle warm so the turn is instant
  useEffect(() => {
    if (!frames) return;
    for (const src of frames) {
      const img = new Image();
      img.src = src;
    }
  }, [frames]);

  // idle turn until the visitor takes over
  useEffect(() => {
    if (!count || handed || dragging) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setFrame((f) => (f + 1) % count),
      AUTO_MS,
    );
    return () => window.clearInterval(id);
  }, [count, handed, dragging]);

  const step = (delta: number) => {
    if (!count) return;
    setHanded(true);
    setFrame((f) => (((f + delta) % count) + count) % count);
  };

  return (
    <div
      role="group"
      aria-label={
        frames ? `${entry.company} vehicle — drag left or right to turn it` : entry.company
      }
      tabIndex={count ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
      }}
      onPointerDown={(e) => {
        if (!count) return;
        drag.current = { x: e.clientX, frame };
        setDragging(true);
        setHanded(true);
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!count || !d) return;
        const delta = Math.round((e.clientX - d.x) / PX_PER_STEP);
        setFrame((((d.frame + delta) % count) + count) % count);
      }}
      onPointerUp={() => {
        drag.current = null;
        setDragging(false);
      }}
      onPointerCancel={() => {
        drag.current = null;
        setDragging(false);
      }}
      className="glass relative flex aspect-[4/3] select-none items-center justify-center overflow-hidden rounded-2xl border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
      style={{
        cursor: count ? (dragging ? "grabbing" : "grab") : undefined,
        touchAction: count ? "pan-y" : undefined,
      }}
    >
      {/* turntable rings */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="turntable-spin size-[78%] rounded-full border border-dashed border-border" />
        <div className="absolute size-[58%] rounded-full border border-border/60" />
        <div
          className={`absolute bottom-[18%] h-6 w-[70%] rounded-[100%] blur-xl transition-colors duration-700 ${
            entry.accent === "accent" ? "bg-accent/20" : "bg-accent-2/20"
          }`}
        />
      </div>

      {/* the vehicle: turns in on every job switch, then follows the drag */}
      <img
        key={active}
        src={frames ? frames[frame] : entry.vehicle}
        alt={
          frames
            ? `${entry.vehicleAlt} — angle ${frame + 1} of ${count}`
            : entry.vehicleAlt
        }
        width={frames ? 489 : 1024}
        height={frames ? 376 : 768}
        loading={active === 0 ? "eager" : "lazy"}
        draggable={false}
        className="vehicle-enter relative z-10 w-[88%] drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
      />

      <div className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
        {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {frames ? (
        <div className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          {String(Math.round(frame * (360 / count))).padStart(3, "0")}°
        </div>
      ) : null}

      {frames ? (
        <div
          className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-faint transition-opacity duration-500 ${
            handed ? "opacity-0" : "opacity-80"
          }`}
        >
          drag to turn
        </div>
      ) : null}
    </div>
  );
}
