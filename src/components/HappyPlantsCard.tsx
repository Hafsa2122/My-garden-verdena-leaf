import { motion } from "framer-motion";
import { Leaf, Plus } from "lucide-react";

const AVATARS = [
  { src: "/images/avatar-glasses.jpg", name: "Evan" },
  { src: "/images/avatar-smile.jpg", name: "Miles" },
  { src: "/images/avatar-blond.jpg", name: "Theo" },
];

export default function HappyPlantsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative w-[300px] sm:w-[330px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="glass-strong relative overflow-hidden rounded-[22px] p-5"
      >
        {/* Animated glowing border */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[22px]"
          style={{
            background:
              "linear-gradient(225deg, rgba(167,201,138,0.4), transparent 40%, rgba(167,201,138,0.25))",
            WebkitMask:
              "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
          }}
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top floating leaf badge */}
        <motion.div
          animate={{ rotate: [0, 12, -6, 0], y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10"
        >
          <Leaf className="h-4 w-4 text-[#a7c98a]" />
        </motion.div>

        {/* Title */}
        <h3
          className="mt-4 text-[22px] leading-tight text-[#f0f3ea]"
          style={{ fontFamily: "Playfair Display, serif", fontWeight: 500 }}
        >
          Healthy plants, <span className="italic">happy life.</span>
        </h3>

        {/* Description */}
        <p
          className="mt-2 max-w-[260px] text-[12.5px] leading-relaxed text-[#9aa79a]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Smart reminders, expert tips, and a community that grows with you.
        </p>

        {/* Liked by */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {AVATARS.map((avatar, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.18, y: -3, zIndex: 5 }}
                transition={{ type: "spring", stiffness: 280, damping: 14 }}
                className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-[#0b1d17]"
                aria-label={`${avatar.name} profile`}
              >
                <img
                  src={avatar.src}
                  alt=""
                  className="h-full w-full object-cover ring-1 ring-white/60"
                  draggable={false}
                />
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.18, y: -3, rotate: 90, zIndex: 6 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="grid h-8 w-8 place-items-center rounded-full bg-[#8daa7b] text-[#07110d] ring-2 ring-[#0b1d17] shadow-[0_8px_24px_rgba(167,201,138,0.24)]"
              aria-label="Add plant lover"
            >
              <Plus className="h-3.5 w-3.5 stroke-[3]" />
            </motion.button>
          </div>
          <div className="leading-tight">
            <div
              className="text-[11px] text-[#9aa79a]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Loved by
            </div>
            <div
              className="text-[12px] font-medium text-[#e6ebde]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              plant lovers
            </div>
          </div>
        </div>

        {/* Soft bottom glow */}
        <div
          className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(167,201,138,0.25), transparent)",
            filter: "blur(24px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
