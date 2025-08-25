export const isAdmin = true;

export const financialData = {
  balance: 12450.75,
  monthlyIncome: 8500.0,
  monthlyExpenses: 3680.25,
  savings: 4270.5,
  investments: 15230.8,
  creditLimit: 5000.0,
  creditUsed: 1250.0,
  monthlyBudget: 4000.0,
  budgetUsed: 2890.5,
};

export const recentTransactions = [
  {
    id: 1,
    description: "Supermercado Extra",
    amount: -245.8,
    date: "2025-01-20",
    category: "Alimentação",
    type: "expense",
  },
  {
    id: 2,
    description: "Salário",
    amount: 8500.0,
    date: "2025-01-20",
    category: "Renda",
    type: "income",
  },
  {
    id: 3,
    description: "Netflix",
    amount: -29.9,
    date: "2025-01-19",
    category: "Entretenimento",
    type: "expense",
  },
  {
    id: 4,
    description: "Freelance",
    amount: 1200.0,
    date: "2025-01-18",
    category: "Renda Extra",
    type: "income",
  },
  {
    id: 5,
    description: "Posto de Gasolina",
    amount: -180.0,
    date: "2025-01-17",
    category: "Transporte",
    type: "expense",
  },
];

export const userCards = [
  {
    id: 2,
    bank: "Cartão Gold",
    type: "Mastercard",
    number: "12** **** **** 5678",
    limit: 8000.0,
    used: 2100.0,
    color: "from-amber-600 to-amber-800",
  },
  {
    id: 3,
    bank: "Cartão Black",
    type: "Visa",
    number: "34** **** **** 9012",
    limit: 15000.0,
    used: 7500.0,
    color: "from-gray-800 to-black",
  },
  {
    id: 1,
    bank: "Nubank",
    type: "Visa",
    number: "56** **** **** 1234",
    limit: 5000.0,
    used: 10250.0,
    color: "from-purple-600 to-purple-800",
  },
];

export const monthlyTrendData = [
  { month: "Jul", income: 7800, expenses: 3200 },
  { month: "Ago", income: 8200, expenses: 3500 },
  { month: "Set", income: 8000, expenses: 3800 },
  { month: "Out", income: 8500, expenses: 3600 },
  { month: "Nov", income: 8300, expenses: 3900 },
  { month: "Dez", income: 8500, expenses: 3680 },
];

export const expenseCategories = [
  { name: "Alimentação", value: 1200, color: "#16bac5" },
  { name: "Transporte", value: 800, color: "#ef4444" },
  { name: "Entretenimento", value: 450, color: "#3b82f6" },
  { name: "Saúde", value: 600, color: "#10b981" },
  { name: "Outros", value: 630, color: "#8b5cf6" },
];

export const weeklySpending = [
  { day: "Seg", amount: 120 },
  { day: "Ter", amount: 85 },
  { day: "Qua", amount: 200 },
  { day: "Qui", amount: 150 },
  { day: "Sex", amount: 300 },
  { day: "Sáb", amount: 180 },
  { day: "Dom", amount: 90 },
];
