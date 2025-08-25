import { Progress } from "@/components/ui/progress";

interface CreditCardProps {
  card: {
    id: number;
    bank: string;
    type: string;
    number: string;
    limit: number;
    used: number;
    color: string;
    alias?: string;
  };
}

export default function CreditCard({ card }: CreditCardProps) {
  const usedPercentage = (card.used / card.limit) * 100;
  let barColor = "";

  if (usedPercentage > 33) {
    if (usedPercentage > 66) barColor = "bg-red-500/70";
    else barColor = "bg-amber-300";
  }

  return (
    <div
      className={`bg-gradient-to-br ${card.color} max-w-[350px] aspect-[4/2.5] rounded-lg p-4 flex flex-col justify-between text-white`}
    >
      <div className="flex justify-between items-start ">
        <div>
          <p className="text-xs opacity-80">{card.bank}</p>
          <p className="text-lg font-bold">{card.number}</p>
        </div>
        <div className="text-xs font-bold">{card.type}</div>
      </div>
      <div className="text-sm sm:text-md text-ellipsis overflow-hidden whitespace-nowrap">
        {card.alias || "Nome do cartão"}
      </div>
      <div className="space-y-1 mt-3">
        <div className="flex justify-between text-xs">
          <span className="opacity-80">Usado</span>
          <span>
            R$ {card.used.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <Progress
          value={Math.min(100, usedPercentage)}
          className="h-1 bg-white/20"
          barColor={barColor}
        />
        <div className="flex justify-between text-xs">
          <span className="opacity-80">Limite</span>
          <span>
            R${" "}
            {card.limit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
