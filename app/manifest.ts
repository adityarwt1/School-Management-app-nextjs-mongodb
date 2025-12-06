import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "School Management System",
    short_name: "SchoolMS",
    description:
      "A full-featured School Management System built with Next.js and MongoDB, including student information, teacher modules, attendance tracking, classes, fees, and admin dashboards.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0055ff",
    scope: "/",
    orientation: "portrait-primary",
    categories: [
      "education",
      "school",
      "management",
      "admin dashboard",
      "student portal",
      "teacher portal",
    ],
    lang: "en-IN",

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
