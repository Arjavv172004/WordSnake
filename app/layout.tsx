import type { Metadata } from "next";
import { Poppins, Anton } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snake Game",
  description: "A modern take on the classic Snake game.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${anton.variable}`}>
      <body className="font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
