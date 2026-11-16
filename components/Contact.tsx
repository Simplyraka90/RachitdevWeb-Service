
"use client";

import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const types = [
  "Custom Website",
  "React / Next.js App",
  "UI/UX Design",
  "E-Commerce Website",
  "Portfolio Website",
  "Business Website",
  "Other",
];

type ContactFormData = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

const initialForm: ContactFormData = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

const REQUEST_TIMEOUT = 12000;
const DURATION = 0.5;
const ease = [0.22, 1, 0.36, 1] as const;

const inputStyle =
  "block w-full min-w-0 rounded-xl border border-white/15 bg-[#282828] px-4 py-3.5 text-base text-white outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-neutral-400 focus:border-[#F5C99F] focus:ring-2 focus:ring-[#F5C99F]/20 disabled:cursor-not-allowed disabled:opacity-60";

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const requestRef = useRef<AbortController | null>(null);
  const submittingRef = useRef(false);
  const mountedRef = useRef(false);

  const reducedMotion = useReducedMotion();
  const reduce = Boolean(reducedMotion);
  const duration = reduce ? 0 : DURATION;

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      requestRef.current?.abort();
      requestRef.current = null;
    };
  }, []);

  const updateField = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (submittingRef.current) return;

    submittingRef.current = true;
    setLoading(true);
    setError("");

    const controller = new AbortController();
    requestRef.current = controller;

    let timedOut = false;

    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      const response = await fetch("/api/chat/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        signal: controller.signal,
        cache: "no-store",
      });

      const data: {
        success?: boolean;
        error?: string;
      } | null = await response.json().catch(() => null);

      if (!response.ok || data?.success !== true) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to send your inquiry."
        );
      }

      if (!mountedRef.current) return;

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      if (!mountedRef.current) return;

      if (timedOut) {
        setError(
          "The request took too long. Please check your connection and confirm whether your inquiry was received before submitting again."
        );
      } else if (
        err instanceof Error &&
        err.name === "AbortError"
      ) {
        setError(
          "Request was cancelled. Please try again."
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      clearTimeout(timeout);

      if (requestRef.current === controller) {
        requestRef.current = null;
      }

      submittingRef.current = false;

      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const reveal = (delay = 0, y = 20) => ({
    initial: reduce
      ? false
      : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: {
      once: true,
      amount: 0.12,
    },
    transition: {
      duration,
      delay: reduce ? 0 : delay,
      ease,
    },
  });

  const tap = reduce
    ? undefined
    : { scale: 0.98 };

  return (
    <section
      id="contact"
      className="relative flex h-full w-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-[#111111] p-5 text-white shadow-xl sm:p-7 md:p-8"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F5C99F]/5 blur-3xl"
      />

      <AnimatePresence mode="wait" initial={false}>
        {success ? (
          <motion.div
            key="success"
            role="status"
            initial={
              reduce
                ? false
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: -12 }
            }
            transition={{
              duration,
              ease,
            }}
            className="relative z-10 flex min-h-105 min-w-0 flex-1 flex-col items-center justify-center py-8 text-center"
          >
            <motion.div
              initial={
                reduce
                  ? false
                  : { opacity: 0, scale: 0.7 }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration,
                ease,
              }}
              className="flex size-20 items-center justify-center rounded-full border border-[#F5C99F]/30 bg-[#F5C99F]/10"
            >
              <CheckCircle2
                size={42}
                className="text-[#F5C99F]"
              />
            </motion.div>

            <motion.span
              {...reveal(0.05, 12)}
              className="mt-7 rounded-full bg-[#F5C99F]/10 px-4 py-2 text-xs font-bold text-[#F5C99F]"
            >
              Successfully Submitted
            </motion.span>

            <motion.h2
              {...reveal(0.1, 12)}
              className="mt-5 text-2xl font-extrabold sm:text-3xl"
            >
              Thank You!
            </motion.h2>

            <motion.p
              {...reveal(0.15, 12)}
              className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400"
            >
              We have received your project inquiry.
              Thank you for contacting Rachit Dev Web
              Service. Our team will get in touch with
              you soon.
            </motion.p>

            <motion.button
              type="button"
              onClick={() => {
                setSuccess(false);
                setError("");
              }}
              whileHover={
                reduce
                  ? undefined
                  : { y: -2, scale: 1.02 }
              }
              whileTap={tap}
              transition={{
                duration: reduce ? 0 : 0.2,
              }}
              className="mt-8 inline-flex min-h-12 touch-manipulation cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F5C99F] px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#F8D8B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C99F]"
            >
              Submit Another Inquiry
              <ArrowRight size={17} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={
              reduce
                ? false
                : { opacity: 0, y: 14 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: -10 }
            }
            transition={{
              duration,
              ease,
            }}
            className="relative z-10 flex min-w-0 flex-1 flex-col"
          >
            {/* HEADER */}
            <div className="min-w-0">
              <motion.span
                {...reveal(0.03, 10)}
                className="inline-flex rounded-full bg-[#F5C99F] px-4 py-2 text-xs font-bold text-black shadow-sm"
              >
                Let&apos;s Work Together
              </motion.span>

              <motion.h2
                {...reveal(0.08, 16)}
                className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
              >
                Start Your Project
              </motion.h2>

              <motion.p
                {...reveal(0.12, 14)}
                className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400"
              >
                Tell me about your idea and let&apos;s
                build something great.
              </motion.p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 flex min-w-0 flex-1 flex-col gap-4"
            >
              {/* NAME AND EMAIL */}
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div
                  {...reveal(0.16, 12)}
                  className="min-w-0"
                >
                  <label
                    htmlFor="client-name"
                    className="mb-2 block text-xs font-semibold text-neutral-200"
                  >
                    Your Name *
                  </label>

                  <input
                    id="client-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    disabled={loading}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value
                      )
                    }
                    className={inputStyle}
                  />
                </motion.div>

                <motion.div
                  {...reveal(0.2, 12)}
                  className="min-w-0"
                >
                  <label
                    htmlFor="client-email"
                    className="mb-2 block text-xs font-semibold text-neutral-200"
                  >
                    Your Email *
                  </label>

                  <input
                    id="client-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    disabled={loading}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value
                      )
                    }
                    className={inputStyle}
                  />
                </motion.div>
              </div>

              {/* PROJECT TYPE */}
              <motion.div
                {...reveal(0.24, 12)}
                className="min-w-0"
              >
                <label
                  htmlFor="project-type"
                  className="mb-2 block text-xs font-semibold text-neutral-200"
                >
                  Project Type *
                </label>

                <div className="relative min-w-0">
                  <select
                    id="project-type"
                    name="projectType"
                    required
                    value={form.projectType}
                    disabled={loading}
                    onChange={(event) =>
                      updateField(
                        "projectType",
                        event.target.value
                      )
                    }
                    className={`${inputStyle} cursor-pointer appearance-none pr-10 ${
                      form.projectType === ""
                        ? "text-neutral-400"
                        : "text-white"
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#282828] text-neutral-400"
                    >
                      Select project type
                    </option>

                    {types.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-[#282828] text-white"
                      >
                        {type}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                </div>
              </motion.div>

              {/* PROJECT DETAILS */}
              <motion.div
                {...reveal(0.28, 12)}
                className="flex min-w-0 flex-1 flex-col"
              >
                <label
                  htmlFor="project-message"
                  className="mb-2 block text-xs font-semibold text-neutral-200"
                >
                  Project Details *
                </label>

                <textarea
                  id="project-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  disabled={loading}
                  onChange={(event) =>
                    updateField(
                      "message",
                      event.target.value
                    )
                  }
                  className={`${inputStyle} min-h-36 flex-1 resize-y`}
                />
              </motion.div>

              {/* ERROR */}
              <AnimatePresence initial={false}>
                {error && (
                  <motion.p
                    key="form-error"
                    role="alert"
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, y: -8 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8 }
                    }
                    transition={{
                      duration,
                      ease,
                    }}
                    className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-xs leading-relaxed text-red-300"
                  >
                    <AlertCircle
                      size={16}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="min-w-0 wrap-break-word">
                      {error}
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                whileHover={
                  reduce || loading
                    ? undefined
                    : { y: -2, scale: 1.01 }
                }
                whileTap={
                  loading ? undefined : tap
                }
                transition={{
                  duration: reduce ? 0 : 0.2,
                }}
                className="mt-1 flex min-h-12 w-full touch-manipulation cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F5C99F] px-6 py-4 text-sm font-bold text-black transition-colors hover:bg-[#F8D8B8] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C99F]"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className={
                        reduce ? "" : "animate-spin"
                      }
                    />
                    <span>Sending Details...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Details</span>
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs leading-relaxed text-neutral-400">
                Your details will only be used to
                respond to your project inquiry.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
