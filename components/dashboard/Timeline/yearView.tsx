import TimelineCell from "./cell";
import { getBalanceForPeriod } from "./transactions";

export type YearViewProps = {
  currentDate: Date;
  onPeriodSelect: (date: Date, view: "day" | "month" | "year") => void;
  setCurrentDate: (date: Date) => void;
  setCalendarView: (view: "month" | "year" | "decade") => void;
};

export default function YearView(props: YearViewProps) {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {months.map((month, index) => {
        const monthDate = new Date(props.currentDate.getFullYear(), index, 1);
        const balance = getBalanceForPeriod(monthDate, "month");

        const isToday =
          index === new Date().getMonth() &&
          props.currentDate.getFullYear() === new Date().getFullYear();

        return (
          <TimelineCell
            isToday={isToday}
            type="month"
            date={monthDate}
            key={month}
            onClick={() => {
              const newDate = new Date(props.currentDate);
              newDate.setMonth(index);
              props.setCurrentDate(newDate);
              props.setCalendarView("month");
              props.onPeriodSelect(newDate, "month");
            }}
          >
            {month}
          </TimelineCell>
        );
      })}
    </div>
  );
}
