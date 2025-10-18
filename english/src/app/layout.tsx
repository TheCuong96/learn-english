import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '700'],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "Luyện tập động từ - 804 verbs",
  description: "Ứng dụng học 804 động từ tiếng Anh với flashcards, trắc nghiệm, điền chỗ trống",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${beVietnamPro.variable} antialiased bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 text-slate-100 flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
