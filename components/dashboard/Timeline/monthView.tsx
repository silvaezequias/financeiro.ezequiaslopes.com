import TimelineCell from "./cell";

export type MonthViewProps = {
  currentDate: Date;
  onPeriodSelect: (date: Date, view: "day" | "month" | "year") => void;
  setCurrentDate: (date: Date) => void;
  setCalendarView: (view: "month" | "year" | "decade") => void;
};

export default function MonthView(props: MonthViewProps) {
  const year = props.currentDate.getFullYear();
  const month = props.currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const today = new Date();

  const calendarDays = [];

  const prevMonth = new Date(year, month - 1, 0);
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonth.getDate() - i,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month - 1, prevMonth.getDate() - i),
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year;
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isToday,
      date: new Date(year, month, day),
    });
  }

  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month + 1, day),
    });
  }

  return (
    <div className="space-y-2 w-full">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="aspect-square flex items-center justify-center text-xs font-medium text-neutral-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          return (
            <TimelineCell
              type="day"
              isToday={date.isToday}
              key={index}
              onClick={() => props.onPeriodSelect(date.date, "day")}
              date={date.date}
              asGhost={!date.isCurrentMonth}
            >
              {date.day}
            </TimelineCell>
          );
        })}
      </div>
    </div>
  );
}
