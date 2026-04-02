const allWorks = [
  {
    title: "Podcast Motion Graphics",
    description:
      "Dynamic motion graphics crafted to elevate podcast visuals and audience retention.",
    category: "Podcast",
    video:
      "https://res.cloudinary.com/dkeeyufv7/video/upload/v1772739610/file_6_et6p6z.mp4",
  },
  {
    title: "YouTube Automation Edit",
    description:
      "Fully optimized automation-style edit built for consistent, scalable YouTube output.",
    category: "Automation",
    video:
      "https://res.cloudinary.com/dkeeyufv7/video/upload/v1772739681/file_5_gvw9sn.mp4",
  },
  {
    title: "Educational Content Edit",
    description:
      "Structured educational edit designed to simplify complex topics and boost watch time.",
    category: "Education",
    video:
      "https://res.cloudinary.com/dkeeyufv7/video/upload/v1772739620/file_3_bkzcuc.mp4",
  },
  {
    title: "Business Content Edit",
    description:
      "Professional business content edited to communicate authority and drive conversions.",
    category: "Business",
    video:
      "https://res.cloudinary.com/dkeeyufv7/video/upload/v1772739643/file_2_uaplqe.mp4",
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
    title: "Featured work 1",
    description: "",
    category: "Motion",
    video: "https://www.youtube.com/embed/zvHJftkJrfA?si=F8KOs9tY78mYcvzq",
  },
  {
    title: "Featured work 2",
    description: "",
    category: "Motion",
    video: "https://www.youtube.com/embed/zvHJftkJrfA?si=F8KOs9tY78mYcvzq",
  },
  {
    title: "Featured work 3",
    description: "",
    category: "Motion",
    video: "https://www.youtube.com/embed/zvHJftkJrfA?si=F8KOs9tY78mYcvzq",
  },
  {
    title: "Featured work 4",
    description: "",
    category: "Motion",
    video: "https://www.youtube.com/embed/W1XFZLzRyZ4?si=KcEEVakhy4vwEk_q",
  },
];

/** Bottom row: same four spotlight clips as before (vertical / reel layout) */
export const worksReels = allWorks.slice(0, 4);

/** @deprecated */
export const worksData = allWorks;
