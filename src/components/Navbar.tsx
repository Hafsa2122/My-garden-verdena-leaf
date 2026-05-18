import { motion } from "framer-motion";
import { Leaf, Sprout } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, type PageKey } from "../data/navigation";

type NavbarProps = {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
};

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-0 z-30"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        {/* Logo */}
        <motion.a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("home");
          }}
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2.5"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 8, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#1a3329] to-[#0b1d17] ring-1 ring-white/10"
            >
              <Leaf className="h-4 w-4 text-[#a7c98a]" />
            </motion.div>
            <span className="absolute -inset-1 -z-10 rounded-2xl bg-[#a7c98a]/20 blur-xl" />
          </div>
          <div className="leading-tight">
            <div
              className="text-[15px] font-semibold tracking-[0.22em] text-[#f3f4ee]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              VERDANA
            </div>
            <div
              className="text-[9px] tracking-[0.32em] text-[#9aa79a]/80"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              GROW · CARE · CONNECT
            </div>
          </div>
        </motion.a>

        {/* Center nav (desktop) */}
        <nav className="hidden lg:block">
          <ul className="glass flex items-center gap-1 rounded-full px-3 py-2">
            {NAV_LINKS.map(({ label, page }) => (
              <li key={page}>
                <button
                  onClick={() => onNavigate(page)}
                  data-active={currentPage === page}
                  className="nav-link rounded-full px-4 py-1.5 text-[13px] font-medium text-[#d8e0d2] transition-colors hover:text-white"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: My Garden CTA */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => onNavigate("garden")}
            whileHover={{
              scale: 1.04,
              rotate: [0, -1.5, 1.5, -1, 1, 0],
              transition: { rotate: { duration: 0.5 } },
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative hidden items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-medium text-[#f3f4ee] sm:inline-flex"
            style={{
              background:
                "linear-gradient(135deg, rgba(141,170,123,0.25), rgba(20,30,24,0.45))",
              border: "1px solid rgba(167,201,138,0.25)",
              boxShadow:
                "0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Sprout className="h-4 w-4 text-[#a7c98a] transition-transform group-hover:rotate-12" />
            <span>My Garden</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#a7c98a]/25 px-1.5 text-[11px] font-semibold text-[#dff0c8]">
              3
            </span>
            {/* Ripple glow */}
            <motion.span
              className="absolute inset-0 -z-10 rounded-full"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                boxShadow: [
                  "0 0 0px rgba(167,201,138,0.0)",
                  "0 0 24px rgba(167,201,138,0.35)",
                  "0 0 0px rgba(167,201,138,0.0)",
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
          >
            <div className="space-y-1.5">
              <span className="block h-[1.5px] w-4 bg-[#d8e0d2]" />
              <span className="block h-[1.5px] w-4 bg-[#d8e0d2]" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mt-2 lg:hidden"
        >
          <ul className="glass flex flex-col gap-1 rounded-2xl p-3">
            {NAV_LINKS.map(({ label, page }) => (
              <li key={page}>
                <button
                  onClick={() => {
                    onNavigate(page);
                    setOpen(false);
                  }}
                  data-active={currentPage === page}
                  className="nav-link w-full rounded-xl px-4 py-2 text-left text-sm text-[#d8e0d2] hover:bg-white/5"
                >
                  {label}
                </button>
              </li>
            ))}
            <li className="pt-1">
              <button
                onClick={() => {
                  onNavigate("garden");
                  setOpen(false);
                }}
                data-active={currentPage === "garden"}
                className="flex w-full items-center justify-between rounded-xl bg-[#8daa7b]/15 px-4 py-2 text-left text-sm text-[#dff0c8] ring-1 ring-[#a7c98a]/20"
              >
                <span>My Garden</span>
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#a7c98a]/25 px-1.5 text-[11px] font-semibold">
                  3
                </span>
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
