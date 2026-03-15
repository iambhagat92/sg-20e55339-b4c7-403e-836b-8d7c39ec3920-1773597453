import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories, getFeaturedCalculators, getAllCalculators } from "@/data/calculators";
import { Calculator, ArrowRight, Star, Search, TrendingUp, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredCalculators = getFeaturedCalculators();
  const allCalculators = getAllCalculators();
  
  const filteredCalculators = searchQuery 
    ? allCalculators.filter(calc => 
        calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SmartCalcHub",
    description: "Free online calculators for finance, health, math, conversions, and daily life. Fast, accurate, and easy to use.",
    url: "https://smartcalchub.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://smartcalchub.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <title>SmartCalcHub - Free Online Calculators | Finance, Health, Math Tools</title>
        <meta name="description" content="Free online calculators for finance, health, math, conversions, and daily life. Calculate mortgage, BMI, percentages, and more. Fast, accurate, and easy to use." />
        <meta name="keywords" content="calculator, online calculator, free calculator, finance calculator, health calculator, math calculator, conversion calculator" />
        <link rel="canonical" href="https://smartcalchub.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>500+ Free Calculators</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Smart Calculators for
                <span className="gradient-text"> Every Need</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Free online calculators for finance, health, math, and daily life. 
                Fast, accurate, and designed to help you make better decisions.
              </p>

              <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-full shadow-lg"
                />
              </div>

              {searchQuery && (
                <div className="text-left max-w-xl mx-auto bg-card rounded-xl shadow-lg border overflow-hidden">
                  {filteredCalculators.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                      {filteredCalculators.map((calc) => (
                        <Link
                          key={calc.id}
                          href={`/${calc.slug}`}
                          className="flex items-center justify-between p-4 hover:bg-muted transition-colors border-b last:border-0"
                        >
                          <div>
                            <p className="font-medium">{calc.title}</p>
                            <p className="text-sm text-muted-foreground">{calc.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No calculators found. Try a different search.
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Calculators</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">10M+</p>
                  <p className="text-sm text-muted-foreground">Monthly Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Free to Use</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Browse by Category
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/${category.slug}`}>
                <Card className="h-full hover:shadow-md transition-all hover:-translate-y-1 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calculator className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                    <div className="mt-4 text-sm text-primary font-medium">
                      {category.calculators.length} calculators →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Calculators</h2>
              <Link href="/finance-calculators">
                <Button variant="ghost" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCalculators.map((calc) => (
                <Link key={calc.id} href={`/${calc.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {calc.title}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          <Star className="w-3 h-3" />
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {calc.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose SmartCalcHub?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Instant calculations with no loading time. Get results as you type.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Free</h3>
                <p className="text-muted-foreground">
                  No hidden fees, no registration required. Free access to all calculators.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Always Accurate</h3>
                <p className="text-muted-foreground">
                  Built with precision formulas and regularly verified for accuracy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Calculating?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join millions of users who trust SmartCalcHub for their daily calculations.
              Free, fast, and always accurate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/finance-calculators">
                <Button size="lg" variant="secondary" className="gap-2">
                  Browse Calculators <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t py-12 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold">SmartCalcHub</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Free online calculators for every need. Fast, accurate, and easy to use.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {categories.slice(0, 4).map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/${cat.slug}`} className="hover:text-foreground transition-colors">
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Popular</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/mortgage-calculator" className="hover:text-foreground transition-colors">Mortgage Calculator</Link></li>
                  <li><Link href="/bmi-calculator" className="hover:text-foreground transition-colors">BMI Calculator</Link></li>
                  <li><Link href="/percentage-calculator" className="hover:text-foreground transition-colors">Percentage Calculator</Link></li>
                  <li><Link href="/age-calculator" className="hover:text-foreground transition-colors">Age Calculator</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2026 SmartCalcHub. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}