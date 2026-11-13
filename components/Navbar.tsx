
"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
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

const WELCOME_DURATION = 1200;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");

  const navigationTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Welcome screen without synchronous setState in effect
  useEffect(() => {
    if (window.location.pathname !== "/") return;

    let alreadySeen = false;

    try {
      alreadySeen =
        sessionStorage.getItem("rachix-welcome-seen") === "1";
    } catch {
      // Safari private mode may restrict storage
    }

    if (alreadySeen) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    let frame = 0;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    let startTime = 0;

    // Schedule the first state update asynchronously
    frame = requestAnimationFrame((time) => {
      setShowWelcome(true);

      try {
        sessionStorage.setItem("rachix-welcome-seen", "1");
      } catch {
        // Storage unavailable
      }

      startTime = time;

      const updateProgress = (currentTime: number) => {
        const elapsed = currentTime - startTime;

        const next = Math.min(
          100,
          Math.round(
            (elapsed / WELCOME_DURATION) * 100
          )
        );

        setProgress(next);

        if (next < 100) {
          frame = requestAnimationFrame(updateProgress);
        }
      };

      frame = requestAnimationFrame(updateProgress);

      closeTimer = setTimeout(() => {
        setProgress(100);
        setShowWelcome(false);
      }, WELCOME_DURATION + 150);
    });

    return () => {
      cancelAnimationFrame(frame);

      if (closeTimer) {
        clearTimeout(closeTimer);
      }
    };
  }, []);

  // Active link from URL
  useEffect(() => {
    const updateActive = () => {
      const hash = window.location.hash;

      const current = links.find(
        (link) => link.href === `/${hash}`
      );

      setActiveTab(current?.name || "Home");
    };

    window.addEventListener("hashchange", updateActive);
    window.addEventListener("popstate", updateActive);

    return () => {
      window.removeEventListener("hashchange", updateActive);
      window.removeEventListener("popstate", updateActive);
    };
  }, []);

  // Cleanup pending navigation
  useEffect(() => {
    return () => {
      if (navigationTimer.current) {
        clearTimeout(navigationTimer.current);
      }
    };
  }, []);

  // Close menu on Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Close dropdown when switching to desktop
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1280px)"
    );

    const closeOnDesktop = () => {
      if (media.matches) {
        setOpen(false);
      }
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", closeOnDesktop);

      return () => {
        media.removeEventListener(
          "change",
          closeOnDesktop
        );
      };
    }

    media.addListener(closeOnDesktop);

    return () => {
      media.removeListener(closeOnDesktop);
    };
  }, []);

  // Smooth section navigation
  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    const id = href.split("#")[1];
    const menuWasOpen = open;

    setOpen(false);
    setActiveTab(name);

    if (!id) return;

    // Let Next.js handle navigation from other pages
    if (window.location.pathname !== "/") {
      return;
    }

    const target = document.getElementById(id);

    // Allow native hash navigation when target is absent
    if (!target) return;

    event.preventDefault();

    if (navigationTimer.current) {
      clearTimeout(navigationTimer.current);
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const delay =
      menuWasOpen && !reducedMotion ? 260 : 0;

    navigationTimer.current = setTimeout(() => {
      const section = document.getElementById(id);

      if (!section) {
        window.location.hash = id;
        return;
      }

      const navbarOffset = 110;

      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: reducedMotion ? "auto" : "smooth",
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
      {/* WELCOME SCREEN */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            style={{ zIndex: 9999 }}
            className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0D] px-6 py-10 text-white select-none"
            aria-label="Welcome to Rachix Studio"
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[#B77842]/20 blur-3xl sm:h-96 sm:w-96" />
              <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-[#F5C99F]/15 blur-3xl sm:h-96 sm:w-96" />
            </div>

            <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center">
              {/* Tagline */}
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-[#F5C99F]"
              >
                <Sparkles
                  size={14}
                  className="text-[#B77842]"
                />
                <span>RACHIT DEV Web Services</span>
              </motion.div>

              {/* Animated logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="relative mb-6 flex items-center justify-center"
              >
                {/* Rotating gold ring */}
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-40 w-40 text-[#B77842]/80 sm:h-48 sm:w-48"
                  viewBox="0 0 120 120"
                  aria-hidden="true"
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

                {/* Logo box */}
                <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-[#FFF9F2] p-4 shadow-[0_0_35px_rgba(245,201,159,0.25)] sm:h-36 sm:w-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/weblog.png"
                    alt="Rachit Dev Logo"
                    width={144}
                    height={144}
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>

              {/* Welcome heading */}
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                }}
                className="mb-3 text-3xl font-black tracking-tight text-white sm:text-5xl"
              >
                Welcome to{" "}
                <span className="bg-linear-to-r from-[#F5C99F] via-[#B77842] to-[#F5C99F] bg-clip-text text-transparent">
                  Rachix Studio
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                }}
                className="mb-10 max-w-md text-sm font-normal tracking-wide text-neutral-400 sm:text-base"
              >
                Crafting modern, high-performance web solutions &amp; services
              </motion.p>

              {/* Loading progress */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.25,
                  duration: 0.4,
                }}
                className="flex w-48 flex-col items-center sm:w-56"
              >
                <div className="mb-2 flex w-full items-center justify-between text-[11px] font-semibold tracking-widest text-neutral-400">
                  <span className="text-[#F5C99F]">
                    LOADING
                  </span>
                  <span className="text-[#F5C99F]">
                    {progress}%
                  </span>
                </div>

                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#B77842] to-[#F5C99F] shadow-[0_0_12px_rgba(245,201,159,0.7)]"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full px-3 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#E8DCCF] bg-[#FFFBF7]/95 px-4 py-3 shadow-sm sm:px-7 xl:backdrop-blur-xl">
          {/* Brand */}
          <Link
            href="/#home"
            onClick={(event) =>
              handleNavClick(event, "/#home", "Home")
            }
            className="group flex min-w-0 items-center gap-3.5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/weblog.png"
                alt="Rachit Dev Logo"
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <strong className="whitespace-nowrap text-base font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-lg">
                Rachix Studio
              </strong>
              <small className="text-[11px] font-semibold text-neutral-500 sm:text-xs">
                Web Service
              </small>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {links.map((link) => {
              const isActive = activeTab === link.name;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(event) =>
                    handleNavClick(
                      event,
                      link.href,
                      link.name
                    )
                  }
                  className={`relative whitespace-nowrap text-sm font-bold transition-colors ${
                    isActive
                      ? "text-neutral-950"
                      : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  {link.name}

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
                </Link>
              );
            })}
          </div>

          {/* Book a Call */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/#contact"
              onClick={(event) =>
                handleNavClick(
                  event,
                  "/#contact",
                  "Contact"
                )
              }
              className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-neutral-800 sm:text-sm"
            >
              <CalendarDays
                size={16}
                className="text-[#F5C99F]"
              />
              <span>Book a Call</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-[#E8DCCF] p-2 text-neutral-800 transition-colors hover:bg-[#E8DCCF]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B77842] xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
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
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-[#E8DCCF] bg-[#FFFBF7] shadow-xl xl:hidden"
            >
              <div className="flex flex-col gap-1.5 p-4 sm:p-5">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(event) =>
                      handleNavClick(
                        event,
                        link.href,
                        link.name
                      )
                    }
                    className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition-colors ${
                      activeTab === link.name
                        ? "bg-[#E8DCCF]/50 text-neutral-950"
                        : "text-neutral-700 hover:bg-[#E8DCCF]/30"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Book a Call */}
                <div className="mt-2 border-t border-[#E8DCCF] pt-3 sm:hidden">
                  <Link
                    href="/#contact"
                    onClick={(event) =>
                      handleNavClick(
                        event,
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
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
