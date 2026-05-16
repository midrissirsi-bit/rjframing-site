"use client";

import React, { useState, useEffect, useRef } from "react";

interface DotCardProps {
  /** The number to count up to (e.g. 42, 240000, 100) */
  target?: number;
  /** Label shown below the counter (e.g. "Builds completed") */
  label?: string;
  /** Optional suffix appended after the number (e.g. "%", "+", "ft") */
  suffix?: string;
  /** Force display in 'k' format above 1000 (default true). Set false to keep full number. */
  formatThousands?: boolean;
  /** Duration of the count-up in ms */
  duration?: number;
}

export default function DotCard({
  target = 777000,
  label = "Views",
  suffix = "",
  formatThousands = true,
  duration = 2000,
}: DotCardProps) {
  const [count, setCount] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Only start counting when the card enters the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || hasStarted) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = target;
    const range = end - start;
    if (range <= 0) return;
    const increment = Math.max(1, Math.ceil(end / (duration / 50)));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration, hasStarted]);

  const display = (() => {
    if (!formatThousands || count < 1000) return count.toLocaleString();
    return `${Math.floor(count / 1000)}k`;
  })();

  return (
    <div className="outer" ref={wrapRef}>
      <div className="dot" />
      <div className="card">
        <div className="ray" />
        <div className="text">
          {display}
          {suffix && <span className="suffix">{suffix}</span>}
        </div>
        <div className="label">{label}</div>
        <div className="line topl" />
        <div className="line leftl" />
        <div className="line bottoml" />
        <div className="line rightl" />
      </div>
    </div>
  );
}
