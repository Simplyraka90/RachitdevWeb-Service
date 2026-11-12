
"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play, Code2, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "30+", label: "Projects Delivered" },
  { value: "6 Months", label: "Experience" },
  { value: "100%", label: "Client Focused" },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#FFFBF7] px-4 pt-10 pb-24 sm:px-6 sm:pt-14 sm:pb-32 lg:px-8 lg:pt-16 lg:pb-36">
      
      {/* BACKGROUND ORGANIC WAVES & LAYERED SHAPES */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Ambient Glow */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-linear-to-br from-[#F5C99F]/30 to-[#F5E5D5]/60 blur-[90px]" />

        {/* 1. LAYERED ORGANIC SVG WAVE 1 */}
        <svg
          className="absolute right-0 top-0 h-full w-[60%] opacity-70 text-[#F5E5D5]/80"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M800 0C650 150 500 250 520 450C540 650 700 700 800 800V0Z"
            fill="currentColor"
          />
        </svg>

        {/* 2. MAIN ORGANIC BACKDROP WAVE */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[550px] w-[500px] lg:w-[650px] opacity-90 text-[#FCE9D7]"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M700 100C550 80 400 180 380 350C360 520 500 620 700 680V100Z"
            fill="currentColor"
          />
        </svg>

        {/* 3. DARK CONTRAST WAVES */}
        <div className="absolute -right-20 -bottom-24 h-96 w-96 sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]">
          <svg
            className="h-full w-full text-[#1C1C1E]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              cx="350"
              cy="350"
              r="280"
              stroke="#A39384"
              strokeWidth="1.5"
              strokeDasharray="8 8"
            />
            <circle cx="380" cy="380" r="230" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Content & CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center lg:col-span-6 lg:text-left"
        >
          {/* Status Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#EBDCCC] bg-white px-3.5 py-1.5 text-xs font-semibold shadow-xs">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
            Available for New Projects
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold leading-[1.12] tracking-tight text-neutral-900">
            Full-Stack Web Development{" "}
            <span className="relative inline-block rounded-xl bg-[#F5C99F] px-2.5 py-0.5 text-neutral-950 shadow-xs">
              Services
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg lg:mx-0">
            I build high-performance, scalable web applications with modern UI/UX, clean architecture, and real business impact.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#services"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 shadow-md"
            >
              Explore Services <ArrowRight size={17} />
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5E5D5]"
            >
              <Play size={14} className="fill-current" /> View Projects
            </a>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-3 divide-x divide-[#E8D7C7] border-t border-[#E8D7C7]/60 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="px-2 first:pl-0 last:pr-0">
                <p className="text-xl font-extrabold text-neutral-900 sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-neutral-600 sm:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Laptop & Badges */}
        <motion.div
          animate={reduced ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto flex w-full max-w-lg lg:col-span-6 items-center justify-center py-6"
        >
          {/* Floating Tech Badges */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1 top-2 sm:-left-2 sm:top-4 z-30 flex items-center gap-2 rounded-xl bg-[#18181B] px-3.5 py-2 text-white shadow-lg border border-white/10"
          >
            <span className="text-sm">⚛️</span>
            <span className="text-xs font-bold tracking-wide">React</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1 top-4 sm:-right-2 sm:top-6 z-35 flex items-center gap-2 rounded-xl bg-[#18181B] px-3.5 py-2 text-white shadow-lg border border-white/10"
          >
            <span className="text-xs font-black text-green-400">N</span>
            <span className="text-xs font-bold tracking-wide">Next.js</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-0 sm:-left-4 z-30 flex items-center gap-2 rounded-xl bg-[#18181B] px-3.5 py-2 text-cyan-400 shadow-lg border border-white/10"
          >
            <span className="text-xs font-bold tracking-wide text-cyan-300">Tailwind</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 right-1 sm:-right-4 z-30 flex items-center gap-2 rounded-xl bg-[#18181B] px-3.5 py-2 text-blue-400 shadow-lg border border-white/10"
          >
            <span className="text-xs font-bold tracking-wide text-blue-400">TypeScript</span>
          </motion.div>

          {/* IDE Graphic */}
          <div className="relative z-10 w-full max-w-[460px] -rotate-1 transition-transform duration-500 hover:rotate-0">
            <div className="overflow-hidden rounded-xl border-[6px] border-neutral-900 bg-[#0D1117] shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/15 bg-[#161B22] px-3.5 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                  <Code2 size={12} className="text-cyan-400" /> RachitDev.tsx
                </span>
                <span className="text-[10px] text-gray-500 font-mono">TSX</span>
              </div>

              {/* Code Snippet Body */}
              <div className="min-h-44 overflow-hidden p-3.5 font-mono text-[11px] leading-5 sm:min-h-52 sm:p-4 sm:text-xs">
                <p className="text-purple-400">export default function <span className="text-yellow-300">RachitDev</span>() {"{"}</p>
                <p className="pl-3.5 text-blue-300">return (</p>
                <p className="pl-7 text-cyan-300">{'<div className="developer-hub">'}</p>
                <p className="pl-10 text-white font-semibold">{'<h1>Build • Design • Deploy</h1>'}</p>
                <p className="pl-10 text-green-300">{'<p>Web Apps That Grow Business</p>'}</p>
                <p className="pl-7 text-cyan-300">{'</div>'}</p>
                <p className="pl-3.5 text-blue-300">);</p>
                <p className="text-purple-400">{"}"}</p>

                {/* Status */}
                <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-green-950/40 border border-green-500/30 px-2.5 py-1 text-green-400 w-fit text-[11px]">
                  <CheckCircle2 size={12}/> Ready for Production
                </div>
              </div>
            </div>

            {/* Laptop Base Stand */}
            <div className="h-3.5 w-[110%] translate-x-[-5%] rounded-b-[30px] bg-linear-to-b from-neutral-300 via-neutral-400 to-neutral-600 shadow-xl" />
          </div>
        </motion.div>

      </div>

      {/* SEAMLESS FULL-WIDTH BOTTOM WAVE DIVIDER */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 sm:h-20 lg:h-24 text-[#FFF7EF]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  );
}
