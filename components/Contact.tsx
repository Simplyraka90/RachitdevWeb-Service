"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Reveal from "./Reveal";

const types = [
  "Custom Website",
  "React / Next.js App",
  "UI/UX Design",
  "E-Commerce Website",
  "Portfolio Website",
  "Business Website",
  "Other",
];

type FormData = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

// text-base on mobile prevents iOS Safari automatic input zoom
const inputStyle =
  "w-full rounded-xl border border-white/15 bg-[#282828] px-4 py-3.5 text-base sm:text-sm text-white outline-none transition-colors duration-200 placeholder:text-neutral-400 focus:border-[#F5C99F] focus:ring-2 focus:ring-[#F5C99F]/20";

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success !== true) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to send your inquiry."
        );
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal className="h-full">
      <section
        id="contact"
        className="flex h-full min-w-0 flex-col rounded-3xl bg-[#111111] p-5 text-white shadow-xl sm:p-8 transform-gpu"
      >
        {success ? (
          <div
            role="status"
            className="flex min-h-[420px] flex-1 flex-col items-center justify-center text-center"
          >
            <div className="flex size-20 items-center justify-center rounded-full border border-[#F5C99F]/30 bg-[#F5C99F]/10">
              <CheckCircle2 size={42} className="text-[#F5C99F]" />
            </div>

            <span className="mt-7 rounded-full bg-[#F5C99F]/10 px-4 py-2 text-xs font-bold text-[#F5C99F]">
              Successfully Submitted
            </span>

            <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
              Thank You!
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              We have received your project inquiry. Thank you for contacting
              Rachit Dev Web Service. Our team will get in touch with you soon.
            </p>

            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#F5C99F] px-6 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F8D8B8] touch-manipulation"
            >
              Submit Another Inquiry
              <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <div>
              <span className="inline-flex rounded-full bg-[#F5C99F] px-4 py-2 text-xs font-bold text-black shadow-2xs">
                Let&apos;s Work Together
              </span>

              <h2 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Start Your Project
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                Tell me about your idea and let&apos;s build something great.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 flex flex-1 flex-col gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
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
                    onChange={(e) => updateField("name", e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
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
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-type"
                  className="mb-2 block text-xs font-semibold text-neutral-200"
                >
                  Project Type *
                </label>

                <div className="relative">
                  <select
                    id="project-type"
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={(e) =>
                      updateField("projectType", e.target.value)
                    }
                    className={`${inputStyle} appearance-none pr-10 cursor-pointer ${
                      form.projectType === "" ? "text-neutral-400" : "text-white"
                    }`}
                  >
                    <option value="" disabled className="bg-[#282828] text-neutral-400">
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
              </div>

              <div className="flex flex-1 flex-col">
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
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`${inputStyle} min-h-36 flex-1 resize-y`}
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-xs text-red-300"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F5C99F] px-6 py-4 text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F8D8B8] disabled:cursor-not-allowed disabled:opacity-60 touch-manipulation"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending Details...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Details</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-relaxed text-neutral-400">
                Your details will only be used to respond to your project
                inquiry.
              </p>
            </form>
          </>
        )}
      </section>
    </Reveal>
  );
}