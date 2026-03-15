import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorInput, CalculatorOutput } from "@/types/calculator";
import { RotateCcw, Calculator, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorToolProps {
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  onCalculate: (values: Record<string, number | string>) => Record<string, number | string>;
}

type ValidationState = "idle" | "valid" | "invalid" | "success";

interface InputState {
  value: string | number;
  touched: boolean;
  error?: string;
  validationState: ValidationState;
}

export function CalculatorTool({ inputs, outputs, onCalculate }: CalculatorToolProps) {
  const [inputStates, setInputStates] = useState<Record<string, InputState>>(() => {
    const defaults: Record<string, InputState> = {};
    inputs.forEach((input) => {
      defaults[input.id] = {
        value: input.defaultValue ?? "",
        touched: false,
        validationState: "idle",
      };
    });
    return defaults;
  });
  
  const [results, setResults] = useState<Record<string, number | string> | null>(null);
  const [calculationState, setCalculationState] = useState<"idle" | "calculating" | "success" | "error">("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const validateInput = (input: CalculatorInput, value: string | number): string | undefined => {
    if (input.required && (!value || value === "")) {
      return `${input.label} is required`;
    }

    if (input.type === "number" && value !== "" && value !== undefined) {
      const num = Number(value);
      if (isNaN(num)) {
        return `Please enter a valid number`;
      }
      if (input.min !== undefined && num < input.min) {
        return `Minimum value is ${input.min}`;
      }
      if (input.max !== undefined && num > input.max) {
        return `Maximum value is ${input.max}`;
      }
    }

    if (input.type === "date" && value) {
      const date = new Date(String(value));
      if (isNaN(date.getTime())) {
        return `Please enter a valid date`;
      }
    }

    return undefined;
  };

  const updateInputState = (id: string, value: string | number) => {
    const input = inputs.find((i) => i.id === id);
    if (!input) return;

    const error = validateInput(input, value);
    const validationState: ValidationState = error ? "invalid" : value !== "" ? "valid" : "idle";

    setInputStates((prev) => ({
      ...prev,
      [id]: {
        value,
        touched: true,
        error,
        validationState,
      },
    }));
  };

  const handleCalculate = useCallback(() => {
    setCalculationState("calculating");

    // Validate all required inputs
    const newStates = { ...inputStates };
    let hasErrors = false;

    inputs.forEach((input) => {
      const state = newStates[input.id];
      const error = validateInput(input, state.value);
      newStates[input.id] = {
        ...state,
        touched: true,
        error,
        validationState: error ? "invalid" : state.value !== "" ? "valid" : "idle",
      };
      if (error) hasErrors = true;
    });

    setInputStates(newStates);

    if (hasErrors) {
      setCalculationState("error");
      return;
    }

    // Perform calculation
    try {
      const values: Record<string, number | string> = {};
      Object.entries(inputStates).forEach(([id, state]) => {
        values[id] = state.value;
      });

      const calculated = onCalculate(values);
      setResults(calculated);
      setCalculationState("success");

      // Reset success state after 3 seconds
      setTimeout(() => {
        setCalculationState((prev) => (prev === "success" ? "idle" : prev));
      }, 3000);
    } catch (error) {
      setCalculationState("error");
      console.error("Calculation error:", error);
    }
  }, [inputStates, inputs, onCalculate]);

  const handleReset = () => {
    const defaults: Record<string, InputState> = {};
    inputs.forEach((input) => {
      defaults[input.id] = {
        value: input.defaultValue ?? "",
        touched: false,
        validationState: "idle",
      };
    });
    setInputStates(defaults);
    setResults(null);
    setCalculationState("idle");
  };

  const handleCopyResult = async (value: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
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
        return `${value.toFixed(output.decimals ?? 2)}%`;
      case "number":
        return value.toFixed(output.decimals ?? 0);
      default:
        return String(value);
    }
  };

  // Auto-calculate when all required fields are valid
  useEffect(() => {
    const requiredInputs = inputs.filter((i) => i.required);
    const allRequiredFilled = requiredInputs.every(
      (input) => inputStates[input.id]?.value !== "" && !inputStates[input.id]?.error
    );

    if (allRequiredFilled && calculationState === "idle") {
      const timeoutId = setTimeout(() => {
        handleCalculate();
      }, 500); // Small delay for better UX

      return () => clearTimeout(timeoutId);
    }
  }, [inputStates, inputs, calculationState, handleCalculate]);

  const getInputStatusIcon = (state: InputState) => {
    if (!state.touched) return null;
    if (state.validationState === "invalid") {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
    if (state.validationState === "valid") {
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    }
    return null;
  };

  const getInputBorderClass = (state: InputState) => {
    if (!state.touched) return "";
    if (state.validationState === "invalid") return "border-destructive focus-visible:ring-destructive";
    if (state.validationState === "valid") return "border-success focus-visible:ring-success";
    return "";
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <Card className={cn(
        "calculator-card transition-all duration-300",
        calculationState === "success" && "ring-2 ring-success/50",
        calculationState === "error" && "ring-2 ring-destructive/50"
      )}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="w-5 h-5 text-primary" />
            Calculator
            {calculationState === "success" && (
              <CheckCircle2 className="w-5 h-5 text-success animate-in fade-in" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputs.map((input) => {
            const state = inputStates[input.id];
            
            return (
              <div key={input.id} className="space-y-2">
                <Label htmlFor={input.id} className="text-sm font-medium flex items-center gap-2">
                  {input.label}
                  {input.required && <span className="text-destructive">*</span>}
                  {getInputStatusIcon(state)}
                </Label>
                
                {input.type === "select" ? (
                  <Select
                    value={String(state.value || "")}
                    onValueChange={(value) => updateInputState(input.id, value)}
                  >
                    <SelectTrigger 
                      className={cn("h-12", getInputBorderClass(state))}
                      id={input.id}
                    >
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
                      value={state.value}
                      onChange={(e) => updateInputState(input.id, e.target.value)}
                      onBlur={() => updateInputState(input.id, state.value)}
                      className={cn("h-12 pr-12 transition-colors", getInputBorderClass(state))}
                      aria-invalid={state.validationState === "invalid"}
                      aria-describedby={state.error ? `${input.id}-error` : undefined}
                    />
                    {input.unit && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                        {input.unit}
                      </span>
                    )}
                  </div>
                )}
                
                {input.helpText && !state.error && (
                  <p className="text-xs text-muted-foreground">{input.helpText}</p>
                )}
                {state.error && (
                  <p id={`${input.id}-error`} className="text-xs text-destructive flex items-center gap-1 animate-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3" />
                    {state.error}
                  </p>
                )}
              </div>
            );
          })}
          
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={handleCalculate} 
              className={cn(
                "flex-1 h-12 transition-all duration-300",
                calculationState === "success" && "bg-success hover:bg-success/90",
                calculationState === "error" && "bg-destructive hover:bg-destructive/90"
              )}
              disabled={calculationState === "calculating"}
            >
              {calculationState === "calculating" ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculating...
                </span>
              ) : calculationState === "success" ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Calculated!
                </span>
              ) : calculationState === "error" ? (
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Fix Errors
                </span>
              ) : (
                "Calculate"
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset} 
              className="h-12 px-4 hover:bg-muted"
              title="Reset calculator"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        {results ? (
          <>
            {outputs.map((output, index) => {
              const formattedValue = formatValue(results[output.id], output);
              const fieldId = `result-${output.id}`;
              
              return (
                <Card 
                  key={output.id} 
                  className={cn(
                    "result-display group relative transition-all duration-500 animate-in fade-in slide-in-from-bottom-2",
                    calculationState === "success" && "ring-2 ring-success/20"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">{output.label}</p>
                        <p className="result-value break-all">
                          {formattedValue}
                          {output.unit && (
                            <span className="text-lg text-muted-foreground ml-2">
                              {output.unit}
                            </span>
                          )}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopyResult(formattedValue, fieldId)}
                      >
                        {copiedField === fieldId ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </>
        ) : (
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="pt-12 pb-12 text-center">
              <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Enter values and click Calculate to see results
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Or fill all required fields for automatic calculation
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}