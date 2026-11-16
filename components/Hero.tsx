
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play, Code2, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "30+", label: "Projects Delivered" },
  { value: "6 Months", label: "Experience" },
  { value: "100%", label: "Client Focused" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const reveal = (
    delay = 0,
    y = 20
  ) => ({
    initial: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : y,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="home"
      className="relative isolate w-full min-w-0 scroll-mt-28 overflow-hidden bg-[#FFFBF7] px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8 lg:pb-32 lg:pt-16"
    >
      {/* BACKGROUND WAVES */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 sm:h-80 sm:w-80"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.4) 0%, rgba(245,229,213,0.1) 70%)",
          }}
        />

        {/* Organic wave 1 */}
        <svg
          className="absolute right-0 top-0 h-full w-[70%] text-[#F5E5D5]/80 opacity-60"
          viewBox="0 0 800 800"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M800 0C650 150 500 250 520 450C540 650 700 700 800 800V0Z"
            fill="currentColor"
          />
        </svg>

        {/* Organic wave 2 */}
        <svg
          className="absolute right-0 top-1/2 h-100 w-87.5 -translate-y-1/2 text-[#FCE9D7] opacity-80 sm:h-125 sm:w-112.5 lg:w-150"
          viewBox="0 0 700 700"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M700 100C550 80 400 180 380 350C360 520 500 620 700 680V100Z"
            fill="currentColor"
          />
        </svg>

        {/* Dark contrast wave */}
        <div className="absolute -bottom-20 -right-20 h-72 w-72 opacity-70 sm:h-112.5 sm:w-112.5 lg:h-137.5 lg:w-137.5">
          <svg
            className="h-full w-full text-[#1C1C1E]"
            viewBox="0 0 600 600"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="350"
              cy="350"
              r="280"
              stroke="#A39384"
              strokeWidth="1.5"
              strokeDasharray="8 8"
            />
            <circle
              cx="380"
              cy="380"
              r="230"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative mx-auto grid w-full max-w-7xl min-w-0 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
        {/* LEFT COLUMN */}
        <div className="relative z-10 min-w-0 text-center lg:col-span-6 lg:text-left">
          {/* Availability badge */}
          <motion.div
            {...reveal(0.05, 12)}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#EBDCCC] bg-white px-3.5 py-2 text-[11px] font-semibold text-neutral-800 shadow-sm sm:text-xs"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              {!reduceMotion && (
                <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-50" />
              )}
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for New Projects
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...reveal(0.12, 24)}
            className="mx-auto max-w-2xl text-[clamp(2rem,5vw,3.65rem)] font-extrabold leading-[1.13] tracking-[-0.035em] text-neutral-900 lg:mx-0"
          >
            Full-Stack Web Development{" "}
            <span className="relative inline-block rounded-xl bg-[#F5C99F] px-2.5 py-1 text-neutral-950 shadow-sm">
              Services
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...reveal(0.2, 18)}
            className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg"
          >
            I build high-performance, scalable web
            applications with modern UI/UX, clean
            architecture, and real business impact.
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...reveal(0.28, 18)}
            className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -3, scale: 1.02 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={{
                duration: 0.2,
              }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/#services"
                className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                Explore Services
                <ArrowRight size={17} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -3, scale: 1.02 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={{
                duration: 0.2,
              }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/#projects"
                className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors duration-200 hover:bg-[#F5E5D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <Play
                  size={14}
                  className="fill-current"
                />
                View Projects
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...reveal(0.38, 20)}
            className="mt-9 grid grid-cols-3 divide-x divide-[#E8D7C7] border-t border-[#E8D7C7]/60 pt-6 sm:mt-11"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 px-2 text-center first:pl-0 last:pr-0 lg:text-left"
              >
                <p className="text-lg font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[10px] font-medium leading-4 text-neutral-600 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          {...reveal(0.18, 30)}
          className="relative mx-auto flex w-full max-w-130 min-w-0 items-center justify-center py-12 sm:py-14 lg:col-span-6 lg:py-12"
        >
          {/* Subtle decorative ring */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[85%] w-[85%] rounded-full border border-[#D9B99C]/30" />
          </div>

          {/* React badge */}
          <motion.div
            initial={{
              opacity: reduceMotion ? 1 : 0,
              x: reduceMotion ? 0 : -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.45,
            }}
            className="absolute left-0 top-1 z-30 flex items-center gap-2 rounded-xl border border-white/10 bg-[#18181B] px-3 py-2 text-[11px] font-bold text-white shadow-lg sm:-left-2 sm:top-3 sm:text-xs"
          >
            <span>⚛️</span>
            React
          </motion.div>

          {/* Next.js badge */}
          <motion.div
            initial={{
              opacity: reduceMotion ? 1 : 0,
              x: reduceMotion ? 0 : 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.52,
            }}
            className="absolute right-0 top-3 z-30 flex items-center gap-2 rounded-xl border border-white/10 bg-[#18181B] px-3 py-2 text-[11px] font-bold text-white shadow-lg sm:-right-2 sm:top-5 sm:text-xs"
          >
            <span className="text-green-400">N</span>
            Next.js
          </motion.div>

          {/* Tailwind badge */}
          <motion.div
            initial={{
              opacity: reduceMotion ? 1 : 0,
              x: reduceMotion ? 0 : -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.58,
            }}
            className="absolute bottom-10 left-0 z-30 rounded-xl border border-white/10 bg-[#18181B] px-3 py-2 text-[11px] font-bold text-cyan-300 shadow-lg sm:-left-3 sm:bottom-12 sm:text-xs"
          >
            Tailwind CSS
          </motion.div>

          {/* TypeScript badge */}
          <motion.div
            initial={{
              opacity: reduceMotion ? 1 : 0,
              x: reduceMotion ? 0 : 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.65,
            }}
            className="absolute bottom-2 right-0 z-30 rounded-xl border border-white/10 bg-[#18181B] px-3 py-2 text-[11px] font-bold text-blue-400 shadow-lg sm:-right-3 sm:bottom-4 sm:text-xs"
          >
            TypeScript
          </motion.div>

          {/* Laptop */}
          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -5,
                    scale: 1.01,
                  }
            }
            transition={{
              duration: 0.3,
              ease,
            }}
            className="relative z-10 w-[92%] max-w-110 min-w-0 sm:w-[90%]"
          >
            {/* Screen */}
            <div className="overflow-hidden rounded-xl border-[5px] border-neutral-900 bg-[#0D1117] shadow-[0_18px_45px_rgba(0,0,0,0.20)] sm:border-[6px]">
              {/* IDE Header */}
              <div className="flex items-center justify-between gap-2 border-b border-white/15 bg-[#161B22] px-3 py-2 sm:px-3.5">
                <div className="flex shrink-0 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>

                <span className="flex min-w-0 items-center gap-1.5 truncate text-[10px] font-medium text-gray-400 sm:text-xs">
                  <Code2
                    size={12}
                    className="shrink-0 text-cyan-400"
                  />
                  RachitDev.tsx
                </span>

                <span className="shrink-0 font-mono text-[10px] text-gray-500">
                  TSX
                </span>
              </div>

              {/* Code body */}
              <div className="min-h-47.5 overflow-hidden p-3 font-mono text-[clamp(9px,2.4vw,12px)] leading-[1.9] sm:min-h-55 sm:p-4">
                <p className="text-purple-400">
                  export default function{" "}
                  <span className="text-yellow-300">
                    RachitDev
                  </span>
                  () {"{"}
                </p>

                <p className="pl-2 text-blue-300 sm:pl-3.5">
                  return (
                </p>

                <p className="pl-4 text-cyan-300 sm:pl-7">
                  {'<div className="developer-hub">'}
                </p>

                <p className="pl-6 font-semibold text-white sm:pl-10">
                  {"<h1>Build • Design • Deploy</h1>"}
                </p>

                <p className="pl-6 text-green-300 sm:pl-10">
                  {"<p>Web Apps That Grow Business</p>"}
                </p>

                <p className="pl-4 text-cyan-300 sm:pl-7">
                  {"</div>"}
                </p>

                <p className="pl-2 text-blue-300 sm:pl-3.5">
                  );
                </p>

                <p className="text-purple-400">
                  {"}"}
                </p>

                {/* Status */}
                <div className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-lg border border-green-500/30 bg-green-950/40 px-2.5 py-1 text-[10px] text-green-400 sm:text-[11px]">
                  <CheckCircle2
                    size={12}
                    className="shrink-0"
                  />
                  Ready for Production
                </div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="relative mx-auto h-3 w-[108%] translate-x-[-3.7%] rounded-b-3xl bg-linear-to-b from-neutral-300 via-neutral-400 to-neutral-600 shadow-md" />
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM WAVE */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 overflow-hidden leading-none">
        <svg
          className="block h-12 w-full text-[#FFF7EF] sm:h-20 lg:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
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
