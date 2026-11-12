
"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, CalendarDays, Sparkles } from "lucide-react";


const links = [
  { name: "Home", href: "/#home" },
  { name: "Services", href: "/#services" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Our Work", href: "/#projects" },
  { name: "Tech Stack", href: "/#tech-stack" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");

  const navigationTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Original Smooth Loading Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }

        return prev + 2;
      });
    }, 18);

    return () => clearInterval(timer);
  }, []);

  // Cleanup pending navigation
  useEffect(() => {
    return () => {
      if (navigationTimer.current) {
        clearTimeout(navigationTimer.current);
      }
    };
  }, []);

  // FIX: Smooth navigation for desktop, tablet and mobile
  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    const id = href.split("#")[1];

    if (!id) return;

    const target = document.getElementById(id);

    // If navigating from another page, allow normal link navigation
    if (!target) {
      setOpen(false);
      return;
    }

    event.preventDefault();

    setActiveTab(name);

    const wasMobileMenuOpen = open;

    setOpen(false);

    if (navigationTimer.current) {
      clearTimeout(navigationTimer.current);
    }

    // Wait for original 0.25s dropdown exit animation
    const delay = wasMobileMenuOpen ? 300 : 0;

    navigationTimer.current = setTimeout(() => {
      const section = document.getElementById(id);

      if (!section) return;

      const navbarOffset = 110;

      const targetPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });

      window.history.replaceState(
        null,
        "",
        `/#${id}`
      );
    }, delay);
  };

  return (
    <>
      {/* 1. PROFESSIONAL WELCOME OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.03,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ zIndex: 9999 }}
            className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0D] px-6 py-10 text-white select-none"
          >
            {/* Background Ambient Glowing Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -left-20 top-1/4 h-100 w-100 rounded-full bg-[#B77842]/20 blur-[140px]" />
              <div className="absolute -right-20 bottom-1/4 h-100 w-100 rounded-full bg-[#F5C99F]/15 blur-[140px]" />
            </div>

            {/* Central Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
              {/* Top Tagline Badge */}
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-[#F5C99F] backdrop-blur-md mb-8"
              >
                <Sparkles
                  size={14}
                  className="text-[#B77842] animate-spin"
                />
                <span>RACHIT DEV Web Services</span>
              </motion.div>

              {/* Animated Logo Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative mb-6 flex items-center justify-center"
              >
                {/* Rotating Outer Ring */}
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-40 w-40 sm:h-48 sm:w-48 text-[#B77842]/80"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="10 14"
                  />
                </motion.svg>

                {/* Clean Logo Box */}
                <div className="relative flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-3xl bg-[#FFF9F2] p-4 shadow-[0_0_50px_rgba(245,201,159,0.3)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/weblog.png"
                    alt="Rachit Dev Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>

              {/* Enhanced Typography */}
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                }}
                className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3"
              >
                Welcome to{" "}
                <span className="bg-linear-to-r from-[#F5C99F] via-[#B77842] to-[#F5C99F] bg-clip-text text-transparent">
                  Rachix Studio
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.25,
                  duration: 0.5,
                }}
                className="text-sm sm:text-base font-normal text-neutral-400 tracking-wide mb-10 max-w-md"
              >
                Crafting modern, high-performance web solutions & services
              </motion.p>

              {/* Centered Loading Line */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                }}
                className="flex flex-col items-center w-48 sm:w-56"
              >
                <div className="flex items-center justify-between w-full text-[11px] font-semibold tracking-widest text-neutral-400 mb-2">
                  <span className="animate-pulse text-[#F5C99F]">
                    LOADING
                  </span>
                  <span className="text-[#F5C99F]">
                    {progress}%
                  </span>
                </div>

                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-linear-to-r from-[#B77842] to-[#F5C99F] rounded-full shadow-[0_0_12px_rgba(245,201,159,0.7)]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ORIGINAL MATCHING NAVBAR DESIGN */}
      <header className="sticky top-0 z-50 w-full px-3 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#E8DCCF] bg-[#FFFBF7]/95 px-5 py-3 shadow-sm backdrop-blur-xl sm:px-7">
          {/* Brand Logo & Title */}
          <a
            href="#home"
            onClick={(e) =>
              handleNavClick(e, "/#home", "Home")
            }
            className="group flex items-center gap-3.5"
          >
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/weblog.png"
                alt="Rachit Dev Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <strong className="text-base sm:text-lg font-extrabold leading-tight text-neutral-900 tracking-tight">
                Rachix Studio
              </strong>
              <small className="text-[11px] sm:text-xs font-semibold text-neutral-500">
                Web Service
              </small>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => {
              const isActive = activeTab === l.name;

              return (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={(e) =>
                    handleNavClick(e, l.href, l.name)
                  }
                  className={`relative text-sm font-bold transition-colors ${
                    isActive
                      ? "text-neutral-950"
                      : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  {l.name}

                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-neutral-900"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA Book Call Button */}
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#contact"
              onClick={(e) =>
                handleNavClick(e, "/#contact", "Contact")
              }
              className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-neutral-800 hover:scale-[1.02] shadow-sm"
            >
              <CalendarDays
                size={16}
                className="text-[#F5C99F]"
              />
              <span>Book a Call</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
            className="rounded-full border border-[#E8DCCF] p-2 text-neutral-800 transition hover:bg-[#E8DCCF]/40 lg:hidden focus:outline-none"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* 3. ORIGINAL MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-[#E8DCCF] bg-[#FFFBF7] shadow-xl lg:hidden"
            >
              <div className="flex flex-col gap-1.5 p-4 sm:p-5">
                {links.map((l) => (
                  <a
                    key={l.name}
                    href={l.href}
                    onClick={(e) =>
                      handleNavClick(e, l.href, l.name)
                    }
                    className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                      activeTab === l.name
                        ? "bg-[#E8DCCF]/50 text-neutral-950"
                        : "text-neutral-700 hover:bg-[#E8DCCF]/30"
                    }`}
                  >
                    {l.name}
                  </a>
                ))}

                <div className="mt-2 border-t border-[#E8DCCF] pt-3 sm:hidden">
                  <a
                    href="#contact"
                    onClick={(e) =>
                      handleNavClick(
                        e,
                        "/#contact",
                        "Contact"
                      )
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-center text-sm font-bold text-white shadow-sm"
                  >
                    <CalendarDays
                      size={16}
                      className="text-[#F5C99F]"
                    />
                    <span>Book a Call</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
