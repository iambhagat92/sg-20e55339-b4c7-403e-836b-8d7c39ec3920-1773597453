import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, getCalculatorsByCategory, calculators } from "@/data/calculators";
import { CalculatorData } from "@/types/calculator";
import { ArrowRight, Star, ChevronRight } from "lucide-react";

interface CategoryPageProps {
  category: typeof categories[0];
  calculators: CalculatorData[];
}

export default function CategoryPage({ category, calculators }: CategoryPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://smartcalchub.com/${category.slug}`,
  };

  return (
    <>
      <Head>
        <title>{category.name} - Free Online Calculators | SmartCalcHub</title>
        <meta name="description" content={category.description} />
        <link rel="canonical" href={`https://smartcalchub.com/${category.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{category.name}</span>
            </nav>
          </div>
        </div>

        <main className="container py-8 lg:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calc) => (
                <Link key={calc.id} href={`/${calc.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {calc.title}
                        </CardTitle>
                        {calc.featured && (
                          <Badge variant="secondary" className="shrink-0">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {calc.description}
                      </p>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Open Calculator
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-xl font-semibold mb-4">Explore Other Categories</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories
                  .filter((c) => c.id !== category.id)
                  .map((c) => (
                    <Link key={c.id} href={`/${c.slug}`}>
                      <Button variant="outline" size="sm">
                        {c.name}
                      </Button>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((cat) => ({
    params: { category: cat.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.category as string;
  const category = categories.find((c) => c.slug === categorySlug);
  
  if (!category) {
    return { notFound: true };
  }

  const categoryCalculators = getCalculatorsByCategory(category.id);

  return {
    props: {
      category,
      calculators: categoryCalculators,
    },
  };
};