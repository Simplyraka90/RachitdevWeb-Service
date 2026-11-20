
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
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

const PHONE = "918576971890";

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

  // NEW PROJECT 7 - AURA 3D CAFE
  {
    id: 7,
    name: "Aura 3D Café",
    category: "Interactive 3D Café Website",
    description:
      "An immersive café website featuring premium UI, interactive 3D visuals, smooth animations, responsive layouts and a modern menu experience.",
    tech: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "3D Animation",
    ],
    image: "/7.png",
    url: "https://auram3dcafee.vercel.app/",
    gradient: "from-[#3A241F] via-[#855A43] to-[#E8C5A4]",
    accent: "#F8DCC4",
  },

  // NEW PROJECT 8 - FURNIVERSE 3D
  {
    id: 8,
    name: "FurniVerse 3D",
    category: "3D Furniture E-Commerce",
    description:
      "A premium 3D furniture shopping experience featuring an animated sofa, interactive product customization, furniture collections, shopping cart, wishlist, reviews and a demo admin dashboard.",
    tech: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "Tailwind CSS",
    ],
    image: "/8.png",
    url: "https://furniversein.vercel.app/",
    gradient: "from-[#D9C8B5] via-[#F7F3ED] to-[#B8896A]",
    accent: "#694731",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

// PROJECT PREVIEW
function ProjectPreview({
  project,
  reduceMotion,
}: {
  project: Project;
  reduceMotion: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`relative aspect-16/10 min-w-0 overflow-hidden rounded-[20px] bg-linear-to-br ${project.gradient}`}
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-12 top-1/4 h-48 w-48 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-white/10" />

      {/* Browser preview frame */}
      <motion.div
        whileHover={
          reduceMotion ? undefined : { y: -4 }
        }
        transition={{
          duration: 0.25,
          ease,
        }}
        className="absolute inset-x-4 bottom-0 top-6 overflow-hidden rounded-t-xl border border-white/30 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:inset-x-7 sm:top-9"
      >
        {/* Browser top bar */}
        <div className="flex h-8 items-center gap-1.5 border-b border-black/10 bg-[#F7F7F7] px-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF6B6B]" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#FFC75F]" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#5FCB80]" />

          <div className="mx-auto max-w-[55%] truncate rounded-md bg-white px-3 py-1 text-[9px] text-neutral-500">
            {project.name
              .toLowerCase()
              .replaceAll(" ", "-")}
          </div>
        </div>

        {/* Screenshot or fallback */}
        <div className="relative h-[calc(100%-32px)] w-full overflow-hidden">
          {project.image && !imageFailed ? (
            <Image
              src={project.image}
              alt={`${project.name} website preview`}
              fill
              sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 30vw"
              loading="lazy"
              onError={() => setImageFailed(true)}
              className={`object-cover object-top ${
                reduceMotion
                  ? ""
                  : "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
              }`}
            />
          ) : (
            <div
              className={`flex h-full flex-col justify-center bg-linear-to-br ${project.gradient} px-5 sm:px-7`}
            >
              <span className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-700">
                {project.category}
              </span>

              <h4 className="max-w-[90%] text-xl font-black tracking-tight text-[#171717] sm:text-3xl">
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
      </motion.div>

      {/* Arrow icon */}
      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm transition-transform duration-300 motion-safe:group-hover:rotate-45">
        <ArrowUpRight size={17} />
      </div>
    </div>
  );
}

// PROJECT CARD
function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean;
}) {
  const message = encodeURIComponent(
    `Hi Rachit, I want a website similar to ${project.name}. Please share the details.`
  );

  return (
    <motion.article
      layout={!reduceMotion}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 24 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion
          ? 0
          : (index % 3) * 0.07,
        ease,
        layout: {
          duration: 0.3,
          ease,
        },
      }}
      className="group flex h-full min-w-0 flex-col rounded-[28px] border border-[#EBD8C7] bg-[#FFF8F1] p-3.5 shadow-[0_8px_30px_rgba(79,47,23,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#E7B68C] hover:shadow-[0_18px_45px_rgba(79,47,23,0.08)] sm:p-4"
    >
      <ProjectPreview
        project={project}
        reduceMotion={reduceMotion}
      />

      {/* Project content */}
      <div className="flex min-w-0 flex-1 flex-col px-1 pb-1 pt-5 sm:px-2">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#A47C5C]">
            WORK / {String(project.id).padStart(2, "0")}
          </span>

          <span className="rounded-full bg-[#F7DFC9] px-3 py-1 text-[10px] font-bold text-[#6B4227]">
            {project.category}
          </span>
        </div>

        <h3 className="text-[22px] font-black leading-tight tracking-tight text-[#171717] sm:text-[26px]">
          {project.name}
        </h3>

        <p className="mt-3 text-xs leading-6 text-[#66615D] sm:text-sm">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#E8D4C3] bg-[#FFFBF7] px-2.5 py-1 text-[11px] font-semibold text-[#50443B]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-auto grid grid-cols-1 gap-2 pt-6 min-[400px]:grid-cols-2">
          {/* Live preview */}
          {project.url ? (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={
                reduceMotion
                  ? undefined
                  : { scale: 1.025 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.98 }
              }
              className="flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#171717] px-3 text-center text-xs font-bold text-white transition-colors hover:bg-[#35302D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717] sm:text-sm"
            >
              Live Preview
              <ExternalLink size={14} />
            </motion.a>
          ) : (
            <span className="flex min-h-11 items-center justify-center rounded-xl border border-[#E5D5C8] bg-[#F2E8DE] px-3 text-xs font-semibold text-[#8A7869]">
              Coming Soon
            </span>
          )}

          {/* WhatsApp enquiry */}
          <motion.a
            href={`https://wa.me/${PHONE}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={
              reduceMotion
                ? undefined
                : { scale: 1.025 }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.98 }
            }
            className="flex min-h-11 touch-manipulation items-center justify-center gap-1.5 rounded-xl border border-[#171717] px-2 text-center text-xs font-bold text-[#171717] transition-colors hover:bg-[#F5C99F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717] sm:text-sm"
          >
            Similar Site
            <ArrowUpRight size={14} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

// MAIN PROJECTS SECTION
export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const reducedMotion = useReducedMotion();
  const reduceMotion = Boolean(reducedMotion);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative w-full min-w-0 scroll-mt-28 overflow-hidden bg-[#FFFBF7] pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#F5C99F]/5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-[#F5C99F]/5"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 12 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease,
            }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F5C99F] px-4 py-2 text-xs font-bold text-[#171717] shadow-sm">
              <Sparkles size={14} />
              OUR WORK
            </span>
          </motion.div>

          <motion.h2
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
            className="text-3xl font-black tracking-tight text-[#171717] sm:text-4xl lg:text-5xl"
          >
            Our{" "}
            <span className="relative inline-block">
              Work
              <span className="absolute -bottom-1.5 -z-10 left-0 h-2 w-full rounded-full bg-[#F5C99F]/70" />
            </span>
          </motion.h2>

          <motion.p
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 14 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.15,
              ease,
            }}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#69635F] sm:text-base"
          >
            Explore the websites we&apos;ve built for
            different businesses, combining creative design,
            modern technology and seamless user experiences.
          </motion.p>
        </div>

        {/* Projects grid */}
        <motion.div
          id="projects-grid"
          layout={!reduceMotion}
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout={!reduceMotion}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 20 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: -12,
                        scale: 0.98,
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: reduceMotion
                    ? 0
                    : index >= 3
                      ? (index - 3) * 0.06
                      : 0,
                  ease,
                  layout: {
                    duration: 0.3,
                    ease,
                  },
                }}
                className="min-w-0"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore More / Show Less */}
        <div className="mt-12 flex justify-center">
          <motion.button
            type="button"
            onClick={() =>
              setShowAll((prev) => !prev)
            }
            aria-expanded={showAll}
            aria-controls="projects-grid"
            whileHover={
              reduceMotion
                ? undefined
                : { y: -2, scale: 1.02 }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.97 }
            }
            transition={{
              duration: 0.2,
            }}
            className="group inline-flex min-h-12 touch-manipulation cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#171717] bg-[#171717] px-7 py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#F5C99F] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717] sm:text-sm"
          >
            {showAll ? (
              <>
                Show Less Work
                <ChevronUp size={17} />
              </>
            ) : (
              <>
                Explore More Work
                <ChevronDown size={17} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
