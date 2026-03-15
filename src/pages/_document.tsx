import { Html, Head, Main, NextScript } from "next/document";
import { SEOElements } from "@/components/SEO";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <SEOElements
          title="SmartCalcHub - Free Online Calculators"
          description="Free online calculators for finance, health, math, conversions, and daily life. Fast, accurate, and easy to use."
          image="https://smartcalchub.com/og-image.png"
          url="https://smartcalchub.com"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}