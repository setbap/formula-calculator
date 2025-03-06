import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ماشین حساب فرمول",
    short_name: "فرمول",
    description: "برنامه محاسبه فرمول‌های مهندسی",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    orientation: "portrait-primary",
    // @ts-ignore
    form_factor: "wide",
    icons: [
      {
        src: "/web-app-manifest-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/desktop.png",
        sizes: "1280x749",
        type: "image/png",
        // @ts-ignore
        form_factor: "wide",
        label: "حالت دسکتاپ",
      },
      {
        src: "/mobile.png",
        sizes: "750x1458",
        type: "image/png",
        // @ts-ignore
        label: "حالت موبایل",
      },
    ],
  };
}
