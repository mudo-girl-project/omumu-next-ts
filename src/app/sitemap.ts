import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://omumu.vercel.app",
      priority: 1,
    },
    {
      url: "https://omumu.vercel.app/about",
      priority: 0.8,
    },
  ];
}
