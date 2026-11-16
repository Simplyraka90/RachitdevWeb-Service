
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Atom,
  Bot,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  FileCode2,
  FileSpreadsheet,
  GitBranch,
  Globe,
  PenTool,
  Search,
  Smartphone,
  Terminal,
  Wind,
  Wrench,
} from "lucide-react";

const tech = [
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    subtitle: "Core Foundations",
    icon: Globe,
    color: "text-orange-500",
    experience: "4+ Years",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rachit Dev Studio</title>
</head>
<body>
  <header>Semantic Markup</header>
</body>
</html>`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    subtitle: "ES6+ Logic",
    icon: Code2,
    color: "text-yellow-400",
    experience: "3.5+ Years",
    code: `// Modern Async/Await
export async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}`,
  },
  {
    id: "react",
    name: "React.js",
    subtitle: "UI Architecture",
    icon: Atom,
    color: "text-cyan-400",
    experience: "3+ Years",
    code: `import { useState } from "react";

export default function Dashboard() {
  const [active, setActive] = useState(true);

  return (
    <button onClick={() => setActive(!active)}>
      {active ? "Active" : "Inactive"}
    </button>
  );
}`,
  },
  {
    id: "nextjs",
    name: "Next.js",
    subtitle: "App Router Framework",
    icon: Code2,
    color: "text-white",
    experience: "2.5+ Years",
    code: `// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Rachit Dev Studio</h1>
      <p>Modern Web Development</p>
    </main>
  );
}`,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    subtitle: "Design Systems",
    icon: Wind,
    color: "text-cyan-300",
    experience: "3+ Years",
    code: `export default function ServiceCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold">
        Modern Web Design
      </h2>
    </div>
  );
}`,
  },
  {
    id: "typescript",
    name: "TypeScript",
    subtitle: "Type Safety & Scale",
    icon: FileCode2,
    color: "text-blue-400",
    experience: "3+ Years",
    code: `interface Project {
  id: number;
  name: string;
  completed: boolean;
}

const project: Project = {
  id: 1,
  name: "Rachit Dev Studio",
  completed: true,
};`,
  },
  {
    id: "responsive",
    name: "Responsive Design",
    subtitle: "Mobile-First UX",
    icon: Smartphone,
    color: "text-purple-400",
    experience: "4+ Years",
    code: `/* Responsive Grid */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}`,
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    subtitle: "Version Control",
    icon: GitBranch,
    color: "text-orange-400",
    experience: "3+ Years",
    code: `# Git Workflow
git status
git add .
git commit -m "Update responsive UI"
git push origin main

npm run build`,
  },
  {
    id: "devtools",
    name: "Chrome DevTools",
    subtitle: "Debugging & Profiling",
    icon: Wrench,
    color: "text-red-400",
    experience: "4+ Years",
    code: `// Performance Monitoring
console.time("render");

performance.mark("render-start");

// Application logic

performance.mark("render-end");
console.timeEnd("render");`,
  },
  {
    id: "seo",
    name: "SEO Optimization",
    subtitle: "Search Ranking & Meta",
    icon: Search,
    color: "text-green-400",
    experience: "3+ Years",
    code: `// Next.js Metadata
export const metadata = {
  title: "Rachit Dev Studio",
  description: "Professional website development.",
  keywords: ["React", "Next.js", "Web Design"],
};`,
  },
  {
    id: "ai-prompt",
    name: "AI Prompt Eng",
    subtitle: "LLM Workflows",
    icon: Bot,
    color: "text-pink-400",
    experience: "2+ Years",
    code: `const prompt = {
  role: "Senior Frontend Developer",
  task: "Build a responsive React component",
  requirements: [
    "TypeScript",
    "Tailwind CSS",
    "Accessible UI",
  ],
};`,
  },
  {
    id: "figma",
    name: "Figma UI/UX",
    subtitle: "Prototyping & Design",
    icon: PenTool,
    color: "text-pink-500",
    experience: "3+ Years",
    code: `const designSystem = {
  colors: {
    background: "#FFFBF7",
    accent: "#F5C99F",
    foreground: "#171717",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
};`,
  },
  {
    id: "excel",
    name: "MS Excel / Sheets",
    subtitle: "Data Analytics",
    icon: FileSpreadsheet,
    color: "text-emerald-400",
    experience: "3+ Years",
    code: `=ARRAYFORMULA(
  IF(
    ISBLANK(A2:A),
    "",
    VLOOKUP(A2:A, ClientDatabase!A:D, 4, FALSE)
  )
)`,
  },
];

// Auto change every 0.5 seconds
const AUTO_CHANGE_MS = 500;
const ease = [0.22, 1, 0.36, 1] as const;

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return typeof IntersectionObserver === "undefined";
  });
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const copyTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const reducedMotion = useReducedMotion();
  const reduce = Boolean(reducedMotion);

  const activeSkill = tech[activeTab];
  const ActiveIcon = activeSkill.icon;

  // Detect section visibility without setting state synchronously in an effect body.
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Auto-switch only when visible and not paused
  useEffect(() => {
    if (!isVisible || isAutoPaused || reduce) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") {
        return;
      }

      setActiveTab(
        (previous) => (previous + 1) % tech.length
      );
    }, AUTO_CHANGE_MS);

    return () => window.clearInterval(timer);
  }, [isVisible, isAutoPaused, reduce]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const selectTech = useCallback((index: number) => {
    setActiveTab(index);
    setIsAutoPaused(true);
    setCopied(false);
  }, []);

  const copyCode = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(
        activeSkill.code
      );

      setCopied(true);

      if (copyTimerRef.current !== null) {
        clearTimeout(copyTimerRef.current);
      }

      copyTimerRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const reveal = (delay = 0) => ({
    initial: reduce
      ? false
      : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: {
      duration: reduce ? 0 : 0.5,
      delay: reduce ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative isolate w-full min-w-0 scroll-mt-28 overflow-hidden bg-[#FFFBF7] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M0 200C350 350 700 100 1050 300C1250 400 1380 250 1440 200V900H0V200Z"
            fill="#F5E5D5"
          />
        </svg>

        <div
          className="absolute left-1/2 top-1/2 h-87.5 w-87.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-150 sm:w-150"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl min-w-0">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <motion.div {...reveal(0)}>
            <span className="inline-flex rounded-full bg-[#F5C99F] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
              Digital Expertise &amp; Stack
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.06)}
            className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Interactive Core Engine
          </motion.h2>

          <motion.p
            {...reveal(0.12)}
            className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base"
          >
            Explore the technologies and skills behind our
            modern, responsive web experiences.
          </motion.p>
        </div>

        {/* Main layout */}
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Orbit */}
          <motion.div
            {...reveal(0.05)}
            className="flex w-full min-w-0 flex-col items-center justify-center"
          >
            <div className="relative flex aspect-square w-full max-w-116 items-center justify-center">
              {/* Outer ring */}
              <div className="relative flex aspect-square w-[70%] max-w-100 items-center justify-center rounded-full border-2 border-dashed border-[#D9C3B0] bg-white/20 sm:w-[76%] lg:w-[82%]">
                {/* Inner ring */}
                <div className="pointer-events-none absolute inset-[22%] rounded-full border border-[#E8D6C4]" />

                {/* Core */}
                <motion.div
                  animate={
                    reduce
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0 0 rgba(245,201,159,0.12)",
                            "0 0 0 12px rgba(245,201,159,0)",
                          ],
                        }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="relative z-10 flex h-18 w-18 flex-col items-center justify-center rounded-full border-[3px] border-[#F5C99F]/60 bg-neutral-900 text-white shadow-xl sm:h-22 sm:w-22 lg:h-26 lg:w-26"
                >
                  <Cpu className="h-6 w-6 text-[#F5C99F] sm:h-7 sm:w-7" />
                  <span className="mt-1 font-mono text-[9px] font-bold tracking-widest text-[#F5C99F]">
                    CORE
                  </span>
                </motion.div>

                {/* Technology orbit buttons */}
                {tech.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeTab === index;

                  const angle =
                    (index * 2 * Math.PI) / tech.length -
                    Math.PI / 2;

                  const x = 50 + Math.cos(angle) * 50;
                  const y = 50 + Math.sin(angle) * 50;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      title={item.name}
                      aria-label={`Select ${item.name}`}
                      aria-pressed={isActive}
                      onClick={() => selectTech(index)}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`group absolute flex h-9 w-9 touch-manipulation items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87A48] min-[400px]:h-10 min-[400px]:w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${
                        isActive ? "z-30" : "z-20"
                      }`}
                    >
                      <motion.span
                        animate={{
                          scale: isActive && !reduce ? 1.1 : 1,
                        }}
                        transition={{
                          duration: reduce ? 0 : 0.2,
                          ease,
                        }}
                        className={`relative flex h-full w-full items-center justify-center rounded-xl border shadow-sm transition-colors duration-200 sm:rounded-2xl ${
                          isActive
                            ? "border-[#F5C99F] bg-neutral-900 text-[#F5C99F] ring-[3px] ring-[#F5C99F]/50"
                            : "border-[#E8D6C4] bg-[#FFF7EF] text-neutral-800 group-hover:border-[#D8A878] group-hover:bg-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />

                        {isActive && (
                          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#F5C99F]" />
                        )}
                      </motion.span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active skill label */}
            <div
              aria-live={isAutoPaused ? "polite" : "off"}
              className="mt-4 flex min-h-17 w-full max-w-65 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E8D6C4] bg-white/95 px-4 py-2.5 text-center shadow-sm"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSkill.id}
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, y: 5 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: -5 }
                  }
                  transition={{
                    duration: reduce ? 0 : 0.12,
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ActiveIcon className="h-4 w-4 shrink-0 text-[#B87A48]" />
                    <span className="text-sm font-bold text-neutral-900 sm:text-base">
                      {activeSkill.name}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-neutral-500">
                    {activeSkill.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            {...reveal(0.1)}
            className="w-full min-w-0"
          >
            <div className="relative overflow-hidden rounded-2xl border-[3px] border-neutral-900 bg-[#0D1117] shadow-xl sm:rounded-3xl sm:border-[6px]">
              {/* Terminal header */}
              <div className="relative z-20 flex min-w-0 items-center justify-between gap-2 border-b border-white/10 bg-[#161B22] px-3.5 py-3 sm:px-5 sm:py-3.5">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex shrink-0 gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>

                  <div className="ml-1 flex min-w-0 items-center gap-1.5 rounded-md border border-white/5 bg-black/40 px-2 py-1 font-mono text-[10px] text-gray-300 sm:ml-3 sm:px-3 sm:text-xs">
                    <Terminal className="h-3 w-3 shrink-0 text-[#F5C99F]" />

                    <span className="truncate">
                      {activeSkill.id}.enterprise.ts
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-[#F5C99F] sm:inline-flex">
                    {activeSkill.experience} Exp
                  </span>

                  <button
                    type="button"
                    onClick={copyCode}
                    aria-label={
                      copied ? "Code copied" : "Copy code"
                    }
                    className="flex min-h-10 touch-manipulation cursor-pointer items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C99F]"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}

                    <span className="hidden sm:inline">
                      {copied ? "Copied" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Terminal body */}
              <div className="relative min-h-75 min-w-0 overflow-hidden p-4 font-mono text-[11px] leading-relaxed text-gray-200 sm:min-h-85 sm:p-6 sm:text-xs">
                {/* Active technology icon */}
                <div className="pointer-events-none absolute right-3 top-3 z-10 sm:right-5 sm:top-5">
                  <div className="rounded-xl border border-white/10 bg-[#161B22] p-2 shadow-lg sm:rounded-2xl sm:p-2.5">
                    <ActiveIcon
                      className={`h-5 w-5 sm:h-7 sm:w-7 ${activeSkill.color}`}
                    />
                  </div>
                </div>

                {/* Animated code preview */}
                <div className="relative z-0 min-w-0 pr-8 sm:pr-10">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeSkill.id}
                      initial={
                        reduce
                          ? false
                          : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, y: -8 }
                      }
                      transition={{
                        duration: reduce ? 0 : 0.12,
                        ease: "easeOut",
                      }}
                    >
                      <pre className="max-w-full overflow-x-auto whitespace-pre font-mono text-[10px] font-medium tracking-wide sm:text-xs">
                        <code>{activeSkill.code}</code>
                      </pre>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Status footer */}
                <div className="relative z-10 mt-5 flex min-w-0 items-center justify-between gap-2 border-t border-white/10 pt-3 font-sans">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-[#F5C99F] bg-[#F5C99F]/30" />

                    <span className="truncate text-xs font-bold text-white sm:text-sm">
                      {activeSkill.name}
                    </span>

                    <span className="hidden truncate text-xs text-gray-400 sm:inline">
                      • {activeSkill.subtitle}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-green-400 sm:text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
