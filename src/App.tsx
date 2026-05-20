import BotanicalBackground from "./components/BotanicalBackground";
import Navbar from "./components/Navbar";
import HeroContent from "./components/HeroContent";
import TodaysCareCard from "./components/TodaysCareCard";
import HappyPlantsCard from "./components/HappyPlantsCard";
import FeatureDock from "./components/FeatureDock";
import PageView from "./components/PageView";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { PAGE_KEYS, PAGE_LABELS, type PageKey } from "./data/navigation";

function pageFromHash(): PageKey {
  if (typeof window === "undefined") return "home";

  const hash = window.location.hash.replace("#", "") as PageKey;
  return PAGE_KEYS.includes(hash) ? hash : "home";
}

export default function App() {
  const [page, setPage] = useState<PageKey>(() => pageFromHash());

  // Mouse parallax for floating cards
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.5 });
  const cardX = useTransform(sx, (v) => v * 14);
  const cardY = useTransform(sy, (v) => v * 14);
  const cardX2 = useTransform(sx, (v) => v * -10);
  const cardY2 = useTransform(sy, (v) => v * -10);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash());
    window.addEventListener("popstate", syncPage);
    window.addEventListener("hashchange", syncPage);
    return () => {
      window.removeEventListener("popstate", syncPage);
      window.removeEventListener("hashchange", syncPage);
    };
  }, []);

  useEffect(() => {
    document.title =
      page === "home" ? "VERDANA — Grow. Care. Connect." : `${PAGE_LABELS[page]} — VERDANA`;
  }, [page]);

  const navigate = useCallback((nextPage: PageKey) => {
    setPage(nextPage);

    const nextUrl =
      nextPage === "home"
        ? `${window.location.pathname}${window.location.search}`
        : `#${nextPage}`;

    if (
      nextPage === "home" ||
      window.location.hash.replace("#", "") !== nextPage
    ) {
      window.history.pushState(null, "", nextUrl);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#07110d] text-[#f3f4ee]">
      {/* Cinematic background */}
      <BotanicalBackground />

      {/* Navbar */}
      <Navbar currentPage={page} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.section
            key="home"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col px-5 pb-40 pt-28 md:px-10 md:pt-36 lg:pt-40"
          >
            <div className="grid flex-1 items-center gap-12 lg:grid-cols-12">
              {/* Left: hero content */}
              <div className="lg:col-span-7 xl:col-span-7">
                <HeroContent onNavigate={navigate} />
              </div>

              {/* Right: floating glass cards */}
              <div className="relative lg:col-span-5 xl:col-span-5">
                <div className="flex flex-col items-center gap-6 lg:items-end">
                  <motion.div style={{ x: cardX, y: cardY }}>
                    <TodaysCareCard />
                  </motion.div>
                  <motion.div
                    style={{ x: cardX2, y: cardY2 }}
                    className="lg:mr-6"
                  >
                    <HappyPlantsCard />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <PageView key={page} page={page} onNavigate={navigate} />
        )}
      </AnimatePresence>

      {/* Floating bottom dock */}
      {page === "home" && <FeatureDock onNavigate={navigate} />}

      {/* Bottom corner ambient detail */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-40 w-full bg-gradient-to-t from-[#07110d] to-transparent" />
    </main>
  );
}
