import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorExample } from "@/types/calculator";
import { BookOpen } from "lucide-react";

interface ExamplesSectionProps {
  examples: CalculatorExample[];
}

export function ExamplesSection({ examples }: ExamplesSectionProps) {
  return (
    <Card className="calculator-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="w-5 h-5 text-primary" />
          Examples
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {examples.map((example, index) => (
          <div key={index} className="space-y-3 pb-6 last:pb-0 last:border-0 border-b border-border">
            <div>
              <h4 className="font-medium text-foreground">{example.title}</h4>
              <p className="text-sm text-muted-foreground">{example.description}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Inputs
                </p>
                <ul className="space-y-1">
                  {Object.entries(example.inputs).map(([key, value]) => (
                    <li key={key} className="text-sm">
                      <span className="font-mono text-primary">{key}:</span>{" "}
                      <span className="text-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-3">
                <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
                  Results
                </p>
                <ul className="space-y-1">
                  {Object.entries(example.outputs).map(([key, value]) => (
                    <li key={key} className="text-sm">
                      <span className="font-mono text-primary">{key}:</span>{" "}
                      <span className="font-medium text-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{example.explanation}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}