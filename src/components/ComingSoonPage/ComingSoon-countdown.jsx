import { useEffect, useMemo, useState } from "react";

const CYCLE_MS = 48 * 60 * 60 * 1000;
const COUNTDOWN_MS = 15 * 24 * 60 * 60 * 1000;

function getCurrentTarget(anchorMs) {
  const elapsed = Date.now() - anchorMs;
  const cycleIndex = Math.floor(elapsed / CYCLE_MS);
  return anchorMs + cycleIndex * CYCLE_MS + COUNTDOWN_MS;
}

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

const pad = (n) => String(n).padStart(2, "0");

export default function ComingSoonCountdown({
  cycleAnchor = "2026-05-05T00:00:00",
}) {
  const anchorMs = useMemo(
    () => new Date(cycleAnchor).getTime(),
    [cycleAnchor],
  );
  const [time, setTime] = useState(() =>
    getTimeLeft(getCurrentTarget(anchorMs)),
  );

  useEffect(() => {
    const id = setInterval(
      () => setTime(getTimeLeft(getCurrentTarget(anchorMs))),
      1000,
    );
    return () => clearInterval(id);
  }, [anchorMs]);

  const units = [
    { value: time.days, label: "DÍAS" },
    { value: time.hours, label: "HORAS" },
    { value: time.minutes, label: "MINUTOS" },
    { value: time.seconds, label: "SEGUNDOS" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md md:px-10 md:py-5">
      <div className="flex items-end justify-center gap-8 p-4 md:p-0 md:gap-10">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="text-6xl font-medium leading-none text-white tabular-nums md:text-6xl lg:text-7xl">
              {pad(u.value)}
            </span>
            <span className="mt-2 text-[10px] tracking-[0.2em] text-white/70 md:text-xs">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
