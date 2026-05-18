import { motion } from "framer-motion";
import { CalendarCheck2, ScanLine, Users, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { PageKey } from "../data/navigation";

const ITEMS = [
  { id: "care", icon: CalendarCheck2, title: "Smart Care", subtitle: "Reminders", page: "care" },
  { id: "id", icon: ScanLine, title: "Plant", subtitle: "Identification", page: "identify" },
  { id: "community", icon: Users, title: "Community", subtitle: "Connection", page: "community" },
  { id: "growth", icon: TrendingUp, title: "Growth", subtitle: "Tracking", page: "garden" },
];

type FeatureDockProps = {
  onNavigate: (page: PageKey) => void;
};

export default function FeatureDock({ onNavigate }: FeatureDockProps) {
  const [active, setActive] = useState("care");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
      className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-4 sm:bottom-10"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-auto"
      >
        <div
          className="glass-strong relative flex items-center gap-1 rounded-full p-1.5 sm:gap-2 sm:p-2"
          style={{
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.55), 0 0 40px rgba(167,201,138,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Reflection top line */}
          <span className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {ITEMS.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <motion.button
                key={it.id}
                onClick={() => {
                  setActive(it.id);
                  window.setTimeout(() => onNavigate(it.page as PageKey), 120);
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="group relative flex items-center gap-2.5 rounded-full px-3 py-2 sm:px-4 sm:py-2.5"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(141,170,123,0.25), rgba(141,170,123,0.08))"
                    : "transparent",
                }}
              >
                <motion.span
                  animate={
                    isActive
                      ? { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#0b1d17]/70 ring-1 ring-white/10"
                >
                  <Icon
                    className={`h-3.5 w-3.5 transition-colors ${
                      isActive ? "text-[#cfe2b8]" : "text-[#9aa79a] group-hover:text-[#dfe6d6]"
                    }`}
                  />
                </motion.span>
                <span className="hidden text-left leading-tight sm:block">
                  <span
                    className={`block text-[11.5px] font-medium ${
                      isActive ? "text-[#f0f3ea]" : "text-[#d8e0d2]"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {it.title}
                  </span>
                  <span
                    className="block text-[10px] text-[#9aa79a]"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {it.subtitle}
                  </span>
                </span>

                {/* Active glow */}
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    className="pointer-events-none absolute -inset-px -z-10 rounded-full"
                    style={{
                      boxShadow:
                        "0 0 30px rgba(167,201,138,0.3), inset 0 0 0 1px rgba(167,201,138,0.25)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
