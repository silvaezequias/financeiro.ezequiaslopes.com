import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import DecadeView from "./decadeView";
import YearView from "./yearView";
import MonthView from "./monthView";

interface TimelineProps {
  className?: string;
  onPeriodSelect?: (period: {
    type: "day" | "month" | "year";
    date: Date;
  }) => void;
}

export default function Timeline(props: TimelineProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<"year" | "month" | "decade">(
    "month"
  );
  const [selectedPeriod, setSelectedPeriod] = useState<{
    type: "day" | "month" | "year";
    date: Date;
  } | null>(null);

  const navigateCalendar = (direction: "up" | "down") => {
    const newDate = new Date(currentDate);
    if (calendarView === "decade") {
      newDate.setFullYear(
        currentDate.getFullYear() + (direction === "up" ? -10 : 10)
      );
    } else if (calendarView === "year") {
      newDate.setFullYear(
        currentDate.getFullYear() + (direction === "up" ? -1 : 1)
      );
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === "up" ? -1 : 1));
    }
    setCurrentDate(newDate);
  };

  const toggleCalendarView = () => {
    if (calendarView === "month") {
      setCalendarView("year");
    } else if (calendarView === "year") {
      setCalendarView("decade");
    }
  };

  const handlePeriodSelect = (date: Date, type: "day" | "month" | "year") => {
    const period = { type, date };
    setSelectedPeriod(period);
    props.onPeriodSelect?.(period);
  };

  const getTitle = () => {
    if (calendarView === "decade") {
      const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
      return `${startYear - 2} - ${startYear + 9}`;
    } else if (calendarView === "year") {
      return currentDate.getFullYear().toString();
    } else {
      return currentDate.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <div
      className={`bg-neutral-950/40 border border-neutral-900 rounded-lg p-4 w-full max-w-full ${props.className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-amber-300" />
          <span className="font-mono text-sm font-medium text-amber-300 uppercase tracking-wider">
            TIMELINE
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleCalendarView}
            className="text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
          >
            {getTitle()}
          </button>
          <div className="flex items-center gap-1">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigateCalendar("up")}
              className="h-6 w-6 p-0 text-neutral-400 hover:text-amber-300"
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => navigateCalendar("down")}
              className="h-6 w-6 p-0 text-neutral-400 hover:text-amber-300"
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="w-full">
          {calendarView === "decade" ? (
            <DecadeView
              currentDate={currentDate}
              onPeriodSelect={handlePeriodSelect}
              setCalendarView={setCalendarView}
              setCurrentDate={setCurrentDate}
            />
          ) : calendarView === "year" ? (
            <YearView
              currentDate={currentDate}
              onPeriodSelect={handlePeriodSelect}
              setCalendarView={setCalendarView}
              setCurrentDate={setCurrentDate}
            />
          ) : (
            <MonthView
              currentDate={currentDate}
              onPeriodSelect={handlePeriodSelect}
              setCalendarView={setCalendarView}
              setCurrentDate={setCurrentDate}
            />
          )}
        </div>

        <div className="text-center">
          <Button
            onClick={() => {
              setCurrentDate(new Date());
              setCalendarView("month");
            }}
            className="text-xs mt-4 text-neutral-400 hover:text-amber-300 transition-colors"
          >
            Hoje: {new Date().toLocaleDateString("pt-BR")}
          </Button>
        </div>
      </div>
    </div>
  );
}
