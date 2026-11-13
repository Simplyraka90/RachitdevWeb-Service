
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Laptop,
  Server,
  Globe,
  Smartphone,
  Search,
  Megaphone,
} from "lucide-react";

// Services Data Configuration
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

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate w-full min-w-0 scroll-mt-20 overflow-hidden bg-[#FFFBF7] px-4 py-20 sm:px-6 lg:px-8"
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
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 300C300 450 600 150 900 350C1200 550 1350 200 1440 300V900H0V300Z"
            fill="currentColor"
          />
        </svg>

        {/* Lightweight background glows */}
        <div
          className="absolute -left-32 top-10 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.2) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute -right-32 bottom-10 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
        {/* SECTION HEADER */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#F5C99F] px-5 py-2 text-xs font-bold tracking-wider text-neutral-900 shadow-sm">
            SERVICES
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            What I Can Do For You
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600 sm:text-lg">
            End-to-end digital solutions and web services
            from concept to deployment.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const dark = index === 0;

            return (
              <article
                key={service.title}
                className={`service-card group relative flex min-h-[310px] min-w-0 flex-col overflow-hidden rounded-3xl border p-6 transition-[border-color,box-shadow,transform] duration-300 sm:p-7 ${
                  dark
                    ? "border-black bg-[#111111] text-white shadow-lg"
                    : "border-[#E8D6C4] bg-[#FFF7EF]/90 hover:border-[#D8A878]"
                }`}
              >
                {/* SPOTLIGHT GLOW */}
                <div
                  aria-hidden="true"
                  className={`service-spotlight pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 ${
                    dark
                      ? "service-spotlight-dark"
                      : "service-spotlight-light"
                  }`}
                  style={
                    {
                      "--mouse-x": "50%",
                      "--mouse-y": "50%",
                    } as SpotlightStyle
                  }
                />

                {/* ICON BOX */}
                <div
                  className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl ${
                    dark
                      ? "bg-white/10"
                      : "bg-[#F5C99F]/30"
                  }`}
                >
                  <Icon
                    size={26}
                    className={
                      dark
                        ? "text-[#F5C99F]"
                        : "text-neutral-900"
                    }
                  />
                </div>

                {/* TITLE */}
                <h3 className="relative z-10 mt-5 text-xl font-extrabold leading-snug tracking-tight">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className={`relative z-10 mt-2.5 text-sm leading-relaxed ${
                    dark
                      ? "text-gray-300"
                      : "text-neutral-600"
                  }`}
                >
                  {service.description}
                </p>

                {/* CONTACT BUTTON */}
                <Link
                  href="/#contact"
                  aria-label={`Enquire about ${service.title}`}
                  className={`relative z-10 ml-auto mt-auto flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-full shadow-sm transition-[background-color,transform] duration-300 ${
                    dark
                      ? "bg-[#F5C99F] text-black hover:bg-white"
                      : "bg-black text-white hover:bg-neutral-800"
                  }`}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      {/* COMPONENT-SCOPED STYLES */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .service-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 14px 30px rgba(40, 25, 10, 0.09);
          }

          .service-card:hover .service-spotlight {
            opacity: 1;
          }

          .service-card:hover a svg {
            transform: rotate(45deg);
          }
        }

        .service-card a svg {
          transition: transform 300ms ease;
        }

        .service-spotlight-dark {
          background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(245, 201, 159, 0.15),
            transparent 80%
          );
        }

        .service-spotlight-light {
          background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(183, 120, 66, 0.12),
            transparent 80%
          );
        }

        @media (hover: none), (pointer: coarse) {
          .service-card {
            transform: none !important;
          }

          .service-spotlight {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-card a svg,
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
