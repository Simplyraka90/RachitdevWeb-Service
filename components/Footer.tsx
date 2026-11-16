
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  Heart,
  ArrowUpRight,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const PHONE = "918576971890";
const EMAIL = "rachitrathour98@gmail.com";

const ANIMATION_DURATION = 0.5;
const ease = [0.22, 1, 0.36, 1] as const;

const whatsappMessage = encodeURIComponent(
  "Hi Rachit, I visited Rachit Dev Web Service and would like to discuss a website project."
);

const quickLinks = [
  { name: "Home", href: "/#home" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/#projects" },
  { name: "Tech Stack", href: "/#tech-stack" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const services = [
  { name: "Website Development", href: "/#services" },
  { name: "React / Next.js Apps", href: "/#services" },
  { name: "UI/UX Design", href: "/#services" },
  { name: "E-Commerce Websites", href: "/#services" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
  },
  {
    name: "Twitter / X",
    href: "https://x.com/",
    icon: Twitter,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const reducedMotion = useReducedMotion();
  const reduce = Boolean(reducedMotion);
  const duration = reduce ? 0 : ANIMATION_DURATION;

  const reveal = (delay = 0, y = 20) => ({
    initial: reduce
      ? false
      : { opacity: 0, y },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.1,
    },
    transition: {
      duration,
      delay: reduce ? 0 : delay,
      ease,
    },
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "instant" : "smooth",
    });
  };

  const whatsappUrl = `https://wa.me/${PHONE}?text=${whatsappMessage}`;

  return (
    <footer className="relative w-full min-w-0 overflow-hidden bg-[#111111] text-white">
      {/* BACKGROUND DECORATIONS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-80 w-80 rounded-full bg-[#F5C99F]/5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#F5C99F]/5"
      />

      {/* TOP CTA SECTION */}
      <div className="relative border-b border-white/10 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* CTA CONTENT */}
          <div className="min-w-0 max-w-2xl">
            <motion.div
              {...reveal(0.02, 12)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F5C99F]/20 bg-[#F5C99F]/10 px-4 py-2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>

              <span className="text-xs font-semibold text-[#F5C99F]">
                Available for New Projects
              </span>
            </motion.div>

            <motion.h2
              {...reveal(0.07, 18)}
              className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Have a project in mind?

              <span className="mt-2 block text-[#F5C99F]">
                Let&apos;s build it together.
              </span>
            </motion.h2>

            <motion.p
              {...reveal(0.12, 16)}
              className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-base"
            >
              From ideas to fully functional websites, I help
              businesses build modern, fast, responsive and
              user-friendly digital experiences.
            </motion.p>
          </div>

          {/* CTA BUTTONS */}
          <motion.div
            {...reveal(0.16, 18)}
            className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row"
          >
            <motion.div
              whileHover={
                reduce ? undefined : { y: -3, scale: 1.02 }
              }
              whileTap={
                reduce ? undefined : { scale: 0.97 }
              }
              transition={{
                duration: reduce ? 0 : 0.2,
              }}
            >
              <Link
                href="/#contact"
                className="group inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#F5C99F] px-6 py-4 text-sm font-bold text-black shadow-sm transition-colors hover:bg-[#F8D8B8]"
              >
                <span>Start Your Project</span>

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={
                reduce ? undefined : { y: -3, scale: 1.02 }
              }
              whileTap={
                reduce ? undefined : { scale: 0.97 }
              }
              transition={{
                duration: reduce ? 0 : 0.2,
              }}
              className="inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white transition-colors hover:border-[#F5C99F] hover:text-[#F5C99F]"
            >
              <MessageCircle size={19} />
              <span>WhatsApp Us</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative px-4 pb-12 pt-12 sm:px-6 md:pt-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* BRAND SECTION */}
          <motion.div
            {...reveal(0.02)}
            className="min-w-0 sm:col-span-2 lg:col-span-1"
          >
            <Link
              href="/#home"
              className="group inline-flex max-w-full items-center gap-3"
              aria-label="Rachit Dev Web Service Home"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#FFFAF5] p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/weblog.png"
                  alt="Rachit Dev Web Service Logo"
                  width={52}
                  height={52}
                  sizes="56px"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <strong className="block text-xl font-extrabold tracking-tight">
                  Rachix Studio
                </strong>

                <span className="text-xs font-medium tracking-[0.16em] text-neutral-400">
                  WEB SERVICE
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-400">
              Crafting modern websites and digital experiences
              with clean design, powerful technology and a focus
              on performance.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.07,
                          }
                    }
                    whileTap={
                      reduce
                        ? undefined
                        : { scale: 0.94 }
                    }
                    transition={{
                      duration: reduce ? 0 : 0.2,
                    }}
                    className="group flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:border-[#F5C99F] hover:bg-[#F5C99F] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C99F]"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            {...reveal(0.07)}
            className="min-w-0"
          >
            <h3 className="text-base font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-3 h-0.5 w-9 rounded-full bg-[#F5C99F]" />

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex min-h-7 items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-[#F5C99F]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#F5C99F] opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div
            {...reveal(0.12)}
            className="min-w-0"
          >
            <h3 className="text-base font-bold text-white">
              Our Services
            </h3>

            <div className="mt-3 h-0.5 w-9 rounded-full bg-[#F5C99F]" />

            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group inline-flex min-h-7 items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-[#F5C99F]"
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-[#F5C99F] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT INFORMATION */}
          <motion.div
            {...reveal(0.17)}
            className="min-w-0"
          >
            <h3 className="text-base font-bold text-white">
              Get In Touch
            </h3>

            <div className="mt-3 h-0.5 w-9 rounded-full bg-[#F5C99F]" />

            <p className="mt-5 text-sm leading-relaxed text-neutral-400">
              Have a question or need a website? Feel free to
              reach out anytime.
            </p>

            {/* EMAIL */}
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-4 flex min-w-0 items-start gap-3 text-sm text-neutral-300 transition-colors hover:text-[#F5C99F]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F5C99F] transition-colors group-hover:bg-[#F5C99F]/10">
                <Mail size={17} />
              </span>

              <span className="min-w-0 break-all pt-2.5">
                {EMAIL}
              </span>
            </a>

            {/* PHONE */}
            <a
              href={`tel:+${PHONE}`}
              className="group mt-3.5 flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-[#F5C99F]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F5C99F] transition-colors group-hover:bg-[#F5C99F]/10">
                <Phone size={17} />
              </span>

              <span>+91 85769 71890</span>
            </a>

            {/* WHATSAPP */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3.5 flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-[#F5C99F]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F5C99F] transition-colors group-hover:bg-[#F5C99F]/10">
                <MessageCircle size={17} />
              </span>

              <span className="inline-flex items-center gap-1.5">
                <span>Chat on WhatsApp</span>
                <ExternalLink size={13} />
              </span>
            </a>

            {/* LOCATION */}
            <div className="mt-3.5 flex items-center gap-3 text-sm text-neutral-400">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F5C99F]">
                <MapPin size={17} />
              </span>

              <span>Noida, Uttar Pradesh, India</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          {...reveal(0.05, 12)}
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left"
        >
          <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-white">
              Rachix Studio Web Service.
            </span>{" "}
            All Rights Reserved.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-neutral-400 sm:text-sm">
            <span>Designed &amp; Developed with</span>

            <Heart
              size={15}
              className="fill-[#F5C99F] text-[#F5C99F]"
            />

            <span>using Next.js &amp; Tailwind CSS</span>
          </p>

          {/* BACK TO TOP */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            whileHover={
              reduce
                ? undefined
                : { y: -3, scale: 1.06 }
            }
            whileTap={
              reduce
                ? undefined
                : { scale: 0.94 }
            }
            transition={{
              duration: reduce ? 0 : 0.2,
            }}
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl border border-[#F5C99F]/30 bg-[#F5C99F]/10 text-[#F5C99F] shadow-sm transition-colors hover:bg-[#F5C99F] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C99F]"
          >
            <ArrowUp size={18} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
