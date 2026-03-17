"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md">
      
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <h1 className="text-white font-bold text-lg">
          Oneway
        </h1>

        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/work" className="hover:text-gray-300">
            Work
          </Link>
        </div>

      </div>

    </nav>
  );
}