import type { CalculatorData, CalculatorCategory } from "@/types/calculator";

export const categories: CalculatorCategory[] = [
  {
    id: "finance",
    name: "Finance Calculators",
    slug: "finance-calculators",
    description: "Smart financial tools for loans, mortgages, investments, and retirement planning.",
    icon: "Wallet",
    color: "emerald",
    calculators: ["mortgage", "loan", "interest", "investment", "retirement", "credit-card"],
  },
  {
    id: "health",
    name: "Health & Fitness",
    slug: "health-calculators",
    description: "Track your health metrics with BMI, calories, body fat, and pregnancy calculators.",
    icon: "Heart",
    color: "rose",
    calculators: ["bmi", "calories", "body-fat", "water-intake", "pregnancy"],
  },
  {
    id: "math",
    name: "Math Calculators",
    slug: "math-calculators",
    description: "Solve complex math problems with percentage, fraction, and scientific calculators.",
    icon: "Calculator",
    color: "blue",
    calculators: ["percentage", "fraction", "scientific", "equation", "average"],
  },
  {
    id: "conversion",
    name: "Unit Converters",
    slug: "unit-converters",
    description: "Convert between length, weight, temperature, time, and currency units instantly.",
    icon: "ArrowLeftRight",
    color: "purple",
    calculators: ["length", "weight", "temperature", "time", "currency"],
  },
  {
    id: "daily",
    name: "Daily Life",
    slug: "daily-life-calculators",
    description: "Everyday tools for age, dates, tips, sleep, and work hours.",
    icon: "Calendar",
    color: "orange",
    calculators: ["age", "date-difference", "tip", "sleep", "work-hours"],
  },
];

export const calculators: Record<string, CalculatorData> = {
  percentage: {
    id: "percentage",
    title: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Calculate percentages, percentage increase, decrease, and find percentage of any number.",
    category: "math",
    seoTitle: "Percentage Calculator - Fast & Accurate Percent Tool | SmartCalcHub",
    seoDescription: "Free percentage calculator. Calculate percent increase, decrease, find percentage of a number. Instant results with formulas and examples.",
    keywords: ["percentage calculator", "calculate percent", "percent increase", "percent decrease", "what is percentage of number"],
    introText: "Our percentage calculator helps you quickly compute percentages, percentage changes, and find what percentage one number is of another. Perfect for students, professionals, and anyone working with numbers.",
    inputs: [
      {
        id: "value",
        label: "Value",
        type: "number",
        placeholder: "Enter value",
        required: true,
        helpText: "The number you want to find the percentage of",
      },
      {
        id: "total",
        label: "Total",
        type: "number",
        placeholder: "Enter total",
        required: true,
        helpText: "The total or whole amount",
      },
    ],
    outputs: [
      {
        id: "percentage",
        label: "Percentage",
        format: "percentage",
        decimals: 2,
      },
    ],
    formula: [
      {
        description: "Calculate what percentage a value is of a total",
        formula: "Percentage = (Value ÷ Total) × 100",
        variables: {
          "Value": "The part of the whole",
          "Total": "The complete amount",
          "Percentage": "The result as a percentage",
        },
      },
    ],
    examples: [
      {
        title: "What is 25% of 200?",
        description: "Finding a percentage of a number",
        inputs: { value: 50, total: 200 },
        outputs: { percentage: 25 },
        explanation: "50 is 25% of 200. This is calculated by dividing 50 by 200 and multiplying by 100.",
      },
      {
        title: "What percentage is 75 of 300?",
        description: "Finding what percentage one number is of another",
        inputs: { value: 75, total: 300 },
        outputs: { percentage: 25 },
        explanation: "75 is 25% of 300. Divide 75 by 300 and multiply by 100.",
      },
    ],
    faqs: [
      {
        question: "How do I calculate percentage increase?",
        answer: "To calculate percentage increase: subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: ((New - Original) ÷ Original) × 100",
      },
      {
        question: "What is the formula for percentage decrease?",
        answer: "To calculate percentage decrease: subtract the new value from the original, divide by the original value, and multiply by 100. Formula: ((Original - New) ÷ Original) × 100",
      },
      {
        question: "How do I find what percentage one number is of another?",
        answer: "Divide the first number by the second number and multiply by 100. For example, to find what percentage 25 is of 100: (25 ÷ 100) × 100 = 25%",
      },
    ],
    relatedCalculators: ["fraction", "average", "scientific"],
    featured: true,
    lastUpdated: "2026-03-15",
  },

  mortgage: {
    id: "mortgage",
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description: "Calculate monthly mortgage payments, total interest, and amortization schedule.",
    category: "finance",
    seoTitle: "Mortgage Calculator - Free Monthly Payment Estimator | SmartCalcHub",
    seoDescription: "Calculate your mortgage payments instantly. See monthly payments, total interest, and full amortization schedule. Free and easy to use.",
    keywords: ["mortgage calculator", "home loan calculator", "mortgage payment", "house payment", "mortgage interest"],
    introText: "Calculate your monthly mortgage payments with our comprehensive mortgage calculator. Enter your loan amount, interest rate, and loan term to see your payment breakdown including principal, interest, and total cost over the life of the loan.",
    inputs: [
      {
        id: "loanAmount",
        label: "Loan Amount",
        type: "number",
        placeholder: "300000",
        min: 0,
        step: 1000,
        required: true,
        unit: "$",
        helpText: "Total amount you need to borrow",
      },
      {
        id: "interestRate",
        label: "Interest Rate",
        type: "number",
        placeholder: "6.5",
        min: 0,
        max: 30,
        step: 0.01,
        required: true,
        unit: "%",
        helpText: "Annual interest rate (APR)",
      },
      {
        id: "loanTerm",
        label: "Loan Term",
        type: "number",
        placeholder: "30",
        min: 1,
        max: 50,
        required: true,
        unit: "years",
        helpText: "Length of the mortgage in years",
      },
      {
        id: "downPayment",
        label: "Down Payment",
        type: "number",
        placeholder: "60000",
        min: 0,
        step: 1000,
        unit: "$",
        helpText: "Amount paid upfront (optional)",
      },
    ],
    outputs: [
      {
        id: "monthlyPayment",
        label: "Monthly Payment",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "totalPayment",
        label: "Total Payment",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "totalInterest",
        label: "Total Interest",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
    ],
    formula: [
      {
        description: "Calculate monthly mortgage payment using the standard amortization formula",
        formula: "M = P × [r(1+r)^n] ÷ [(1+r)^n - 1]",
        variables: {
          "M": "Monthly payment",
          "P": "Principal loan amount",
          "r": "Monthly interest rate (annual rate ÷ 12 ÷ 100)",
          "n": "Total number of payments (years × 12)",
        },
      },
    ],
    examples: [
      {
        title: "$300,000 mortgage at 6.5% for 30 years",
        description: "Standard 30-year fixed mortgage",
        inputs: { loanAmount: 300000, interestRate: 6.5, loanTerm: 30, downPayment: 0 },
        outputs: { monthlyPayment: 1896.20, totalPayment: 682632.00, totalInterest: 382632.00 },
        explanation: "With no down payment, your monthly payment would be $1,896.20. Over 30 years, you'll pay $382,632 in interest.",
      },
    ],
    faqs: [
      {
        question: "What is the formula for calculating mortgage payments?",
        answer: "The standard mortgage formula is: M = P × [r(1+r)^n] ÷ [(1+r)^n - 1], where M is monthly payment, P is principal, r is monthly interest rate, and n is total number of payments.",
      },
      {
        question: "How much should I put down on a house?",
        answer: "A typical down payment is 20% of the home's purchase price to avoid PMI (Private Mortgage Insurance). However, many lenders accept as little as 3-5% down, especially for first-time homebuyers.",
      },
      {
        question: "How does loan term affect monthly payments?",
        answer: "A longer loan term (like 30 years) results in lower monthly payments but higher total interest paid over the life of the loan. A shorter term (like 15 years) has higher monthly payments but significantly less total interest.",
      },
    ],
    relatedCalculators: ["loan", "interest", "investment"],
    featured: true,
    lastUpdated: "2026-03-15",
  },

  bmi: {
    id: "bmi",
    title: "BMI Calculator",
    slug: "bmi-calculator",
    description: "Calculate your Body Mass Index (BMI) and see your health category.",
    category: "health",
    seoTitle: "BMI Calculator - Check Your Body Mass Index | SmartCalcHub",
    seoDescription: "Free BMI calculator. Check your Body Mass Index instantly. Get your BMI category: underweight, normal, overweight, or obese. Health insights included.",
    keywords: ["BMI calculator", "body mass index", "calculate BMI", "healthy weight", "BMI chart"],
    introText: "Calculate your Body Mass Index (BMI) to understand if you're at a healthy weight for your height. BMI is a simple screening tool that helps identify potential weight problems in adults.",
    inputs: [
      {
        id: "height",
        label: "Height",
        type: "number",
        placeholder: "170",
        min: 50,
        max: 300,
        required: true,
        unit: "cm",
        helpText: "Your height in centimeters",
      },
      {
        id: "weight",
        label: "Weight",
        type: "number",
        placeholder: "70",
        min: 20,
        max: 500,
        required: true,
        unit: "kg",
        helpText: "Your weight in kilograms",
      },
      {
        id: "system",
        label: "Measurement System",
        type: "select",
        options: [
          { value: "metric", label: "Metric (kg, cm)" },
          { value: "imperial", label: "Imperial (lbs, inches)" },
        ],
        defaultValue: "metric",
      },
    ],
    outputs: [
      {
        id: "bmi",
        label: "BMI",
        format: "number",
        decimals: 1,
      },
      {
        id: "category",
        label: "Category",
        format: "text",
      },
    ],
    formula: [
      {
        description: "Calculate BMI using metric units",
        formula: "BMI = Weight (kg) ÷ [Height (m)]²",
        variables: {
          "Weight": "Your weight in kilograms",
          "Height": "Your height in meters",
          "BMI": "Body Mass Index value",
        },
      },
      {
        description: "Calculate BMI using imperial units",
        formula: "BMI = [Weight (lbs) × 703] ÷ [Height (in)]²",
        variables: {
          "Weight": "Your weight in pounds",
          "Height": "Your height in inches",
          "BMI": "Body Mass Index value",
        },
      },
    ],
    examples: [
      {
        title: "Calculate BMI for 170cm, 70kg person",
        description: "Average adult male calculation",
        inputs: { height: 170, weight: 70, system: "metric" },
        outputs: { bmi: 24.2, category: "Normal weight" },
        explanation: "A person who is 170cm tall and weighs 70kg has a BMI of 24.2, which falls in the normal weight range (18.5-24.9).",
      },
    ],
    faqs: [
      {
        question: "What is a healthy BMI range?",
        answer: "A healthy BMI for most adults is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is obese.",
      },
      {
        question: "Is BMI accurate for everyone?",
        answer: "BMI is a screening tool, not a diagnostic of body fatness or health. It may overestimate body fat in athletes and underestimate it in older adults. Other factors like muscle mass, bone density, and distribution of fat are not considered.",
      },
      {
        question: "How do I calculate BMI in pounds and inches?",
        answer: "Use the formula: BMI = [Weight (lbs) × 703] ÷ [Height (in)]². For example, if you weigh 150 lbs and are 65 inches tall: (150 × 703) ÷ (65 × 65) = 24.95",
      },
    ],
    relatedCalculators: ["calories", "body-fat", "water-intake"],
    featured: true,
    lastUpdated: "2026-03-15",
  },

  age: {
    id: "age",
    title: "Age Calculator",
    slug: "age-calculator",
    description: "Calculate your exact age in years, months, days, and even seconds.",
    category: "daily",
    seoTitle: "Age Calculator - How Old Am I? Exact Age in Years & Days | SmartCalcHub",
    seoDescription: "Calculate your exact age instantly. Find out how old you are in years, months, weeks, days, hours, minutes, and seconds. Free age calculator tool.",
    keywords: ["age calculator", "how old am I", "calculate age", "birthday calculator", "exact age"],
    introText: "Find out your exact age with precision. Enter your birth date and see your age broken down into years, months, days, hours, minutes, and even seconds. Perfect for birthday planning or just satisfying your curiosity.",
    inputs: [
      {
        id: "birthDate",
        label: "Birth Date",
        type: "date",
        required: true,
        helpText: "Your date of birth",
      },
      {
        id: "endDate",
        label: "Calculate Until",
        type: "date",
        helpText: "Leave blank for today's date",
      },
    ],
    outputs: [
      {
        id: "years",
        label: "Years",
        format: "number",
        decimals: 0,
      },
      {
        id: "months",
        label: "Months",
        format: "number",
        decimals: 0,
      },
      {
        id: "days",
        label: "Days",
        format: "number",
        decimals: 0,
      },
      {
        id: "totalDays",
        label: "Total Days",
        format: "number",
        decimals: 0,
      },
    ],
    formula: [
      {
        description: "Calculate age by finding the difference between two dates",
        formula: "Age = End Date - Birth Date",
        variables: {
          "End Date": "The date to calculate age until (usually today)",
          "Birth Date": "Your date of birth",
          "Age": "Time elapsed between dates",
        },
      },
    ],
    examples: [
      {
        title: "Calculate age from January 15, 1990",
        description: "Finding exact age",
        inputs: { birthDate: "1990-01-15", endDate: "2026-03-15" },
        outputs: { years: 36, months: 2, days: 0, totalDays: 13219 },
        explanation: "Born on January 15, 1990, you would be 36 years, 2 months, and 0 days old on March 15, 2026.",
      },
    ],
    faqs: [
      {
        question: "How do you calculate exact age?",
        answer: "Exact age is calculated by finding the difference between the birth date and the current date, accounting for leap years and varying month lengths. Our calculator breaks this down into years, months, and days.",
      },
      {
        question: "Can I calculate age on a specific date?",
        answer: "Yes! You can select any date as the 'Calculate Until' date to see how old someone was or will be on that specific date.",
      },
      {
        question: "How many seconds old am I?",
        answer: "To find your age in seconds, multiply your total days lived by 86,400 (the number of seconds in a day). Our calculator provides this information automatically.",
      },
    ],
    relatedCalculators: ["date-difference", "sleep", "work-hours"],
    featured: true,
    lastUpdated: "2026-03-15",
  },

  loan: {
    id: "loan",
    title: "Loan Calculator",
    slug: "loan-calculator",
    description: "Calculate loan payments, total interest, and amortization for any type of loan.",
    category: "finance",
    seoTitle: "Loan Calculator - Personal & Auto Loan Payment Estimator | SmartCalcHub",
    seoDescription: "Calculate loan payments for personal loans, auto loans, and more. See monthly payments, total interest, and full repayment schedule. Free tool.",
    keywords: ["loan calculator", "personal loan", "auto loan", "car loan", "loan payment"],
    introText: "Plan your borrowing with our comprehensive loan calculator. Whether it's a personal loan, car loan, or student loan, calculate your monthly payments and see the total cost of borrowing before you commit.",
    inputs: [
      {
        id: "loanAmount",
        label: "Loan Amount",
        type: "number",
        placeholder: "10000",
        min: 100,
        step: 100,
        required: true,
        unit: "$",
      },
      {
        id: "interestRate",
        label: "Interest Rate",
        type: "number",
        placeholder: "8.5",
        min: 0,
        max: 50,
        step: 0.01,
        required: true,
        unit: "%",
      },
      {
        id: "loanTerm",
        label: "Loan Term",
        type: "number",
        placeholder: "5",
        min: 1,
        max: 30,
        required: true,
        unit: "years",
      },
    ],
    outputs: [
      {
        id: "monthlyPayment",
        label: "Monthly Payment",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "totalPayment",
        label: "Total Payment",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "totalInterest",
        label: "Total Interest",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
    ],
    formula: [
      {
        description: "Calculate monthly loan payment",
        formula: "M = P × [r(1+r)^n] ÷ [(1+r)^n - 1]",
        variables: {
          "M": "Monthly payment",
          "P": "Principal loan amount",
          "r": "Monthly interest rate (annual rate ÷ 12 ÷ 100)",
          "n": "Total number of payments (years × 12)",
        },
      },
    ],
    examples: [
      {
        title: "$10,000 personal loan at 8.5% for 5 years",
        description: "Typical personal loan scenario",
        inputs: { loanAmount: 10000, interestRate: 8.5, loanTerm: 5 },
        outputs: { monthlyPayment: 205.17, totalPayment: 12310.20, totalInterest: 2310.20 },
        explanation: "A $10,000 loan at 8.5% APR over 5 years costs $205.17 per month, with $2,310.20 in total interest.",
      },
    ],
    faqs: [
      {
        question: "How is loan interest calculated?",
        answer: "Loan interest is typically calculated using simple interest or amortized interest. Most personal loans use amortization, where each payment covers interest first, then principal. The interest portion decreases over time as the principal is paid down.",
      },
      {
        question: "What is a good interest rate for a personal loan?",
        answer: "Personal loan rates typically range from 6% to 36% APR. Good credit borrowers (700+) may qualify for rates under 10%, while fair credit borrowers might see rates between 13-20%.",
      },
    ],
    relatedCalculators: ["mortgage", "interest", "investment"],
    lastUpdated: "2026-03-15",
  },

  interest: {
    id: "interest",
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "See how much money you can make with compound interest on savings or investments.",
    category: "finance",
    seoTitle: "Compound Interest Calculator - See Your Money Grow | SmartCalcHub",
    seoDescription: "Calculate compound interest on your savings and investments. See how much you'll earn with daily, monthly, or yearly compounding. Free financial tool.",
    keywords: ["compound interest calculator", "savings calculator", "investment calculator", "interest on interest", "APY calculator"],
    introText: "Discover the power of compound interest with our calculator. See how your money grows over time as you earn interest on both your initial deposit and the accumulated interest. Perfect for planning savings goals and investment strategies.",
    inputs: [
      {
        id: "principal",
        label: "Initial Investment",
        type: "number",
        placeholder: "10000",
        min: 0,
        step: 100,
        required: true,
        unit: "$",
      },
      {
        id: "rate",
        label: "Interest Rate",
        type: "number",
        placeholder: "5",
        min: 0,
        max: 100,
        step: 0.01,
        required: true,
        unit: "%",
      },
      {
        id: "time",
        label: "Time Period",
        type: "number",
        placeholder: "10",
        min: 1,
        max: 100,
        required: true,
        unit: "years",
      },
      {
        id: "compounds",
        label: "Compound Frequency",
        type: "select",
        options: [
          { value: "1", label: "Annually" },
          { value: "2", label: "Semi-annually" },
          { value: "4", label: "Quarterly" },
          { value: "12", label: "Monthly" },
          { value: "365", label: "Daily" },
        ],
        defaultValue: "12",
      },
      {
        id: "monthlyContribution",
        label: "Monthly Contribution",
        type: "number",
        placeholder: "0",
        min: 0,
        step: 10,
        unit: "$",
        helpText: "Additional amount to add each month",
      },
    ],
    outputs: [
      {
        id: "finalAmount",
        label: "Final Amount",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "totalInterest",
        label: "Total Interest Earned",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "totalContributions",
        label: "Total Contributions",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
    ],
    formula: [
      {
        description: "Calculate compound interest",
        formula: "A = P(1 + r/n)^(nt)",
        variables: {
          "A": "Final amount",
          "P": "Principal (initial investment)",
          "r": "Annual interest rate (decimal)",
          "n": "Number of times interest compounds per year",
          "t": "Number of years",
        },
      },
    ],
    examples: [
      {
        title: "$10,000 at 5% compounded monthly for 10 years",
        description: "Long-term savings growth",
        inputs: { principal: 10000, rate: 5, time: 10, compounds: "12", monthlyContribution: 0 },
        outputs: { finalAmount: 16470.09, totalInterest: 6470.09, totalContributions: 10000 },
        explanation: "With compound interest, your $10,000 grows to $16,470.09 over 10 years, earning $6,470.09 in interest.",
      },
    ],
    faqs: [
      {
        question: "What is compound interest?",
        answer: "Compound interest is interest calculated on the initial principal plus all accumulated interest from previous periods. It allows your money to grow faster than simple interest because you earn interest on interest.",
      },
      {
        question: "How often should interest compound for maximum growth?",
        answer: "More frequent compounding (daily vs. annually) results in slightly more growth. However, the difference between monthly and daily compounding is usually minimal. Focus more on the interest rate and time.",
      },
      {
        question: "What is the Rule of 72?",
        answer: "The Rule of 72 is a quick way to estimate how long it takes for an investment to double. Divide 72 by the annual interest rate to get the approximate number of years. For example, at 8% interest, money doubles in about 9 years (72 ÷ 8 = 9).",
      },
    ],
    relatedCalculators: ["investment", "loan", "mortgage"],
    lastUpdated: "2026-03-15",
  },

  calories: {
    id: "calories",
    title: "Calorie Calculator",
    slug: "calorie-calculator",
    description: "Calculate your daily calorie needs based on age, weight, height, and activity level.",
    category: "health",
    seoTitle: "Calorie Calculator - Daily Calorie Needs & BMR | SmartCalcHub",
    seoDescription: "Calculate your daily calorie needs. Find your BMR and TDEE based on age, weight, height, and activity level. Free calorie calculator for weight goals.",
    keywords: ["calorie calculator", "daily calorie needs", "BMR calculator", "TDEE calculator", "calories per day"],
    introText: "Determine your daily calorie needs with our comprehensive calculator. Whether you want to lose weight, maintain your current weight, or build muscle, knowing your caloric requirements is essential for achieving your health goals.",
    inputs: [
      {
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        required: true,
      },
      {
        id: "age",
        label: "Age",
        type: "number",
        placeholder: "30",
        min: 10,
        max: 120,
        required: true,
        unit: "years",
      },
      {
        id: "weight",
        label: "Weight",
        type: "number",
        placeholder: "70",
        min: 20,
        max: 300,
        required: true,
        unit: "kg",
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        placeholder: "170",
        min: 50,
        max: 300,
        required: true,
        unit: "cm",
      },
      {
        id: "activity",
        label: "Activity Level",
        type: "select",
        options: [
          { value: "1.2", label: "Sedentary (little to no exercise)" },
          { value: "1.375", label: "Lightly active (1-3 days/week)" },
          { value: "1.55", label: "Moderately active (3-5 days/week)" },
          { value: "1.725", label: "Very active (6-7 days/week)" },
          { value: "1.9", label: "Super active (physical job/training)" },
        ],
        defaultValue: "1.2",
        required: true,
      },
    ],
    outputs: [
      {
        id: "bmr",
        label: "BMR (Basal Metabolic Rate)",
        format: "number",
        decimals: 0,
        unit: "calories/day",
      },
      {
        id: "maintenance",
        label: "Maintenance Calories",
        format: "number",
        decimals: 0,
        unit: "calories/day",
      },
      {
        id: "weightLoss",
        label: "Weight Loss (0.5kg/week)",
        format: "number",
        decimals: 0,
        unit: "calories/day",
      },
      {
        id: "weightGain",
        label: "Weight Gain (0.5kg/week)",
        format: "number",
        decimals: 0,
        unit: "calories/day",
      },
    ],
    formula: [
      {
        description: "Calculate BMR using the Mifflin-St Jeor Equation",
        formula: "Male: 10W + 6.25H - 5A + 5\nFemale: 10W + 6.25H - 5A - 161",
        variables: {
          "W": "Weight in kg",
          "H": "Height in cm",
          "A": "Age in years",
          "BMR": "Basal Metabolic Rate (calories burned at rest)",
        },
      },
    ],
    examples: [
      {
        title: "30-year-old male, 70kg, 170cm, sedentary",
        description: "Office worker profile",
        inputs: { gender: "male", age: 30, weight: 70, height: 170, activity: "1.2" },
        outputs: { bmr: 1596, maintenance: 1915, weightLoss: 1415, weightGain: 2415 },
        explanation: "This person burns 1,596 calories at rest. With a sedentary lifestyle, they need 1,915 calories to maintain weight.",
      },
    ],
    faqs: [
      {
        question: "What is BMR?",
        answer: "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain basic life functions like breathing, circulation, and cell production.",
      },
      {
        question: "How many calories should I eat to lose weight?",
        answer: "To lose about 0.5kg (1lb) per week, subtract 500 calories from your maintenance level. For 1kg (2lb) per week, subtract 1000 calories. Never go below 1200 calories for women or 1500 for men without medical supervision.",
      },
      {
        question: "What is TDEE?",
        answer: "TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor. It represents the total calories you burn in a day including all activities.",
      },
    ],
    relatedCalculators: ["bmi", "body-fat", "water-intake"],
    lastUpdated: "2026-03-15",
  },

  fraction: {
    id: "fraction",
    title: "Fraction Calculator",
    slug: "fraction-calculator",
    description: "Add, subtract, multiply, and divide fractions with step-by-step solutions.",
    category: "math",
    seoTitle: "Fraction Calculator - Add, Subtract, Multiply, Divide | SmartCalcHub",
    seoDescription: "Free fraction calculator. Add, subtract, multiply, and divide fractions with step-by-step solutions. Convert between fractions and decimals easily.",
    keywords: ["fraction calculator", "add fractions", "subtract fractions", "multiply fractions", "divide fractions"],
    introText: "Simplify fraction calculations with our easy-to-use tool. Add, subtract, multiply, or divide fractions and see detailed step-by-step solutions. Perfect for students learning fractions or anyone needing quick fraction math.",
    inputs: [
      {
        id: "operation",
        label: "Operation",
        type: "select",
        options: [
          { value: "add", label: "Add (+)" },
          { value: "subtract", label: "Subtract (-)" },
          { value: "multiply", label: "Multiply (×)" },
          { value: "divide", label: "Divide (÷)" },
        ],
        defaultValue: "add",
        required: true,
      },
      {
        id: "numerator1",
        label: "First Numerator",
        type: "number",
        placeholder: "1",
        required: true,
      },
      {
        id: "denominator1",
        label: "First Denominator",
        type: "number",
        placeholder: "2",
        min: 1,
        required: true,
      },
      {
        id: "numerator2",
        label: "Second Numerator",
        type: "number",
        placeholder: "1",
        required: true,
      },
      {
        id: "denominator2",
        label: "Second Denominator",
        type: "number",
        placeholder: "3",
        min: 1,
        required: true,
      },
    ],
    outputs: [
      {
        id: "result",
        label: "Result",
        format: "text",
      },
      {
        id: "decimal",
        label: "Decimal",
        format: "number",
        decimals: 4,
      },
    ],
    formula: [
      {
        description: "Adding fractions",
        formula: "a/b + c/d = (ad + bc) / bd",
        variables: {
          "a, b": "First fraction numerator and denominator",
          "c, d": "Second fraction numerator and denominator",
        },
      },
    ],
    examples: [
      {
        title: "Add 1/2 and 1/3",
        description: "Adding two fractions",
        inputs: { operation: "add", numerator1: 1, denominator1: 2, numerator2: 1, denominator2: 3 },
        outputs: { result: "5/6", decimal: 0.8333 },
        explanation: "To add 1/2 and 1/3, find a common denominator (6): 1/2 = 3/6, 1/3 = 2/6. Then 3/6 + 2/6 = 5/6",
      },
    ],
    faqs: [
      {
        question: "How do I add fractions with different denominators?",
        answer: "Find the least common denominator (LCD), convert each fraction to have this denominator, then add the numerators. For example, 1/4 + 1/6 = 3/12 + 2/12 = 5/12",
      },
      {
        question: "How do I simplify a fraction?",
        answer: "Divide both the numerator and denominator by their greatest common divisor (GCD). For example, 6/8 simplifies to 3/4 because both are divisible by 2.",
      },
    ],
    relatedCalculators: ["percentage", "average", "scientific"],
    lastUpdated: "2026-03-15",
  },

  length: {
    id: "length",
    title: "Length Converter",
    slug: "length-converter",
    description: "Convert between meters, feet, inches, kilometers, miles, and more length units.",
    category: "conversion",
    seoTitle: "Length Converter - Convert Meters, Feet, Inches, Miles | SmartCalcHub",
    seoDescription: "Free length converter. Convert between meters, feet, inches, kilometers, miles, centimeters, and millimeters. Instant conversion with formulas.",
    keywords: ["length converter", "meters to feet", "feet to meters", "inch to cm", "km to miles"],
    introText: "Convert between any length units instantly. Whether you need to convert meters to feet, inches to centimeters, or miles to kilometers, our converter handles it all with precision.",
    inputs: [
      {
        id: "value",
        label: "Value",
        type: "number",
        placeholder: "1",
        required: true,
      },
      {
        id: "fromUnit",
        label: "From",
        type: "select",
        options: [
          { value: "m", label: "Meters (m)" },
          { value: "km", label: "Kilometers (km)" },
          { value: "cm", label: "Centimeters (cm)" },
          { value: "mm", label: "Millimeters (mm)" },
          { value: "mi", label: "Miles (mi)" },
          { value: "yd", label: "Yards (yd)" },
          { value: "ft", label: "Feet (ft)" },
          { value: "in", label: "Inches (in)" },
        ],
        defaultValue: "m",
        required: true,
      },
      {
        id: "toUnit",
        label: "To",
        type: "select",
        options: [
          { value: "m", label: "Meters (m)" },
          { value: "km", label: "Kilometers (km)" },
          { value: "cm", label: "Centimeters (cm)" },
          { value: "mm", label: "Millimeters (mm)" },
          { value: "mi", label: "Miles (mi)" },
          { value: "yd", label: "Yards (yd)" },
          { value: "ft", label: "Feet (ft)" },
          { value: "in", label: "Inches (in)" },
        ],
        defaultValue: "ft",
        required: true,
      },
    ],
    outputs: [
      {
        id: "result",
        label: "Result",
        format: "number",
        decimals: 4,
      },
    ],
    formula: [
      {
        description: "Convert between length units",
        formula: "Result = Value × (From Unit in meters ÷ To Unit in meters)",
        variables: {
          "Value": "The number to convert",
          "From Unit": "Original unit",
          "To Unit": "Target unit",
        },
      },
    ],
    examples: [
      {
        title: "Convert 5 feet to meters",
        description: "Common height conversion",
        inputs: { value: 5, fromUnit: "ft", toUnit: "m" },
        outputs: { result: 1.524 },
        explanation: "5 feet equals 1.524 meters. One foot is exactly 0.3048 meters.",
      },
    ],
    faqs: [
      {
        question: "How many feet are in a meter?",
        answer: "One meter equals approximately 3.28084 feet. For quick estimates, use 3.28 feet per meter.",
      },
      {
        question: "How do I convert inches to centimeters?",
        answer: "Multiply inches by 2.54 to get centimeters. For example, 10 inches = 25.4 centimeters.",
      },
    ],
    relatedCalculators: ["weight", "temperature", "time"],
    lastUpdated: "2026-03-15",
  },

  tip: {
    id: "tip",
    title: "Tip Calculator",
    slug: "tip-calculator",
    description: "Calculate tip amount, total bill, and split checks among multiple people.",
    category: "daily",
    seoTitle: "Tip Calculator - Calculate Tip & Split Bill | SmartCalcHub",
    seoDescription: "Free tip calculator. Calculate tip amounts, total bill with tip, and split checks. Custom tip percentages and easy bill splitting.",
    keywords: ["tip calculator", "calculate tip", "gratuity calculator", "split bill", "restaurant tip"],
    introText: "Never struggle with tipping again. Our tip calculator helps you quickly determine the right tip amount, see your total bill including tip, and easily split the check among friends or colleagues.",
    inputs: [
      {
        id: "billAmount",
        label: "Bill Amount",
        type: "number",
        placeholder: "50",
        min: 0,
        step: 0.01,
        required: true,
        unit: "$",
      },
      {
        id: "tipPercent",
        label: "Tip Percentage",
        type: "number",
        placeholder: "18",
        min: 0,
        max: 100,
        step: 1,
        required: true,
        unit: "%",
      },
      {
        id: "people",
        label: "Number of People",
        type: "number",
        placeholder: "2",
        min: 1,
        max: 50,
        required: true,
        helpText: "Split the bill among how many people?",
      },
    ],
    outputs: [
      {
        id: "tipAmount",
        label: "Tip Amount",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "totalAmount",
        label: "Total Amount",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
      {
        id: "perPerson",
        label: "Amount Per Person",
        format: "currency",
        currency: "USD",
        decimals: 2,
      },
    ],
    formula: [
      {
        description: "Calculate tip and total",
        formula: "Tip = Bill × (Tip% ÷ 100)\nTotal = Bill + Tip\nPer Person = Total ÷ Number of People",
        variables: {
          "Bill": "Original bill amount",
          "Tip%": "Tip percentage",
          "People": "Number of people splitting",
        },
      },
    ],
    examples: [
      {
        title: "$50 bill, 18% tip, 2 people",
        description: "Dinner for two scenario",
        inputs: { billAmount: 50, tipPercent: 18, people: 2 },
        outputs: { tipAmount: 9, totalAmount: 59, perPerson: 29.5 },
        explanation: "An 18% tip on $50 is $9, making the total $59. Split between 2 people, each pays $29.50.",
      },
    ],
    faqs: [
      {
        question: "What is a standard tip percentage?",
        answer: "In the US, standard restaurant tips range from 15-20%. 18% is a safe default for good service, while 20%+ is appropriate for excellent service. Some people tip 10-15% for casual dining or takeout.",
      },
      {
        question: "Should I tip on the pre-tax amount?",
        answer: "Etiquette varies, but most people tip on the pre-tax total. However, tipping on the post-tax amount is also common and appreciated by service staff.",
      },
    ],
    relatedCalculators: ["age", "date-difference", "work-hours"],
    lastUpdated: "2026-03-15",
  },
};

export const getAllCalculators = (): CalculatorData[] => {
  return Object.values(calculators);
};

export const getCalculatorBySlug = (slug: string): CalculatorData | undefined => {
  return Object.values(calculators).find((calc) => calc.slug === slug);
};

export const getCalculatorsByCategory = (categoryId: string): CalculatorData[] => {
  return Object.values(calculators).filter((calc) => calc.category === categoryId);
};

export const getFeaturedCalculators = (): CalculatorData[] => {
  return Object.values(calculators).filter((calc) => calc.featured);
};

export const getRelatedCalculators = (calculatorId: string): CalculatorData[] => {
  const calculator = calculators[calculatorId];
  if (!calculator) return [];
  return calculator.relatedCalculators
    .map((id) => calculators[id])
    .filter(Boolean);
};