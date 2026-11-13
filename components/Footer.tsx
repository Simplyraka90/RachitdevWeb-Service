"use client";

import Image from "next/image";
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

const whatsappMessage = encodeURIComponent(
  "Hi Rachit, I visited Rachit Dev Web Service and would like to discuss a website project."
);

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const services = [
  { name: "Website Development", href: "#services" },
  { name: "React / Next.js Apps", href: "#services" },
  { name: "UI/UX Design", href: "#services" },
  { name: "E-Commerce Websites", href: "#services" },
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#111111] text-white">
      {/* Background Glow (GPU Optimized) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-80 w-80 rounded-full bg-[#F5C99F]/10 blur-3xl transform-gpu"
      />

      {/* TOP CTA SECTION */}
      <div className="border-b border-white/10 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F5C99F]/20 bg-[#F5C99F]/10 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <span className="text-xs font-semibold text-[#F5C99F]">
                Available for New Projects
              </span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Have a project in mind?
              <span className="mt-2 block text-[#F5C99F]">
                Let&apos;s build it together.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-base">
              From ideas to fully functional websites, I help businesses build modern, fast, responsive and user-friendly digital experiences.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="#contact"
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F5C99F] px-6 py-4 text-sm font-bold text-black transition-all duration-200 hover:bg-[#F8D8B8] touch-manipulation shadow-sm"
            >
              <span>Start Your Project</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={`https://wa.me/${PHONE}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white transition-all duration-200 hover:border-[#F5C99F] hover:text-[#F5C99F] touch-manipulation"
            >
              <MessageCircle size={19} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="px-4 pb-12 pt-12 sm:px-6 md:pt-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* BRAND SECTION */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              className="inline-flex items-center gap-3"
              aria-label="Rachit Dev Web Service Home"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#FFFAF5] p-1.5 shadow-2xs">
                <Image
                  src="/weblog.png"
                  alt="Rachit Dev Web Service Logo"
                  width={52}
                  height={52}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <strong className="block text-xl font-extrabold tracking-tight">
                  Rachix Studio
                </strong>
                <span className="text-xs font-medium tracking-[0.16em] text-neutral-400">
                  WEB SERVICE
                </span>
              </div>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-400">
              Crafting modern websites and digital experiences with clean design, powerful technology and a focus on performance.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition-all duration-200 hover:border-[#F5C99F] hover:bg-[#F5C99F] hover:text-black touch-manipulation"
                  >
                    <Icon
                      size={18}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-base font-bold text-white">
              Quick Links
            </h3>
            <div className="mt-3 h-0.5 w-9 rounded-full bg-[#F5C99F]" />

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-[#F5C99F]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#F5C99F] opacity-0 transition-opacity group-hover:opacity-100" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-base font-bold text-white">
              Our Services
            </h3>
            <div className="mt-3 h-0.5 w-9 rounded-full bg-[#F5C99F]" />

            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-[#F5C99F]"
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-[#F5C99F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFORMATION */}
          <div>
            <h3 className="text-base font-bold text-white">
              Get In Touch
            </h3>
            <div className="mt-3 h-0.5 w-9 rounded-full bg-[#F5C99F]" />

            <p className="mt-5 text-sm leading-relaxed text-neutral-400">
              Have a question or need a website? Feel free to reach out anytime.
            </p>

            {/* EMAIL */}
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 flex items-start gap-3 text-sm text-neutral-300 transition-colors hover:text-[#F5C99F]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F5C99F]">
                <Mail size={17} />
              </span>
              <span className="min-w-0 break-all pt-2.5">
                {EMAIL}
              </span>
            </a>

            {/* CALL */}
            <a
              href={`tel:+${PHONE}`}
              className="mt-3.5 flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-[#F5C99F]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F5C99F]">
                <Phone size={17} />
              </span>
              <span>+91 85769 71890</span>
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${PHONE}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-[#F5C99F]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F5C99F]">
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
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-white">
              Rachix Studio Web Service.
            </span>{" "}
            All Rights Reserved.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-neutral-400 sm:text-sm">
            <span>Designed & Developed with</span>
            <Heart
              size={15}
              className="fill-[#F5C99F] text-[#F5C99F]"
            />
            <span>using Next.js & Tailwind CSS</span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[#F5C99F]/30 bg-[#F5C99F]/10 text-[#F5C99F] transition-all duration-200 hover:bg-[#F5C99F] hover:text-black touch-manipulation shadow-2xs"
          >
            <ArrowUp
              size={18}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}