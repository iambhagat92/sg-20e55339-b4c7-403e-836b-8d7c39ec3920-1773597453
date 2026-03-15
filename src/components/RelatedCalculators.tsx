import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorData } from "@/types/calculator";
import { ArrowRight, Calculator } from "lucide-react";

interface RelatedCalculatorsProps {
  calculators: CalculatorData[];
}

export function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  if (calculators.length === 0) return null;

  return (
    <Card className="calculator-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="w-5 h-5 text-primary" />
          Related Calculators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {calculators.map((calc) => (
            <li key={calc.id}>
              <Link
                href={`/${calc.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {calc.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {calc.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}