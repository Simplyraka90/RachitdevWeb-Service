
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Check,
  Users,
  Bot,
  Send,
  X,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

type ChatMessage = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const DURATION = 0.5;
const API_TIMEOUT = 8000;
const WHATSAPP_NUMBER = "918576971890";
const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  "1.5+ Years of Hands-on Experience",
  "30+ Projects Successfully Completed",
  "Dedicated UI/UX & Web Development Team",
  "Complete Web Solutions for Every Business",
];

const quickPrompts = [
  "I need a website",
  "Website price?",
  "Contact",
];

const websiteTypes = [
  "Portfolio",
  "Business Website",
  "E-commerce",
  "Restaurant Website",
  "SaaS / Web App",
];

const initialMessage: ChatMessage = {
  id: 0,
  sender: "bot",
  text:
    "Hello! 👋 Welcome to Rachix Studio. We're a creative web design and development team. How can we help your business today?",
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[?!.,]/g, "")
    .replace(/\s+/g, " ");
}

function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

function isContactIntent(text: string) {
  const q = normalize(text);

  return [
    /^(contact|whatsapp|contact me|call me|connect me)$/,
    /\blet'?s (connect|talk|meet|discuss)\b/,
    /\b(book|schedule|arrange)\s+(a\s+)?(call|meeting)\b/,
    /\b(hire you|contact rachit|contact rachix)\b/,
    /\b(mujhe|aapse).*(baat|contact|connect)\b/,
    /\bcall karni hai\b/,
  ].some((pattern) => pattern.test(q));
}

function getLocalReply(query: string): {
  reply: string;
  options: boolean;
} {
  const q = normalize(query);

  if (
    /^(hi|hii|hiii|hello|hey|hlo|hy|good morning|good evening)$/.test(
      q
    )
  ) {
    return {
      reply:
        "Hello! 👋 Welcome to Rachix Studio. How can our team help you today?",
      options: false,
    };
  }

  if (/^(thank you|thanks|thx|thankyou)$/.test(q)) {
    return {
      reply:
        "You're welcome! 😊 Is there anything else our team can help you with?",
      options: false,
    };
  }

  if (/^(bye|goodbye|see you)$/.test(q)) {
    return {
      reply:
        "Goodbye! 👋 Thank you for visiting Rachix Studio.",
      options: false,
    };
  }

  if (/^(who are you|your name)$/.test(q)) {
    return {
      reply:
        "I'm the Rachix Studio AI Assistant 🤖. I help visitors learn about our web design, UI/UX and development services.",
      options: false,
    };
  }

  if (
    /price|pricing|cost|budget|charge|kitna|how much|rate/.test(
      q
    )
  ) {
    return {
      reply:
        "Our website pricing depends on your business needs, design and features. 💰 What type of website are you looking for?",
      options: true,
    };
  }

  if (
    /about|rachix studio|your team|experience|who are you guys/.test(
      q
    )
  ) {
    return {
      reply:
        "Rachix Studio is a creative web design and development team with 1.5+ years of hands-on experience and 30+ completed projects. We specialize in UI/UX design, responsive websites, e-commerce and custom web solutions.",
      options: false,
    };
  }

  if (/portfolio|personal website|resume website/.test(q)) {
    return {
      reply:
        "Absolutely! 🚀 Our team creates modern portfolio websites with responsive layouts, smooth animations and professional designs.",
      options: false,
    };
  }

  if (/ecommerce|e-commerce|online store|shopping/.test(q)) {
    return {
      reply:
        "Yes! 🛍️ Rachix Studio develops e-commerce websites with product listings, shopping carts and checkout integrations. What kind of store would you like?",
      options: false,
    };
  }

  if (/restaurant|cafe|café|hotel|resort/.test(q)) {
    return {
      reply:
        "Yes! 🍽️ We build professional restaurant, café and hospitality websites with digital menus, galleries and enquiry features.",
      options: false,
    };
  }

  if (/seo|google ranking|search engine/.test(q)) {
    return {
      reply:
        "Our team can build SEO-friendly websites with optimized structure, metadata and performance. Search rankings cannot be guaranteed.",
      options: false,
    };
  }

  if (
    /react|nextjs|next.js|typescript|tailwind|tech stack/.test(q)
  ) {
    return {
      reply:
        "Our development team works with React.js, Next.js, TypeScript, JavaScript and Tailwind CSS to create modern web experiences. 🚀",
      options: false,
    };
  }

  if (/timeline|delivery|days|weeks|deadline/.test(q)) {
    return {
      reply:
        "Website delivery timelines depend on the design, pages and features required. Our team can discuss a suitable timeline with you.",
      options: false,
    };
  }

  if (/website|web app|web development|business/.test(q)) {
    return {
      reply:
        "Great! 💻 Rachix Studio helps businesses establish a professional online presence through modern websites and web applications. What type of website do you need?",
      options: true,
    };
  }

  return {
    reply:
      "Thanks for reaching out! 😊 Tell us a little about your business and the website you need. Our team will be happy to help.",
    options: false,
  };
}

export default function About() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    initialMessage,
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [showWebsiteOptions, setShowWebsiteOptions] =
    useState(false);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messagesRef = useRef<ChatMessage[]>([
    initialMessage,
  ]);

  const messageIdRef = useRef(1);
  const pendingRef = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(false);

  const reducedMotion = useReducedMotion();
  const reduce = Boolean(reducedMotion);
  const duration = reduce ? 0 : DURATION;

  const whatsappUrl = getWhatsAppUrl(
    "Hello Rachix Studio! I would like to know more about your website services."
  );

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      requestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!isChatOpen) return;

    const frame = requestAnimationFrame(() => {
      const container = chatScrollRef.current;
      if (!container) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: reduce ? "auto" : "smooth",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [
    messages,
    isTyping,
    isChatOpen,
    showWebsiteOptions,
    reduce,
  ]);

  useEffect(() => {
    if (!isChatOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsChatOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isChatOpen]);

  const addMessages = useCallback(
    (...items: Omit<ChatMessage, "id">[]) => {
      const nextMessages = items.map((item) => ({
        ...item,
        id: messageIdRef.current++,
      }));

      messagesRef.current = [
        ...messagesRef.current,
        ...nextMessages,
      ];

      if (mountedRef.current) {
        setMessages(messagesRef.current);
      }
    },
    []
  );

  const openWhatsApp = useCallback((message: string) => {
    window.open(
      getWhatsAppUrl(message),
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const generateReply = async (
    query: string,
    history: ChatMessage[]
  ) => {
    const local = getLocalReply(query);
    const normalized = normalize(query);

    const immediateReply =
      /^(hi|hii|hiii|hello|hey|hlo|hy|good morning|good evening|thank you|thanks|thx|thankyou|bye|goodbye|see you|who are you|your name)$/.test(
        normalized
      ) ||
      /^(i need a website|website price)$/.test(
        normalized
      );

    if (immediateReply) {
      if (mountedRef.current) {
        setShowWebsiteOptions(local.options);
      }

      return local.reply;
    }

    const controller = new AbortController();
    requestRef.current = controller;

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          history: history.slice(-8).map(
            ({ sender, text }) => ({
              sender,
              text,
            })
          ),
        }),
        signal: controller.signal,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Chat API unavailable");
      }

      const data: { reply?: string } =
        await response.json();

      if (
        typeof data.reply !== "string" ||
        !data.reply.trim()
      ) {
        throw new Error("Invalid API response");
      }

      if (mountedRef.current) {
        setShowWebsiteOptions(false);
      }

      return data.reply.trim();
    } catch {
      if (mountedRef.current) {
        setShowWebsiteOptions(local.options);
      }

      return local.reply;
    } finally {
      clearTimeout(timeout);

      if (requestRef.current === controller) {
        requestRef.current = null;
      }
    }
  };

  const sendMessage = async (text: string) => {
    const query = text.trim();

    if (!query || pendingRef.current) return;

    pendingRef.current = true;
    setInputVal("");

    const history = messagesRef.current;

    addMessages({
      sender: "user",
      text: query,
    });

    if (isContactIntent(query)) {
      setShowWebsiteOptions(false);

      addMessages({
        sender: "bot",
        text:
          "Of course! 😊 Connect with the Rachix Studio team on WhatsApp. We'd love to help your business grow online.",
      });

      openWhatsApp(
        `Hello Rachix Studio! I visited your website.\n\nMy message: ${query}`
      );

      pendingRef.current = false;
      return;
    }

    setIsTyping(true);

    try {
      const reply = await generateReply(query, history);

      if (mountedRef.current) {
        addMessages({
          sender: "bot",
          text: reply,
        });
      }
    } finally {
      pendingRef.current = false;

      if (mountedRef.current) {
        setIsTyping(false);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(inputVal);
  };

  const handleQuickPrompt = (prompt: string) => {
    if (pendingRef.current) return;

    if (prompt === "Contact") {
      addMessages(
        {
          sender: "user",
          text: "Contact",
        },
        {
          sender: "bot",
          text:
            "Let's connect on WhatsApp! 📱 Our team is ready to help you take your business online.",
        }
      );

      setShowWebsiteOptions(false);

      openWhatsApp(
        "Hello Rachix Studio! I would like to know more about your website services."
      );

      return;
    }

    void sendMessage(prompt);
  };

  const handleWebsiteType = (type: string) => {
    if (pendingRef.current) return;

    addMessages(
      {
        sender: "user",
        text: `I need a ${type} website.`,
      },
      {
        sender: "bot",
        text: `Great choice! 🚀 Our team can help you with a professional ${type} website. Let's connect on WhatsApp.`,
      }
    );

    setShowWebsiteOptions(false);

    openWhatsApp(
      `Hello Rachix Studio! I'm interested in a ${type} website for my business.`
    );
  };

  const reveal = (delay = 0, y = 18) => ({
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

  return (
    <section
      id="about"
      className="relative flex h-full w-full min-w-0 scroll-mt-28 flex-col justify-between overflow-hidden rounded-3xl border border-[#E8D6C4] bg-[#FFF7EF] p-4 text-[#111111] shadow-sm sm:p-6 md:p-8"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#F5C99F]/10 blur-3xl"
      />

      {/* ABOUT RACHIX STUDIO */}
      <div className="relative z-10 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <motion.span
            {...reveal(0.03, 10)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#F5C99F] px-4 py-2 text-xs font-bold shadow-sm"
          >
            <Sparkles size={14} />
            About Rachix Studio
          </motion.span>

          <motion.button
            type="button"
            onClick={() =>
              setIsChatOpen((previous) => !previous)
            }
            aria-expanded={isChatOpen}
            aria-controls="rachix-chat-panel"
            whileHover={
              reduce ? undefined : { scale: 1.04 }
            }
            whileTap={
              reduce ? undefined : { scale: 0.96 }
            }
            transition={{
              duration: reduce ? 0 : 0.2,
            }}
            className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold text-[#F5C99F] shadow-sm transition-colors hover:bg-[#292929] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <Bot size={16} />
            {isChatOpen ? "Close Chat" : "Ask AI"}
          </motion.button>
        </div>

        <motion.h2
          {...reveal(0.08)}
          className="mt-6 break-words text-[clamp(1.5rem,3.5vw,2.4rem)] font-extrabold leading-tight tracking-tight"
        >
          Meet Rachix Studio 🚀
        </motion.h2>

        <motion.p
          {...reveal(0.12)}
          className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 sm:mt-5 sm:text-base sm:leading-8"
        >
          Rachix Studio is a creative web design and
          development team helping businesses build a
          strong digital presence. With{" "}
          <span className="font-semibold text-[#111111]">
            1.5+ years of hands-on experience
          </span>{" "}
          and{" "}
          <span className="font-semibold text-[#111111]">
            30+ successfully completed projects
          </span>
          , we specialize in modern UI/UX design,
          responsive websites, e-commerce solutions
          and custom web development. Our team combines
          creativity, technology and user-focused design
          to deliver professional digital experiences
          that help businesses grow online.
        </motion.p>

        <ul className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
          {highlights.map((item, index) => (
            <motion.li
              key={item}
              {...reveal(0.16 + index * 0.05, 12)}
              className="flex min-w-0 items-start gap-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-white shadow-sm">
                <Check size={16} />
              </span>

              <span className="min-w-0 break-words text-sm font-semibold leading-6 text-[#222222]">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CHAT AREA */}
      <motion.div
        {...reveal(0.12)}
        className="relative z-10 mt-8 min-w-0 overflow-hidden rounded-2xl border border-[#F0D1B3] bg-gradient-to-br from-[#FCE5D0] to-[#F5C99F] p-3 sm:p-5"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/30"
        />

        <AnimatePresence mode="wait" initial={false}>
          {isChatOpen ? (
            <motion.div
              key="chat"
              id="rachix-chat-panel"
              initial={
                reduce
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{
                duration,
                ease,
              }}
              onAnimationComplete={() => {
                inputRef.current?.focus({
                  preventScroll: true,
                });
              }}
              className="relative z-10 min-w-0"
            >
              {/* CHAT HEADER */}
              <div className="flex min-w-0 items-center justify-between gap-2 border-b border-black/10 pb-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] text-[#F5C99F] shadow-sm">
                    <Bot size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-xs font-extrabold sm:text-sm">
                      Rachix Studio AI Assistant
                    </h3>

                    <p className="flex items-center gap-1.5 text-[10px] text-neutral-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      Virtual Assistant
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact on WhatsApp"
                    className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg bg-[#111111] text-[#25D366] transition-colors hover:bg-[#333333]"
                  >
                    <MessageCircle size={18} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsChatOpen(false)}
                    aria-label="Close chat"
                    className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg border border-black/10 transition-colors hover:bg-white/50"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* CHAT MESSAGES */}
              <div
                ref={chatScrollRef}
                role="log"
                aria-live="polite"
                aria-label="Chat conversation"
                className="my-3 flex h-52 min-h-0 flex-col gap-2 overflow-x-hidden overflow-y-auto overscroll-contain pr-1 sm:h-56 lg:h-60"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "thin",
                }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={
                      reduce
                        ? false
                        : {
                            opacity: 0,
                            y: 8,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration,
                      ease,
                    }}
                    className={`flex shrink-0 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2.5 text-xs leading-5 shadow-sm sm:max-w-[85%] ${
                        message.sender === "user"
                          ? "rounded-br-sm bg-[#111111] text-white"
                          : "rounded-bl-sm border border-white/60 bg-white/90 text-[#222222]"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {/* TYPING INDICATOR */}
                {isTyping && (
                  <motion.div
                    role="status"
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, y: 8 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{ duration }}
                    className="flex w-fit shrink-0 items-center gap-2 self-start rounded-2xl bg-white/90 px-3 py-2.5 text-xs text-neutral-600 shadow-sm"
                  >
                    <Bot size={14} />
                    <span>Assistant is typing</span>

                    <span className="flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={
                            reduce
                              ? undefined
                              : {
                                  opacity: [0.3, 1, 0.3],
                                }
                          }
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: dot * 0.15,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-[#B87A48]"
                        />
                      ))}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* QUICK PROMPTS */}
              <div className="mb-3 flex flex-wrap gap-2">
                {(showWebsiteOptions
                  ? websiteTypes
                  : quickPrompts
                ).map((item) => (
                  <motion.button
                    key={item}
                    type="button"
                    disabled={isTyping}
                    onClick={() => {
                      if (showWebsiteOptions) {
                        handleWebsiteType(item);
                      } else {
                        handleQuickPrompt(item);
                      }
                    }}
                    whileTap={
                      reduce
                        ? undefined
                        : { scale: 0.96 }
                    }
                    className={`min-h-9 touch-manipulation rounded-full px-3 py-2 text-[11px] font-semibold transition-colors disabled:opacity-50 ${
                      showWebsiteOptions
                        ? "bg-[#111111] text-[#F5C99F] hover:bg-[#333333]"
                        : "border border-black/10 bg-white/80 text-[#111111] hover:bg-white"
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              {/* INPUT */}
              <form
                onSubmit={handleSubmit}
                className="flex min-w-0 items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  maxLength={1000}
                  disabled={isTyping}
                  onChange={(event) =>
                    setInputVal(event.target.value)
                  }
                  placeholder="Ask me anything..."
                  aria-label="Type your message"
                  className="min-h-11 min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-3 text-base text-[#111111] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-neutral-500 focus:border-[#C68B58] focus:ring-2 focus:ring-[#C68B58]/20 disabled:opacity-60"
                />

                <motion.button
                  type="submit"
                  disabled={isTyping || !inputVal.trim()}
                  aria-label="Send message"
                  whileTap={
                    reduce
                      ? undefined
                      : { scale: 0.92 }
                  }
                  className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl bg-[#111111] text-[#F5C99F] transition-colors hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={17} />
                </motion.button>
              </form>

              <p className="mt-3 text-center text-[10px] leading-5 text-neutral-600">
                AI responses may contain mistakes.
                Confirm important details with our team.
              </p>
            </motion.div>
          ) : (
            /* CONTACT BANNER */
            <motion.div
              key="contact"
              initial={
                reduce
                  ? false
                  : { opacity: 0, y: 10 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{
                duration,
                ease,
              }}
              className="relative z-10 flex min-w-0 flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white/70 bg-[#111111] shadow-md sm:h-16 sm:w-16">
                  <Users
                    size={28}
                    className="text-[#F5C99F]"
                  />

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#111111] bg-emerald-500" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold">
                    let Grow Your Business Online
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-neutral-700">
                    Connect with our team for professional
                    web design and development services.
                  </p>
                </div>
              </div>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={
                  reduce
                    ? undefined
                    : { scale: 1.03 }
                }
                whileTap={
                  reduce
                    ? undefined
                    : { scale: 0.97 }
                }
                transition={{
                  duration: reduce ? 0 : 0.2,
                }}
                className="group inline-flex min-h-11 w-full shrink-0 touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#333333] sm:w-auto"
              >
                <MessageCircle
                  size={17}
                  className="text-[#25D366]"
                />

                Connect on WhatsApp

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
