export type PageKey =
  | "home"
  | "care"
  | "community"
  | "about"
  | "shop"
  | "faq"
  | "garden"
  | "identify";

export const NAV_LINKS: { label: string; page: PageKey }[] = [
  { label: "Home", page: "home" },
  { label: "Care Guide", page: "care" },
  { label: "Community", page: "community" },
  { label: "About Us", page: "about" },
  { label: "Shop", page: "shop" },
  { label: "FAQ", page: "faq" },
];

export const PAGE_LABELS: Record<PageKey, string> = {
  home: "Home",
  care: "Care Guide",
  community: "Community",
  about: "About Us",
  shop: "Shop",
  faq: "FAQ",
  garden: "My Garden",
  identify: "Plant Identification",
};

export const PAGE_KEYS: PageKey[] = [
  "home",
  "care",
  "community",
  "about",
  "shop",
  "faq",
  "garden",
  "identify",
];