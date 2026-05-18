import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Droplets, CloudDrizzle, Sprout } from "lucide-react";
import { useState } from "react";

type Reminder = {
  id: string;
  icon: React.ElementType;
  title: string;
  when: string;
  tone: "amber" | "sage" | "blue";
  done?: boolean;
};

const INITIAL: Reminder[] = [
  { id: "1", icon: Droplets, title: "Water Aloe Vera", when: "Today", tone: "amber" },
  { id: "2", icon: CloudDrizzle, title: "Mist Monstera", when: "Tomorrow", tone: "blue" },
  { id: "3", icon: Sprout, title: "Fertilize Snake Plant", when: "In 3 Days", tone: "sage" },
];

const TONE: Record<Reminder["tone"], { dot: string; ring: string; icon: string }> = {
  amber: { dot: "bg-amber-300", ring: "ring-amber-300/40", icon: "text-amber-200" },
  sage: { dot: "bg-[#a7c98a]", ring: "ring-[#a7c98a]/40", icon: "text-[#cfe2b8]" },
  blue: { dot: "bg-sky-300", ring: "ring-sky-300/40", icon: "text-sky-200" },
};

export default function TodaysCareCard() {
  const [items, setItems] = useState(INITIAL);

  function toggle(id: string) {
    setItems((arr) => arr.map((r) => (r.id === id ? { ...r, done: !r.done } : r)));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      whileHover={{ y: -4 }}
      className="relative w-[300px] sm:w-[330px]"
    >
      {/* Soft floating motion */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong relative rounded-[22px] p-5"
      >
        {/* Animated border glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[22px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(167,201,138,0.35), transparent 40%, rgba(167,201,138,0.25))",
            WebkitMask:
              "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-white/5 ring-1 ring-white/10">
            <CalendarDays className="h-3.5 w-3.5 text-[#cfe2b8]" />
          </div>
          <span
            className="text-[13px] font-medium tracking-wide text-[#e6ebde]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Today's Care
          </span>
        </div>

        {/* Items */}
        <ul className="space-y-2">
          {items.map((r, i) => {
            const Icon = r.icon;
            const t = TONE[r.tone];
            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => toggle(r.id)}
                  whileHover={{ x: 2, backgroundColor: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors"
                >
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-full bg-[#0b1d17] ring-1 ${t.ring}`}
                  >
                    <Icon className={`h-4 w-4 ${t.icon}`} />
                  </div>
                  <div className="flex-1 leading-tight">
                    <div
                      className={`text-[13px] font-medium ${
                        r.done ? "text-[#9aa79a] line-through" : "text-[#eef2e6]"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {r.title}
                    </div>
                    <div
                      className="mt-0.5 text-[11px] text-[#9aa79a]"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {r.when}
                    </div>
                  </div>
                  <span
                    className={`relative inline-block h-2 w-2 rounded-full ${t.dot} ${
                      !r.done ? "animate-pulseDot" : "opacity-40"
                    }`}
                  />
                </motion.button>
              </motion.li>
            );
          })}
        </ul>

        {/* Footer */}
        <motion.button
          whileHover={{ x: 2 }}
          className="mt-4 flex w-full items-center justify-between border-t border-white/5 pt-3 text-[12px] text-[#9aa79a] transition-colors hover:text-[#cfe2b8]"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          <span>View All Reminders</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
