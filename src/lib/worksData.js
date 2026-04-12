const allWorks = [
  {
    title: "Visual Curiosity",
    description:
      "Psychology trick to get views on any niche videos",
    category: "Informative",
    video:
      "https://vimeo.com/1180262717?share=copy&fl=sv&fe=ci",
  },
  {
    title: "How to build a personal brand Khaled",
    description:
      "Tips and tricks to build a personal brand",
    category: "Informative",
    video:
      "https://vimeo.com/1180262251?share=copy&fl=sv&fe=ci",
  },
  {
    title: "Sell anything you want",
    description:
      "Key rules to sell anything you want",
    category: "Business",
    video:
      "https://vimeo.com/1180263181?share=copy&fl=sv&fe=ci",
  },
  {
    title: "Red Flags in Negotiation",
    description:
      "Be aware of these red flags in negotiation",
    category: "Podcast",
    video:
      "https://vimeo.com/1180264037?share=copy&fl=sv&fe=ci",
  },
  {
    title: "Corporate Motion Graphics",
    description:
      "Clean and polished motion graphics tailored for corporate brand storytelling.",
    category: "Corporate",
    video:
      "https://res.cloudinary.com/dkeeyufv7/video/upload/v1772739661/file_7_cxd5pd.mp4",
  },
  {
    title: "Explainer Motion Graphics",
    description:
      "Engaging explainer visuals that break down ideas quickly and keep viewers hooked.",
    category: "Explainer",
    video:
      "https://res.cloudinary.com/dkeeyufv7/video/upload/v1772739677/file_4_raanjw.mp4",
  },
];

/**
 * Top row: add your own video URLs here (MP4 or YouTube embed/watch URL).
 * Leave video as "" until you add a link.
 */
export const worksLandscape = [
  {
    title: "The 7 LEVELS of Clone Trooper Explained!",
    description: "Red Five explores the diverse ranks within the Grand Army of the Republic.",
    // category: "Informative and Entertainment",
    video: "https://www.youtube.com/embed/nZeFYZpS6jE?si=UYvoOboOvCdkfMB-",
  },
  {
    title: "How I Got 800,000 Instagram Followers in 5 Months! (Copy Me)",
    description: "This video details specific content strategies, emphasizing the importance of hooks and visual consistency.",
    // category: "Film & Animation",
    video: "https://www.youtube.com/embed/oSKXUiP0UR8?si=pqZJ3eWLXXk5FM2A",
  },
  {
    title: "EVERY SINGLE Space Marine Legion Explained! (Post Heresy)",
    description: "Explore the fates of every Space Marine Legion after the Horus Heresy.",
    // category: "Motion",
    video: "https://www.youtube.com/embed/WWt9pKMKXTc?si=Y3HKe3k7oDiJjSCs",
  },
  {
    title: "ALL 24 MCU Avengers Explained!",
    description: "This video summarizes the origins, character arcs, and legacies of all 24 MCU Avengers and key team members.",
    // category: "Motion",
    video: "https://www.youtube.com/embed/H1VWOgebWVg?si=aGps22u6qsDxb9ea",
  },
];

/** Bottom row: same four spotlight clips as before (vertical / reel layout) */
export const worksReels = allWorks.slice(0, 4);

/** @deprecated */
export const worksData = allWorks;
