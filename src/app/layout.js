import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "ReadMyHack",
  description: "Turn your GitHub repo into a hackathon submission.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <footer className="w-full py-4 mt-10 text-center text-sm text-secondary border-t border-white/5 bg-background/80 backdrop-blur-sm">
          Made with ☕ by{" "}
          <a
            href="https://x.com/kaurmanjot20"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E07A2F] hover:text-[#C9651E] font-medium transition-colors"
          >
            Manjot Kaur
          </a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
