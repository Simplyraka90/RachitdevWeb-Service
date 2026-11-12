
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
} from "lucide-react";

type Project = {
  id: number;
  name: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  url: string;
  gradient: string;
  accent: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "InfoEcom",
    category: "E-Commerce Website",
    description:
      "A modern shopping platform featuring product listings, cart functionality and a smooth user experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/1.png",
    url: "https://infoecom.vercel.app",
    gradient: "from-[#DCE8FF] via-[#F8FAFF] to-[#BED3FF]",
    accent: "#3156A8",
  },
  {
    id: 2,
    name: "The Cherry Cafe",
    category: "Cafe & Restaurant",
    description:
      "A stylish cafe website designed to showcase food, ambience, menu and customer experiences.",
    tech: ["Next.js", "Responsive", "UI Design"],
    image: "/2.png",
    url: "https://the-cherry-cafe.vercel.app/",
    gradient: "from-[#432B2B] via-[#74463D] to-[#C58C74]",
    accent: "#FFE1C6",
  },
  {
    id: 3,
    name: "Ryaw Travel",
    category: "Travel Website",
    description:
      "An immersive travel website with interactive destination showcases and a beautiful 3D slider.",
    tech: ["React", "Tailwind CSS", "3D Slider"],
    image: "/3.png",
    url: "https://ryawtravelwebcom.netlify.app",
    gradient: "from-[#07516C] via-[#138AA8] to-[#9DDDD7]",
    accent: "#E3FFFF",
  },
  {
    id: 4,
    name: "Sky View Hotel",
    category: "Hotel & Booking",
    description:
      "A premium hospitality website showcasing luxury rooms, dining experiences, gallery and booking features.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/4.png",
    url: "https://skyviecoin.netlify.app/",
    gradient: "from-[#3B302B] via-[#7C604B] to-[#C9AC86]",
    accent: "#FFE4C5",
  },
  {
    id: 5,
    name: "Radha Properties",
    category: "Real Estate Website",
    description:
      "A modern real estate website for presenting property listings, featured spaces and customer enquiries.",
    tech: ["Responsive", "Web Design", "UI/UX"],
    image: "/5.png",
    url: "https://radhepropeties.vercel.app/",
    gradient: "from-[#173B34] via-[#376F61] to-[#A7C8AD]",
    accent: "#D8F4E5",
  },
  {
    id: 6,
    name: "LiteKrone",
    category: "Product Website",
    description:
      "A clean business and product showcase with structured content, responsive layouts and engaging visuals.",
    tech: ["React", "Responsive", "UI Design"],
    image: "/6.png",
    url: "https://litekrone.netlify.app",
    gradient: "from-[#24334A] via-[#4B6D89] to-[#A9C6DA]",
    accent: "#E7F5FF",
  },
];

function ProjectPreview({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-[20px] bg-gradient-to-br ${project.gradient}`}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-12 top-1/4 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-white/20 blur-2xl" />

      {/* Browser window preview */}
      <div className="absolute inset-x-5 bottom-0 top-7 overflow-hidden rounded-t-xl border border-white/30 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:-translate-y-2 sm:inset-x-7 sm:top-9">
        <div className="flex h-8 items-center gap-1.5 border-b border-black/10 bg-[#F7F7F7] px-3">
          <span className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
          <span className="h-2 w-2 rounded-full bg-[#FFC75F]" />
          <span className="h-2 w-2 rounded-full bg-[#5FCB80]" />

          <div className="mx-auto max-w-[55%] truncate rounded-md bg-white px-3 py-1 text-[9px] text-neutral-500">
            {project.name.toLowerCase().replaceAll(" ", "-")}
          </div>
        </div>

        {!imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.name} website preview`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-[calc(100%-32px)] w-full object-cover object-top"
          />
        ) : (
          <div
            className={`flex h-[calc(100%-32px)] flex-col justify-center bg-gradient-to-br ${project.gradient} px-5 sm:px-7`}
          >
            <span className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-700">
              {project.category}
            </span>

            <h4 className="max-w-[90%] text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
              {project.name}
            </h4>

            <div className="mt-4 h-2 w-28 rounded-full bg-black/15" />
            <div className="mt-2 h-2 w-20 rounded-full bg-black/10" />

            <div className="mt-5 w-fit rounded-full bg-[#171717] px-4 py-2 text-[10px] font-semibold text-white">
              Explore Project ↗
            </div>
          </div>
        )}
      </div>

      {/* Preview corner */}
      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={17} />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const message = encodeURIComponent(
    `Hi, I want a website similar to ${project.name}. Please share the details.`
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group flex h-full flex-col rounded-[28px] border border-[#EBD8C7] bg-[#FFF8F1] p-3.5 shadow-[0_8px_30px_rgba(79,47,23,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#E7B68C] hover:shadow-[0_18px_50px_rgba(79,47,23,0.09)] sm:p-4"
    >
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col px-1 pb-1 pt-6 sm:px-2">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#A47C5C]">
            WORK / {String(project.id).padStart(2, "0")}
          </span>

          <span className="rounded-full bg-[#F7DFC9] px-3 py-1.5 text-[10px] font-bold text-[#6B4227]">
            {project.category}
          </span>
        </div>

        <h3 className="text-[25px] font-black tracking-tight text-[#171717] sm:text-[28px]">
          {project.name}
        </h3>

        <p className="mt-3 min-h-[72px] text-sm leading-7 text-[#66615D]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#E8D4C3] bg-[#FFFBF7] px-3 py-1.5 text-[11px] font-semibold text-[#50443B]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-7">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#171717] px-3 text-center text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#35302D] sm:text-sm"
            >
              Live Preview
              <ExternalLink size={15} />
            </a>
          ) : (
            <span className="flex min-h-12 items-center justify-center rounded-xl border border-[#E5D5C8] bg-[#F2E8DE] px-3 text-center text-xs font-semibold text-[#8A7869]">
              Preview Coming Soon
            </span>
          )}

          <a
            href={`https://wa.me/918576971890?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#171717] px-2 text-center text-xs font-bold text-[#171717] transition-all duration-300 hover:bg-[#F5C99F] sm:text-sm"
          >
            Get a Similar Website
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#FFFBF7] pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#F5C99F]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#F5C99F]/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F5C99F] px-5 py-2 text-xs font-bold text-[#171717]">
            <Sparkles size={14} />
            OUR WORK
          </span>

          <h2 className="text-4xl font-black tracking-tight text-[#171717] sm:text-5xl lg:text-[56px]">
            Our{" "}
            <span className="relative inline-block">
              Work
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-[#F5C99F]/70" />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#69635F] sm:text-lg">
            Explore the websites we&apos;ve built for different businesses,
            combining creative design, modern technology and seamless
            user experiences.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More / Show Less */}
        <div className="mt-12 flex justify-center">
          <motion.button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-[#171717] bg-[#171717] px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-[#F5C99F] hover:text-[#171717]"
          >
            {showAll ? (
              <>
                Show Less Work
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Explore More Work
                <ChevronDown size={18} />
              </>
            )}
          </motion.button>
        </div>

        {/* Bottom CTA */}
       
      </div>
    </section>
  );
}
