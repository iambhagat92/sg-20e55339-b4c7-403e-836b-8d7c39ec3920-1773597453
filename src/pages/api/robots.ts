import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://smartcalchub.com/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.send(robotsTxt);
}