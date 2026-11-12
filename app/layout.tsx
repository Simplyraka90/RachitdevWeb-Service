import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Rachit Dev | Web Development Services",
  description: "Responsive React and Next.js development, UI/UX implementation and modern web applications.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FFFAF5" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen bg-[#FFFAF5] font-sans text-[#111] antialiased">{children}</body></html>;
}
