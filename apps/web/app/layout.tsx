import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dinnext = localFont({
  src: "./fonts/dinnextw1g.woff2",
  variable: "--font-dinnext",
});
const drukwide = localFont({
  src: "./fonts/DrukWideBold.woff2",
  variable: "--font-drukwide-bold",
});
const markPro = localFont({
  src: [
    {
      path: "./fonts/FontFont_FF.Mark.Pro.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/FontFont_FF.Mark.Pro.Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/FontFont_FF.Mark.Pro.Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mark-pro",
});
const tungsten = localFont({
  src: "./fonts/Tungsten-Bold.woff2",
  variable: "--font-tungsten",
});

export const metadata: Metadata = {
  title: "Valorant Wiki",
  description: "Fandom and Wiki app for Valorant players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${dinnext.variable} ${drukwide.variable} ${markPro.variable} ${tungsten.variable}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}