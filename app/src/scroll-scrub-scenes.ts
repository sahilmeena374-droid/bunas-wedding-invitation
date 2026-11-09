import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#9b3448",
  background: "#f5efe4",
  ink: "#4a1e2a",
  muted: "#6d5052",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "the-family-invitation",
    label: "स्वागत",
    kicker: "श्री गणेशाय नमः · बुनस परिवार",
    title: "शुभ विवाह",
    body: "तीन मंगल परिणय, नवम्बर की दो शुभ तिथियाँ और बुनस परिवार की ओर से स्नेहिल निमंत्रण।",
    clip: "https://d8j0ntlcm91z4.cloudfront.net/user_3KK0gqyHpfx5WXotxC2nbGxPORI/hf_20261108_074948_d89264c9-3ecc-4f44-a842-65ddb36c3938.mp4",
    poster: "/assets/world/wedding-film-poster.png",
    mobileClip: "https://d8j0ntlcm91z4.cloudfront.net/user_3KK0gqyHpfx5WXotxC2nbGxPORI/hf_20261108_074948_d89264c9-3ecc-4f44-a842-65ddb36c3938.mp4",
    mobilePoster: "/assets/world/wedding-film-mobile-poster.png",
    scroll: 3.25,
    linger: 0.12,
    objectPosition: "50% 50%",
    mobileObjectPosition: "50% 48%",
    tags: ["24 नवम्बर 2026", "26 नवम्बर 2026"],
  },
];
