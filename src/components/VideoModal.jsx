"use client";

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="max-w-4xl w-full px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={video}
          controls
          autoPlay
          className="w-full rounded-xl border border-white/10"
        />

        <button
          onClick={onClose}
          className="mt-6 text-white/60 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}