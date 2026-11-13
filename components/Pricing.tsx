"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Crown,
  HeartHandshake,
  MonitorSmartphone,
  Palette,
  Rocket,
  Sparkles,
  Zap,
  MessageCircle,
  PencilRuler,
  Code2,
} from "lucide-react";

const PHONE = "918576971890";

const plans = [
  {
    name: "Starter",
    price: "₹6,999",
    description: "Perfect for small businesses and simple websites.",
    features: [
      "1–3 essential pages",
      "Clean & simple UI design",
      "Fully responsive layout",
      "Contact form",
      "WhatsApp integration",
      "Essential business details",
    ],
    popular: false,
    button: "Get Started",
    icon: Rocket,
  },
  {
    name: "Professional",
    price: "₹14,999",
    description: "Premium design for growing businesses and brands.",
    features: [
      "Up to 8 pages",
      "Premium custom UI/UX",
      "Modern 3D effects & animations",
      "Custom logo design",
      "Fully responsive layout",
      "Standard API integration",
      "Contact & inquiry forms",
    ],
    popular: true,
    button: "Choose Professional",
    icon: Sparkles,
  },
  {
    name: "Premium / Custom",
    price: "₹20,000+",
    description: "Custom solutions tailored to your business requirements.",
    features: [
      "Custom pages & layouts",
      "Advanced UI/UX & 3D effects",
      "Logo & brand identity",
      "Advanced API integrations",
      "E-commerce & booking systems",
      "Custom functionality",
      "Fully responsive layout",
      "Features as per requirements",
    ],
    popular: false,
    button: "Discuss Project",
    icon: Crown,
  },
];

const benefits = [
  {
    icon: Palette,
    title: "Modern Design",
    description: "Clean and professional UI tailored to your brand.",
  },
  {
    icon: MonitorSmartphone,
    title: "Fully Responsive",
    description: "Great experience on mobile, tablet and desktop.",
  },
  {
    icon: Zap,
    title: "Smooth Experience",
    description: "Modern interactions and user-friendly layouts.",
  },
  {
    icon: HeartHandshake,
    title: "Direct Support",
    description: "Easy communication throughout your project.",
  },
];

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Discuss",
    text: "Share your requirements.",
  },
  {
    number: "02",
    icon: PencilRuler,
    title: "Design",
    text: "Plan the website UI.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Develop",
    text: "Build and test the site.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    text: "Review and go live.",
  },
];

function whatsappLink(plan: string, price: string) {
  const message = encodeURIComponent(
    `Hi Rachit, I'm interested in the ${plan} Website Plan (${price}). Please share more details.`
  );
  return `https://wa.me/${PHONE}?text=${message}`;
}

/* Optimized Scroll Reveal Animation */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    if (visible) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 40px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`pricing-reveal ${
        visible ? "pricing-visible" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#FFFAF5] px-4 py-12 text-[#171717] sm:px-6 sm:py-16 lg:px-8"
    >
      {/* BACKGROUND DECORATIVE WAVES & GLOWS (GPU Optimized) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden transform-gpu"
      >
        <svg
          className="pricing-wave-one absolute left-[-10%] top-[8%] w-[120%] opacity-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 C250,60 430,270 720,160 C1010,50 1200,250 1440,140 L1440,320 L0,320 Z"
            fill="#F5C99F"
            fillOpacity="0.13"
          />
        </svg>

        <svg
          className="pricing-wave-two absolute left-[-10%] top-[48%] w-[120%] opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C260,230 480,30 720,160 C980,280 1200,60 1440,160 L1440,320 L0,320 Z"
            fill="#E8B88D"
            fillOpacity="0.12"
          />
        </svg>

        <div className="pricing-glow absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-[#F5C99F]/15 blur-3xl" />
        <div className="pricing-glow absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-[#F5C99F]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* PRICING HEADING */}
        <Reveal>
          <div className="mx-auto mb-10 max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#EADFD4] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#946A48] shadow-2xs">
              <Sparkles size={13} />
              Simple & Transparent Pricing
            </span>

            <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900">
              Your Website,{" "}
              <span className="text-[#C28B5B]">
                Your Budget.
              </span>
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-[#71675F] sm:text-base">
              Professional websites starting at ₹6,999. Choose the right plan for your business.
            </p>
          </div>
        </Reveal>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <Reveal
                key={plan.name}
                delay={index * 80}
                className="h-full min-w-0"
              >
                <article
                  className={`pricing-card relative flex h-full min-w-0 flex-col rounded-3xl border p-6 sm:p-7 transition-all duration-300 touch-manipulation ${
                    plan.popular
                      ? "border-[#171717] bg-[#171717] text-white shadow-xl"
                      : "border-[#EADFD4] bg-white text-[#171717] shadow-sm hover:border-[#D8A878]"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 right-5 rounded-full bg-[#F5C99F] px-3.5 py-1 text-[10px] font-bold uppercase text-[#171717] shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        plan.popular
                          ? "text-[#F5C99F]"
                          : "text-[#946A48]"
                      }`}
                    >
                      {plan.name}
                    </span>

                    <div className={`flex size-10 items-center justify-center rounded-xl ${plan.popular ? "bg-white/10" : "bg-[#F5C99F]/20"}`}>
                      <Icon
                        size={20}
                        className={`pricing-floating-icon ${
                          plan.popular
                            ? "text-[#F5C99F]"
                            : "text-[#B87A48]"
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {plan.price}
                  </h3>

                  <p
                    className={`mt-1 text-xs ${
                      plan.popular
                        ? "text-neutral-400"
                        : "text-[#82766D]"
                    }`}
                  >
                    Starting price
                  </p>

                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      plan.popular
                        ? "text-neutral-300"
                        : "text-[#71675F]"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div
                    className={`my-5 h-px ${
                      plan.popular
                        ? "bg-white/15"
                        : "bg-[#EADFD4]"
                    }`}
                  />

                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5"
                      >
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className={`mt-0.5 shrink-0 ${
                            plan.popular
                              ? "text-[#F5C99F]"
                              : "text-[#B87A48]"
                          }`}
                        />

                        <span
                          className={`text-xs sm:text-sm leading-relaxed ${
                            plan.popular
                              ? "text-neutral-200"
                              : "text-[#4D4844]"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(plan.name, plan.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pricing-button group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5C99F] px-4 py-3 text-sm font-bold text-[#171717] transition-all hover:bg-[#F8D8B8] touch-manipulation shadow-xs"
                  >
                    {plan.button}
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* PRICING NOTE */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-relaxed text-[#82766D]">
          Prices are starting rates. Final cost depends on project requirements. Domain, hosting and paid third-party services are quoted separately.
        </p>

        {/* WHY CHOOSE US */}
        <div className="mt-14">
          <Reveal>
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A48]">
                Why Choose Us
              </span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl text-neutral-900">
                More Than Just a Website
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#71675F]">
                Designed for your brand and built for every screen.
              </p>
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Reveal
                  key={benefit.title}
                  delay={index * 60}
                  className="h-full"
                >
                  <div className="pricing-card flex h-full flex-col rounded-2xl border border-[#EADFD4] bg-white p-5 shadow-2xs">
                    <div className="pricing-icon-box flex size-11 items-center justify-center rounded-xl bg-[#F5C99F]/25 text-[#A56C3D]">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-neutral-900">
                      {benefit.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-[#71675F]">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* OUR PROCESS */}
        <div className="mt-14">
          <Reveal>
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A48]">
                Our Process
              </span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl text-neutral-900">
                How We Work
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#71675F]">
                A simple process from your idea to a live website.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-6">
            <div
              aria-hidden="true"
              className="pricing-connecting-line absolute left-[10%] right-[10%] top-1/2 hidden h-px bg-[#D8B69A]/60 lg:block"
            />

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Reveal
                    key={step.number}
                    delay={index * 70}
                    className="h-full"
                  >
                    <div className="pricing-card relative flex h-full flex-col items-center rounded-2xl border border-[#EADFD4] bg-white p-5 text-center shadow-2xs">
                      <span className="absolute left-3.5 top-3.5 rounded-lg bg-[#F5C99F]/20 px-2 py-0.5 text-[11px] font-bold text-[#8C6444]">
                        {step.number}
                      </span>

                      <div className="pricing-icon-box mt-3 flex size-12 items-center justify-center rounded-xl bg-[#F5C99F]/20 text-[#A56C3D]">
                        <Icon size={22} />
                      </div>

                      <h3 className="mt-3 text-base font-bold text-neutral-900">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-[#71675F]">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        /* Scroll reveal optimization */
        .pricing-reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .pricing-reveal.pricing-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card hover transitions */
        .pricing-card {
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
          will-change: transform;
        }

        @media (hover: hover) {
          .pricing-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 24px rgba(40, 25, 10, 0.06);
          }

          .pricing-card:hover .pricing-icon-box {
            transform: translateY(-2px);
          }
        }

        /* Icon box animations */
        .pricing-icon-box {
          transition: transform 300ms ease;
        }

        .pricing-floating-icon {
          animation: pricingFloat 4s ease-in-out infinite;
        }

        @keyframes pricingFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        /* Background waves */
        .pricing-wave-one {
          animation: pricingWaveOne 16s ease-in-out infinite alternate;
        }

        .pricing-wave-two {
          animation: pricingWaveTwo 20s ease-in-out infinite alternate;
        }

        @keyframes pricingWaveOne {
          from {
            transform: translateX(-2%) translateY(0);
          }
          to {
            transform: translateX(2%) translateY(8px);
          }
        }

        @keyframes pricingWaveTwo {
          from {
            transform: translateX(2%) translateY(0);
          }
          to {
            transform: translateX(-2%) translateY(-8px);
          }
        }

        .pricing-glow {
          animation: pricingGlow 12s ease-in-out infinite alternate;
        }

        @keyframes pricingGlow {
          from {
            opacity: 0.3;
            transform: scale(1);
          }
          to {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        /* Button transition */
        .pricing-button {
          transition: background-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
        }

        @media (hover: hover) {
          .pricing-button:hover {
            transform: translateY(-1.5px);
            box-shadow: 0 4px 12px rgba(245, 201, 159, 0.3);
          }
        }

        /* Process line animation */
        .pricing-connecting-line {
          transform-origin: left center;
          animation: pricingLineDraw 1.5s ease-out both;
        }

        @keyframes pricingLineDraw {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .pricing-reveal,
          .pricing-card,
          .pricing-floating-icon,
          .pricing-wave-one,
          .pricing-wave-two,
          .pricing-glow,
          .pricing-button,
          .pricing-connecting-line,
          .pricing-icon-box {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }

          .pricing-reveal {
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}