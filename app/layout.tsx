import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

const quickSand = Quicksand({
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monitoring PKL",
  description: "Dibuat oleh siswa SMK Muhammadiyah 1 Jakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quickSand.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
