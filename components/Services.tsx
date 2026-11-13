"use client";

import React, { useState } from "react";
import { ArrowUpRight, Laptop, Server, Globe, Smartphone, Search, Megaphone } from "lucide-react";
import Reveal from "./Reveal";

// Services Data Configuration
const services = [
  {
    icon: Laptop,
    title: "Web Development",
    description: "High-performance, scalable websites tailored to establish your brand presence online.",
  },
  {
    icon: Server,
    title: "Frontend & Backend",
    description: "Robust full-stack architecture with secure APIs, databases, and modern UI stacks.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Custom web apps built with Next.js and React for high speed and seamless user interactions.",
  },
  {
    icon: Smartphone,
    title: "App Development & Software",
    description: "End-to-end software solutions and cross-platform digital products built for scale.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven search engine optimization to boost your organic traffic and visibility.",
  },
  {
    icon: Megaphone,
    title: "Digital Ads & Marketing",
    description: "Targeted campaigns and conversion-focused ads to drive high ROI and customer acquisition.",
  },
];

export default function Services() {
  // Track mouse coordinates per card for the interactive spotlight effect
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePositions((prev) => ({ ...prev, [index]: { x, y } }));
  };

  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#FFFBF7] px-4 py-20 sm:px-6 lg:px-8">
      
      {/* BACKGROUND DECORATIVE WAVES & GLOWS (GPU Optimized) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden transform-gpu">
        <svg
          className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-full opacity-40 text-[#F5E5D5]"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 300C300 450 600 150 900 350C1200 550 1350 200 1440 300V900H0V300Z"
            fill="currentColor"
          />
        </svg>

        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#F5C99F]/20 blur-[100px]" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#F5C99F]/15 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* SECTION HEADER */}
        <Reveal className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#F5C99F] px-5 py-2 text-xs font-bold tracking-wider text-neutral-900 shadow-2xs">
            SERVICES
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            What I Can Do For You
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600 sm:text-lg">
            End-to-end digital solutions and web services from concept to deployment.
          </p>
        </Reveal>

        {/* SERVICES GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const dark = i === 0; // First card has dark styling
            const mousePos = mousePositions[i] || { x: 0, y: 0 };

            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <article
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  className={`group relative flex min-h-[310px] flex-col overflow-hidden rounded-3xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl touch-manipulation ${
                    dark
                      ? "border-black bg-[#111] text-white shadow-lg"
                      : "border-[#E8D6C4] bg-[#FFF7EF]/90 backdrop-blur-md hover:border-[#D8A878]"
                  }`}
                >
                  {/* Interactive Spotlight Glow Effect */}
                  <div
                    className="absolute pointer-events-none -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: dark
                        ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245,201,159,0.15), transparent 80%)`
                        : `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(183,120,66,0.12), transparent 80%)`,
                    }}
                  />

                  {/* Icon Box */}
                  <div className={`relative z-10 flex size-14 items-center justify-center rounded-2xl ${dark ? "bg-white/10" : "bg-[#F5C99F]/30"}`}>
                    <Icon size={26} className={dark ? "text-[#F5C99F]" : "text-neutral-900"} />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 mt-5 text-xl font-extrabold leading-snug tracking-tight">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className={`relative z-10 mt-2.5 text-sm leading-relaxed ${dark ? "text-gray-300" : "text-neutral-600"}`}>
                    {s.description}
                  </p>

                  {/* Action Link Button */}
                  <a
                    href="#contact"
                    aria-label={`Enquire about ${s.title}`}
                    className={`relative z-10 mt-auto ml-auto flex size-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 shadow-2xs ${
                      dark ? "bg-[#F5C99F] text-black hover:bg-white" : "bg-black text-white hover:bg-neutral-800"
                    }`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}