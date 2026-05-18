import { motion } from "framer-motion";
import { ArrowRight, Leaf, Plus } from "lucide-react";
import { useState } from "react";
import type { PageKey } from "../data/navigation";

const AVATARS = [
  { src: "/images/avatar-glasses.jpg", name: "Evan" },
  { src: "/images/avatar-smile.jpg", name: "Miles" },
  { src: "/images/avatar-blond.jpg", name: "Theo" },
];

type HeroContentProps = {
  onNavigate: (page: PageKey) => void;
};

export default function HeroContent({ onNavigate }: HeroContentProps) {
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>(
    [],
  );

  function handleRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 700);
  }

  function openGarden(e: React.MouseEvent<HTMLButtonElement>) {
    handleRipple(e);
    window.setTimeout(() => onNavigate("garden"), 180);
  }

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl"
    >
      {/* Heading */}
      <motion.h1
        variants={item}
        className="text-glow text-[44px] leading-[0.98] tracking-[-0.035em] text-white sm:text-[58px] md:text-[72px] lg:text-[88px]"
        style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
      >
        Bring Nature Into
        <br />
        Your Everyday
        <br />
        Space
        <span className="ml-2 inline-block align-baseline text-white">.</span>
      </motion.h1>

      {/* Decorative leaf */}
      <motion.div
        variants={item}
        animate={{ rotate: [0, 6, -3, 0], y: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="my-6"
      >
        <Leaf className="h-5 w-5 text-[#8daa7b]/70" />
      </motion.div>

      {/* Subtext */}
      <motion.p
        variants={item}
        className="max-w-md text-[15px] leading-relaxed text-[#9aa79a] md:text-[16px]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Discover intelligent plant care, connect with plant lovers, and create a
        greener, happier life with Verdana.
      </motion.p>

      {/* CTAs */}
      <motion.div variants={item} className="mt-9 flex items-center gap-3">
        <motion.button
          onClick={openGarden}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          whileHover={{
            scale: 1.03,
            rotate: [0, -1, 1, -0.5, 0.5, 0],
            transition: { rotate: { duration: 0.55 } },
          }}
          whileTap={{ scale: 0.95 }}
          animate={pressed ? { scale: 0.95 } : {}}
          className="group relative overflow-hidden rounded-full px-7 py-3.5 text-[14px] font-medium text-[#0b1d17]"
          style={{
            background:
              "linear-gradient(135deg,#b9d49a 0%, #8daa7b 50%, #6f8e60 100%)",
            boxShadow:
              "0 14px 40px rgba(141,170,123,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore Your Garden
          </span>
          {/* Shimmer */}
          <motion.span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent"
            animate={{ x: ["-120%", "180%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
            style={{ width: "60%" }}
          />
          {/* Ripples */}
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ opacity: 0.6, scale: 0 }}
              animate={{ opacity: 0, scale: 4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
              style={{ left: r.x, top: r.y }}
            />
          ))}
          {/* Outer glow */}
          <motion.span
            className="pointer-events-none absolute -inset-1 -z-10 rounded-full"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(closest-side, rgba(167,201,138,0.55), transparent 70%)",
              filter: "blur(14px)",
            }}
          />
        </motion.button>

        <motion.button
          onClick={() => onNavigate("garden")}
          whileHover={{ scale: 1.08, rotate: 25 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Next"
          className="glass grid h-12 w-12 place-items-center rounded-full text-[#f3f4ee] transition-shadow hover:shadow-[0_0_24px_rgba(167,201,138,0.35)]"
        >
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Social proof */}
      <motion.div variants={item} className="mt-8 flex items-center gap-4">
        <div className="flex -space-x-3">
          {AVATARS.map((avatar, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, y: -4, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="group relative h-10 w-10 overflow-visible rounded-full ring-2 ring-[#07110d]"
            >
              <img
                src={avatar.src}
                alt={`${avatar.name} profile`}
                className="h-full w-full rounded-full object-cover shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/75"
                draggable={false}
              />
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
                style={{ fontFamily: "DM Sans, sans-serif" }}>
                {avatar.name}
              </span>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.2, y: -4, rotate: 90, zIndex: 12 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            className="relative grid h-10 w-10 place-items-center rounded-full bg-[#8daa7b] text-[#07110d] ring-2 ring-[#07110d] shadow-[0_8px_24px_rgba(167,201,138,0.28)]"
            aria-label="Add plant lover"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
          </motion.button>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-medium text-[#f3f4ee]"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Join 50K+
          </div>
          <div className="text-[11px] text-[#9aa79a]"
            style={{ fontFamily: "DM Sans, sans-serif" }}>
            plant lovers
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
