"use client";

export default function WorkCard({ work, openModal }) {
  return (
    <div
      className="
      cursor-pointer
      rounded-xl
      border border-white/10
      overflow-hidden
      bg-white/[0.02]
      transition-all duration-300
      hover:border-white/25
      hover:-translate-y-1
    "
      onClick={() => openModal(work.video)}
    >
      <video
        src={work.video}
        autoPlay
        muted
        loop
        playsInline
        controls
        className="w-full"
      />

      <div className="p-4">
        <h3 className="text-white text-lg font-medium">{work.title}</h3>
      </div>
    </div>
  );
}