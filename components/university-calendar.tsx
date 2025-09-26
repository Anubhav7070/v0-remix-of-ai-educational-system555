"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { isSameDay, parseISO } from "date-fns"

interface CalendarEvent {
  date: string // ISO date string
  type: "instructional" | "holiday" | "exam" | "other"
  description: string
}

const mockEvents: CalendarEvent[] = [
  { date: "2025-07-09", type: "instructional", description: "First Instructional Day" },
  { date: "2025-07-19", type: "instructional", description: "Friday Day Order" },
  { date: "2025-08-15", type: "holiday", description: "Independence Day" },
  { date: "2025-08-17", type: "exam", description: "CAT - I (Exam Day)" },
  { date: "2025-08-18", type: "exam", description: "CAT - I (Exam Day)" },
  { date: "2025-08-19", type: "exam", description: "CAT - I (Exam Day)" },
  { date: "2025-08-20", type: "exam", description: "CAT - I (Exam Day)" },
  { date: "2025-08-21", type: "exam", description: "CAT - I (Exam Day)" },
  { date: "2025-08-22", type: "exam", description: "CAT - I (Exam Day)" },
  { date: "2025-08-26", type: "holiday", description: "Vinayakar Chathurthi" },
  { date: "2025-09-01", type: "instructional", description: "Instructional Day" },
  { date: "2025-09-05", type: "holiday", description: "No Instructional Day (Meelad-un-Nabi)" },
  { date: "2025-09-26", type: "holiday", description: "No Instructional Day (Gravitas '25)" },
  { date: "2025-09-27", type: "holiday", description: "No Instructional Day (Gravitas '25)" },
  { date: "2025-09-28", type: "holiday", description: "No Instructional Day (Gravitas '25)" },
  { date: "2025-10-01", type: "holiday", description: "Ayutha Pooja" },
  { date: "2025-10-02", type: "holiday", description: "Gandhi Jayanthi" },
  { date: "2025-10-05", type: "exam", description: "CAT - II (Exam Day)" },
  { date: "2025-10-06", type: "exam", description: "CAT - II (Exam Day)" },
  { date: "2025-10-07", type: "exam", description: "CAT - II (Exam Day)" },
  { date: "2025-10-08", type: "exam", description: "CAT - II (Exam Day)" },
  { date: "2025-10-09", type: "exam", description: "CAT - II (Exam Day)" },
  { date: "2025-10-10", type: "exam", description: "CAT - II (Exam Day)" },
  { date: "2025-10-18", type: "holiday", description: "Deepavali" },
  { date: "2025-10-19", type: "holiday", description: "Deepavali" },
  { date: "2025-10-20", type: "holiday", description: "No Instructional Day (Deepavali)" },
  { date: "2025-10-21", type: "holiday", description: "No Instructional Day (Deepavali)" },
  { date: "2025-10-22", type: "holiday", description: "No Instructional Day (Deepavali)" },
  { date: "2025-10-23", type: "holiday", description: "No Instructional Day (Deepavali)" },
  { date: "2025-10-26", type: "holiday", description: "Deepavali" },
  { date: "2025-11-07", type: "instructional", description: "Friday Day Order, Last Instructional Day for Lab." },
  { date: "2025-11-10", type: "instructional", description: "Commencement of FAT for Lab Courses / Components" },
  { date: "2025-11-14", type: "instructional", description: "Last Instructional Day for Theory Classes" },
]

const UniversityCalendarDayButton = ({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof CalendarDayButton>) => {
  const date = day.date
  const event = mockEvents.find((e) => isSameDay(parseISO(e.date), date))

  return (
    <CalendarDayButton
      className={cn(
        className,
        event && "relative overflow-visible", // Allow space for event indicator
      )}
      day={day}
      modifiers={modifiers}
      {...props}
    >
      {event && (
        <span
          className={cn(
            "absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[0.6rem] font-medium leading-none",
            event.type === "instructional" && "text-green-600",
            event.type === "holiday" && "text-red-600",
            event.type === "exam" && "text-orange-600",
            event.type === "other" && "text-blue-600",
          )}
        >
          {event.description.split(" ")[0]}
        </span>
      )}
    </CalendarDayButton>
  )
}

export function UniversityCalendar({ className, ...props }: React.ComponentProps<typeof Calendar>) {
  const defaultMonth = new Date(2025, 6) // July 2025

  const modifiers = {
    instructional: mockEvents.filter((e) => e.type === "instructional").map((e) => parseISO(e.date)),
    holiday: mockEvents.filter((e) => e.type === "holiday").map((e) => parseISO(e.date)),
    exam: mockEvents.filter((e) => e.type === "exam").map((e) => parseISO(e.date)),
  }

  const modifiersClassNames = {
    instructional: "font-semibold text-green-600",
    holiday: "font-semibold text-red-600",
    exam: "font-semibold text-orange-600",
  }

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm p-4", className)}>
      <h2 className="text-xl font-semibold text-center mb-4">Academic Calendar 2025</h2>
      <Calendar
        className="p-0"
        components={{
          DayButton: UniversityCalendarDayButton,
        }}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        defaultMonth={defaultMonth}
        {...props}
      />
    </div>
  )
}
