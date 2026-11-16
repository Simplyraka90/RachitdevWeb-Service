
"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

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
    description:
      "Perfect for small businesses and simple websites.",
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
    description:
      "Premium design for growing businesses and brands.",
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
    description:
      "Custom solutions tailored to your business requirements.",
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
    description:
      "Clean and professional UI tailored to your brand.",
  },
  {
    icon: MonitorSmartphone,
    title: "Fully Responsive",
    description:
      "Great experience on mobile, tablet and desktop.",
  },
  {
    icon: Zap,
    title: "Smooth Experience",
    description:
      "Modern interactions and user-friendly layouts.",
  },
  {
    icon: HeartHandshake,
    title: "Direct Support",
    description:
      "Easy communication throughout your project.",
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

const ease = [0.22, 1, 0.36, 1] as const;

function whatsappLink(plan: string, price: string) {
  const message = encodeURIComponent(
    `Hi Rachit, I'm interested in the ${plan} Website Plan (${price}). Please share more details.`
  );

  return `https://wa.me/${PHONE}?text=${message}`;
}

export default function Pricing() {
  const reducedMotion = useReducedMotion();
  const reduce = Boolean(reducedMotion);

  const reveal = (delay = 0, y = 20) => ({
    initial: reduce
      ? false
      : {
          opacity: 0,
          y,
        },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.12,
    },
    transition: {
      duration: reduce ? 0 : 0.55,
      delay: reduce ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="pricing"
      className="relative isolate w-full min-w-0 scroll-mt-28 overflow-hidden bg-[#FFFAF5] px-4 py-16 text-[#171717] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* BACKGROUND WAVES */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          className="absolute left-[-10%] top-[8%] w-[120%] opacity-40"
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
          className="absolute left-[-10%] top-[48%] w-[120%] opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C260,230 480,30 720,160 C980,280 1200,60 1440,160 L1440,320 L0,320 Z"
            fill="#E8B88D"
            fillOpacity="0.12"
          />
        </svg>

        <div
          className="absolute -left-24 top-1/4 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.15) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute -right-24 bottom-1/4 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,201,159,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl min-w-0">
        {/* PRICING HEADER */}
        <div className="mx-auto mb-12 max-w-xl text-center">
          <motion.div {...reveal(0, 12)}>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#EADFD4] bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#946A48] shadow-sm">
              <Sparkles size={13} />
              Simple &amp; Transparent Pricing
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.08, 18)}
            className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight text-neutral-900"
          >
            Your Website,{" "}
            <span className="text-[#C28B5B]">
              Your Budget.
            </span>
          </motion.h2>

          <motion.p
            {...reveal(0.15, 16)}
            className="mt-3 text-sm leading-7 text-[#71675F] sm:text-base"
          >
            Professional websites starting at ₹6,999.
            Choose the right plan for your business.
          </motion.p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.article
                key={plan.name}
                {...reveal(index * 0.1, 28)}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -6,
                        transition: {
                          duration: 0.22,
                        },
                      }
                }
                className={`relative flex h-full min-w-0 flex-col rounded-3xl border p-6 shadow-sm sm:p-7 ${
                  plan.popular
                    ? "border-[#171717] bg-[#171717] text-white shadow-xl"
                    : "border-[#EADFD4] bg-white text-[#171717]"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-3 right-5 rounded-full bg-[#F5C99F] px-3.5 py-1 text-[10px] font-bold uppercase text-[#171717] shadow-sm">
                    Most Popular
                  </span>
                )}

                {/* Header */}
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

                  <motion.div
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            rotate: -8,
                            scale: 1.08,
                          }
                    }
                    transition={{
                      duration: 0.25,
                    }}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      plan.popular
                        ? "bg-white/10"
                        : "bg-[#F5C99F]/20"
                    }`}
                  >
                    <Icon
                      size={21}
                      className={
                        plan.popular
                          ? "text-[#F5C99F]"
                          : "text-[#B87A48]"
                      }
                    />
                  </motion.div>
                </div>

                {/* Price */}
                <h3 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
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

                {/* Description */}
                <p
                  className={`mt-4 min-h-12 text-sm leading-7 ${
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

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex min-w-0 items-start gap-2.5"
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
                        className={`min-w-0 text-xs leading-relaxed sm:text-sm ${
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

                {/* WhatsApp CTA */}
                <motion.a
                  href={whatsappLink(
                    plan.name,
                    plan.price
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={
                    reduce
                      ? undefined
                      : { scale: 1.02 }
                  }
                  whileTap={
                    reduce
                      ? undefined
                      : { scale: 0.98 }
                  }
                  className="group mt-8 inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#F5C99F] px-4 py-3 text-sm font-bold text-[#171717] shadow-sm transition-colors duration-200 hover:bg-[#F8D8B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87A48]"
                >
                  {plan.button}

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>
              </motion.article>
            );
          })}
        </div>

        {/* PRICING NOTE */}
        <motion.p
          {...reveal(0.1, 12)}
          className="mx-auto mt-7 max-w-3xl text-center text-[11px] leading-6 text-[#82766D] sm:text-xs"
        >
          Prices are starting rates. Final cost depends on
          project requirements. Domain, hosting and paid
          third-party services are quoted separately.
        </motion.p>

        {/* WHY CHOOSE US */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center">
            <motion.span
              {...reveal(0, 12)}
              className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#B87A48]"
            >
              Why Choose Us
            </motion.span>

            <motion.h2
              {...reveal(0.08, 18)}
              className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl"
            >
              More Than Just a Website
            </motion.h2>

            <motion.p
              {...reveal(0.14, 12)}
              className="mt-2 text-xs leading-6 text-[#71675F] sm:text-sm"
            >
              Designed for your brand and built for every screen.
            </motion.p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  {...reveal(index * 0.07, 20)}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -4,
                          transition: {
                            duration: 0.2,
                          },
                        }
                  }
                  className="flex h-full min-w-0 flex-col rounded-2xl border border-[#EADFD4] bg-white p-5 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5C99F]/25 text-[#A56C3D]">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-neutral-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-[#71675F]">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* OUR PROCESS */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center">
            <motion.span
              {...reveal(0, 12)}
              className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#B87A48]"
            >
              Our Process
            </motion.span>

            <motion.h2
              {...reveal(0.08, 18)}
              className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl"
            >
              How We Work
            </motion.h2>

            <motion.p
              {...reveal(0.14, 12)}
              className="mt-2 text-xs leading-6 text-[#71675F] sm:text-sm"
            >
              A simple process from your idea to a live website.
            </motion.p>
          </div>

          <div className="relative mt-8">
            {/* Connecting Line */}
            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-1/2 hidden h-px bg-[#D8B69A]/60 lg:block"
            />

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    {...reveal(index * 0.08, 22)}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: -4,
                            transition: {
                              duration: 0.2,
                            },
                          }
                    }
                    className="relative flex h-full min-w-0 flex-col items-center rounded-2xl border border-[#EADFD4] bg-white p-5 text-center shadow-sm"
                  >
                    {/* Number */}
                    <span className="absolute left-3.5 top-3.5 rounded-lg bg-[#F5C99F]/20 px-2 py-0.5 text-[11px] font-bold text-[#8C6444]">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5C99F]/20 text-[#A56C3D]">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-neutral-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-[#71675F]">
                      {step.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
