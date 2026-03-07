"use client";

import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-white">

      {/* Top Section */}

      <div className="flex flex-col md:flex-row md:justify-around items-center md:items-start gap-12 px-6">

        {/* Left Block */}

        <div className="max-w-sm text-center md:text-left">

          <Image
            src="/logo_title.png"
            alt="DualMode Studio"
            width={300}
            height={100}
            
          />

          <p className="text-gray-400 leading-relaxed ml-6">
            Performance-driven YouTube growth systems engineered for scale.
          </p>

        </div>


        {/* Right Block */}

        <div className="text-center md:text-left mt-12">

          <p className="text-gray-300 mb-2">
            <a
              href="mailto:business@dualmodestudio.com"
              className="hover:text-blue-400 transition"
            >
              business@dualmodestudio.com
            </a>
          </p>

          <p className="text-gray-400 mb-4">
            Operating remotely worldwide.
          </p>


          {/* Social Icons */}

          <div className="flex justify-center md:justify-start gap-5 text-xl">

            <a
              href="https://wa.me/message/THW73AALQP6HB1"
              target="_blank"
              className="text-gray-400 hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.instagram.com/bydualmodestudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              className="text-gray-400 hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            {/* <a
              href="#"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <FaXTwitter />
            </a> */}

          </div>

        </div>

      </div>


      {/* Bottom Strip */}

      <div className="border-t border-gray-800 mt-12 py-6 text-center text-gray-500 text-sm">

        © {new Date().getFullYear()} DualMode Studio. All rights reserved.

      </div>

    </footer>
  );
}