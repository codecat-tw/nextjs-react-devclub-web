import Link from "next/link";
import { Icon } from "@iconify/react";
import pkg from "../../package.json";

export default function Footer() {
  return (
    <footer className="footer border-t bg-orange-900 text-white">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-center md:px-12">
        <div className="text-center md:text-left">
          <span className="text-lg font-semibold">Next.js / React 讀書會</span>
          <p className="mt-1 text-gray-300">All rights reserved 2024-2025</p>
          <p className="text-gray-300">{`Web version: ${pkg.version}`}</p>
        </div>

        <div className="flex space-x-6">
          <Link href="https://discord.gg/5S9DCMaHnX" aria-label="Discord">
            <Icon
              icon="mdi:discord"
              className="cursor-pointer text-2xl transition duration-300 hover:text-gray-400"
            />
          </Link>
          <Link
            href="https://www.instagram.com/next.js_react/"
            aria-label="Instagram"
          >
            <Icon
              icon="mdi:instagram"
              className="cursor-pointer text-2xl transition duration-300 hover:text-gray-400"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}