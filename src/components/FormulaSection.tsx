import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormulaStep } from "@/types/calculator";
import { FunctionSquare } from "lucide-react";

interface FormulaSectionProps {
  formulas: FormulaStep[];
}

export function FormulaSection({ formulas }: FormulaSectionProps) {
  return (
    <Card className="calculator-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FunctionSquare className="w-5 h-5 text-primary" />
          Formula & Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {formulas.map((formula, index) => (
          <div key={index} className="space-y-3">
            <p className="text-sm text-muted-foreground">{formula.description}</p>
            <div className="formula-box">
              <pre className="whitespace-pre-wrap text-sm">{formula.formula}</pre>
            </div>
            {Object.keys(formula.variables).length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Variables
                </p>
                <ul className="space-y-1">
                  {Object.entries(formula.variables).map(([key, description]) => (
                    <li key={key} className="text-sm">
                      <span className="font-mono font-medium text-primary">{key}</span>
                      <span className="text-muted-foreground"> — {description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}