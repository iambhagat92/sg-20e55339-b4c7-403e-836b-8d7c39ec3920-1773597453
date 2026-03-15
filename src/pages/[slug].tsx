import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { CalculatorTool } from "@/components/CalculatorTool";
import { FormulaSection } from "@/components/FormulaSection";
import { ExamplesSection } from "@/components/ExamplesSection";
import { FAQSection } from "@/components/FAQSection";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalculatorData } from "@/types/calculator";
import { calculators, getAllCalculators, getRelatedCalculators, categories } from "@/data/calculators";
import { ArrowLeft, ChevronRight, Star, Zap } from "lucide-react";

interface CalculatorPageProps {
  calculator: CalculatorData;
  relatedCalculators: CalculatorData[];
  category: typeof categories[0];
}

export default function CalculatorPage({ calculator, relatedCalculators, category }: CalculatorPageProps) {
  const handleCalculate = (values: Record<string, number | string>) => {
    switch (calculator.id) {
      case "percentage":
        const val = Number(values.value) || 0;
        const total = Number(values.total) || 1;
        return { percentage: (val / total) * 100 };

      case "mortgage": {
        const loanAmount = Number(values.loanAmount) || 0;
        const downPayment = Number(values.downPayment) || 0;
        const principal = loanAmount - downPayment;
        const annualRate = Number(values.interestRate) || 0;
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = (Number(values.loanTerm) || 0) * 12;
        
        if (monthlyRate === 0) {
          const monthly = principal / numberOfPayments;
          return {
            monthlyPayment: monthly,
            totalPayment: principal,
            totalInterest: 0,
          };
        }
        
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const totalPayment = monthlyPayment * numberOfPayments;
        return {
          monthlyPayment,
          totalPayment,
          totalInterest: totalPayment - principal,
        };
      }

      case "loan": {
        const principal = Number(values.loanAmount) || 0;
        const annualRate = Number(values.interestRate) || 0;
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = (Number(values.loanTerm) || 0) * 12;
        
        if (monthlyRate === 0) {
          const monthly = principal / numberOfPayments;
          return {
            monthlyPayment: monthly,
            totalPayment: principal,
            totalInterest: 0,
          };
        }
        
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const totalPayment = monthlyPayment * numberOfPayments;
        return {
          monthlyPayment,
          totalPayment,
          totalInterest: totalPayment - principal,
        };
      }

      case "interest": {
        const principal = Number(values.principal) || 0;
        const rate = Number(values.rate) || 0;
        const time = Number(values.time) || 0;
        const compounds = Number(values.compounds) || 12;
        const monthlyContribution = Number(values.monthlyContribution) || 0;
        
        const r = rate / 100;
        const n = compounds;
        const t = time;
        
        const compoundFactor = Math.pow(1 + r / n, n * t);
        const finalFromPrincipal = principal * compoundFactor;
        
        let finalFromContributions = 0;
        if (monthlyContribution > 0) {
          const monthlyRate = r / 12;
          const months = t * 12;
          finalFromContributions = monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        }
        
        const finalAmount = finalFromPrincipal + finalFromContributions;
        const totalContributions = principal + (monthlyContribution * t * 12);
        
        return {
          finalAmount,
          totalInterest: finalAmount - totalContributions,
          totalContributions,
        };
      }

      case "bmi": {
        const system = String(values.system);
        let weight = Number(values.weight) || 0;
        let height = Number(values.height) || 0;
        
        if (system === "imperial") {
          weight = weight * 0.453592;
          height = height * 2.54;
        }
        
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        let category = "";
        if (bmi < 18.5) category = "Underweight";
        else if (bmi < 25) category = "Normal weight";
        else if (bmi < 30) category = "Overweight";
        else category = "Obese";
        
        return { bmi: Math.round(bmi * 10) / 10, category };
      }

      case "age": {
        const birthDate = new Date(String(values.birthDate));
        const endDate = values.endDate ? new Date(String(values.endDate)) : new Date();
        
        let years = endDate.getFullYear() - birthDate.getFullYear();
        let months = endDate.getMonth() - birthDate.getMonth();
        let days = endDate.getDate() - birthDate.getDate();
        
        if (days < 0) {
          months--;
          const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
          days += prevMonth.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }
        
        const totalDays = Math.floor((endDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
        
        return { years, months, days, totalDays };
      }

      case "calories": {
        const gender = String(values.gender);
        const age = Number(values.age) || 0;
        const weight = Number(values.weight) || 0;
        const height = Number(values.height) || 0;
        const activity = Number(values.activity) || 1.2;
        
        let bmr = 0;
        if (gender === "male") {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        
        const maintenance = Math.round(bmr * activity);
        
        return {
          bmr: Math.round(bmr),
          maintenance,
          weightLoss: maintenance - 500,
          weightGain: maintenance + 500,
        };
      }

      case "fraction": {
        const op = String(values.operation);
        const n1 = Number(values.numerator1) || 0;
        const d1 = Number(values.denominator1) || 1;
        const n2 = Number(values.numerator2) || 0;
        const d2 = Number(values.denominator2) || 1;
        
        let num = 0;
        let den = 1;
        
        switch (op) {
          case "add":
            num = n1 * d2 + n2 * d1;
            den = d1 * d2;
            break;
          case "subtract":
            num = n1 * d2 - n2 * d1;
            den = d1 * d2;
            break;
          case "multiply":
            num = n1 * n2;
            den = d1 * d2;
            break;
          case "divide":
            num = n1 * d2;
            den = d1 * n2;
            break;
        }
        
        const decimal = num / den;
        
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(Math.abs(num), Math.abs(den));
        
        return {
          result: `${num / divisor}/${den / divisor}`,
          decimal,
        };
      }

      case "length": {
        const conversions: Record<string, number> = {
          m: 1,
          km: 1000,
          cm: 0.01,
          mm: 0.001,
          mi: 1609.34,
          yd: 0.9144,
          ft: 0.3048,
          in: 0.0254,
        };
        
        const val = Number(values.value) || 0;
        const from = String(values.fromUnit);
        const to = String(values.toUnit);
        
        const meters = val * conversions[from];
        const result = meters / conversions[to];
        
        return { result };
      }

      case "tip": {
        const bill = Number(values.billAmount) || 0;
        const tipPercent = Number(values.tipPercent) || 0;
        const people = Number(values.people) || 1;
        
        const tipAmount = bill * (tipPercent / 100);
        const totalAmount = bill + tipAmount;
        const perPerson = totalAmount / people;
        
        return { tipAmount, totalAmount, perPerson };
      }

      default:
        return {};
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.title,
    description: calculator.description,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Head>
        <title>{calculator.seoTitle}</title>
        <meta name="description" content={calculator.seoDescription} />
        <meta name="keywords" content={calculator.keywords.join(", ")} />
        <link rel="canonical" href={`https://smartcalchub.com/${calculator.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${category.slug}`} className="hover:text-foreground transition-colors">
                {category.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{calculator.title}</span>
            </nav>
          </div>
        </div>

        <main className="container py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Link href={`/${category.slug}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to {category.name}
                  </Button>
                </Link>
                {calculator.featured && (
                  <Badge variant="secondary" className="gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </Badge>
                )}
                {calculator.premium && (
                  <Badge variant="default" className="gap-1">
                    <Zap className="w-3 h-3" />
                    Premium
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                {calculator.title}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {calculator.introText}
              </p>
            </div>

            <div className="mb-12">
              <CalculatorTool
                inputs={calculator.inputs}
                outputs={calculator.outputs}
                onCalculate={handleCalculate}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="scroll-mt-20" id="formula">
                  <FormulaSection formulas={calculator.formula} />
                </section>

                <section className="scroll-mt-20" id="examples">
                  <ExamplesSection examples={calculator.examples} />
                </section>

                <section className="scroll-mt-20" id="faq">
                  <FAQSection faqs={calculator.faqs} />
                </section>
              </div>

              <aside className="space-y-6">
                <RelatedCalculators calculators={relatedCalculators} />
                
                <div className="calculator-card p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                  <h3 className="font-semibold mb-2">Save Your Calculations</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a free account to save and access your calculations from any device.
                  </p>
                  <Button className="w-full">Sign Up Free</Button>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCalculators().map((calc) => ({
    params: { slug: calc.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const calculator = Object.values(calculators).find((c) => c.slug === slug);
  
  if (!calculator) {
    return { notFound: true };
  }

  const category = categories.find((c) => c.id === calculator.category)!;
  const relatedCalculators = getRelatedCalculators(calculator.id);

  return {
    props: {
      calculator,
      relatedCalculators,
      category,
    },
  };
};