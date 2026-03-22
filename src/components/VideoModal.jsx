// "use client";
// import { X } from "lucide-react";

// export default function VideoModal({ video, onClose }) {
//   if (!video) return null;
//   return (
//     <div
//       className="fixed inset-0 cursor-pointer bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-3xl px-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Cross icon — top right corner */}
//         <button
//           onClick={onClose}
//           className="absolute -top-4 -right-4 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-200 cursor-pointer"
//         >
//           <X className="w-4 h-4 text-white" />
//         </button>

//         <video
//           src={video}
//           controls
//           autoPlay
//           className="w-full aspect-video rounded-xl border border-white/10 object-cover"
//         />
//       </div>
//     </div>
//   );
// }

"use client";
import { X } from "lucide-react";

export default function VideoModal({ video, onClose }) {
  if (!video) return null;
  return (
    <div
      className="fixed inset-0 cursor-pointer bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video wrapper — relative so cross positions inside it */}
        <div className="relative">

          {/* Cross icon — inside video, top-right corner */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 transition-all duration-200 cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <video
            src={video}
            controls
            autoPlay
            className="w-full aspect-video rounded-xl border border-white/10 object-cover"
          />

        </div>
      </div>
    </div>
  );
}