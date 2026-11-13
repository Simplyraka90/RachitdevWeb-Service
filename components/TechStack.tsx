
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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

const AUTO_CHANGE_MS = 4000;

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const activeSkill = tech[activeTab];
  const ActiveIcon = activeSkill.icon;

  // Only run auto-switching when section is visible.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Respect reduced-motion preferences.
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (media.matches) return;

    if (!isVisible || isAutoPaused) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;

      setActiveTab((previous) => (previous + 1) % tech.length);
    }, AUTO_CHANGE_MS);

    return () => window.clearInterval(timer);
  }, [isVisible, isAutoPaused]);

  // Clear copy feedback timer.
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

      await navigator.clipboard.writeText(activeSkill.code);
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

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative isolate w-full min-w-0 scroll-mt-20 overflow-hidden bg-[#FFFBF7] px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      {/* BACKGROUND WAVES */}
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

        {/* Lightweight radial glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[600px] sm:w-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl min-w-0">
        {/* HEADING */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="inline-flex rounded-full bg-[#F5C99F] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
            Digital Expertise &amp; Stack
          </span>

          <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Interactive Core Engine
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Explore the technologies and skills behind our
            modern, responsive web experiences.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT ORBIT */}
          <div className="flex w-full min-w-0 flex-col items-center justify-center">
            {/* Responsive orbit without ResizeObserver */}
            <div className="relative flex aspect-square w-full max-w-[464px] items-center justify-center">
              {/* OUTER CIRCLE */}
              <div className="relative flex aspect-square w-[70%] max-w-[400px] items-center justify-center rounded-full border-2 border-dashed border-[#D9C3B0] bg-white/20 sm:w-[76%] lg:w-[82%]">
                {/* INNER RING */}
                <div className="pointer-events-none absolute inset-[22%] rounded-full border border-[#E8D6C4]" />

                {/* CORE */}
                <div className="relative z-10 flex size-18 flex-col items-center justify-center rounded-full border-[3px] border-[#F5C99F]/60 bg-neutral-900 text-white shadow-xl sm:size-22 lg:size-26">
                  <Cpu className="size-6 text-[#F5C99F] sm:size-7" />

                  <span className="mt-1 font-mono text-[9px] font-bold tracking-widest text-[#F5C99F]">
                    CORE
                  </span>
                </div>

                {/* ORBIT ICONS */}
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
                      className={`group absolute flex size-9 touch-manipulation items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87A48] min-[400px]:size-10 sm:size-11 lg:size-12 ${
                        isActive ? "z-30" : "z-20"
                      }`}
                    >
                      <span
                        className={`relative flex size-full items-center justify-center rounded-xl border shadow-sm transition-colors duration-200 sm:rounded-2xl ${
                          isActive
                            ? "border-[#F5C99F] bg-neutral-900 text-[#F5C99F] ring-[3px] ring-[#F5C99F]/50"
                            : "border-[#E8D6C4] bg-[#FFF7EF] text-neutral-800 group-hover:border-[#D8A878] group-hover:bg-white"
                        }`}
                      >
                        <Icon className="size-4 sm:size-5" />

                        {isActive && (
                          <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-[#F5C99F]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE SKILL LABEL */}
            <div className="mt-4 flex min-h-[64px] w-full max-w-[260px] flex-col items-center justify-center rounded-2xl border border-[#E8D6C4] bg-white/95 px-4 py-2.5 text-center shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <ActiveIcon className="size-4 shrink-0 text-[#B87A48]" />

                <span className="text-sm font-bold text-neutral-900 sm:text-base">
                  {activeSkill.name}
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-neutral-500">
                {activeSkill.subtitle}
              </p>
            </div>
          </div>

          {/* RIGHT TERMINAL */}
          <div className="w-full min-w-0">
            <div className="relative overflow-hidden rounded-2xl border-[3px] border-neutral-900 bg-[#0D1117] shadow-xl sm:rounded-3xl sm:border-[6px]">
              {/* TERMINAL HEADER */}
              <div className="relative z-20 flex min-w-0 items-center justify-between gap-2 border-b border-white/10 bg-[#161B22] px-3.5 py-3 sm:px-5 sm:py-3.5">
                <div className="flex min-w-0 items-center gap-2">
                  {/* WINDOW CONTROLS */}
                  <div className="flex shrink-0 gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500" />
                    <span className="size-2.5 rounded-full bg-yellow-500" />
                    <span className="size-2.5 rounded-full bg-green-500" />
                  </div>

                  {/* FILE NAME */}
                  <div className="ml-1 flex min-w-0 items-center gap-1.5 rounded-md border border-white/5 bg-black/40 px-2 py-1 font-mono text-[10px] text-gray-300 sm:ml-3 sm:px-3 sm:text-xs">
                    <Terminal className="size-3 shrink-0 text-[#F5C99F]" />

                    <span className="truncate">
                      {activeSkill.id}.enterprise.ts
                    </span>
                  </div>
                </div>

                {/* EXPERIENCE & COPY */}
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
                    className="flex min-h-10 touch-manipulation cursor-pointer items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copied ? (
                      <CheckCircle2 className="size-3.5 text-green-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}

                    <span className="hidden sm:inline">
                      {copied ? "Copied" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>

              {/* TERMINAL BODY */}
              <div className="relative min-h-[260px] min-w-0 overflow-hidden p-4 font-mono text-[11px] leading-relaxed text-gray-200 sm:min-h-[300px] sm:p-6 sm:text-xs">
                {/* ACTIVE TECHNOLOGY ICON */}
                <div className="pointer-events-none absolute right-3 top-3 z-10 sm:right-5 sm:top-5">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2 shadow-lg sm:rounded-2xl sm:p-2.5">
                    <ActiveIcon
                      className={`size-5 sm:size-7 ${activeSkill.color}`}
                    />
                  </div>
                </div>

                {/* CODE PREVIEW */}
                <div className="relative z-0 min-w-0 pr-8 sm:pr-10">
                  <pre className="max-w-full overflow-x-auto whitespace-pre font-mono text-[10px] font-medium tracking-wide sm:text-xs">
                    <code>{activeSkill.code}</code>
                  </pre>
                </div>

                {/* STATUS FOOTER */}
                <div className="relative z-10 mt-5 flex min-w-0 items-center justify-between gap-2 border-t border-white/10 pt-3 font-sans">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full border border-[#F5C99F] bg-[#F5C99F]/30" />

                    <span className="truncate text-xs font-bold text-white sm:text-sm">
                      {activeSkill.name}
                    </span>

                    <span className="hidden truncate text-xs text-gray-400 sm:inline">
                      • {activeSkill.subtitle}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-green-400 sm:text-[11px]">
                    <span className="size-2 rounded-full bg-green-400" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
