import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorInput, CalculatorOutput } from "@/types/calculator";
import { RotateCcw, Calculator } from "lucide-react";

interface CalculatorToolProps {
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  onCalculate: (values: Record<string, number | string>) => Record<string, number | string>;
}

export function CalculatorTool({ inputs, outputs, onCalculate }: CalculatorToolProps) {
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const defaults: Record<string, number | string> = {};
    inputs.forEach((input) => {
      if (input.defaultValue !== undefined) {
        defaults[input.id] = input.defaultValue;
      } else if (input.type === "number") {
        defaults[input.id] = "";
      } else {
        defaults[input.id] = "";
      }
    });
    return defaults;
  });
  
  const [results, setResults] = useState<Record<string, number | string> | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    inputs.forEach((input) => {
      if (input.required && !values[input.id]) {
        newErrors[input.id] = "This field is required";
      }
      if (input.type === "number" && values[input.id]) {
        const num = Number(values[input.id]);
        if (isNaN(num)) {
          newErrors[input.id] = "Please enter a valid number";
        } else if (input.min !== undefined && num < input.min) {
          newErrors[input.id] = `Minimum value is ${input.min}`;
        } else if (input.max !== undefined && num > input.max) {
          newErrors[input.id] = `Maximum value is ${input.max}`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const calculated = onCalculate(values);
    setResults(calculated);
  }, [values, inputs, onCalculate]);

  const handleReset = () => {
    const defaults: Record<string, number | string> = {};
    inputs.forEach((input) => {
      if (input.defaultValue !== undefined) {
        defaults[input.id] = input.defaultValue;
      } else {
        defaults[input.id] = "";
      }
    });
    setValues(defaults);
    setResults(null);
    setErrors({});
  };

  const formatValue = (value: number | string, output: CalculatorOutput): string => {
    if (typeof value === "string") return value;
    
    switch (output.format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: output.currency || "USD",
          minimumFractionDigits: output.decimals || 2,
          maximumFractionDigits: output.decimals || 2,
        }).format(value);
      case "percentage":
        return `${value.toFixed(output.decimals || 2)}%`;
      case "number":
        return value.toFixed(output.decimals || 0);
      default:
        return String(value);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    const hasRequiredValues = inputs
      .filter((i) => i.required)
      .every((i) => values[i.id]);
    
    if (hasRequiredValues) {
      handleCalculate();
    }
  }, [values, inputs, handleCalculate]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="calculator-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="w-5 h-5 text-primary" />
            Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputs.map((input) => (
            <div key={input.id} className="space-y-2">
              <Label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              
              {input.type === "select" ? (
                <Select
                  value={String(values[input.id] || "")}
                  onValueChange={(value) => handleInputChange(input.id, value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={`Select ${input.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {input.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="relative">
                  <Input
                    id={input.id}
                    type={input.type === "date" ? "date" : "text"}
                    inputMode={input.type === "number" ? "decimal" : "text"}
                    placeholder={input.placeholder}
                    value={values[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className="h-12 pr-12"
                  />
                  {input.unit && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                      {input.unit}
                    </span>
                  )}
                </div>
              )}
              
              {input.helpText && !errors[input.id] && (
                <p className="text-xs text-muted-foreground">{input.helpText}</p>
              )}
              {errors[input.id] && (
                <p className="text-xs text-destructive">{errors[input.id]}</p>
              )}
            </div>
          ))}
          
          <div className="flex gap-3 pt-2">
            <Button onClick={handleCalculate} className="flex-1 h-12">
              Calculate
            </Button>
            <Button variant="outline" onClick={handleReset} className="h-12 px-4">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {results ? (
          <>
            {outputs.map((output) => (
              <Card key={output.id} className="result-display">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">{output.label}</p>
                  <p className="result-value">
                    {formatValue(results[output.id], output)}
                    {output.unit && (
                      <span className="text-lg text-muted-foreground ml-2">
                        {output.unit}
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="pt-12 pb-12 text-center">
              <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Enter values and click Calculate to see results
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}