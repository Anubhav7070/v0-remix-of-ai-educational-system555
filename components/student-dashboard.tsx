"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, BookOpen, Clock, TrendingUp, Award, MapPin, GraduationCap, Star } from "lucide-react"
import { format, parseISO } from "date-fns"

// Mock student data
const studentData = {
  id: "VL2025260105133",
  name: "John Doe",
  email: "john.doe@vitap.ac.in",
  program: "B.Tech Computer Science",
  semester: "5th Semester",
  year: "3rd Year",
  cgpa: 8.75,
  credits: 27.5,
  avatar: "/placeholder-user.jpg",
  registrationNumber: "21BCE1234",
  section: "CSE-A",
  batch: "2021-2025",
}

const currentCourses = [
  {
    code: "BCSE355L",
    name: "Cloud Architecture Design",
    professor: "JAGANNATHAN J",
    credits: 3,
    attendance: 85,
    grade: "A",
    venue: "SJT112",
    type: "Theory",
  },
  {
    code: "BITE305L",
    name: "Operating Systems",
    professor: "HARSHITA PATEL",
    credits: 3,
    attendance: 92,
    grade: "A+",
    venue: "SJT211A",
    type: "Theory",
  },
  {
    code: "BITE306L",
    name: "Artificial Intelligence",
    professor: "VALARMATHI B",
    credits: 3,
    attendance: 78,
    grade: "B+",
    venue: "SJT801",
    type: "Theory",
  },
  {
    code: "BITE410L",
    name: "Machine Learning",
    professor: "SELVA RANI B",
    credits: 3,
    attendance: 88,
    grade: "A",
    venue: "SJT224",
    type: "Theory",
  },
  {
    code: "BMGT101L",
    name: "Principles of Management",
    professor: "ANUJ KUMAR",
    credits: 3,
    attendance: 95,
    grade: "A+",
    venue: "MB212",
    type: "Theory",
  },
  {
    code: "BITE305P",
    name: "Operating Systems Lab",
    professor: "HARSHITA PATEL",
    credits: 2,
    attendance: 90,
    grade: "A",
    venue: "SJT20",
    type: "Lab",
  },
]

const upcomingEvents = [
  {
    date: "2025-01-15",
    title: "CAT-II Exam",
    course: "Cloud Architecture Design",
    type: "exam",
    venue: "SJT112",
  },
  {
    date: "2025-01-16",
    title: "Assignment Submission",
    course: "Machine Learning",
    type: "assignment",
    venue: "Online",
  },
  {
    date: "2025-01-18",
    title: "Lab Practical",
    course: "Operating Systems Lab",
    type: "lab",
    venue: "SJT20",
  },
  {
    date: "2025-01-20",
    title: "Project Presentation",
    course: "Artificial Intelligence",
    type: "presentation",
    venue: "SJT801",
  },
]

const achievements = [
  {
    title: "Dean's List",
    description: "Achieved CGPA > 8.5 for consecutive semesters",
    date: "2024-12-15",
    type: "academic",
  },
  {
    title: "Perfect Attendance",
    description: "100% attendance in Operating Systems",
    date: "2024-11-30",
    type: "attendance",
  },
  {
    title: "Best Project Award",
    description: "AI-based Healthcare System",
    date: "2024-10-20",
    type: "project",
  },
]

function getCurrentTimeSlot(): string | null {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const timeSlots = [
    { start: "08:00", end: "08:50" },
    { start: "08:51", end: "09:40" },
    { start: "09:51", end: "10:40" },
    { start: "10:41", end: "11:30" },
    { start: "11:40", end: "12:30" },
    { start: "14:00", end: "14:50" },
    { start: "14:51", end: "15:40" },
    { start: "15:51", end: "16:40" },
    { start: "16:41", end: "17:30" },
  ]

  for (const slot of timeSlots) {
    const [startHour, startMin] = slot.start.split(":").map(Number)
    const [endHour, endMin] = slot.end.split(":").map(Number)
    const startTime = startHour * 60 + startMin
    const endTime = endHour * 60 + endMin

    if (currentTime >= startTime && currentTime <= endTime) {
      return `${slot.start} - ${slot.end}`
    }
  }
  return null
}

function getCurrentClass() {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentTimeSlot = getCurrentTimeSlot()

  if (!currentTimeSlot || currentDay === 0 || currentDay === 6) return null

  // Mock current class based on time and day
  if (currentTimeSlot === "08:00 - 08:50") {
    return currentCourses[0] // Cloud Architecture Design
  } else if (currentTimeSlot === "09:51 - 10:40") {
    return currentCourses[1] // Operating Systems
  } else if (currentTimeSlot === "14:00 - 14:50") {
    return currentCourses[2] // Artificial Intelligence
  }

  return null
}

export function StudentDashboard() {
  const [currentTime, setCurrentTime] = React.useState(new Date())
  const currentClass = getCurrentClass()
  const currentTimeSlot = getCurrentTimeSlot()

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const averageAttendance = Math.round(
    currentCourses.reduce((sum, course) => sum + course.attendance, 0) / currentCourses.length,
  )

  const totalCredits = currentCourses.reduce((sum, course) => sum + course.credits, 0)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Student Profile */}
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                <AvatarFallback>
                  {studentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{studentData.name}</h3>
                <p className="text-sm text-muted-foreground">{studentData.registrationNumber}</p>
                <Badge variant="outline">{studentData.section}</Badge>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Program:</span>
                <span className="font-medium">{studentData.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Semester:</span>
                <span className="font-medium">{studentData.semester}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CGPA:</span>
                <span className="font-bold text-primary">{studentData.cgpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credits:</span>
                <span className="font-medium">{totalCredits}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Class */}
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentClass ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{currentClass.name}</h3>
                    <p className="text-muted-foreground">
                      {currentClass.code} • {currentTimeSlot}
                    </p>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    Live Class
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{currentClass.professor}</p>
                      <p className="text-xs text-muted-foreground">Professor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{currentClass.venue}</p>
                      <p className="text-xs text-muted-foreground">Venue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{currentClass.credits} Credits</p>
                      <p className="text-xs text-muted-foreground">{currentClass.type}</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Mark Attendance</Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Current Class</h3>
                <p className="text-muted-foreground">
                  {currentTimeSlot ? "Free period" : "Classes have ended for today"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{averageAttendance}%</p>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{studentData.cgpa}</p>
                <p className="text-sm text-muted-foreground">CGPA</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{currentCourses.length}</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{achievements.length}</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {currentCourses.map((course) => (
              <Card key={course.code}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.code} • {course.professor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={course.type === "Theory" ? "default" : "secondary"}>{course.type}</Badge>
                      <Badge variant="outline">{course.credits} Credits</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Attendance</span>
                        <span className="text-sm font-medium">{course.attendance}%</span>
                      </div>
                      <Progress value={course.attendance} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{course.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Grade: {course.grade}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentCourses.slice(0, 4).map((course, index) => {
                  const timeSlots = ["08:00 - 08:50", "09:51 - 10:40", "14:00 - 14:50", "15:51 - 16:40"]
                  return (
                    <div key={course.code} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="text-sm font-medium w-24">{timeSlots[index]}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.professor} • {course.venue}
                        </p>
                      </div>
                      <Badge variant={course.type === "Theory" ? "default" : "secondary"}>{course.type}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-center">
                      <div className="text-sm font-medium">{format(parseISO(event.date), "MMM")}</div>
                      <div className="text-lg font-bold">{format(parseISO(event.date), "d")}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.course} • {event.venue}
                      </p>
                    </div>
                    <Badge
                      variant={
                        event.type === "exam"
                          ? "destructive"
                          : event.type === "assignment"
                            ? "secondary"
                            : event.type === "lab"
                              ? "outline"
                              : "default"
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(parseISO(achievement.date), "MMM d, yyyy")}
                      </p>
                    </div>
                    <Badge variant="outline">{achievement.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
