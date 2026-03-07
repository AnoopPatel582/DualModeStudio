"use client";

import { useEffect, useMemo, useState } from "react";
import { syne } from "@/app/fonts";

const thumbnails = [
  "/thumb1.png",
  "/thumb2.png",
  "/thumb3.png",
  "/thumb4.jpeg",
  "/thumb5.png",
  "/thumb6.png",
];

export default function ThumbnailCarousel() {

  const [rotation, setRotation] = useState(0); // degrees
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const total = thumbnails.length;
  const angleStep = 360 / total;

  // Detect which thumbnail is currently in front
  const frontIndex = useMemo(() => {
    const normalized = ((rotation % 360) + 360) % 360; // 0..360
    // front is angle closest to 0deg
    return (Math.round(normalized / angleStep) % total + total) % total;
  }, [rotation, angleStep, total]);


  // Step-wise auto rotation (pause on hover)
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev + angleStep);
    }, 1400); // ~0.7s move + ~0.7s pause (via CSS transition)

    return () => clearInterval(interval);
  }, [paused, angleStep]);


  // Click thumbnail
  const handleThumbnailClick = (index) => {

    if (index === frontIndex) {

      // Open preview
      setActiveIndex(index);

    } else {
      // Snap clicked thumbnail to front.
      // We want the clicked item's orbit angle to become 0deg.
      const target = index * angleStep;
      setRotation(target);

    }
  };


  // Modal navigation
  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % thumbnails.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? thumbnails.length - 1 : prev - 1
    );
  };

  const closeModal = () => {
    setActiveIndex(null);
  };


  return (

    <section id="portfolio" className="py-24 overflow-hidden">

      {/* Section Heading */}

      <div className="text-center mb-16">

        <h2 className={`${syne.className} text-3xl md:text-4xl font-semibold`}>
          CTR Thumbnail Designs
        </h2>

        <p className="text-gray-400 mt-4">
          Don’t forget to check our premium work done with our creative hands
          and expertise
        </p>

      </div>



      {/* 3D Carousel (true orbit) */}
      <div
        className="relative flex justify-center items-center mb-18"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="relative w-[900px] max-w-[95vw] h-[320px]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-10deg)",
          }}
        >
          {thumbnails.map((thumb, i) => {
            // orbit angle for this item
            const a = i * angleStep - rotation;
            const rad = (a * Math.PI) / 180;

            // circle radius (depth) + horizontal spread
            const radius = 520;
            const x = Math.sin(rad) * 360;
            const z = Math.cos(rad) * radius;

            // depth-based scale/opacity (front bigger/brighter)
            const depth01 = (z + radius) / (2 * radius); // 0..1
            const scale = 0.75 + depth01 * 0.35;
            const opacity = 0.2 + depth01 * 0.8;

            // clickable logic
            const isFront = i === frontIndex;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleThumbnailClick(i)}
                className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(depth01 * 1000),
                  cursor: isFront ? "zoom-in" : "pointer",
                }}
              >
                <img
                  src={thumb}
                  alt="thumbnail"
                  className="w-[400px] h-[225px] max-w-none rounded-2xl shadow-2xl select-none pointer-events-none object-cover"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>



      {/* Fullscreen Preview Modal */}

      {activeIndex !== null && (

        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

          {/* Close */}

          <button
            onClick={closeModal}
            className="absolute top-8 right-10 text-white text-4xl"
          >
            ✕
          </button>


          {/* Previous */}

          <button
            onClick={prevImage}
            className="absolute left-10 text-white text-5xl cursor-pointer select-none"
          >
            ‹
          </button>


          {/* Image */}

          <img
            src={thumbnails[activeIndex]}
            alt="thumbnail preview"
            className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl cursor-default select-none"
            draggable={false}
          />


          {/* Next */}

          <button
            onClick={nextImage}
            className="absolute right-10 text-white text-5xl cursor-pointer select-none"
          >
            ›
          </button>

        </div>

      )}

    </section>
  );
}