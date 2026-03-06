"use client";

import { useEffect, useState } from "react";

const thumbnails = [
  "/thumb1.png",
  "/thumb2.png",
  "/thumb3.png",
  "/thumb4.jpeg",
  "/thumb5.png",
  "/thumb6.png",
];

export default function ThumbnailCarousel() {

  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const total = thumbnails.length;
  const angleStep = 360 / total;

  // Detect which thumbnail is currently in front
  const frontIndex =
    ((Math.round(-rotation / angleStep) % total) + total) % total;


  // Auto rotation
  useEffect(() => {

    if (paused) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev + angleStep);
    }, 3000);

    return () => clearInterval(interval);

  }, [paused]);


  // Click thumbnail
  const handleThumbnailClick = (index) => {

    if (index === frontIndex) {

      // Open preview
      setActiveIndex(index);

    } else {

      // Rotate clicked thumbnail to front
      setRotation(-index * angleStep);

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

    <section className="py-24 overflow-hidden">

      {/* Section Heading */}

      <div className="text-center mb-16">

        <h2 className="text-3xl md:text-4xl font-semibold">
          CTR Thumbnail Designs
        </h2>

        <p className="text-gray-400 mt-4">
          Don’t forget to check our premium work done with our creative hands
          and expertise
        </p>

      </div>



      {/* 3D Carousel */}

      <div
        className="flex justify-center items-center perspective-[1200px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        <div
          style={{
            transform: `rotateY(${rotation}deg)`
          }}
          className="relative w-[420px] h-[250px] transform-style-preserve-3d transition-transform duration-700"
        >

          {thumbnails.map((thumb, i) => {

            const angle = angleStep * i;
            const isFront = i === frontIndex;

            return (

              <div
                key={i}
                onClick={() => handleThumbnailClick(i)}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(350px) scale(${isFront ? 1.1 : 0.9})`,
                  zIndex: isFront ? 10 : 1
                }}
                className="absolute w-[420px] cursor-pointer transition-transform duration-500"
              >

                <img
                  src={thumb}
                  alt="thumbnail"
                  className="rounded-xl shadow-xl hover:scale-105 transition"
                />

              </div>

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
            className="absolute left-10 text-white text-5xl"
          >
            ‹
          </button>


          {/* Image */}

          <img
            src={thumbnails[activeIndex]}
            alt="thumbnail preview"
            className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
          />


          {/* Next */}

          <button
            onClick={nextImage}
            className="absolute right-10 text-white text-5xl"
          >
            ›
          </button>

        </div>

      )}

    </section>
  );
}