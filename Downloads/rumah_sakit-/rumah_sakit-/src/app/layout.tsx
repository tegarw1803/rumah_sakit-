import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { HospitalProvider } from "@/lib/hospital-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RS Sehat Selalu - Layanan Kesehatan Terpercaya",
  description: "Rumah Sakit Sehat Selalu menyediakan layanan kesehatan profesional dengan tim dokter berpengalaman dan fasilitas modern",
  keywords: ["rumah sakit", "layanan kesehatan", "dokter", "klinik", "medical care"],
  authors: [{ name: "RS Sehat Selalu" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HospitalProvider>
            {children}
          </HospitalProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
