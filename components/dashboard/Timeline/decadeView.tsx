import TimelineCell from "./cell";
import { getBalanceForPeriod } from "./transactions";

export type DecadeViewProps = {
  currentDate: Date;
  onPeriodSelect: (date: Date, view: "day" | "month" | "year") => void;
  setCurrentDate: (date: Date) => void;
  setCalendarView: (view: "month" | "year" | "decade") => void;
};

export default function DecadeView(props: DecadeViewProps) {
  const currentYear = props.currentDate.getFullYear();
  const startYear = Math.floor(currentYear / 10) * 10;
  const years = [];

  for (let i = 0; i < 12; i++) {
    const year = startYear + i - 2;
    years.push(year);
  }

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {years.map((year) => {
        const yearDate = new Date(year, 0, 1);
        const isToday = year === new Date().getFullYear();

        return (
          <TimelineCell
            key={year}
            type="year"
            date={yearDate}
            isToday={isToday}
            onClick={() => {
              const newDate = new Date(props.currentDate);
              newDate.setFullYear(year);
              props.setCurrentDate(newDate);
              props.setCalendarView("year");
              props.onPeriodSelect(newDate, "year");
            }}
          >
            {year}
          </TimelineCell>
        );
      })}
    </div>
  );
}
