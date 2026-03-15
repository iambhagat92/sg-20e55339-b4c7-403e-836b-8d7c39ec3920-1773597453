import { GetServerSideProps } from "next";
import { getAllCalculators, categories } from "@/data/calculators";

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://smartcalchub.com";
  const calculators = getAllCalculators();
  
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const categoryPages = categories.map((cat) => `/${cat.slug}`);
  const calculatorPages = calculators.map((calc) => `/${calc.slug}`);

  const allUrls = [
    ...staticPages.map((page) => ({ url: `${baseUrl}${page}`, priority: "1.0", changefreq: "daily" })),
    ...categoryPages.map((page) => ({ url: `${baseUrl}${page}`, priority: "0.9", changefreq: "weekly" })),
    ...calculatorPages.map((page) => ({ url: `${baseUrl}${page}`, priority: "0.8", changefreq: "monthly" })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};