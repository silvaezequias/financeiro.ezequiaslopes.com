import { jetmono } from "@/lib/fonts";
import { ArrowDownRight, ArrowUpLeft, DollarSign } from "lucide-react";
import { Button } from "../ui/button";

const transactions = [
  {
    id: 1,
    name: "Amazon.com",
    amount: -129.99,
    date: "2023-07-15",
    type: "expense",
  },
  {
    id: 2,
    name: "Whole Foods Market",
    amount: -89.72,
    date: "2023-07-10",
    type: "expense",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    amount: -15.99,
    date: "2023-07-05",
    type: "expense",
  },
  {
    id: 4,
    name: "Freelance Payment",
    amount: 750,
    date: "2023-07-12",
    type: "income",
  },
  {
    id: 5,
    name: "Gas Station",
    amount: -45.5,
    date: "2023-07-18",
    type: "expense",
  },
  {
    id: 6,
    name: "Amazon.com",
    amount: -129.99,
    date: "2023-07-15",
    type: "expense",
  },
  {
    id: 7,
    name: "Whole Foods Market",
    amount: -89.72,
    date: "2023-07-10",
    type: "expense",
  },
  {
    id: 8,
    name: "Netflix Subscription",
    amount: -15.99,
    date: "2023-07-05",
    type: "expense",
  },
  {
    id: 9,
    name: "Freelance Payment",
    amount: 750,
    date: "2023-07-12",
    type: "income",
  },
  {
    id: 10,
    name: "Gas Station",
    amount: -45.5,
    date: "2023-07-18",
    type: "expense",
  },
];

export default function Transactions() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-900 bg-neutral-950">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-300">
          <DollarSign className="h-5 w-5" />
          <span
            className={`${jetmono.className} text-xs uppercase tracking-widest`}
          >
            Transações recentes
          </span>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => {
            return (
              <div className="flex justify-between items-center">
                <span className="flex flex-col">
                  <span className="text-neutral-400">{transaction.name}</span>
                  <span className="text-neutral-400 text-[12px]">
                    {new Date(transaction.date).toDateString()}
                  </span>
                </span>
                {transaction.amount > 0 ? (
                  <span className="text-green-300 font-semibold flex items-center gap-2">
                    R$ {transaction.amount}
                    <ArrowUpLeft className="h-4 w-4 " />
                  </span>
                ) : (
                  <span className="text-red-300 font-semibold flex items-center gap-2">
                    R$ {transaction.amount}
                    <ArrowDownRight className="h-4 w-4 " />
                  </span>
                )}
              </div>
            );
          })}
          <Button
            variant={"ghost"}
            className="flex w-70 hover:bg-amber-300 hover:text-neutral-900 bg-neutral-900/60 rounded-lg text-sm text-neutral-300"
          >
            Ver transações
          </Button>
        </div>
      </div>
    </div>
  );
}
