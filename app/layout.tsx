import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "School Management System",
  description:
    "A complete School Management System built with Next.js and MongoDB. It includes role-based access, attendance tracking, student and teacher management, class scheduling, fee management, and robust admin dashboards—all optimized for real production use.",
  abstract:
    "This application streamlines school operations with digital tools for students, teachers, and administrators.",
  
  applicationName: "School Management System",
  
  appleWebApp: {
    capable: true,
    startupImage: "/images/logo.png",
    statusBarStyle: "black",
    title: "School Management",
  },

  alternates: {
    canonical: "https://schoolmanagementapp-coral.vercel.app/",
    languages: {
      "eng-US": "https://schoolmanagementapp-coral.vercel.app/",
    },
  },

  assets: "/images",

  authors: {
    name: "Aditya Rawat",
    url: "https://www.linkedin.com/in/aditya-rawat-3862182b0/",
  },

  openGraph: {
    title: "School Management System",
    description:
      "A powerful full-stack School Management System built using Next.js and MongoDB.",
    url: "https://schoolmanagementapp-coral.vercel.app/",
    siteName: "School Management System",
    images: ["/images/og-banner.png"],
    locale: "en_US",
    type: "website",
  },

  category: "Education Technology",
  creator: "Aditya Rawat",
  generator: "School Management System | Next.js",
  publisher: "Aditya Rawat",

  icons: "/images/logo.png",

  keywords: [
    "school management system",
    "sms software",
    "nextjs school app",
    "school admin dashboard",
    "student portal",
    "teacher portal",
    "aditya rawat school project",
  ],

  manifest: "/manifest.json",

  robots: {
    index: true,
    follow: true,
  },

  twitter: {
    card: "summary_large_image",
    title: "School Management System",
    description:
      "A complete digital solution for managing school operations, built with Next.js and MongoDB.",
    images: ["/images/og-banner.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="w-full"> 
          <NavBar />
          {/* <NavbarV2/> */}
          {children}
        </div>
      </body>
    </html>
  );
}
