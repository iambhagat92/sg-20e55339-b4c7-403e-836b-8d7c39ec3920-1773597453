import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories, getCalculatorsByCategory } from "@/data/calculators";
import { ArrowLeft, Calculator, ArrowRight } from "lucide-react";

interface CategoryPageProps {
  category: (typeof categories)[0];
  calculators: ReturnType<typeof getCalculatorsByCategory>;
}

export default function CategoryPage({ category, calculators }: CategoryPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://smartcalchub.com/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://smartcalchub.com/${calc.slug}`,
        name: calc.title,
      })),
    },
  };

  return (
    <>
      <Head>
        <title>{category.name} - Free Online Calculators | SmartCalcHub</title>
        <meta name="description" content={category.description} />
        <link rel="canonical" href={`https://smartcalchub.com/category/${category.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                {calculators.length} Calculators
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{category.name}</h1>
              <p className="text-lg text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid gap-6">
              {calculators.map((calc) => (
                <Link key={calc.id} href={`/${calc.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Calculator className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold mb-1">{calc.title}</h2>
                            <p className="text-muted-foreground">{calc.description}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const categoryCalculators = getCalculatorsByCategory(category.id);

  return {
    props: {
      category,
      calculators: categoryCalculators,
    },
  };
};