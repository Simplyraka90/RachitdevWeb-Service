
"use client";

import Link from "next/link";
import { useRef } from "react";
import type { CSSProperties, MouseEvent } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Laptop,
  Server,
  Globe,
  Smartphone,
  Search,
  Megaphone,
} from "lucide-react";

const services = [
  {
    icon: Laptop,
    title: "Web Development",
    description:
      "High-performance, scalable websites tailored to establish your brand presence online.",
  },
  {
    icon: Server,
    title: "Frontend & Backend",
    description:
      "Robust full-stack architecture with secure APIs, databases, and modern UI stacks.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Custom web apps built with Next.js and React for high speed and seamless user interactions.",
  },
  {
    icon: Smartphone,
    title: "App Development & Software",
    description:
      "End-to-end software solutions and cross-platform digital products built for scale.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Data-driven search engine optimization to boost your organic traffic and visibility.",
  },
  {
    icon: Megaphone,
    title: "Digital Ads & Marketing",
    description:
      "Targeted campaigns and conversion-focused ads to drive high ROI and customer acquisition.",
  },
];

type SpotlightStyle = CSSProperties & {
  "--mouse-x"?: string;
  "--mouse-y"?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease,
    },
  },
};

function ServiceCard({
  service,
  index,
  reduceMotion,
}: {
  service: (typeof services)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const Icon = service.icon;
  const dark = index === 0;

  const handleMouseMove = (
    event: MouseEvent<HTMLElement>
  ) => {
    if (
      reduceMotion ||
      !window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches
    ) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={reduceMotion ? undefined : cardVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{
        once: true,
        amount: 0.12,
        margin: "0px 0px -30px 0px",
      }}
      onMouseMove={handleMouseMove}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as SpotlightStyle
      }
      className={`service-card group relative flex min-h-70 min-w-0 flex-col overflow-hidden rounded-3xl border p-5 sm:min-h-77.5 sm:p-6 lg:p-7 ${
        dark
          ? "border-neutral-900 bg-[#111111] text-white shadow-lg"
          : "border-[#E8D6C4] bg-[#FFF7EF]/95 text-neutral-900"
      }`}
    >
      {/* Cursor Spotlight */}
      <div
        aria-hidden="true"
        className={`service-spotlight pointer-events-none absolute inset-0 opacity-0 ${
          dark
            ? "service-spotlight-dark"
            : "service-spotlight-light"
        }`}
      />

      {/* Decorative corner glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${
          dark
            ? "bg-[#F5C99F]/5"
            : "bg-[#F5C99F]/15"
        }`}
      />

      {/* Icon */}
      <div
        className={`service-icon relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
          dark
            ? "bg-white/10"
            : "bg-[#F5C99F]/30"
        }`}
      >
        <Icon
          size={26}
          strokeWidth={1.8}
          className={
            dark
              ? "text-[#F5C99F]"
              : "text-neutral-900"
          }
        />
      </div>

      {/* Title */}
      <h3 className="relative z-10 mt-6 text-lg font-extrabold leading-snug tracking-tight sm:text-xl">
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={`relative z-10 mt-3 max-w-sm text-sm leading-7 ${
          dark
            ? "text-neutral-300"
            : "text-neutral-600"
        }`}
      >
        {service.description}
      </p>

      {/* Bottom Action */}
      <div className="relative z-10 mt-auto flex items-end justify-end pt-7">
        <Link
          href="/#contact"
          aria-label={`Enquire about ${service.title}`}
          className={`service-arrow flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${
            dark
              ? "bg-[#F5C99F] text-black hover:bg-white"
              : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          <ArrowUpRight
            size={19}
            strokeWidth={2}
            className="service-arrow-icon"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(reduceMotion);

  return (
    <section
      id="services"
      className="relative isolate w-full min-w-0 scroll-mt-28 overflow-hidden bg-[#FFFBF7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* BACKGROUND DECORATIVE WAVES */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          className="absolute left-0 top-1/2 h-full w-full -translate-y-1/2 text-[#F5E5D5] opacity-40"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 300C300 450 600 150 900 350C1200 550 1350 200 1440 300V900H0V300Z"
            fill="currentColor"
          />
        </svg>

        <div
          className="absolute -left-32 top-10 h-72 w-72 rounded-full sm:h-96 sm:w-96"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.2) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute -right-32 bottom-10 h-72 w-72 rounded-full sm:h-96 sm:w-96"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
        {/* SECTION HEADER */}
        <div className="mb-10 text-center sm:mb-14">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 12 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.45,
              ease,
            }}
          >
            <span className="inline-flex items-center justify-center rounded-full bg-[#F5C99F] px-5 py-2 text-xs font-bold tracking-wider text-neutral-900 shadow-sm">
              SERVICES
            </span>
          </motion.div>

          <motion.h2
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease,
            }}
            className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-neutral-900"
          >
            What I Can Do For You
          </motion.h2>

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 14 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.15,
              ease,
            }}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base lg:text-lg"
          >
            End-to-end digital solutions and web services
            from concept to deployment.
          </motion.p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              reduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>

      {/* COMPONENT SCOPED STYLES */}
      <style>{`
        .service-card {
          transition:
            border-color 250ms ease,
            box-shadow 250ms ease;
        }

        .service-icon {
          transition:
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 300ms ease;
        }

        .service-arrow {
          transition:
            transform 250ms ease,
            background-color 250ms ease;
        }

        .service-arrow-icon {
          transition:
            transform 250ms ease;
        }

        .service-spotlight {
          transition: opacity 250ms ease;
        }

        .service-spotlight-dark {
          background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(245, 201, 159, 0.16),
            transparent 75%
          );
        }

        .service-spotlight-light {
          background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(183, 120, 66, 0.13),
            transparent 75%
          );
        }

        @media (hover: hover) and (pointer: fine) {
          .service-card:hover {
            border-color: #d8a878;
            box-shadow: 0 16px 35px rgba(40, 25, 10, 0.10);
          }

          .service-card:hover .service-spotlight {
            opacity: 1;
          }

          .service-card:hover .service-icon {
            transform: translateY(-3px) rotate(-5deg);
          }

          .service-card:hover .service-arrow {
            transform: scale(1.07);
          }

          .service-card:hover .service-arrow-icon {
            transform: translate(2px, -2px);
          }
        }

        @media (hover: none), (pointer: coarse) {
          .service-spotlight {
            display: none;
          }

          .service-icon,
          .service-arrow,
          .service-arrow-icon {
            transition-duration: 150ms;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-icon,
          .service-arrow,
          .service-arrow-icon,
          .service-spotlight {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
