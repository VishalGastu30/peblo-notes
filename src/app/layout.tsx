import type { Metadata } from "next";
import { bodoniModa, hankenGrotesk, jetbrainsMono } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Peblo Notes | Thought, Refined.",
  description: "The intelligent canvas for high-stakes thinkers. Harness the power of generative AI.",
};

import { MotionProvider } from "@/components/providers/motion-provider";
import { SessionProvider } from "@/components/providers/session-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${hankenGrotesk.variable} ${bodoniModa.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <MotionProvider>
            {children}
          </MotionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
