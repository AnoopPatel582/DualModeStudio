import Image from "next/image";
import Link from "next/link";

export default function FounderCard({ founder }) {
  return (
    <div
      className="
      text-center
      rounded-[28px]
      border border-white/10
      bg-white/[0.03]
      p-10
      transition-all duration-300
      hover:border-white/20
      hover:bg-white/[0.05]
      hover:-translate-y-1
    "
    >
      {/* Photo */}
      <div className="flex justify-center">
        <Image
          src={founder.image}
          alt={founder.name}
          width={110}
          height={110}
          className="rounded-2xl object-cover border border-white/10"
        />
      </div>

      {/* Name */}
      <h3 className="mt-6 text-2xl font-semibold text-white">
        {founder.name}
      </h3>

      {/* Role */}
      <p className="mt-2 text-white/60">{founder.role}</p>

      {/* Expertise */}
      <p className="mt-4 text-sm leading-relaxed text-white/50">
        {founder.expertise}
      </p>

      {/* Contact Links */}
      <div className="mt-6 flex justify-center gap-4 text-sm text-white/50">
        <Link href={founder.links.linkedin} className="hover:text-white">
          LinkedIn
        </Link>
        <Link href={founder.links.instagram} className="hover:text-white">
          Instagram
        </Link>
        <Link href={founder.links.x} className="hover:text-white">
          X
        </Link>
        <Link href={founder.links.email} className="hover:text-white">
          Email
        </Link>
      </div>
    </div>
  );
}