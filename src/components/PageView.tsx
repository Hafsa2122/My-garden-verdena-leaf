import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronRight,
  CircleHelp,
  Droplets,
  Info,
  Leaf,
  LucideIcon,
  MessageCircle,
  ScanLine,
  ShoppingBag,
  Sparkles,
  Sprout,
  SunMedium,
  Users,
  Hash,
  TrendingUp,
  Send,
  Heart,
  AlertCircle,
  ShoppingCart,
  Check,
  Plus,
  Minus,
  Trash2,
  X,
  Star,
} from "lucide-react";
import { useState } from "react";
import type { PageKey } from "../data/navigation";

type PageConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  action: string;
  highlights: { icon: LucideIcon; title: string; text: string }[];
  panelTitle: string;
  panelRows: string[];
};

const PAGE_CONFIG: Record<Exclude<PageKey, "home">, PageConfig> = {
  garden: {
    eyebrow: "VERDANA / MY GARDEN",
    title: "Your living care dashboard.",
    subtitle:
      "Track Aloe Vera, Monstera, and Snake Plant with smart reminders, growth notes, and plant health signals in one premium view.",
    icon: Sprout,
    action: "Check Today's Care",
    highlights: [
      { icon: Droplets, title: "Aloe Vera", text: "Water today · bright indirect light" },
      { icon: ScanLine, title: "Monstera", text: "Mist tomorrow · humidity improving" },
      { icon: Leaf, title: "Snake Plant", text: "Fertilize in 3 days · thriving" },
    ],
    panelTitle: "Garden Status",
    panelRows: ["3 active plants", "2 reminders ready", "96% weekly care score"],
  },
  care: {
    eyebrow: "VERDANA / CARE GUIDE",
    title: "Care that feels intuitive.",
    subtitle:
      "Find the right watering, light, feeding, and recovery routine for every plant in your space.",
    icon: BookOpenText,
    action: "Start Care Plan",
    highlights: [
      { icon: Droplets, title: "Watering Rhythm", text: "Adaptive schedules based on plant type and room climate." },
      { icon: SunMedium, title: "Light Matching", text: "Know where each plant belongs before stress appears." },
      { icon: Sparkles, title: "Recovery Tips", text: "Guided fixes for yellow leaves, dry soil, and pests." },
    ],
    panelTitle: "Care Snapshot",
    panelRows: ["12 expert routines", "Light scan available", "Seasonal tips updated"],
  },
  community: {
    eyebrow: "VERDANA / COMMUNITY",
    title: "Grow with people who get it.",
    subtitle:
      "Share progress, ask experts, join botanical rooms, and learn from a calmer plant-loving community.",
    icon: Users,
    action: "Join Community",
    highlights: [
      { icon: MessageCircle, title: "Plant Rooms", text: "Focused spaces for indoor jungle, herbs, succulents, and rare plants." },
      { icon: Users, title: "Expert Circles", text: "Weekly answers from growers, stylists, and plant doctors." },
      { icon: Leaf, title: "Growth Stories", text: "Post milestones and learn what helped other plants thrive." },
    ],
    panelTitle: "Community Pulse",
    panelRows: ["50K+ plant lovers", "Live care threads", "Expert Q&A this week"],
  },
  about: {
    eyebrow: "VERDANA / ABOUT US",
    title: "Luxury eco-tech for living spaces.",
    subtitle:
      "Verdana blends plant science, thoughtful design, and calm technology to make everyday care feel effortless.",
    icon: Info,
    action: "Meet Verdana",
    highlights: [
      { icon: Leaf, title: "Nature First", text: "Built around healthier homes, calmer routines, and sustainable care." },
      { icon: Sparkles, title: "Premium Design", text: "A cinematic interface made to feel like part of your home." },
      { icon: ScanLine, title: "Smart Guidance", text: "Clear insights without overwhelming your day." },
    ],
    panelTitle: "Our Promise",
    panelRows: ["Science-led guidance", "Calm by design", "Built for greener homes"],
  },
  shop: {
    eyebrow: "VERDANA / SHOP",
    title: "Curated essentials for thriving plants.",
    subtitle:
      "Explore premium care kits, moisture sensors, misting tools, and plant-safe nutrients selected by Verdana.",
    icon: ShoppingBag,
    action: "Browse Shop",
    highlights: [
      { icon: Droplets, title: "Smart Water Kit", text: "Elegant tools for precise watering and soil moisture checks." },
      { icon: Sparkles, title: "Growth Nutrients", text: "Gentle formulas for foliage, roots, and seasonal growth." },
      { icon: Leaf, title: "Botanical Decor", text: "Minimal accessories that fit luxury interiors." },
    ],
    panelTitle: "Featured Drop",
    panelRows: ["Smart sensor bundle", "Ceramic mister set", "Organic growth tonic"],
  },
  faq: {
    eyebrow: "VERDANA / FAQ",
    title: "Answers before your leaves ask.",
    subtitle:
      "Quick answers for setup, reminders, plant identification, shopping, and community safety.",
    icon: CircleHelp,
    action: "Ask Verdana",
    highlights: [
      { icon: CircleHelp, title: "How reminders work", text: "Verdana adjusts care timing as seasons and room conditions change." },
      { icon: ScanLine, title: "Identification", text: "Upload or scan a plant to get a care profile in seconds." },
      { icon: Users, title: "Community safety", text: "Moderated rooms keep advice useful, calm, and kind." },
    ],
    panelTitle: "Popular Questions",
    panelRows: ["Can I add multiple rooms?", "Does it work offline?", "How accurate is plant ID?", "Can I track multiple plants?", "How do I set watering reminders?", "Is my plant data private?", "What happens if I miss a watering?", "Are plant diagnostics free?"],
  },
  identify: {
    eyebrow: "VERDANA / INTELLIGENT SCAN",
    title: "Identify your green companion.",
    subtitle: "Upload a botanical specimen photo from your device, or choose one of our preloaded specimens below to experience our high-fidelity analyzer in real time.",
    icon: ScanLine,
    action: "Start New Scan",
    highlights: [],
    panelTitle: "Select Specimen",
    panelRows: [],
  },
};

const TIMELINE_DATA = {
  "2024": {
    title: "The Foundation of Verdana",
    text: "Verdana was born in a small botanical workshop in Paris. Our team of biologists and designers set out to solve a single problem: How to make indoor plant care scientific yet effortless."
  },
  "2025": {
    title: "Global Greenhouse Initiative",
    text: "We launched our first intelligent sensors and the community platform. Within six months, over 20,000 plant parents joined our mission to greenify urban living spaces."
  },
  "2026": {
    title: "Expanding the Global Greenhouse",
    text: "Today, Verdana guides over 50,000 active growers. We continuously calibrate our venation computer vision scanner and build dedicated botanical communities."
  }
};

const TEAM_MEMBERS = [
  {
    name: "Dr. Sophia Green",
    role: "Chief Botanist & Researcher",
    avatar: "/images/avatar-glasses.jpg",
    desc: "Dr. Green leads our botanical research lab. She pioneered the venation scanner technology that analyzes plant leaf health with 99% accuracy."
  },
  {
    name: "Marcus Vance",
    role: "Lead Creative Stylist",
    avatar: "/images/avatar-smile.jpg",
    desc: "Marcus styled luxury hotel botanical atriums in Paris. He ensures Verdana pottery and setups merge with sleek architectural interiors."
  },
  {
    name: "Lina Ross",
    role: "Calm Tech Systems Architect",
    avatar: "/images/avatar-blond.jpg",
    desc: "Lina designs the background rhythms of Verdana. Her goal is 'Calm Tech'—interactions that feel helpful but never intrusive to your daily life."
  }
];

const CARE_FILTERS = ["All Specimen", "Luxury Foliage", "Therapeutic Succulents"];

const CARE_SPECIMENS = [
  {
    name: "Monstera Deliciosa",
    category: "Luxury Foliage",
    image: "/images/shop-monstera.jpg",
    price: "$35",
    light: "Bright indirect",
    water: "7-9 days",
  },
  {
    name: "Snake Plant",
    category: "Therapeutic Succulents",
    image: "/images/shop-snake-plant.jpg",
    price: "$28",
    light: "Low to bright",
    water: "14-21 days",
  },
  {
    name: "Fiddle Leaf Fig",
    category: "Luxury Foliage",
    image: "/images/care-fiddle-leaf.jpg",
    price: "$45",
    light: "Filtered window",
    water: "6-8 days",
  },
  {
    name: "Aloe Vera",
    category: "Therapeutic Succulents",
    image: "/images/shop-aloe.jpg",
    price: "$24",
    light: "Sunny sill",
    water: "12-18 days",
  },
  {
    name: "Golden Pothos",
    category: "Luxury Foliage",
    image: "/images/care-pothos.jpg",
    price: "$22",
    light: "Soft shade",
    water: "8-10 days",
  },
  {
    name: "Calathea Orbifolia",
    category: "Luxury Foliage",
    image: "/images/care-calathea.jpg",
    price: "$38",
    light: "Diffused light",
    water: "5-7 days",
  },
  {
    name: "Rubber Plant",
    category: "Luxury Foliage",
    image: "/images/care-fiddle-leaf.jpg",
    price: "$42",
    light: "Bright corner",
    water: "7-10 days",
  },
  {
    name: "Jade Plant",
    category: "Therapeutic Succulents",
    image: "/images/shop-aloe.jpg",
    price: "$26",
    light: "Direct morning",
    water: "14-20 days",
  },
  {
    name: "Philodendron Green",
    category: "Luxury Foliage",
    image: "/images/shop-monstera.jpg",
    price: "$32",
    light: "Medium glow",
    water: "7-11 days",
  },
  {
    name: "Zebra Haworthia",
    category: "Therapeutic Succulents",
    image: "/images/shop-snake-plant.jpg",
    price: "$18",
    light: "Sunny shelf",
    water: "18-24 days",
  },
  {
    name: "Bird of Paradise",
    category: "Luxury Foliage",
    image: "/images/care-fiddle-leaf.jpg",
    price: "$58",
    light: "Bright window",
    water: "6-9 days",
  },
  {
    name: "String of Pearls",
    category: "Therapeutic Succulents",
    image: "/images/care-pothos.jpg",
    price: "$30",
    light: "High indirect",
    water: "12-16 days",
  },
  {
    name: "Peace Lily",
    category: "Luxury Foliage",
    image: "/images/care-calathea.jpg",
    price: "$34",
    light: "Low filtered",
    water: "5-7 days",
  },
  {
    name: "Echeveria Rosette",
    category: "Therapeutic Succulents",
    image: "/images/shop-aloe.jpg",
    price: "$20",
    light: "Direct light",
    water: "16-22 days",
  },
  {
    name: "Boston Fern",
    category: "Luxury Foliage",
    image: "/images/care-pothos.jpg",
    price: "$29",
    light: "Shaded glow",
    water: "3-5 days",
  },
];

const BOUTIQUE_PRODUCTS = [
  {
    id: "p1",
    name: "Live Monstera Deliciosa",
    detail: "Premium organic live specimen in travel fiber pot. Ready for direct potting.",
    price: 35.0,
    rating: 4.9,
    category: "Live Specimens",
    image: "/images/shop-monstera.jpg",
  },
  {
    id: "p2",
    name: "Live Snake Plant Specimen",
    detail: "Robust oxygenating house plant. Unbelievably easy to care for.",
    price: 28.0,
    rating: 4.8,
    category: "Live Specimens",
    image: "/images/shop-snake-plant.jpg",
  },
  {
    id: "p3",
    name: "Live Fiddle Leaf Fig",
    detail: "Premium interior-decorator darling. Requires high bright indirect light.",
    price: 45.0,
    rating: 4.7,
    category: "Live Specimens",
    image: "/images/care-fiddle-leaf.jpg",
  },
  {
    id: "p4",
    name: "Aloe Vera Specimen",
    detail: "Lush succulent containing cooling therapeutic leaf gel. Extremely drought resistant.",
    price: 22.0,
    rating: 4.9,
    category: "Live Specimens",
    image: "/images/shop-aloe.jpg",
  },
  {
    id: "p5",
    name: "Calathea Orbifolia",
    detail: "Stunning striped leaves that unfurl with grace. Thrives in humidity.",
    price: 38.0,
    rating: 4.6,
    category: "Live Specimens",
    image: "/images/care-calathea.jpg",
  },
  {
    id: "p6",
    name: "Golden Pothos Vine",
    detail: "The perfect cascading vine for high shelves. Highly resilient and air-purifying.",
    price: 18.0,
    rating: 4.9,
    category: "Live Specimens",
    image: "/images/care-pothos.jpg",
  },
  {
    id: "p7",
    name: "Rubber Plant 'Burgundy'",
    detail: "Deep dark foliage that makes a bold architectural statement.",
    price: 32.0,
    rating: 4.8,
    category: "Live Specimens",
    image: "/images/care-fiddle-leaf.jpg",
  },
  {
    id: "p8",
    name: "Peace Lily 'Sensation'",
    detail: "Lush green leaves and elegant white blooms. Excellent for low light.",
    price: 26.0,
    rating: 4.7,
    category: "Live Specimens",
    image: "/images/care-calathea.jpg",
  },
];

const ALL_POSTS = [
  {
    author: "Clara Green",
    role: "Propagator · Succulent Guild",
    time: "2 hours ago",
    tag: "Growth",
    room: "Milestones",
    content: "Thrilled to share my Fiddle Leaf Fig propagation progress! After 4 weeks in aerated water with organic liquid root nutrients, the root structures are incredibly robust. Ready to transfer to premium terracotta container today! 🌱✨",
    image: "/images/care-fiddle-leaf.jpg",
    initialComments: [{author: "Elena Vance", text: "Amazing growth! Ficus can be tricky, good luck with the transfer.", time: "45 mins ago"}]
  },
  {
    author: "Oliver Wood",
    role: "Urban Gardener · Indoor Jungle",
    time: "4 hours ago",
    tag: "QA",
    room: "Care Q&A Clinic",
    content: "Seeking advice: I noticed these light amber/yellow dry specks on the lower leaves of my Monstera Deliciosa. Moisture meters show 60% saturation and it receives bright filtered light. Any root diagnostics?",
    initialComments: [{author: "Dr. Sophia Green", text: "Check the leaf undersides for fine webbing. It might be early-stage spider mites due to low room humidity.", time: "3 hours ago"}]
  },
  {
    author: "Evan Vance",
    role: "Creator · Calm Tech Architect",
    time: "1 day ago",
    tag: "Jungle",
    room: "Indoor Jungle Room",
    content: "Morning routine with my living space companions. The quiet drip of the self-watering planters brings such a calming, serene focus to my remote workspace. Verdana makes this rhythm effortless.",
    image: "/images/shop-aloe.jpg",
    initialComments: []
  },
  {
    author: "Maya Reed",
    role: "Plant Stylist",
    time: "3 hours ago",
    tag: "Global",
    room: "Global Greenhouse",
    content: "Spring has finally arrived in the greenhouse! The humidity levels are peaking at 75% naturally. Perfect time for those delicate Calathea leaves to unfurl.",
    image: "/images/care-calathea.jpg",
    initialComments: []
  },
  {
    author: "Leo Park",
    role: "Succulent Expert",
    time: "5 hours ago",
    tag: "Dry",
    room: "Succulent Guild",
    content: "Pro-tip: If your Aloe leaves are feeling squishy, you're likely overwatering. Let the soil dry out completely until it's bone-dry to the touch.",
    initialComments: [{author: "Ben", text: "Needed this today, thanks!", time: "1 hour ago"}]
  }
];

type CareGuidePageProps = {
  onNavigate: (page: PageKey) => void;
};

function AboutPage({ onNavigate }: CareGuidePageProps) {
  const [activeYear, setActiveYear] = useState<keyof typeof TIMELINE_DATA>("2026");
  const [expandedMember, setExpandedMember] = useState<string | null>("Marcus Vance");

  return (
    <motion.section
      key="about"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto min-h-screen max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-36"
    >
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onNavigate("home")}
        className="glass mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </motion.button>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
              <Info className="h-5 w-5 text-[#a7c98a]" />
            </span>
            <span className="text-[11px] tracking-[0.28em] text-[#9aa79a]" style={{ fontFamily: "DM Sans, sans-serif" }}>
              VERDANA / OUR STORY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-glow text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[84px]"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            Luxury eco-tech for <br />living spaces.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#9aa79a]"
          >
            Verdana bridges scientific botany, double-walled porous engineering, and calm technology. We believe green living spaces build clearer minds and healthier routines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="mt-8 flex gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate("community")}
              className="rounded-full bg-[#a7c98a] px-6 py-2.5 text-[13px] font-bold text-[#07110d] shadow-[0_10px_30px_rgba(167,201,138,0.25)]"
            >
              Join Community
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate("care")}
              className="glass rounded-full px-6 py-2.5 text-[13px] font-semibold text-[#d8e0d2] hover:text-white"
            >
              Explore Features
            </motion.button>
          </motion.div>

          <div className="mt-12 flex gap-8 border-b border-white/10 pb-4">
            {(Object.keys(TIMELINE_DATA) as (keyof typeof TIMELINE_DATA)[]).map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`relative pb-4 text-[18px] font-medium transition-colors ${
                  activeYear === year ? "text-white" : "text-[#9aa79a] hover:text-[#d8e0d2]"
                }`}
              >
                {year}
                {activeYear === year && (
                  <motion.div
                    layoutId="timeline-underline"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-[#a7c98a]"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-strong mt-10 rounded-[28px] p-8"
            >
              <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                {TIMELINE_DATA[activeYear].title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[#9aa79a]">
                {TIMELINE_DATA[activeYear].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-strong sticky top-40 rounded-[20px] p-5 max-w-sm"
          >
            <span className="inline-block rounded-full bg-[#a7c98a]/15 px-3 py-1 text-[9px] font-bold tracking-widest text-[#a7c98a] ring-1 ring-[#a7c98a]/25 uppercase">
              Current team
            </span>
            <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
              Focused, cross-functional core
            </h3>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#9aa79a]">
              A compact team handling botanical research, design engineering, and calm tech architecture.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl bg-white/[0.03] p-3 text-center ring-1 ring-white/5">
                <p className="text-2xl font-bold text-white">3</p>
                <p className="mt-0.5 text-[9px] tracking-wider text-[#9aa79a] uppercase">Team Members</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3 text-center ring-1 ring-white/5">
                <p className="text-2xl font-bold text-white">4</p>
                <p className="mt-0.5 text-[9px] tracking-wider text-[#9aa79a] uppercase">Core Domains</p>
              </div>
            </div>

            <div className="mt-4 border-t border-white/5 pt-4">
              <p className="text-[10px] font-bold tracking-widest text-[#9aa79a] uppercase">Team Strengths</p>
              <ul className="mt-2 space-y-1.5">
                {[
                  "Botanical research & leaf diagnostics",
                  "Luxury design systems and interiors",
                  "Calm tech architecture & scalable ops",
                  "AI-powered plant identification"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[11px] text-[#d8e0d2]">
                    <Check className="h-3 w-3 shrink-0 text-[#a7c98a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* People and Roles Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-20"
      >
        <span className="inline-block rounded-full bg-[#a7c98a]/10 px-3 py-1 text-[9px] font-bold tracking-widest text-[#a7c98a] ring-1 ring-[#a7c98a]/20 uppercase">
          Team Directory
        </span>
        <h3 className="mt-4 text-3xl font-semibold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
          People and roles
        </h3>
        <p className="mt-2 text-[14px] text-[#9aa79a]">
          The current team structure at Verdana.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass-strong flex flex-col items-center rounded-[24px] p-6 text-center"
            >
              <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/10">
                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
              </div>
              <h4
                className="mt-4 text-[16px] font-semibold text-white"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {member.name}
              </h4>
              <p className="mt-1 text-[12px] font-medium text-[#a7c98a]">{member.role}</p>
              <p className="mt-3 text-[12px] leading-relaxed text-[#9aa79a]">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

function CareGuidePage({ onNavigate }: CareGuidePageProps) {
  const [activeFilter, setActiveFilter] = useState(CARE_FILTERS[0]);
  const [selected, setSelected] = useState<string | null>(null);
  const [waterInterval, setWaterInterval] = useState(21);

  const selectedPlant = CARE_SPECIMENS.find(p => p.name === selected);

  const visibleSpecimens =
    activeFilter === "All Specimen"
      ? CARE_SPECIMENS
      : CARE_SPECIMENS.filter((plant) => plant.category === activeFilter);

  return (
    <motion.section
      key="care"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto min-h-screen max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-36"
    >
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onNavigate("home")}
        className="glass mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </motion.button>

      <div className={`grid gap-12 ${selectedPlant ? "lg:grid-cols-12" : "grid-cols-1"}`}>
        <div className={selectedPlant ? "lg:col-span-7" : "w-full"}>
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
                <Sprout className="h-5 w-5 text-[#a7c98a]" />
              </span>
              <span
                className="text-[11px] tracking-[0.28em] text-[#9aa79a]"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                VERDANA / CARE CLINIC
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.8 }}
              className="text-glow text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[76px]"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
            >
              Care that feels <span className="italic">intuitive.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.75 }}
              className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[#9aa79a] md:text-[18px]"
            >
              Master hydration routines, calibrate indoor lux light settings, and
              diagnose leaves in our real-time clinic. Select a specimen below to
              customize care parameters or acquire your own plant live.
            </motion.p>
          </div>

          <motion.div
            id="care-filters"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.75 }}
            className="mt-11 flex flex-wrap gap-3"
          >
            {CARE_FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-6 py-3 text-[14px] font-semibold transition-colors ${
                    active
                      ? "bg-[#a7c98a] text-[#07110d] shadow-[0_14px_38px_rgba(167,201,138,0.25)]"
                      : "glass text-[#d8e0d2] hover:text-white"
                  }`}
                >
                  {filter}
                </motion.button>
              );
            })}
          </motion.div>

          {!selectedPlant && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-10 flex flex-col md:flex-row items-center gap-6 rounded-[24px] p-6 text-left w-full"
            >
              <div className="relative shrink-0">
                <div className="absolute -inset-3 rounded-full bg-[#a7c98a]/10 blur-lg animate-pulse" />
                <div className="glass relative grid h-12 w-12 place-items-center rounded-xl bg-white/[0.03] ring-1 ring-white/10">
                  <ScanLine className="h-5 w-5 text-[#a7c98a]/50" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white" style={{ fontFamily: "Playfair Display, serif" }}>Select a Specimen</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#9aa79a]">
                  Click on any plant in the clinic gallery to load its real-time care parameters and diagnostics.
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            layout
            className={`mt-10 grid gap-7 sm:grid-cols-2 ${
              selectedPlant ? "xl:grid-cols-2" : "lg:grid-cols-3"
            }`}
          >
            {visibleSpecimens.map((plant, index) => {
              const active = selected === plant.name;
              return (
                <motion.button
                  layout
                  key={plant.name}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: Math.min(index * 0.035, 0.35), duration: 0.55 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(plant.name)}
                  className={`group relative overflow-hidden rounded-[26px] p-4 text-left transition-shadow ${
                    active ? "glass-strong ring-glow" : "glass-strong"
                  }`}
                >
                  <div className="relative h-[250px] overflow-hidden rounded-[20px] sm:h-[270px]">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07110d]/80 via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full bg-[#1f3227]/85 px-3 py-2 text-[13px] font-semibold text-[#dff0c8] ring-1 ring-[#a7c98a]/25 backdrop-blur-xl">
                      {plant.price}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-[11px] tracking-[0.2em] text-[#8daa7b]"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {plant.category.toUpperCase()}
                      </p>
                      <h3
                        className="mt-1 text-[24px] leading-tight text-white"
                        style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
                      >
                        {plant.name}
                      </h3>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#a7c98a]/15 text-[#cfe2b8] ring-1 ring-[#a7c98a]/25 transition-transform group-hover:rotate-12">
                      <Leaf className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                    <div className="rounded-2xl bg-white/[0.04] px-3 py-3 ring-1 ring-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#9aa79a]">
                        <SunMedium className="h-3.5 w-3.5" />
                        Light
                      </div>
                      <p className="mt-1 text-[13px] font-medium text-[#e6ebde]">
                        {plant.light}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.04] px-3 py-3 ring-1 ring-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#9aa79a]">
                        <Droplets className="h-3.5 w-3.5" />
                        Water
                      </div>
                      <p className="mt-1 text-[13px] font-medium text-[#e6ebde]">
                        {plant.water}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            {selectedPlant && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-strong rounded-[20px] p-4 max-w-sm"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-md text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>Specimen Parameters</h3>
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelected(null)}
                      className="grid h-7 w-7 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 text-[#9aa79a] transition-colors hover:bg-white/10 hover:text-white"
                      title="Clear selection"
                    >
                      <ArrowRight className="h-3 w-3" />
                    </motion.button>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#a7c98a]/15 ring-1 ring-[#a7c98a]/30">
                      <ScanLine className="h-3.5 w-3.5 text-[#a7c98a]" />
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-[10.5px] font-medium text-[#f0f3ea]">
                      <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> Water Optimizer</span>
                      <span className="text-[#a7c98a] font-bold">{waterInterval} Days</span>
                    </div>
                    <input 
                      type="range" 
                      min="3" 
                      max="30" 
                      value={waterInterval}
                      onChange={(e) => setWaterInterval(parseInt(e.target.value))}
                      className="mt-1.5 w-full accent-[#a7c98a] bg-white/10 h-1 rounded-full cursor-pointer"
                    />
                    <p className="mt-1.5 flex items-start gap-1 text-[9.5px] leading-relaxed text-[#9aa79a]">
                      <span className="mt-0.5 grid h-2.5 w-2.5 place-items-center rounded-full bg-[#a7c98a]/20 text-[#a7c98a] shrink-0">
                        <Check className="h-1 w-1 stroke-[4]" />
                      </span>
                      Hydration Rhythm: Safe transpiration match.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-white/[0.02] p-2.5 ring-1 ring-white/5">
                      <div className="flex items-center gap-1 text-[8.5px] font-bold tracking-widest text-[#a7c98a]">
                        <SunMedium className="h-2 w-2" /> LIGHT NEED
                      </div>
                      <p className="mt-0.5 text-[10px] leading-snug text-[#9aa79a]">
                        Adaptable. Tolerates shade, prefers indirect sun.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/[0.02] p-2.5 ring-1 ring-white/5">
                      <div className={`flex items-center gap-1 text-[8.5px] font-bold tracking-widest ${selectedPlant.category.includes("Therapeutic") ? "text-[#a7c98a]" : "text-amber-300"}`}>
                        <AlertCircle className="h-2 w-2" /> PET SAFETY
                      </div>
                      <p className="mt-0.5 text-[10px] leading-snug text-[#9aa79a]">
                        {selectedPlant.category.includes("Therapeutic") ? "Pet safe. Non-toxic." : "Mildly toxic. Keep away from pets."}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-3">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-white">
                      <MessageCircle className="h-3 w-3 text-[#a7c98a]" /> Leaf Clinic Diagnostic
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {["Wrinkly Upright Leaves", "Soft Mushy Stems"].map(tag => (
                        <button key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[9.5px] text-[#d8e0d2] ring-1 ring-white/10 transition-colors hover:bg-white/10">
                          {tag}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[9.5px] italic text-[#9aa79a] text-center">
                      Select symptom to troubleshoot.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <div>
                      <p className="text-[8.5px] tracking-widest text-[#9aa79a] uppercase">Specimen Price</p>
                      <p className="mt-0.5 text-lg font-bold text-white">{selectedPlant.price}.00</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1 rounded-full bg-[#a7c98a] px-3.5 py-1.5 text-[11px] font-bold text-[#07110d] shadow-[0_8px_24px_rgba(167,201,138,0.2)]"
                    >
                      <ShoppingCart className="h-3 w-3" /> Purchase Specimen
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

function CommunityPost({ 
  author, 
  role, 
  time, 
  tag, 
  content, 
  image, 
  initialComments = [] 
}: { 
  author: string, 
  role: string, 
  time: string, 
  tag: string, 
  content: string, 
  image?: string,
  initialComments?: {author: string, text: string, time: string}[]
}) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(31);
  const [isLiked, setIsLiked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments([
      ...comments,
      { author: "You", text: newComment, time: "Just now" }
    ]);
    setNewComment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-strong mb-8 overflow-hidden rounded-[28px] p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/10">
            <img src="/images/avatar-glasses.jpg" alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <h4 className="text-[14px] font-semibold text-white">{author}</h4>
            <p className="text-[11px] text-[#9aa79a]">{role} · {time}</p>
          </div>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] tracking-widest text-[#a7c98a] ring-1 ring-[#a7c98a]/20 uppercase font-medium">{tag}</span>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-[#d8e0d2]">
        {content}
      </p>

      {image && (
        <div className="mt-5 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/10">
          <img src={image} alt="Post content" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
      )}

      <div className="mt-5 flex items-center gap-6 border-t border-white/5 pt-5 text-[#9aa79a]">
        <button 
          onClick={() => {
            setIsLiked(!isLiked);
            setLikes(prev => isLiked ? prev - 1 : prev + 1);
          }}
          className={`flex items-center gap-2 text-[12px] transition-colors ${isLiked ? "text-[#a7c98a]" : "hover:text-white"}`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-[#a7c98a]" : ""}`} /> {likes} Likes
        </button>
        <button className="flex items-center gap-2 text-[12px] hover:text-white transition-colors">
          <MessageCircle className="h-4 w-4" /> {comments.length} Comments
        </button>
      </div>

      {comments.length > 0 && (
        <div className="mt-5 space-y-4">
          <AnimatePresence initial={false}>
            {comments.map((c, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5"
              >
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                  <img src={c.author === "You" ? "/images/avatar-smile.jpg" : "/images/avatar-blond.jpg"} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-white">{c.author}</span>
                    <span className="text-[10px] text-[#9aa79a]">{c.time}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#d8e0d2]">{c.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 relative">
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a serene response..."
          className="w-full rounded-full bg-white/[0.05] border border-white/10 py-3 pl-5 pr-12 text-[13px] text-white placeholder:text-[#9aa79a] focus:outline-none focus:ring-1 focus:ring-[#a7c98a]/30 transition-all"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-[#a7c98a]/10 text-[#a7c98a] hover:bg-[#a7c98a] hover:text-[#07110d] transition-all"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </motion.div>
  );
}

function CommunityPage({ onNavigate }: CareGuidePageProps) {
  const [activeRoom, setActiveRoom] = useState("Global Greenhouse");

  const ROOMS = [
    { name: "Global Greenhouse", desc: "All plant discussion streams", icon: Hash },
    { name: "Indoor Jungle Room", desc: "Large monsteras, structural figs", icon: Leaf },
    { name: "Succulent Guild", desc: "Aloe vera, high-light dry specimens", icon: SunMedium },
    { name: "Milestones", desc: "Propagation charts and growth spikes", icon: TrendingUp },
    { name: "Care Q&A Clinic", desc: "Troubleshooting root and leaf symptoms", icon: Droplets },
  ];

  const filteredPosts = ALL_POSTS.filter(post => 
    activeRoom === "Global Greenhouse" || post.room === activeRoom
  );

  return (
    <motion.section
      key="community"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto min-h-screen max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-36"
    >
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onNavigate("home")}
        className="glass mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </motion.button>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
              <Users className="h-5 w-5 text-[#a7c98a]" />
            </span>
            <span className="text-[11px] tracking-[0.28em] text-[#9aa79a]" style={{ fontFamily: "DM Sans, sans-serif" }}>
              VERDANA / GROWERS SOCIETY
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-glow text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[84px]"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            Grow with people who <span className="italic">get it.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#9aa79a]"
          >
            Share your botanical propagation triumphs, troubleshoot root health with real experts, and join a serene, focused plant-loving community.
          </motion.p>
          
          <div className="mt-12">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <CommunityPost 
                  key={`${post.author}-${post.room}`}
                  author={post.author}
                  role={post.role}
                  time={post.time}
                  tag={post.tag}
                  content={post.content}
                  image={post.image}
                  initialComments={post.initialComments}
                />
              ))}
            </AnimatePresence>
            {filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 glass rounded-[28px]"
              >
                <p className="text-[#9aa79a]">No posts yet in this botanical room.</p>
              </motion.div>
            )}
          </div>
        </div>
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-strong rounded-[20px] p-4 max-w-sm"
          >
            <h3 className="text-lg text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>Botanical Rooms</h3>
            <div className="mt-3 space-y-1">
              {ROOMS.map((room) => {
                const RoomIcon = room.icon;
                const active = activeRoom === room.name;
                return (
                  <motion.button
                    key={room.name}
                    onClick={() => setActiveRoom(room.name)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all ${
                      active ? "bg-[#a7c98a]/10 ring-1 ring-[#a7c98a]/30" : "hover:bg-white/5"
                    }`}
                  >
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${active ? "bg-[#a7c98a] text-[#07110d]" : "bg-white/5 text-[#9aa79a]"}`}>
                      <RoomIcon className="h-3 w-3" />
                    </span>
                    <div>
                      <p className={`text-[12px] font-semibold ${active ? "text-white" : "text-[#d8e0d2]"}`}>{room.name}</p>
                      <p className="text-[10px] text-[#9aa79a]">{room.desc}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

function ShopPage({ onNavigate }: CareGuidePageProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Items");

  const addToCart = (product: typeof BOUTIQUE_PRODUCTS[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.section
      key="shop"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto min-h-screen max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-36"
    >
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate("home")}
          className="glass mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </motion.button>

        <motion.button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="glass mb-10 relative flex h-10 items-center gap-2 rounded-full px-4 text-[13px] text-white"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Your Cart</span>
          {cartCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#a7c98a] px-1 text-[10px] font-bold text-[#07110d]">
              {cartCount}
            </span>
          )}
        </motion.button>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-12 xl:col-span-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
              <ShoppingBag className="h-5 w-5 text-[#a7c98a]" />
            </span>
            <span className="text-[11px] tracking-[0.28em] text-[#9aa79a]" style={{ fontFamily: "DM Sans, sans-serif" }}>
              VERDANA / BOUTIQUE SHOP
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-glow text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[84px]"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            Curated items for <span className="italic text-[#dfe6d6]">living spaces.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#9aa79a]"
          >
            Acquire high-precision tools, slow release liquid tonics, self-watering double ceramic pots, and premium grown live specimens delivered in organic protective materials directly.
          </motion.p>

          <div className="mt-12 flex flex-wrap gap-3">
            {["All Items", "Live Specimens", "Care Sensors & Tools", "Self-Watering Pots"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-[#a7c98a] text-[#07110d]"
                    : "glass text-[#9aa79a] hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BOUTIQUE_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group relative flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-white/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110d]/60 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-black/40 px-2 py-1 text-[10px] font-bold text-[#a7c98a] backdrop-blur-md ring-1 ring-white/10">
                    <span className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 fill-[#a7c98a]" /> {product.rating} RATING
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <h4 className="text-[16px] font-semibold text-white">{product.name}</h4>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-[#9aa79a]">
                    {product.detail}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[18px] font-bold text-white">${product.price.toFixed(2)}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-white/5 px-4 py-2 text-[11px] font-bold text-[#d8e0d2] ring-1 ring-white/10 transition-colors hover:bg-[#a7c98a] hover:text-[#07110d]"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass-strong fixed right-0 top-0 z-50 h-full w-full max-w-[400px] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-[#a7c98a]" />
                  <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "Playfair Display, serif" }}>Your Cart</h3>
                  <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#a7c98a]/10 text-[11px] font-bold text-[#a7c98a] ring-1 ring-[#a7c98a]/30">
                    {cartCount}
                  </span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="rounded-full bg-white/5 p-2 text-[#9aa79a] hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 h-[calc(100%-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ShoppingBag className="h-12 w-12 text-[#9aa79a]/20" />
                    <p className="mt-4 text-[14px] text-[#9aa79a]">Your boutique bag is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass relative flex items-center gap-4 rounded-2xl p-3"
                      >
                        <div className="h-16 w-16 overflow-hidden rounded-xl ring-1 ring-white/10">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[13px] font-medium text-white">{item.name}</h4>
                          <p className="text-[14px] font-bold text-[#a7c98a]">${(item.price * item.quantity).toFixed(2)}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center rounded-full bg-white/5 ring-1 ring-white/10">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-[#9aa79a] hover:text-white">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-[11px] font-bold text-white">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-[#9aa79a] hover:text-white">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="rounded-full p-2 text-[#9aa79a] hover:bg-red-500/10 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="absolute bottom-8 left-8 right-8 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between text-[18px] font-bold text-white">
                    <span>Total</span>
                    <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full rounded-full bg-[#a7c98a] py-4 text-[14px] font-bold text-[#07110d] shadow-[0_14px_40px_rgba(167,201,138,0.3)]"
                  >
                    Complete Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function MyGardenPage({ onNavigate }: CareGuidePageProps) {
  const [plants, setPlants] = useState([
    { id: "g1", name: "Aloe Vera Premium", category: "ASPHODELACEAE", image: "/images/shop-aloe.jpg", moisture: 90, health: 96 },
    { id: "g2", name: "Monstera Deliciosa", category: "ARACEAE", image: "/images/shop-monstera.jpg", moisture: 65, health: 92 },
    { id: "g3", name: "Snake Plant", category: "ASPARAGACEAE", image: "/images/shop-snake-plant.jpg", moisture: 40, health: 100 },
  ]);

  const waterPlant = (id: string) => {
    setPlants(prev => prev.map(p => p.id === id ? { ...p, moisture: 100 } : p));
  };

  const removePlant = (id: string) => {
    setPlants(prev => prev.filter(p => p.id !== id));
  };

  return (
    <motion.section
      key="garden"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto min-h-screen max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-36"
    >
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onNavigate("home")}
        className="glass mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </motion.button>

      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
            <BookOpenText className="h-5 w-5 text-[#a7c98a]" />
          </span>
          <span className="text-[11px] tracking-[0.28em] text-[#9aa79a]" style={{ fontFamily: "DM Sans, sans-serif" }}>
            VERDANA / MY LIVING GARDEN
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="text-glow text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[84px]"
          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
        >
          Manage your botanical <span className="italic">haven.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#9aa79a]"
        >
          Keep track of hydration, leaf health, and biological growth timelines. Click on any green companion below to log care journals, water, or view complete care profiles.
        </motion.p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant, i) => (
          <motion.div
            key={plant.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-strong group relative overflow-hidden rounded-[28px] p-6"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img src={plant.image} alt={plant.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute right-3 top-3 rounded-full bg-[#1a2d24]/90 px-3 py-1.5 text-[11px] font-bold text-[#a7c98a] backdrop-blur-md ring-1 ring-[#a7c98a]/30">
                {plant.health}% Health
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[10px] tracking-[0.2em] text-[#8daa7b] font-bold">{plant.category}</p>
              <h3 className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>{plant.name}</h3>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-bold tracking-widest text-[#9aa79a] uppercase">
                    <span>Soil Moisture</span>
                    <span className="text-[#d8e0d2]">{plant.moisture}% · Moist</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${plant.moisture}%` }}
                      className="h-full bg-gradient-to-r from-[#8daa7b] to-[#a7c98a]" 
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => waterPlant(plant.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.03] py-3 text-[12px] font-bold text-[#d8e0d2] ring-1 ring-white/10 transition-colors hover:bg-[#a7c98a] hover:text-[#07110d]"
                  >
                    <Droplets className="h-3.5 w-3.5" /> Quick Water
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removePlant(plant.id)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.03] text-[#9aa79a] ring-1 ring-white/10 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {plants.length === 0 && (
          <div className="col-span-full py-32 text-center glass rounded-[28px]">
            <p className="text-[#9aa79a]">Your garden is empty. Start adding plants from the shop!</p>
            <button 
              onClick={() => onNavigate("shop")}
              className="mt-6 rounded-full bg-[#a7c98a] px-8 py-3 text-[14px] font-bold text-[#07110d]"
            >
              Go to Boutique
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function FAQPage({ onNavigate, config }: { config: PageConfig, onNavigate: (p: PageKey) => void }) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const FAQ_ANSWERS: Record<string, string> = {
    "Can I add multiple rooms?": "Yes, Verdana supports multi-room tracking. You can define specific parameters (humidity, light) for each room to ensure all companions thrive.",
    "Does it work offline?": "The core tracking and care logs work offline. Community features and plant identification require a secure connection to our botanical database.",
    "How accurate is plant ID?": "Our venation computer vision scanner is calibrated against 120,000+ specimens, providing 99.2% accuracy for houseplant identification.",
    "Can I track multiple plants?": "Absolutely. You can add an unlimited number of specimens to your virtual garden and receive customized care parameters for each.",
    "How do I set watering reminders?": "Watering reminders are automatically generated based on the plant species, local season, and room conditions. You can adjust the intervals manually in the Care Clinic.",
    "Is my plant data private?": "Yes. Your garden setup, plant location data, and personal notes are stored locally and encrypted before any cloud backup.",
    "What happens if I miss a watering?": "Verdana dynamically recalculates the optimal next watering date and provides recovery instructions if your specimen exhibits signs of drought stress.",
    "Are plant diagnostics free?": "Yes, our real-time Leaf Clinic diagnostics are included in the base application. We believe expert botanical knowledge should be accessible to everyone."
  };

  return (
    <motion.section
      key="faq"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-5 pb-16 pt-32 md:px-10 md:pt-36"
    >
      <div className="grid w-full items-stretch gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate("home")}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 flex items-center gap-3">
            <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
              <CircleHelp className="h-5 w-5 text-[#a7c98a]" />
            </span>
            <span className="text-[11px] tracking-[0.24em] text-[#9aa79a]" style={{ fontFamily: "DM Sans, sans-serif" }}>
              {config.eyebrow}
            </span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="text-glow max-w-3xl text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[60px] lg:text-[78px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
            {config.title}
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9aa79a] md:text-[17px]">
            {config.subtitle}
          </motion.p>

          <div className="mt-12 space-y-3">
            {config.highlights.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#a7c98a]/10 text-[#a7c98a]">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-[15px] font-semibold text-white">{item.title}</h4>
                    <p className="mt-1 text-[13px] text-[#9aa79a]">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 h-full">
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }} className="glass-strong relative overflow-hidden rounded-[28px] p-6 sm:p-8 h-full flex flex-col">
            <h3 className="text-2xl text-white mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>{config.panelTitle}</h3>
            <div className="space-y-3">
              {config.panelRows.map((row, index) => {
                const isOpen = activeFaq === row;
                return (
                  <div key={index} className="group relative">
                    <motion.button
                      onClick={() => setActiveFaq(isOpen ? null : row)}
                      className={`flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all ${isOpen ? "bg-white/[0.08] ring-1 ring-[#a7c98a]/30" : "bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.06]"}`}
                    >
                      <span className={`text-[13px] font-medium ${isOpen ? "text-white" : "text-[#d8e0d2]"}`}>{row}</span>
                      <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-90 text-[#a7c98a]" : "text-[#9aa79a]"}`} />
                    </motion.button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="mt-3 px-4 text-[12px] leading-relaxed text-[#9aa79a] border-l border-[#a7c98a]/30 ml-4 pb-2">
                            {FAQ_ANSWERS[row] || "This information is currently being updated by our botanical team."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto border-t border-white/10 pt-6">
              <button className="w-full rounded-full bg-[#a7c98a] py-3 text-[13px] font-bold text-[#07110d] transition-transform hover:scale-[1.02]">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function IdentifyPage({ onNavigate, config }: { config: PageConfig, onNavigate: (p: PageKey) => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<typeof CARE_SPECIMENS[0] | null>(null);

  const startScan = (plant?: typeof CARE_SPECIMENS[0]) => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setResult(plant || CARE_SPECIMENS[0]);
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startScan();
    }
  };

  return (
    <motion.section
      key="identify"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-5 pb-16 pt-32 md:px-10 md:pt-36"
    >
      <div className="grid w-full items-stretch gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate("home")}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 flex items-center gap-3">
            <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
              <ScanLine className="h-5 w-5 text-[#a7c98a]" />
            </span>
            <span className="text-[11px] tracking-[0.24em] text-[#9aa79a]" style={{ fontFamily: "DM Sans, sans-serif" }}>
              {config.eyebrow}
            </span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="text-glow max-w-3xl text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[60px] lg:text-[78px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
            {config.title}
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9aa79a] md:text-[17px]">
            {config.subtitle}
          </motion.p>

          <div className="mt-12">
            <div className="glass relative h-[340px] rounded-[32px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 transition-all hover:bg-white/[0.02] group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
              
              {isScanning ? (
                <div className="text-center">
                  <div className="relative mb-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-16 w-16 rounded-full border-t-2 border-[#a7c98a]"
                    />
                    <ScanLine className="absolute inset-0 m-auto h-6 w-6 text-[#a7c98a]" />
                  </div>
                  <p className="text-[#a7c98a] font-bold tracking-widest text-[11px] uppercase animate-pulse">Running Neural Diagnostics...</p>
                </div>
              ) : result ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
                  <div className="h-24 w-24 rounded-full overflow-hidden mb-4 ring-2 ring-[#a7c98a]">
                    <img src={result.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-white">{result.name}</h4>
                  <p className="text-[12px] text-[#a7c98a] font-medium tracking-wide">{result.category}</p>
                  <button onClick={() => setResult(null)} className="mt-6 text-[11px] text-[#9aa79a] hover:text-white underline">Upload another</button>
                </motion.div>
              ) : (
                <>
                  <div className="glass grid h-14 w-14 place-items-center rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="h-6 w-6 text-[#a7c98a]" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-white">Upload Specimen Image</h4>
                  <p className="mt-2 text-[12px] text-[#9aa79a] text-center max-w-[240px]">
                    Drag and drop your image, or click to browse files. Supports JPG, PNG, WebP up to 10MB.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 h-full">
          <div className="glass-strong rounded-[28px] p-6 sm:p-8 h-full flex flex-col">
            <h3 className="text-2xl text-white mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>Select Specimen</h3>
            <div className="space-y-3">
              {[CARE_SPECIMENS[0], CARE_SPECIMENS[1], CARE_SPECIMENS[2], CARE_SPECIMENS[3], CARE_SPECIMENS[4], CARE_SPECIMENS[5], CARE_SPECIMENS[6]].map((plant, i) => (
                <motion.button
                  key={plant.name}
                  onClick={() => startScan(plant)}
                  whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center gap-4 rounded-2xl bg-white/[0.03] p-4 text-left ring-1 ring-white/10"
                >
                  <div className="h-12 w-12 overflow-hidden rounded-xl">
                    <img src={plant.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-white">{plant.name}</h4>
                    <p className="text-[11px] text-[#9aa79a] italic">Botanical ID calibration ready</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#9aa79a]" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

import { Camera } from "lucide-react";

export default function PageView({ page, onNavigate }: { page: Exclude<PageKey, "home">, onNavigate: (p: PageKey) => void }) {
  const config = PAGE_CONFIG[page];
  const Icon = config.icon;

  if (page === "about") {
    return <AboutPage onNavigate={onNavigate} />;
  }

  if (page === "care") {
    return <CareGuidePage onNavigate={onNavigate} />;
  }

  if (page === "community") {
    return <CommunityPage onNavigate={onNavigate} />;
  }

  if (page === "shop") {
    return <ShopPage onNavigate={onNavigate} />;
  }

  if (page === "garden") {
    return <MyGardenPage onNavigate={onNavigate} />;
  }

  if (page === "faq") {
    return <FAQPage onNavigate={onNavigate} config={config} />;
  }

  if (page === "identify") {
    return <IdentifyPage onNavigate={onNavigate} config={config} />;
  }

  return (
    <motion.section
      key={page}
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-5 pb-16 pt-32 md:px-10 md:pt-36"
    >
      <div className="grid w-full items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate("home")}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] text-[#d8e0d2] transition-colors hover:text-white"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="glass grid h-11 w-11 place-items-center rounded-2xl">
              <Icon className="h-5 w-5 text-[#a7c98a]" />
            </span>
            <span
              className="text-[11px] tracking-[0.24em] text-[#9aa79a]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {config.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8 }}
            className="text-glow max-w-3xl text-[42px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[60px] lg:text-[78px]"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            {config.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.75 }}
            className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9aa79a] md:text-[17px]"
          >
            {config.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03, rotate: [0, -1, 1, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(page === "garden" ? "care" : "garden")}
              className="group relative overflow-hidden rounded-full px-6 py-3 text-[14px] font-medium text-[#07110d]"
              style={{
                background:
                  "linear-gradient(135deg,#b9d49a 0%, #8daa7b 55%, #6f8e60 100%)",
                boxShadow:
                  "0 14px 40px rgba(141,170,123,0.32), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {config.action}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("home")}
              className="glass rounded-full px-6 py-3 text-[14px] text-[#e6ebde] transition-colors hover:text-white"
            >
              Return Home
            </motion.button>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.8 }}
            className="glass-strong relative overflow-hidden rounded-[28px] p-5 sm:p-6"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#a7c98a]/20 blur-[70px]" />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p
                  className="text-[11px] tracking-[0.2em] text-[#9aa79a]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  LIVE PANEL
                </p>
                <h3
                  className="mt-1 text-2xl text-white"
                  style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
                >
                  {config.panelTitle}
                </h3>
              </div>
              <motion.span
                animate={{ rotate: [0, 10, -6, 0], y: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10"
              >
                <Icon className="h-5 w-5 text-[#a7c98a]" />
              </motion.span>
            </div>

            <div className="relative mt-5 space-y-3">
              {config.highlights.map((item: any, index: number) => {
                const RowIcon = item.icon;
                return (
                  <motion.button
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38 + index * 0.08, duration: 0.5 }}
                    whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.06)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1d17] ring-1 ring-[#a7c98a]/20">
                      <RowIcon className="h-4 w-4 text-[#cfe2b8]" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-medium text-[#f0f3ea]">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-[12px] leading-relaxed text-[#9aa79a]">
                        {item.text}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#9aa79a]" />
                  </motion.button>
                );
              })}
            </div>

            <div className="relative mt-5 grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-3">
              {config.panelRows.map((row: string, index: number) => (
                <motion.button
                  key={row}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.08, duration: 0.45 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-2xl bg-white/[0.04] px-3 py-3 text-left text-[12px] leading-snug text-[#d8e0d2] ring-1 ring-white/10"
                >
                  {row}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
