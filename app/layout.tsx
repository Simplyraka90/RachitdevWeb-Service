
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rachix Studio | Professional Web Design & Development",

  description:
    "Rachix Studio offers affordable, professional website design and development services for businesses, cafés, restaurants, hotels, e-commerce stores and portfolios.",

  keywords: [
    "Rachix Studio",
    "Website Development Services",
    "Professional Web Design",
    "Affordable Website Design",
    "Business Website Development",
    "Cafe Website Design",
    "Restaurant Website Development",
    "Hotel Website Design",
    "E-Commerce Website Development",
    "Portfolio Website Design",
    "Custom Website Development",
    "Responsive Website Design",
    "Web Development Services India",
  ],

  verification: {
    google: "qtnEffN9GqG3y0ZEwBul4xutbA1g_FLV7gmfgv3JX5o",
  },

  openGraph: {
    title: "Rachix Studio | Professional Web Design & Development",
    description:
      "Professional, modern and affordable websites for businesses, cafés, restaurants, hotels and online stores.",
    url: "https://rachitdevwebser.vercel.app/",
    siteName: "Rachix Studio",
    type: "website",
    locale: "en_IN",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/weblog.png",
    shortcut: "/weblog.png",
    apple: "/weblog.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFAF5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFFAF5] font-sans text-[#111] antialiased">
        {children}
      </body>
    </html>
  );
}
