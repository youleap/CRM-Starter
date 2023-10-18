import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { AppQueryClientProvider } from "@/providers/AppQueryClientProvider";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM Example",
  description: "A Youleap CRM example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <AppQueryClientProvider>
            {children}
            <Toaster />
          </AppQueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
