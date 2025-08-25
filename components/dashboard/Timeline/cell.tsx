import { getBalanceForPeriod } from "./transactions";

type TimelineCellProps = {
  key: string | number;
  type: "day" | "month" | "year";
  isSelected?: boolean;
  isToday: boolean;
  date: Date;
  onClick: (date: Date) => void;
  children?: React.ReactNode;
  asGhost?: boolean;
};

export default function TimelineCell(props: TimelineCellProps) {
  const { balance, hasNegative, hasPositive } = getBalanceForPeriod(
    props.date,
    props.type
  );
  const balanceColor = balance > -0.9 ? "bg-green-500/40" : "bg-red-500/40";

  const date = props.date.getDate();
  const month = props.date.getMonth() + 1;
  const year = props.date.getFullYear();

  const dateString = `${date.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year.toString().slice(-2)}`;

  return (
    <button
      key={dateString}
      onClick={() => props.onClick(props.date)}
      title={
        `${props.isToday ? " (Hoje)" : ""} ${dateString}\n\n` +
        balance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      }
      className={`
        aspect-square 
        flex
        flex-col
        justify-between
        ring-1 ring-transparent hover:ring-neutral-200 
        text-neutral-300 
        border-0 
        ${balanceColor}
        rounded-lg text-xs font-medium 
        transition-colors border
        duration-500
        ${props.asGhost && "opacity-20 hover:opacity-100"}
        `}
    >
      <span className="flex pt-[15%] pl-[15%] gap-1">
        {hasNegative && <span className="w-1 h-1 rounded bg-red-500" />}
        {hasPositive && <span className="w-1 h-1 rounded bg-green-500" />}
        <span className="w-1 h-1 rounded" />
      </span>
      <span className="">{props.children}</span>
      <span className="flex pb-[15%] px-2">
        <span
          className={`w-full h-0.5 ${props.isToday && "bg-amber-300/80"}`}
        />
      </span>
    </button>
  );
}
