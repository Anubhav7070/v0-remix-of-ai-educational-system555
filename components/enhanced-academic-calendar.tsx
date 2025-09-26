"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isSameDay, parseISO, format, startOfMonth, endOfMonth } from "date-fns"
import { CalendarIcon, BookOpen, BarChart3 } from "lucide-react"

interface CalendarEvent {
  date: string // ISO date string
  type: "instructional" | "holiday" | "exam" | "special" | "break"
  title: string
  description: string
  category?: string
}

// Enhanced calendar events based on the provided images
const academicEvents: CalendarEvent[] = [
  // July 2025
  {
    date: "2025-07-09",
    type: "instructional",
    title: "First Instructional Day",
    description: "Academic year begins",
    category: "Academic",
  },
  {
    date: "2025-07-10",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-11",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-14",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-15",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-16",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-17",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-18",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-19",
    type: "special",
    title: "Friday Day Order",
    description: "Special day order",
    category: "Academic",
  },
  {
    date: "2025-07-21",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-22",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-23",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-24",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-25",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-28",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-29",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-30",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-07-31",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },

  // August 2025
  {
    date: "2025-08-01",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-02",
    type: "special",
    title: "Friday Day Order",
    description: "Special day order",
    category: "Academic",
  },
  {
    date: "2025-08-04",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-05",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-06",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-07",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-08",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-15",
    type: "holiday",
    title: "Independence Day",
    description: "National holiday",
    category: "Holiday",
  },
  { date: "2025-08-17", type: "exam", title: "CAT - I", description: "Continuous Assessment Test 1", category: "Exam" },
  { date: "2025-08-18", type: "exam", title: "CAT - I", description: "Continuous Assessment Test 1", category: "Exam" },
  { date: "2025-08-19", type: "exam", title: "CAT - I", description: "Continuous Assessment Test 1", category: "Exam" },
  { date: "2025-08-20", type: "exam", title: "CAT - I", description: "Continuous Assessment Test 1", category: "Exam" },
  { date: "2025-08-21", type: "exam", title: "CAT - I", description: "Continuous Assessment Test 1", category: "Exam" },
  { date: "2025-08-22", type: "exam", title: "CAT - I", description: "Continuous Assessment Test 1", category: "Exam" },
  { date: "2025-08-23", type: "exam", title: "CAT - I", description: "Continuous Assessment Test 1", category: "Exam" },
  {
    date: "2025-08-25",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-26",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-27",
    type: "holiday",
    title: "Vinayakar Chathurthi",
    description: "Religious holiday",
    category: "Holiday",
  },
  {
    date: "2025-08-28",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-29",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-08-30",
    type: "special",
    title: "Wednesday Day Order",
    description: "Special day order",
    category: "Academic",
  },

  // September 2025
  {
    date: "2025-09-01",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-02",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-03",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-04",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-05",
    type: "holiday",
    title: "Meelad-un-Nabi",
    description: "Religious holiday",
    category: "Holiday",
  },
  {
    date: "2025-09-08",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-09",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-10",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-11",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-12",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-15",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-16",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-17",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-18",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-19",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-22",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-23",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-24",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-25",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  { date: "2025-09-26", type: "special", title: "Gravitas '25", description: "University fest", category: "Event" },
  { date: "2025-09-27", type: "special", title: "Gravitas '25", description: "University fest", category: "Event" },
  { date: "2025-09-28", type: "special", title: "Gravitas '25", description: "University fest", category: "Event" },
  {
    date: "2025-09-29",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-09-30",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },

  // October 2025
  { date: "2025-10-01", type: "holiday", title: "Ayutha Pooja", description: "Religious holiday", category: "Holiday" },
  {
    date: "2025-10-02",
    type: "holiday",
    title: "Gandhi Jayanthi",
    description: "National holiday",
    category: "Holiday",
  },
  {
    date: "2025-10-03",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-05",
    type: "exam",
    title: "CAT - II",
    description: "Continuous Assessment Test 2",
    category: "Exam",
  },
  {
    date: "2025-10-06",
    type: "exam",
    title: "CAT - II",
    description: "Continuous Assessment Test 2",
    category: "Exam",
  },
  {
    date: "2025-10-07",
    type: "exam",
    title: "CAT - II",
    description: "Continuous Assessment Test 2",
    category: "Exam",
  },
  {
    date: "2025-10-08",
    type: "exam",
    title: "CAT - II",
    description: "Continuous Assessment Test 2",
    category: "Exam",
  },
  {
    date: "2025-10-09",
    type: "exam",
    title: "CAT - II",
    description: "Continuous Assessment Test 2",
    category: "Exam",
  },
  {
    date: "2025-10-10",
    type: "exam",
    title: "CAT - II",
    description: "Continuous Assessment Test 2",
    category: "Exam",
  },
  {
    date: "2025-10-11",
    type: "exam",
    title: "CAT - II",
    description: "Continuous Assessment Test 2",
    category: "Exam",
  },
  {
    date: "2025-10-13",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-14",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-15",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-16",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-17",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  { date: "2025-10-18", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-19", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-20", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-21", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-22", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-23", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-24", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-25", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  { date: "2025-10-26", type: "holiday", title: "Deepavali", description: "Festival of lights", category: "Holiday" },
  {
    date: "2025-10-27",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-28",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-29",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-30",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-10-31",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },

  // November 2025
  {
    date: "2025-11-03",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-11-04",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-11-05",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-11-06",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-11-07",
    type: "special",
    title: "Friday Day Order",
    description: "Last Instructional Day for Lab",
    category: "Academic",
  },
  {
    date: "2025-11-10",
    type: "special",
    title: "FAT Lab Courses",
    description: "Commencement of FAT for Lab Courses",
    category: "Exam",
  },
  {
    date: "2025-11-11",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-11-12",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-11-13",
    type: "instructional",
    title: "Instructional Day",
    description: "Regular classes",
    category: "Academic",
  },
  {
    date: "2025-11-14",
    type: "special",
    title: "Last Theory Day",
    description: "Last Instructional Day for Theory Classes",
    category: "Academic",
  },
]

const EnhancedCalendarDayButton = ({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof CalendarDayButton>) => {
  const date = day.date
  const events = academicEvents.filter((e) => isSameDay(parseISO(e.date), date))
  const primaryEvent = events[0]

  return (
    <CalendarDayButton
      className={cn(
        className,
        primaryEvent && "relative overflow-visible",
        primaryEvent?.type === "instructional" && "bg-green-50 text-green-700 hover:bg-green-100",
        primaryEvent?.type === "holiday" && "bg-red-50 text-red-700 hover:bg-red-100",
        primaryEvent?.type === "exam" && "bg-orange-50 text-orange-700 hover:bg-orange-100",
        primaryEvent?.type === "special" && "bg-blue-50 text-blue-700 hover:bg-blue-100",
      )}
      day={day}
      modifiers={modifiers}
      {...props}
    >
      {primaryEvent && (
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div
            className={cn(
              "text-[0.5rem] font-medium leading-none px-1 py-0.5 rounded-sm",
              primaryEvent.type === "instructional" && "bg-green-600 text-white",
              primaryEvent.type === "holiday" && "bg-red-600 text-white",
              primaryEvent.type === "exam" && "bg-orange-600 text-white",
              primaryEvent.type === "special" && "bg-blue-600 text-white",
            )}
          >
            {primaryEvent.type === "instructional" && "Class"}
            {primaryEvent.type === "holiday" && "Holiday"}
            {primaryEvent.type === "exam" && "Exam"}
            {primaryEvent.type === "special" && "Event"}
          </div>
        </div>
      )}
    </CalendarDayButton>
  )
}

export function EnhancedAcademicCalendar({ className, ...props }: React.ComponentProps<typeof Calendar>) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2025, 6)) // July 2025

  const selectedEvents = selectedDate
    ? academicEvents.filter((event) => isSameDay(parseISO(event.date), selectedDate))
    : []

  const monthEvents = React.useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return academicEvents.filter((event) => {
      const eventDate = parseISO(event.date)
      return eventDate >= start && eventDate <= end
    })
  }, [currentMonth])

  const eventsByType = React.useMemo(() => {
    return monthEvents.reduce(
      (acc, event) => {
        if (!acc[event.type]) acc[event.type] = []
        acc[event.type].push(event)
        return acc
      },
      {} as Record<string, CalendarEvent[]>,
    )
  }, [monthEvents])

  const modifiers = {
    instructional: academicEvents.filter((e) => e.type === "instructional").map((e) => parseISO(e.date)),
    holiday: academicEvents.filter((e) => e.type === "holiday").map((e) => parseISO(e.date)),
    exam: academicEvents.filter((e) => e.type === "exam").map((e) => parseISO(e.date)),
    special: academicEvents.filter((e) => e.type === "special").map((e) => parseISO(e.date)),
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Academic Calendar 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              className="p-0"
              components={{
                DayButton: EnhancedCalendarDayButton,
              }}
              modifiers={modifiers}
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              {...props}
            />
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a Date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedEvents.map((event, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          event.type === "instructional"
                            ? "default"
                            : event.type === "holiday"
                              ? "destructive"
                              : event.type === "exam"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {event.type}
                      </Badge>
                      {event.category && (
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No events scheduled for this date.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {format(currentMonth, "MMMM yyyy")} Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructional">Classes</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="holidays">Holidays</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{eventsByType.instructional?.length || 0}</div>
                  <div className="text-sm text-green-700">Class Days</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{eventsByType.holiday?.length || 0}</div>
                  <div className="text-sm text-red-700">Holidays</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{eventsByType.exam?.length || 0}</div>
                  <div className="text-sm text-orange-700">Exam Days</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{eventsByType.special?.length || 0}</div>
                  <div className="text-sm text-blue-700">Special Events</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="instructional" className="space-y-2">
              {eventsByType.instructional?.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="font-medium">{format(parseISO(event.date), "MMM d")}</span>
                  <span className="text-sm text-muted-foreground">{event.title}</span>
                </div>
              )) || <p className="text-muted-foreground">No instructional days this month.</p>}
            </TabsContent>

            <TabsContent value="exams" className="space-y-2">
              {eventsByType.exam?.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <span className="font-medium">{format(parseISO(event.date), "MMM d")}</span>
                  <span className="text-sm text-muted-foreground">{event.title}</span>
                </div>
              )) || <p className="text-muted-foreground">No exams scheduled this month.</p>}
            </TabsContent>

            <TabsContent value="holidays" className="space-y-2">
              {eventsByType.holiday?.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="font-medium">{format(parseISO(event.date), "MMM d")}</span>
                  <span className="text-sm text-muted-foreground">{event.title}</span>
                </div>
              )) || <p className="text-muted-foreground">No holidays this month.</p>}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
