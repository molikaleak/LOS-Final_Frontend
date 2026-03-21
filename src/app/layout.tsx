import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinTrack LOS — Loan Origination System",
  description:
    "Enterprise loan origination and management platform for modern lending operations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <TooltipProvider delay={0}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
