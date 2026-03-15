import { GetServerSideProps } from "next";

export default function Robots() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://smartcalchub.com/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};