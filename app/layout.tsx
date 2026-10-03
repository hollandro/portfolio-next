import { Playfair_Display, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import Navlinks from "./Navlinks";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--body" });

export const metadata: Metadata = {
  title: "Rochelle Holland | Developer & Flyer Designer",
  description: "Computer Science student and flyer designer in Denver, Colorado.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <header className="nav">
          <Link href="/" className="logo">R.H</Link>
          <Navlinks />
        </header>
        {children}
        <footer className="foot">© {new Date().getFullYear()} Rochelle Holland. All rights reserved.</footer>
      </body>
    </html>
  );
}