
import type { Metadata, Viewport } from "next";
import "./globals.css";
<meta name="google-site-verification" content="qtnEffN9GqG3y0ZEwBul4xutbA1g_FLV7gmfgv3JX5o" />
export const metadata: Metadata = {
  title: "Rachit Dev | Web Development Services",
  description:
    "Responsive React and Next.js development, UI/UX implementation and modern web applications.",

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
