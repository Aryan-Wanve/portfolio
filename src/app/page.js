"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(textRef.current, {
      y: 80,
      opacity: 0,
      delay: 0.3,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(buttonsRef.current, {
      y: 80,
      opacity: 0,
      delay: 0.6,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-2xl">
          
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Cinematic Video Editor
          </h1>

          <p
            ref={textRef}
            className="text-gray-300 mb-8"
          >
            Creating high-impact visuals that capture attention and tell stories.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/work"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
            >
              View Work
            </Link>

            <a
              href="mailto:your@email.com"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Contact Me
            </a>
          </div>

        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
          ↓
        </div>

      </section>

      {/* WHAT I DO */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          What I Do
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          I create cinematic edits, brand promos, and high-impact content designed to grab attention and drive engagement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">Reels Editing</h3>
            <p className="text-gray-500">Fast-paced edits optimized for social media.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Brand Videos</h3>
            <p className="text-gray-500">Clean, cinematic visuals for businesses.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Ads & Promos</h3>
            <p className="text-gray-500">High-converting video content.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Let’s Work Together
        </h2>

        <p className="text-gray-400 mb-8">
          Have a project in mind? Let’s create something great.
        </p>

        <a
          href="mailto:aryanwanve15@gmail.com"
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold"
        >
          Contact Me
        </a>
      </section>

    </main>
  );
}