"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar, RefreshCw, User } from "lucide-react"

interface ClassDetail {
  time: string
  course: string
  type: "TH" | "LO" | "SS"
  venue: string
  courseCode: string
  professor?: string
}

const weeklySchedule: Record<string, ClassDetail[]> = {
  monday: [
    {
      time: "09:51 AM - 11:30 AM",
      course: "Operating Systems Lab",
      type: "LO",
      venue: "SJT120",
      courseCode: "L3+L4",
      professor: "HARSHITA PATEL",
    },
    {
      time: "02:00 PM - 02:50 PM",
      course: "Cloud Architecture Design",
      type: "TH",
      venue: "SJT112",
      courseCode: "A2+TA2",
      professor: "JAGANNATHAN J",
    },
    {
      time: "03:00 PM - 03:50 PM",
      course: "Advanced Competitive Coding - I",
      type: "SS",
      venue: "SJT224",
      courseCode: "F2+TF2",
      professor: "ETHNIJS (APT)",
    },
    {
      time: "04:00 PM - 04:50 PM",
      course: "Artificial Intelligence",
      type: "TH",
      venue: "SJT801",
      courseCode: "D2+TD2",
      professor: "VALARMATHI B",
    },
    {
      time: "05:00 PM - 05:50 PM",
      course: "Computer Networks",
      type: "TH",
      venue: "SJT126",
      courseCode: "B2+TB2",
      professor: "PRIYA M",
    },
    {
      time: "06:00 PM - 06:50 PM",
      course: "Principles of Management",
      type: "TH",
      venue: "MB212",
      courseCode: "G2+TG2",
      professor: "ANUJ KUMAR",
    },
  ],
  tuesday: [
    {
      time: "09:51 AM - 11:30 AM",
      course: "Computer Networks Lab",
      type: "LO",
      venue: "SJTG18",
      courseCode: "L15+L16",
      professor: "PRIYA M",
    },
    {
      time: "02:00 PM - 02:50 PM",
      course: "Machine Learning",
      type: "TH",
      venue: "SJTG24",
      courseCode: "C2+TC2",
      professor: "SELVA RANI B",
    },
    {
      time: "03:00 PM - 03:50 PM",
      course: "Cloud Architecture Design",
      type: "TH",
      venue: "SJT112",
      courseCode: "A2+TA2",
      professor: "JAGANNATHAN J",
    },
    {
      time: "04:00 PM - 04:50 PM",
      course: "Advanced Competitive Coding - I",
      type: "SS",
      venue: "SJT224",
      courseCode: "F2+TF2",
      professor: "ETHNIJS (APT)",
    },
    {
      time: "05:00 PM - 05:50 PM",
      course: "Artificial Intelligence",
      type: "TH",
      venue: "SJT801",
      courseCode: "D2+TD2",
      professor: "VALARMATHI B",
    },
  ],
  wednesday: [
    {
      time: "11:40 AM - 01:20 PM",
      course: "Artificial Intelligence Lab",
      type: "LO",
      venue: "SJT218",
      courseCode: "L11+L12",
      professor: "VALARMATHI B",
    },
    {
      time: "02:00 PM - 02:50 PM",
      course: "Computer Networks",
      type: "TH",
      venue: "SJT126",
      courseCode: "B2+TB2",
      professor: "PRIYA M",
    },
    {
      time: "03:00 PM - 03:50 PM",
      course: "Principles of Management",
      type: "TH",
      venue: "MB212",
      courseCode: "G2+TG2",
      professor: "ANUJ KUMAR",
    },
    {
      time: "04:00 PM - 04:50 PM",
      course: "Operating Systems",
      type: "TH",
      venue: "SJT211A",
      courseCode: "E2+TE2",
      professor: "HARSHITA PATEL",
    },
    {
      time: "05:00 PM - 05:50 PM",
      course: "Machine Learning",
      type: "TH",
      venue: "SJTG24",
      courseCode: "C2+TC2",
      professor: "SELVA RANI B",
    },
  ],
  thursday: [
    {
      time: "02:00 PM - 02:50 PM",
      course: "Artificial Intelligence",
      type: "TH",
      venue: "SJT801",
      courseCode: "D2+TD2",
      professor: "VALARMATHI B",
    },
    {
      time: "03:00 PM - 03:50 PM",
      course: "Computer Networks",
      type: "TH",
      venue: "SJT126",
      courseCode: "B2+TB2",
      professor: "PRIYA M",
    },
    {
      time: "04:00 PM - 04:50 PM",
      course: "Principles of Management",
      type: "TH",
      venue: "MB212",
      courseCode: "G2+TG2",
      professor: "ANUJ KUMAR",
    },
    {
      time: "05:00 PM - 05:50 PM",
      course: "Operating Systems",
      type: "TH",
      venue: "SJT211A",
      courseCode: "E2+TE2",
      professor: "HARSHITA PATEL",
    },
  ],
  friday: [
    {
      time: "02:00 PM - 02:50 PM",
      course: "Operating Systems",
      type: "TH",
      venue: "SJT211A",
      courseCode: "E2+TE2",
      professor: "HARSHITA PATEL",
    },
    {
      time: "03:00 PM - 03:50 PM",
      course: "Machine Learning",
      type: "TH",
      venue: "SJTG24",
      courseCode: "C2+TC2",
      professor: "SELVA RANI B",
    },
    {
      time: "04:00 PM - 04:50 PM",
      course: "Cloud Architecture Design",
      type: "TH",
      venue: "SJT112",
      courseCode: "A2+TA2",
      professor: "JAGANNATHAN J",
    },
    {
      time: "05:00 PM - 05:50 PM",
      course: "Advanced Competitive Coding - I",
      type: "SS",
      venue: "SJT224",
      courseCode: "F2+TF2",
      professor: "ETHNIJS (APT)",
    },
  ],
}

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"]
const dayNames = ["MON", "TUE", "WED", "THU", "FRI"]

function getCurrentDay(): number {
  const today = new Date().getDay()
  // Convert Sunday=0 to our format where Monday=0
  return today === 0 ? 6 : today - 1
}

function getCurrentClass(dayClasses: ClassDetail[]): ClassDetail | null {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  for (const classDetail of dayClasses) {
    const timeRange = classDetail.time.split(" - ")
    const startTime = timeRange[0]
    const endTime = timeRange[1]

    // Parse start time
    const [startHour, startMinute] = startTime.split(" ")[0].split(":").map(Number)
    const startPeriod = startTime.includes("PM") ? "PM" : "AM"
    const start24Hour =
      startPeriod === "PM" && startHour !== 12
        ? startHour + 12
        : startPeriod === "AM" && startHour === 12
          ? 0
          : startHour
    const startMinutes = start24Hour * 60 + startMinute

    // Parse end time
    const [endHour, endMinute] = endTime.split(" ")[0].split(":").map(Number)
    const endPeriod = endTime.includes("PM") ? "PM" : "AM"
    const end24Hour =
      endPeriod === "PM" && endHour !== 12 ? endHour + 12 : endPeriod === "AM" && endHour === 12 ? 0 : endHour
    const endMinutes = end24Hour * 60 + endMinute

    if (currentTime >= startMinutes && currentTime <= endMinutes) {
      return classDetail
    }
  }
  return null
}

export function UnifiedTimetable({ className }: React.ComponentProps<"div">) {
  const [selectedDay, setSelectedDay] = React.useState(getCurrentDay())
  const [currentTime, setCurrentTime] = React.useState(new Date())

  const selectedDayKey = daysOfWeek[selectedDay]
  const dayClasses = weeklySchedule[selectedDayKey] || []
  const currentClass = getCurrentClass(dayClasses)

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handlePrevDay = () => {
    setSelectedDay((prev) => (prev === 0 ? 4 : prev - 1))
  }

  const handleNextDay = () => {
    setSelectedDay((prev) => (prev === 4 ? 0 : prev + 1))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "TH":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "LO":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "SS":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with Day Navigation */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Time Table</CardTitle>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          {/* Day Navigation */}
          <div className="flex items-center justify-between mt-4">
            <Button variant="ghost" size="sm" onClick={handlePrevDay}>
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-1">
              {dayNames.map((day, index) => (
                <Button
                  key={day}
                  variant={selectedDay === index ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedDay(index)}
                  className={cn("min-w-[50px] text-xs", selectedDay === index && "bg-primary text-primary-foreground")}
                >
                  {day}
                </Button>
              ))}
            </div>

            <Button variant="ghost" size="sm" onClick={handleNextDay}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Current Class Highlight */}
      {currentClass && selectedDay === getCurrentDay() && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Current Class</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{currentClass.course}</h3>
                <Badge className={getTypeColor(currentClass.type)}>{currentClass.type}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentClass.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {currentClass.venue}
                </div>
              </div>
              <div className="text-sm font-medium text-primary">{currentClass.courseCode}</div>
              {currentClass.professor && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {currentClass.professor}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Classes List */}
      <div className="space-y-3">
        {dayClasses.length > 0 ? (
          dayClasses.map((classDetail, index) => {
            const isCurrentClass = currentClass?.time === classDetail.time && selectedDay === getCurrentDay()

            return (
              <Card
                key={index}
                className={cn("transition-all duration-200", isCurrentClass && "ring-2 ring-primary bg-primary/5")}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{classDetail.time}</span>
                      </div>
                      <h3 className="font-semibold text-base mb-1">{classDetail.course}</h3>
                      <div className="text-sm text-muted-foreground">{classDetail.courseCode}</div>
                      {classDetail.professor && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <User className="w-4 h-4" />
                          {classDetail.professor}
                        </div>
                      )}
                    </div>
                    <Badge className={getTypeColor(classDetail.type)}>{classDetail.type}</Badge>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{classDetail.venue}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No classes scheduled for {dayNames[selectedDay]}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sync Status */}
      <Card className="bg-muted/30">
        <CardContent className="p-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>
              Last Sync on {currentTime.toLocaleDateString()}{" "}
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
