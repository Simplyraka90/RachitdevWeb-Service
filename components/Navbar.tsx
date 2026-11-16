
"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Menu,
  X,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const links = [
  { name: "Home", href: "/#home" },
  { name: "Services", href: "/#services" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Our Work", href: "/#projects" },
  { name: "Tech Stack", href: "/#tech-stack" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const WELCOME_DURATION = 1600;
const WELCOME_EXIT_DURATION = 350;
const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  const reduceMotion = useReducedMotion();

  const navigationTimer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const headerRef = useRef<HTMLElement | null>(null);

  // Welcome animation with accurate progress
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      const timer = window.setTimeout(() => {
        setProgress(100);
        setIsLoading(false);
      }, 0);

      return () => clearTimeout(timer);
    }

    let frameId = 0;
    let startTime: number | null = null;
    let completed = false;
    let closeTimer: ReturnType<typeof setTimeout> | null =
      null;

    const animateProgress = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const elapsed = time - startTime;

      const value = Math.min(
        100,
        Math.floor(
          (elapsed / WELCOME_DURATION) * 100
        )
      );

      setProgress(value);

      if (elapsed < WELCOME_DURATION) {
        frameId = requestAnimationFrame(animateProgress);
      } else if (!completed) {
        completed = true;
        setProgress(100);

        closeTimer = setTimeout(() => {
          setIsLoading(false);
        }, 150);
      }
    };

    frameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(frameId);

      if (closeTimer) {
        clearTimeout(closeTimer);
      }
    };
  }, []);

  // Lightweight scroll detection
  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frameId = 0;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Keep active tab synced with URL
  useEffect(() => {
    const updateActive = () => {
      const current = links.find(
        (link) =>
          link.href === `/${window.location.hash}`
      );

      setActiveTab(current?.name || "Home");
    };

    updateActive();

    window.addEventListener("hashchange", updateActive);
    window.addEventListener("popstate", updateActive);

    return () => {
      window.removeEventListener(
        "hashchange",
        updateActive
      );
      window.removeEventListener(
        "popstate",
        updateActive
      );
    };
  }, []);

  // Close menu on Escape / desktop resize
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const media = window.matchMedia(
      "(min-width: 1280px)"
    );

    const handleResize = () => {
      if (media.matches) setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    media.addEventListener("change", handleResize);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );

      media.removeEventListener(
        "change",
        handleResize
      );
    };
  }, [open]);

  // Cleanup pending navigation
  useEffect(() => {
    return () => {
      if (navigationTimer.current) {
        clearTimeout(navigationTimer.current);
      }
    };
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    const id = href.split("#")[1];
    const wasOpen = open;

    setOpen(false);
    setActiveTab(name);

    if (!id || window.location.pathname !== "/") {
      return;
    }

    const target = document.getElementById(id);

    if (!target) return;

    event.preventDefault();

    if (navigationTimer.current) {
      clearTimeout(navigationTimer.current);
    }

    const delay =
      wasOpen && !reduceMotion ? 260 : 0;

    navigationTimer.current = setTimeout(() => {
      const section = document.getElementById(id);

      if (!section) return;

      const offset =
        (headerRef.current?.offsetHeight || 90) + 14;

      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduceMotion ? "auto" : "smooth",
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
        {isLoading && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion
                ? 0
                : WELCOME_EXIT_DURATION / 1000,
              ease: "easeOut",
            }}
            className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-[#0A0A0D] px-4 py-6 text-white"
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[#B77842]/15 blur-3xl sm:h-80 sm:w-80" />
              <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-[#F5C99F]/10 blur-3xl sm:h-80 sm:w-80" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
              {/* Badge */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : -12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                }}
                className="mb-6 flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center text-[10px] font-semibold tracking-widest text-[#F5C99F] sm:mb-8 sm:px-4 sm:text-xs"
              >
                <Sparkles
                  size={14}
                  className="shrink-0 text-[#B77842]"
                />
                <span>RACHIT DEV Web Services</span>
              </motion.div>

              {/* Animated Logo */}
              <motion.div
                initial={{
                  scale: reduceMotion ? 1 : 0.85,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  ease,
                }}
                className="relative mb-6 flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
              >
                <motion.svg
                  animate={
                    reduceMotion
                      ? undefined
                      : { rotate: 360 }
                  }
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 h-full w-full text-[#B77842]/80"
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

                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-[#FFF9F2] p-4 shadow-[0_0_30px_rgba(245,201,159,0.20)] sm:h-36 sm:w-36">
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

              {/* Heading */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: reduceMotion ? 0 : 0.1,
                  duration: reduceMotion ? 0 : 0.45,
                }}
                className="mb-3 text-[clamp(1.65rem,5vw,3rem)] font-black leading-tight tracking-tight text-white"
              >
                Welcome to{" "}
                <span className="bg-linear-to-r from-[#F5C99F] via-[#B77842] to-[#F5C99F] bg-clip-text text-transparent">
                  Rachix Studio
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: reduceMotion ? 0 : 0.18,
                  duration: reduceMotion ? 0 : 0.45,
                }}
                className="mb-8 max-w-md text-sm leading-6 tracking-wide text-neutral-400 sm:mb-10 sm:text-base"
              >
                Crafting modern, high-performance web
                solutions &amp; services
              </motion.p>

              {/* Progress */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: reduceMotion ? 0 : 0.25,
                  duration: reduceMotion ? 0 : 0.35,
                }}
                className="flex w-44 flex-col items-center sm:w-56"
              >
                <div className="mb-2 flex w-full items-center justify-between text-[11px] font-semibold tracking-widest">
                  <span className="text-[#F5C99F]">
                    LOADING
                  </span>
                  <span className="text-[#F5C99F]">
                    {progress}%
                  </span>
                </div>

                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: progress / 100,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.08,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: "left",
                    }}
                    className="h-full w-full rounded-full bg-linear-to-r from-[#B77842] to-[#F5C99F]"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8"
      >
        <nav
          className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-[#E8DCCF] px-4 py-2.5 transition-[background-color,box-shadow] duration-300 sm:px-6 lg:px-7 ${
            scrolled
              ? "bg-[#FFFBF7] shadow-[0_8px_30px_rgba(45,30,15,0.10)]"
              : "bg-[#FFFBF7]/95 shadow-sm"
          }`}
        >
          {/* Brand */}
          <Link
            href="/#home"
            onClick={(event) =>
              handleNavClick(event, "/#home", "Home")
            }
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
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
              <strong className="whitespace-nowrap text-[15px] font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-lg">
                Rachix Studio
              </strong>
              <small className="text-[10px] font-semibold text-neutral-500 sm:text-xs">
                Web Service
              </small>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 xl:flex">
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
                  className={`relative whitespace-nowrap rounded-full px-3 py-2.5 text-[13px] font-bold transition-colors ${
                    isActive
                      ? "text-neutral-950"
                      : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-neutral-900"
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

          {/* CTA */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/#contact"
              onClick={(event) =>
                handleNavClick(
                  event,
                  "/#contact",
                  "Contact"
                )
              }
              className="hidden items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-neutral-800 sm:flex sm:text-sm"
            >
              <CalendarDays
                size={16}
                className="text-[#F5C99F]"
              />
              Book a Call
            </Link>

            {/* Mobile Toggle */}
            <motion.button
              type="button"
              aria-label={
                open ? "Close menu" : "Open menu"
              }
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((prev) => !prev)}
              whileTap={
                reduceMotion ? undefined : { scale: 0.92 }
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DCCF] bg-[#F8F0E7] text-neutral-800 transition-colors hover:bg-[#EFE2D3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B77842] xl:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{
                    opacity: 0,
                    rotate: reduceMotion ? 0 : -45,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: reduceMotion ? 0 : 45,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.15,
                  }}
                  className="flex items-center justify-center"
                >
                  {open ? (
                    <X size={20} />
                  ) : (
                    <Menu size={20} />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-nav"
              key="mobile-menu"
              initial={{
                opacity: 0,
                height: 0,
                y: reduceMotion ? 0 : -8,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: reduceMotion ? 0 : -8,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.25,
                ease,
              }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-[#E8DCCF] bg-[#FFFBF7] shadow-xl xl:hidden"
            >
              <div className="max-h-[min(70dvh,560px)] overflow-y-auto overscroll-contain p-3 sm:p-5">
                <div className="flex flex-col gap-1">
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
                      className={`flex min-h-11 items-center rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                        activeTab === link.name
                          ? "bg-[#E8DCCF]/50 text-neutral-950"
                          : "text-neutral-700 hover:bg-[#E8DCCF]/30"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-3 border-t border-[#E8DCCF] pt-3 sm:hidden">
                  <Link
                    href="/#contact"
                    onClick={(event) =>
                      handleNavClick(
                        event,
                        "/#contact",
                        "Contact"
                      )
                    }
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    <CalendarDays
                      size={16}
                      className="text-[#F5C99F]"
                    />
                    Book a Call
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
