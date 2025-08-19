import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchnellDeutsch - Învață Germană Rapid & Eficient",
  description: "Platformă de învățare a limbii germane pentru vorbitori nativi de română. De la zero la conversație fluentă în 6 luni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>{children}</body>
    </html>
  );
}