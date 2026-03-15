import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCalculators, categories } from "@/data/calculators";

interface SitemapUrl {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://smartcalchub.com";
  const calculators = getAllCalculators();

  const urls: SitemapUrl[] = [
    { loc: baseUrl, priority: "1.0", changefreq: "daily" },
    ...categories.map((cat) => ({
      loc: `${baseUrl}/category/${cat.slug}`,
      priority: "0.8",
      changefreq: "weekly",
    })),
    ...calculators.map((calc) => ({
      loc: `${baseUrl}/${calc.slug}`,
      priority: "0.9",
      changefreq: "weekly",
      lastmod: calc.lastUpdated,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.send(sitemap);
}