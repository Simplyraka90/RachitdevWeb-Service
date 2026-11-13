
"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Check,
  UserRound,
  Bot,
  Send,
  X,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

type LocalReply = {
  keywords: string[];
  reply: string;
  showOptions?: boolean;
};

const highlights = [
  "B.Tech Graduate — Computer Science & Design",
  "Frontend Developer | React.js & Next.js",
  "7 Months of Professional Experience",
  "30+ Projects Successfully Completed",
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

const localReplies: LocalReply[] = [
  {
    keywords: ["hi", "hii", "hiii", "hy", "hello", "hlo", "hey"],
    reply:
      "Hello! 👋 Welcome to Rachix Studio. How can I help you today?",
  },
  {
    keywords: ["good morning", "gm"],
    reply: "Good morning! ☀️ How can I help you?",
  },
  {
    keywords: ["good afternoon"],
    reply: "Good afternoon! 😊 How can I assist you?",
  },
  {
    keywords: ["good evening"],
    reply: "Good evening! 🌆 Welcome to Rachix Studio!",
  },
  {
    keywords: ["how are you", "how r u", "how are u"],
    reply:
      "I'm doing great! 😊 Thanks for asking. How can I help?",
  },
  {
    keywords: ["who are you", "your name"],
    reply:
      "I'm Rachix Studio AI Assistant 🤖, here to help with professional website design and development services.",
  },
  {
    keywords: ["thank you", "thanks", "thx"],
    reply: "You're welcome! 😊 Anything else I can help with?",
  },
  {
    keywords: ["ok", "okay"],
    reply: "Great! 👍 Let me know if you need anything else.",
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    reply: "Goodbye! 👋 Have a wonderful day!",
  },
  {
    keywords: ["i need a website", "need a website"],
    reply:
      "Great! 🚀 What type of website do you need? Choose an option below.",
    showOptions: true,
  },
  {
    keywords: ["website price", "price", "pricing", "cost"],
    reply:
      "Website pricing depends on design, features and project requirements. 💰 What type of website do you need?",
    showOptions: true,
  },
];

const INITIAL_MESSAGE: ChatMessage = {
  sender: "bot",
  text:
    "Hey there! 👋 Welcome to Rachix Studio. How can I help you?",
};

const WHATSAPP_NUMBER = "918576971890";
const API_TIMEOUT = 8000;

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[?!.,]/g, "")
    .replace(/\s+/g, " ");
}

function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

function isWhatsAppIntent(message: string): boolean {
  const q = normalizeText(message);

  const patterns = [
    /^(contact|whatsapp|connect me|contact me|call me)$/,
    /\blet'?s (connect|talk|meet|discuss)\b/,
    /\b(connect me|connect with you|contact rachit|contact rachix studio)\b/,
    /\b(book|schedule|arrange|set up)\s+(a\s+)?(call|meeting|consultation)\b/,
    /\b(how can (we|i)|can we)\s+(connect|meet|talk|contact)\b/,
    /\b(i want to|i would like to|i'd like to)\s+(connect|meet|talk|contact|hire)\b/,
    /\b(hire you|hire rachit|hire rachix studio|want to hire you)\b/,
    /\b(send me|share)\s+(your\s+)?(whatsapp|contact number)\b/,
    /\bmujhe\s+(aapse\s+)?(baat|contact|connect)\s+karni\s+hai\b/,
    /\baapse\s+baat\s+karni\s+hai\b/,
    /\bmeeting\s+(fix|karni)\b/,
    /\bcall\s+karni\s+hai\b/,
  ];

  return patterns.some((pattern) => pattern.test(q));
}

function getSmartLocalReply(message: string): string {
  const q = normalizeText(message);

  if (
    /price|pricing|cost|budget|charge|kitna|paisa|how much|rate/.test(q)
  ) {
    return "Website pricing depends on the design, number of pages, features and integrations. 💰 Share your project requirements and budget, and our team can discuss a suitable quote on WhatsApp.";
  }

  if (/portfolio|personal website|resume website/.test(q)) {
    return "Absolutely! 🚀 Rachix Studio creates modern, responsive portfolio websites with project showcases, skills, animations and contact forms. Do you need a personal or professional portfolio?";
  }

  if (/ecommerce|e-commerce|online store|shopping website/.test(q)) {
    return "Yes! 🛍️ Rachix Studio can discuss an e-commerce website with product listings, categories, shopping cart and checkout features. What kind of products will you sell?";
  }

  if (/restaurant|cafe|café|food delivery|hotel|resort/.test(q)) {
    return "Yes! 🍽️ Rachix Studio develops restaurant, café and hospitality websites with menus, galleries, booking inquiry forms and responsive layouts. What features do you need?";
  }

  if (/business|company|startup|corporate/.test(q)) {
    return "Rachix Studio creates professional business websites with modern UI, service pages, contact forms and mobile-friendly layouts. What type of business do you run?";
  }

  if (/seo|google ranking|search engine/.test(q)) {
    return "Rachix Studio can discuss SEO-friendly website structure, metadata, responsive design and performance optimization. Google rankings cannot be guaranteed. Are you building a new website or improving an existing one?";
  }

  if (/react|nextjs|next.js|typescript|tailwind|technology|tech stack/.test(q)) {
    return "Rachix Studio uses React.js, Next.js, TypeScript, JavaScript and Tailwind CSS to build fast, responsive and scalable web interfaces. 🚀";
  }

  if (/timeline|delivery|days|weeks|how long|deadline/.test(q)) {
    return "Project delivery time depends on the number of pages, features and complexity. ⏱️ Share your requirements so our team can discuss a realistic timeline.";
  }

  if (/who is rachit|about rachit|about you|your services|about rachix/.test(q)) {
    return "Rachix Studio is a professional web design and development service founded by Rachit Rathore, a Frontend Developer and UI/UX Designer. We help clients create professional digital experiences.";
  }

  if (/website|web development|web app|web application|site/.test(q)) {
    return "Yes! 💻 Rachix Studio develops responsive websites and modern web applications using React, Next.js, TypeScript and Tailwind CSS. What type of website are you planning?";
  }

  return "Thanks for your message! 😊 Rachix Studio specializes in professional website development and modern UI/UX. Could you share a little more about your project?";
}

export default function About() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWebsiteOptions, setShowWebsiteOptions] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    INITIAL_MESSAGE,
  ]);

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([INITIAL_MESSAGE]);
  const pendingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  const generalWhatsAppUrl = whatsappUrl(
    "Hello Rachix Studio! I visited your website and would like to discuss a web development project."
  );

  // Cleanup pending requests on unmount
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  // Efficient chat scrolling
  useEffect(() => {
    if (!isChatOpen) return;

    const frame = requestAnimationFrame(() => {
      const container = chatRef.current;

      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [
    messages,
    isTyping,
    showWebsiteOptions,
    isChatOpen,
  ]);

  const openWhatsApp = (message: string) => {
    window.open(
      whatsappUrl(message),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const addMessages = (...newMessages: ChatMessage[]) => {
    const updated = [
      ...messagesRef.current,
      ...newMessages,
    ];

    messagesRef.current = updated;

    if (mountedRef.current) {
      setMessages(updated);
    }
  };

  const generateBotReply = async (
    query: string,
    history: ChatMessage[]
  ): Promise<string> => {
    const cleanQuery = normalizeText(query);

    const localMatch = localReplies.find((item) =>
      item.keywords.some(
        (keyword) => normalizeText(keyword) === cleanQuery
      )
    );

    if (localMatch) {
      setShowWebsiteOptions(
        localMatch.showOptions ?? false
      );

      return localMatch.reply;
    }

    setShowWebsiteOptions(false);

    const fallbackReply = getSmartLocalReply(query);
    const controller = new AbortController();

    abortRef.current = controller;

    const timeout = setTimeout(() => {
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
          history: history.slice(-8),
        }),
        signal: controller.signal,
        cache: "no-store",
      });

      if (!response.ok) {
        return fallbackReply;
      }

      const data: { reply?: string } | null =
        await response.json().catch(() => null);

      if (
        typeof data?.reply === "string" &&
        data.reply.trim()
      ) {
        return data.reply.trim();
      }

      return fallbackReply;
    } catch {
      return fallbackReply;
    } finally {
      clearTimeout(timeout);

      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  };

  const triggerMessage = async (text: string) => {
    const query = text.trim();

    if (!query || pendingRef.current) return;

    pendingRef.current = true;
    setInputVal("");

    const history = messagesRef.current;

    addMessages({
      sender: "user",
      text: query,
    });

    // Direct contact requests
    if (isWhatsAppIntent(query)) {
      setShowWebsiteOptions(false);

      addMessages({
        sender: "bot",
        text:
          "Of course! 😊 Let's connect on WhatsApp to discuss your project or schedule a meeting.",
      });

      const message =
        `Hello Rachix Studio! 👋\n` +
        `I visited your website.\n\n` +
        `I would like to connect with your team.\n\n` +
        `My message: ${query}`;

      openWhatsApp(message);

      pendingRef.current = false;
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    try {
      const reply = await generateBotReply(query, history);

      if (reply && mountedRef.current) {
        addMessages({
          sender: "bot",
          text: reply,
        });
      }
    } catch {
      if (mountedRef.current) {
        addMessages({
          sender: "bot",
          text: getSmartLocalReply(query),
        });
      }
    } finally {
      pendingRef.current = false;

      if (mountedRef.current) {
        setIsTyping(false);
      }
    }
  };

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void triggerMessage(inputVal);
  };

  const handleWebsiteTypeSelect = (type: string) => {
    if (pendingRef.current) return;

    addMessages(
      {
        sender: "user",
        text: `I need a ${type} website.`,
      },
      {
        sender: "bot",
        text: `Great choice! 🚀 Let's discuss your ${type} project directly on WhatsApp.`,
      }
    );

    setShowWebsiteOptions(false);

    openWhatsApp(
      `Hello Rachix Studio! I want to build a ${type} website. Let's discuss the requirements.`
    );
  };

  const handleQuickPrompt = (prompt: string) => {
    if (prompt === "Contact") {
      addMessages(
        {
          sender: "user",
          text: "Contact",
        },
        {
          sender: "bot",
          text:
            "Let's connect on WhatsApp! 📱 You can share your project requirements there.",
        }
      );

      setShowWebsiteOptions(false);

      window.open(
        generalWhatsAppUrl,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    void triggerMessage(prompt);
  };

  return (
    <section
      id="about"
      className="relative flex h-full min-w-0 w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E8D6C4] bg-[#FFF7EF] p-5 text-[#111111] sm:p-8"
    >
      {/* ABOUT CONTENT */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F5C99F] px-4 py-2 text-xs font-bold">
            <Sparkles size={14} />
            About Me
          </span>

          <button
            type="button"
            onClick={() => setIsChatOpen((prev) => !prev)}
            aria-expanded={isChatOpen}
            aria-controls="rachix-chat-panel"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold text-[#F5C99F] transition-colors duration-200 hover:bg-[#292929]"
          >
            <Bot size={16} />
            {isChatOpen ? "Close Chat" : "Ask AI"}
          </button>
        </div>

        <h2 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          Hi, I&apos;m Rachit Rathore 👋
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
          A Frontend Developer and UI/UX Designer who
          loves building modern, scalable, and
          user-friendly web experiences. I focus on
          clean UI, performance, and real-world solutions
          that help businesses grow online.
        </p>

        <ul className="mt-7 space-y-4">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex min-w-0 items-start gap-3"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-white">
                <Check size={16} />
              </span>

              <span className="min-w-0 text-sm font-semibold leading-6 text-[#222222]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CHAT / CONTACT BANNER */}
      <div className="relative mt-8 min-w-0 overflow-hidden rounded-2xl border border-[#F0D1B3] bg-gradient-to-br from-[#FCE5D0] to-[#F5C99F] p-4 sm:p-5">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full bg-white/30" />

        {isChatOpen ? (
          <div
            id="rachix-chat-panel"
            className="relative z-10 min-w-0"
          >
            {/* CHAT HEADER */}
            <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-3">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#111111] text-[#F5C99F]">
                  <Bot size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xs font-extrabold sm:text-sm">
                    Rachix Studio AI Assistant
                  </h3>

                  <p className="flex items-center gap-1.5 text-[10px] text-neutral-700">
                    <span className="size-2 rounded-full bg-emerald-600" />
                    Virtual Assistant
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact on WhatsApp"
                  className="flex size-8 items-center justify-center rounded-lg bg-[#111111] text-[#25D366] transition-colors hover:bg-[#333333]"
                >
                  <MessageCircle size={17} />
                </a>

                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close chat"
                  className="flex size-8 items-center justify-center rounded-lg border border-black/10 transition-colors hover:bg-white/50"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES */}
            <div
              ref={chatRef}
              role="log"
              aria-live="polite"
              aria-label="Chat conversation"
              className="my-3 flex h-40 min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain pr-1 sm:h-44"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-xs leading-5 shadow-sm ${
                      message.sender === "user"
                        ? "rounded-br-sm bg-[#111111] text-white"
                        : "rounded-bl-sm border border-white/60 bg-white/90 text-[#222222]"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div
                  role="status"
                  className="self-start rounded-2xl bg-white/90 px-3 py-2 text-xs text-neutral-600"
                >
                  Assistant is typing...
                </div>
              )}
            </div>

            {/* QUICK OPTIONS */}
            {showWebsiteOptions ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {websiteTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    disabled={isTyping}
                    onClick={() =>
                      handleWebsiteTypeSelect(type)
                    }
                    className="rounded-lg bg-[#111111] px-3 py-1.5 text-[11px] font-semibold text-[#F5C99F] transition-colors hover:bg-[#333333] disabled:opacity-50"
                  >
                    {type}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isTyping}
                    onClick={() =>
                      handleQuickPrompt(prompt)
                    }
                    className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-semibold transition-colors hover:bg-white disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT */}
            <form
              onSubmit={handleSend}
              className="flex min-w-0 items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                maxLength={1000}
                disabled={isTyping}
                onChange={(event) =>
                  setInputVal(event.target.value)
                }
                placeholder="Ask me anything..."
                aria-label="Type your message"
                className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-3 text-base text-[#111111] outline-none transition-colors placeholder:text-neutral-500 focus:border-[#C68B58] focus:ring-2 focus:ring-[#C68B58]/20 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={isTyping || !inputVal.trim()}
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-[#F5C99F] transition-colors hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={17} />
              </button>
            </form>

            <p className="mt-2 text-center text-[10px] text-neutral-600">
              AI responses may contain mistakes.
              Confirm project details directly.
            </p>
          </div>
        ) : (
          /* ORIGINAL CONTACT BANNER */
          <div className="relative z-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-white/70 bg-[#111111] shadow-md sm:size-16">
                <UserRound
                  size={30}
                  className="text-[#F5C99F]"
                />

                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#111111] bg-emerald-500" />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-extrabold">
                  Let&apos;s Build Together
                </h3>

                <p className="mt-1 text-xs leading-5 text-neutral-700">
                  Have a project in mind? Let&apos;s talk.
                </p>
              </div>
            </div>

            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#333333] sm:w-auto"
            >
              <MessageCircle
                size={17}
                className="text-[#25D366]"
              />

              Connect on WhatsApp

              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
