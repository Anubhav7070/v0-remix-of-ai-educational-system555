"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Camera, Clock, User, MapPin, BookOpen, CheckCircle, XCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { format } from "date-fns"

// Enhanced timetable data with professor information
const enhancedSchedule = [
  {
    time: { start: "08:00", end: "08:50" },
    monday: {
      course: "Cloud Architecture Design",
      courseCode: "BCSE355L",
      slotVenue: "SJT112",
      type: "THEORY" as const,
      professor: { name: "JAGANNATHAN J", code: "SCORE" },
      credits: 3,
    },
    tuesday: {
      course: "Operating Systems",
      courseCode: "BITE305L",
      slotVenue: "SJT211A",
      type: "THEORY" as const,
      professor: { name: "HARSHITA PATEL", code: "SCORE" },
      credits: 3,
    },
    wednesday: {
      course: "Computer Networks",
      courseCode: "BITE305L",
      slotVenue: "SJT126",
      type: "THEORY" as const,
      professor: { name: "PRIYA M", code: "SCORE" },
      credits: 3,
    },
    thursday: {
      course: "Artificial Intelligence",
      courseCode: "BITE306L",
      slotVenue: "SJT801",
      type: "THEORY" as const,
      professor: { name: "VALARMATHI B", code: "SCORE" },
      credits: 3,
    },
    friday: {
      course: "Machine Learning",
      courseCode: "BITE410L",
      slotVenue: "SJT224",
      type: "THEORY" as const,
      professor: { name: "SELVA RANI B", code: "SCORE" },
      credits: 3,
    },
  },
  {
    time: { start: "08:51", end: "09:40" },
    monday: {
      course: "Operating Systems Lab",
      courseCode: "BITE305P",
      slotVenue: "SJT20",
      type: "LAB" as const,
      professor: { name: "HARSHITA PATEL", code: "SCORE" },
      credits: 2,
    },
    tuesday: {
      course: "Computer Networks Lab",
      courseCode: "BITE305P",
      slotVenue: "SJT18",
      type: "LAB" as const,
      professor: { name: "PRIYA M", code: "SCORE" },
      credits: 2,
    },
    wednesday: {
      course: "AI Lab",
      courseCode: "BITE306P",
      slotVenue: "SJT218",
      type: "LAB" as const,
      professor: { name: "VALARMATHI B", code: "SCORE" },
      credits: 2,
    },
    thursday: {
      course: "Machine Learning Lab",
      courseCode: "BITE410L",
      slotVenue: "SJT224",
      type: "LAB" as const,
      professor: { name: "SELVA RANI B", code: "SCORE" },
      credits: 2,
    },
    friday: {
      course: "Advanced Competitive Coding",
      courseCode: "BSTS301P",
      slotVenue: "SJT224",
      type: "LAB" as const,
      professor: { name: "ETHNIJS (APT)", code: "SSL" },
      credits: 1.5,
    },
  },
  {
    time: { start: "14:00", end: "14:50" },
    monday: {
      course: "Cloud Architecture Design",
      courseCode: "BCSE355L",
      slotVenue: "SJT112",
      type: "THEORY" as const,
      professor: { name: "JAGANNATHAN J", code: "SCORE" },
      credits: 3,
    },
    tuesday: {
      course: "Operating Systems",
      courseCode: "BITE305L",
      slotVenue: "SJT211A",
      type: "THEORY" as const,
      professor: { name: "HARSHITA PATEL", code: "SCORE" },
      credits: 3,
    },
    wednesday: {
      course: "Computer Networks",
      courseCode: "BITE305L",
      slotVenue: "SJT126",
      type: "THEORY" as const,
      professor: { name: "PRIYA M", code: "SCORE" },
      credits: 3,
    },
    thursday: {
      course: "Artificial Intelligence",
      courseCode: "BITE306L",
      slotVenue: "SJT801",
      type: "THEORY" as const,
      professor: { name: "VALARMATHI B", code: "SCORE" },
      credits: 3,
    },
    friday: {
      course: "Machine Learning",
      courseCode: "BITE410L",
      slotVenue: "SJT224",
      type: "THEORY" as const,
      professor: { name: "SELVA RANI B", code: "SCORE" },
      credits: 3,
    },
  },
]

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  courseCode: string
  courseName: string
  professor: string
  timeSlot: string
  venue: string
  timestamp: Date
  status: "present" | "absent" | "late"
  method: "face-recognition" | "qr-code" | "manual"
}

// Mock attendance data
const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "21BCE1234",
    studentName: "John Doe",
    courseCode: "BCSE355L",
    courseName: "Cloud Architecture Design",
    professor: "JAGANNATHAN J",
    timeSlot: "08:00 - 08:50",
    venue: "SJT112",
    timestamp: new Date(),
    status: "present",
    method: "face-recognition",
  },
  {
    id: "2",
    studentId: "21BCE1235",
    studentName: "Jane Smith",
    courseCode: "BCSE355L",
    courseName: "Cloud Architecture Design",
    professor: "JAGANNATHAN J",
    timeSlot: "08:00 - 08:50",
    venue: "SJT112",
    timestamp: new Date(),
    status: "present",
    method: "qr-code",
  },
]

function getCurrentTimeSlot(): string | null {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  for (const entry of enhancedSchedule) {
    const [startHour, startMin] = entry.time.start.split(":").map(Number)
    const [endHour, endMin] = entry.time.end.split(":").map(Number)
    const startTime = startHour * 60 + startMin
    const endTime = endHour * 60 + endMin

    if (currentTime >= startTime && currentTime <= endTime) {
      return `${entry.time.start} - ${entry.time.end}`
    }
  }
  return null
}

function getCurrentClass() {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const currentDayName = dayNames[currentDay] as keyof (typeof enhancedSchedule)[0]

  const currentTimeSlot = getCurrentTimeSlot()
  if (!currentTimeSlot) return null

  const entry = enhancedSchedule.find((e) => `${e.time.start} - ${e.time.end}` === currentTimeSlot)
  if (!entry) return null

  return entry[currentDayName] || null
}

export function EnhancedAttendanceSystem() {
  const [isRecording, setIsRecording] = React.useState(false)
  const [attendanceRecords, setAttendanceRecords] = React.useState<AttendanceRecord[]>(mockAttendanceRecords)
  const [currentTime, setCurrentTime] = React.useState(new Date())

  const currentClass = getCurrentClass()
  const currentTimeSlot = getCurrentTimeSlot()

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleStartRecording = () => {
    if (!currentClass) {
      alert("No class is currently scheduled. Please check the timetable.")
      return
    }
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
  }

  const handleMarkAttendance = (method: "face-recognition" | "qr-code" | "manual") => {
    if (!currentClass) return

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      studentId:
        "21BCE" +
        Math.floor(Math.random() * 9999)
          .toString()
          .padStart(4, "0"),
      studentName: "Student " + Math.floor(Math.random() * 100),
      courseCode: currentClass.courseCode,
      courseName: currentClass.course,
      professor: currentClass.professor.name,
      timeSlot: currentTimeSlot || "",
      venue: currentClass.slotVenue,
      timestamp: new Date(),
      status: "present",
      method: method,
    }

    setAttendanceRecords((prev) => [newRecord, ...prev])
  }

  const todayRecords = attendanceRecords.filter(
    (record) => record.timestamp.toDateString() === new Date().toDateString(),
  )

  const currentClassRecords = todayRecords.filter(
    (record) => currentClass && record.courseCode === currentClass.courseCode && record.timeSlot === currentTimeSlot,
  )

  const attendanceRate =
    currentClassRecords.length > 0
      ? Math.round(
          (currentClassRecords.filter((r) => r.status === "present").length / currentClassRecords.length) * 100,
        )
      : 0

  return (
    <div className="space-y-6">
      {/* Current Class Status */}
      {currentClass ? (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              Current Class - {currentTimeSlot}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{currentClass.course}</p>
                  <p className="text-sm text-muted-foreground">{currentClass.courseCode}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{currentClass.professor.name}</p>
                  <p className="text-sm text-muted-foreground">{currentClass.professor.code}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{currentClass.slotVenue}</p>
                  <Badge variant={currentClass.type === "THEORY" ? "default" : "secondary"}>{currentClass.type}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{currentClassRecords.length} Students</p>
                  <p className="text-sm text-muted-foreground">{attendanceRate}% Present</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {!isRecording ? (
                <Button onClick={handleStartRecording} className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Start Attendance Recording
                </Button>
              ) : (
                <Button onClick={handleStopRecording} variant="destructive" className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Stop Recording
                </Button>
              )}

              <Button
                onClick={() => handleMarkAttendance("face-recognition")}
                variant="outline"
                disabled={!isRecording}
              >
                Face Recognition
              </Button>

              <Button onClick={() => handleMarkAttendance("qr-code")} variant="outline" disabled={!isRecording}>
                QR Code
              </Button>

              <Button onClick={() => handleMarkAttendance("manual")} variant="outline" disabled={!isRecording}>
                Manual Entry
              </Button>
            </div>

            {isRecording && (
              <Alert className="mt-4">
                <Camera className="w-4 h-4" />
                <AlertDescription>
                  Attendance recording is active for {currentClass.course}. Students can now mark their attendance.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No Current Class</h3>
            <p className="text-muted-foreground">
              {currentTimeSlot ? "Free period - no class scheduled" : "Classes have ended for today"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Attendance Records */}
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Class</TabsTrigger>
          <TabsTrigger value="today">Today's Records</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Class Attendance</span>
                {currentClass && <Badge variant="outline">{currentClassRecords.length} / 60 Students</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentClass ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Attendance Progress</span>
                    <span className="text-sm font-medium">{attendanceRate}%</span>
                  </div>
                  <Progress value={attendanceRate} className="h-2 mb-6" />

                  <div className="space-y-3">
                    {currentClassRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {record.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.studentName}</p>
                            <p className="text-sm text-muted-foreground">{record.studentId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              record.status === "present"
                                ? "default"
                                : record.status === "late"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {record.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {record.method}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{format(record.timestamp, "HH:mm")}</span>
                        </div>
                      </div>
                    ))}

                    {currentClassRecords.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No attendance records yet for this class.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No class is currently in session.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {record.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.courseName} • {record.professor}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.timeSlot} • {record.venue}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          record.status === "present"
                            ? "default"
                            : record.status === "late"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {record.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {record.method}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{format(record.timestamp, "HH:mm")}</span>
                    </div>
                  </div>
                ))}

                {todayRecords.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No attendance records for today.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{todayRecords.filter((r) => r.status === "present").length}</p>
                    <p className="text-sm text-muted-foreground">Present Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{todayRecords.filter((r) => r.status === "late").length}</p>
                    <p className="text-sm text-muted-foreground">Late Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{todayRecords.filter((r) => r.status === "absent").length}</p>
                    <p className="text-sm text-muted-foreground">Absent Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
