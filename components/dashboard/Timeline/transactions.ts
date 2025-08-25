export const mockTransactions = [
  { date: new Date(2025, 0, 15), amount: 2500, description: "Salário" },
  { date: new Date(2012, 0, 15), amount: 15000, description: "Salário" },
  { date: new Date(2025, 0, 16), amount: -150, description: "Supermercado" },
  { date: new Date(2025, 0, 17), amount: -80, description: "Combustível" },
  { date: new Date(2025, 6, 18), amount: -35000, description: "Casa" },
  { date: new Date(2025, 0, 20), amount: -45, description: "Netflix" },
  { date: new Date(2025, 0, 25), amount: -200, description: "Restaurante" },
  { date: new Date(2025, 1, 1), amount: 3000, description: "Freelance" },
  { date: new Date(2025, 1, 5), amount: -300, description: "Conta de luz" },
  { date: new Date(2025, 1, 10), amount: -120, description: "Internet" },
];

export const getBalanceForPeriod = (
  date: Date,
  type: "day" | "month" | "year"
) => {
  let endDate = new Date(date);

  if (type === "month") {
    endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  if (type === "year") {
    endDate = new Date(date.getFullYear(), 11, 31);
  }

  const allTransactionsUntilEndDate = mockTransactions.filter(
    (t) => t.date <= endDate
  );

  const balance = allTransactionsUntilEndDate.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const isInPeriod = (transactionDate: Date) => {
    if (type === "day") {
      return transactionDate.toDateString() === date.toDateString();
    } else if (type === "month") {
      return (
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      );
    } else {
      return transactionDate.getFullYear() === date.getFullYear();
    }
  };

  const transactionsInPeriod = mockTransactions.filter((t) =>
    isInPeriod(t.date)
  );

  const hasPositive = transactionsInPeriod.some((t) => t.amount > 0);
  const hasNegative = transactionsInPeriod.some((t) => t.amount < 0);

  return {
    balance,
    hasPositive,
    hasNegative,
  };
};
