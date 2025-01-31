"use client";
import { useEffect, useState } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Calendar,
  CalendarEvent,
  CalendarViewTrigger,
  CalendarCurrentDate,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarNextTrigger,
  CalendarDayView,
  CalendarWeekView,
  CalendarMonthView,
  CalendarYearView,
} from "@/components/ui/full-calendar";

const ChatCalendarPage = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://nikotin.cloud/webhook/0164d030-b5b5-492a-9ca2-d95c5f33aaef/chat",
      mode: "fullscreen",
      showWelcomeScreen: false,
      i18n: {
        en: {
          title: "Time Sync",
          subtitle: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Message Calendar Assistant...",
          footer: "",
        },
      },
    });
  }, []);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents([
      {
        id: "1",
        start: new Date("2025-01-31T09:30:00Z"),
        end: new Date("2025-01-31T14:30:00Z"),
        title: "event A",
        color: "pink",
      },
      {
        id: "2",
        start: new Date("2025-01-31T10:00:00Z"),
        end: new Date("2025-01-31T10:30:00Z"),
        title: "event B",
        color: "blue",
      },
    ]);
  }, []);

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Left Column - Chat */}
      <div className="w-1/3 h-full p-10">
        <div id="n8n-chat" className="w-full h-full">
          {/* n8n chat will be mounted here */}
        </div>
      </div>

      {/* Right Column - Calendar */}
      <div className="w-2/3 h-full bg-white">
        <Calendar events={events} defaultDate={currentDate}>
          <div className="h-dvh py-6 flex flex-col">
            <div className="flex px-6 items-center gap-2 mb-6">
              <CalendarViewTrigger
                className="aria-[current=true]:bg-accent"
                view="day"
              >
                Day
              </CalendarViewTrigger>
              <CalendarViewTrigger
                view="week"
                className="aria-[current=true]:bg-accent"
              >
                Week
              </CalendarViewTrigger>
              <CalendarViewTrigger
                view="month"
                className="aria-[current=true]:bg-accent"
              >
                Month
              </CalendarViewTrigger>
              <CalendarViewTrigger
                view="year"
                className="aria-[current=true]:bg-accent"
              >
                Year
              </CalendarViewTrigger>

              <span className="flex-1" />

              <CalendarCurrentDate />

              <CalendarPrevTrigger>
                <ChevronLeft size={20} />
                <span className="sr-only">Previous</span>
              </CalendarPrevTrigger>

              <CalendarTodayTrigger>Today</CalendarTodayTrigger>

              <CalendarNextTrigger>
                <ChevronRight size={20} />
                <span className="sr-only">Next</span>
              </CalendarNextTrigger>
            </div>

            <div className="flex-1 overflow-auto px-6 relative">
              <CalendarDayView />
              <CalendarWeekView />
              <CalendarMonthView />
              <CalendarYearView />
            </div>
          </div>
        </Calendar>
      </div>

      {/* Custom CSS for black and white theme */}
      <style jsx global>{`
        :root {
          --chat--color-primary: #000000;
          --chat--color-primary-shade-50: #333333;
          --chat--color-primary-shade-100: #666666;
          --chat--color-secondary: #000000;
          --chat--color-secondary-shade-50: #333333;
          --chat--color-white: #ffffff;
          --chat--color-light: #ffffff;
          --chat--color-light-shade-50: #f0f0f0;
          --chat--color-light-shade-100: #e0e0e0;
          --chat--color-medium: #d0d0d0;
          --chat--color-dark: #000000;
          --chat--color-disabled: #999999;
          --chat--color-typing: #000000;

          --chat--message--bot--background: #f8f8f8;
          --chat--message--bot--color: #000000;
          --chat--message--user--background: #000000;
          --chat--message--user--color: #ffffff;

          --chat--header--background: #ffffff;
          --chat--header--color: #000000;
        }
      `}</style>
    </div>
  );
};

export default ChatCalendarPage;
