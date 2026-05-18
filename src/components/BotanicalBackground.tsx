import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Cinematic animated botanical background.
 * Layered: photo backplate + parallax leaves SVG + ambient glow + fog + particles.
 */
export default function BotanicalBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 0.6 });

  // Parallax transforms
  const bgX = useTransform(sx, (v) => v * -10);
  const bgY = useTransform(sy, (v) => v * -10);
  const leafX = useTransform(sx, (v) => v * -22);
  const leafY = useTransform(sy, (v) => v * -22);
  const glowX = useTransform(sx, (v) => v * 14);
  const glowY = useTransform(sy, (v) => v * 14);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base botanical photo, slowly breathing */}
      <motion.div
        className="absolute -inset-[6%]"
        style={{ x: bgX, y: bgY }}
        animate={{ scale: [1.04, 1.08, 1.04] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/images/botanical-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Cinematic dark gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,rgba(7,17,13,0.55)_60%,rgba(7,17,13,0.92)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07110d]/60 via-transparent to-[#07110d]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07110d]/55 via-transparent to-[#07110d]/55" />

      {/* Ambient emerald glow that follows mouse */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle, rgba(167,201,138,0.10) 0%, rgba(167,201,138,0.04) 35%, transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting silhouette leaves (SVG) - parallax layer */}
      <motion.svg
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-screen"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ x: leafX, y: leafY }}
      >
        <defs>
          <radialGradient id="leafGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a7c98a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0b1d17" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Floating leaf blobs */}
        {[
          { cx: 120, cy: 140, r: 180, d: 0 },
          { cx: 1050, cy: 220, r: 220, d: 1.4 },
          { cx: 280, cy: 680, r: 240, d: 2.6 },
          { cx: 950, cy: 640, r: 200, d: 0.8 },
          { cx: 600, cy: 380, r: 280, d: 2 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="url(#leafGrad)"
            animate={{
              cx: [b.cx, b.cx + 18, b.cx - 12, b.cx],
              cy: [b.cy, b.cy - 14, b.cy + 10, b.cy],
            }}
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.d,
            }}
          />
        ))}
      </motion.svg>

      {/* Soft volumetric fog */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to top, rgba(7,17,13,0.85), rgba(11,29,23,0.25) 60%, transparent)",
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => {
          const left = (i * 47) % 100;
          const top = (i * 73) % 100;
          const size = 1.5 + ((i * 13) % 4);
          const dur = 8 + ((i * 7) % 12);
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#a7c98a]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                filter: "blur(0.5px)",
                boxShadow: "0 0 8px rgba(167,201,138,0.6)",
              }}
              animate={{
                y: [0, -40, -10, -60, 0],
                x: [0, 12, -8, 6, 0],
                opacity: [0, 0.7, 0.4, 0.8, 0],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 6) * 0.8,
              }}
            />
          );
        })}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Film grain */}
      <div className="grain" />
    </div>
  );
}
