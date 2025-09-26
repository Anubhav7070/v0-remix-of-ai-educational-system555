"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, MapPin, Edit, Plus, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface Professor {
  id: string
  name: string
  code: string
  department: string
  email: string
  phone: string
  avatar?: string
  specialization: string[]
}

interface ClassAssignment {
  timeSlot: string
  day: string
  course: string
  courseCode: string
  venue: string
  type: "THEORY" | "LAB"
  professor: Professor
  credits: number
  students: number
}

// Professor database
const professors: Professor[] = [
  {
    id: "1",
    name: "JAGANNATHAN J",
    code: "SCORE",
    department: "Computer Science",
    email: "jagannathan.j@vitap.ac.in",
    phone: "+91-9876543210",
    specialization: ["Cloud Computing", "Distributed Systems", "Software Architecture"],
  },
  {
    id: "2",
    name: "HARSHITA PATEL",
    code: "SCORE",
    department: "Computer Science",
    email: "harshita.patel@vitap.ac.in",
    phone: "+91-9876543211",
    specialization: ["Operating Systems", "System Programming", "Computer Networks"],
  },
  {
    id: "3",
    name: "PRIYA M",
    code: "SCORE",
    department: "Computer Science",
    email: "priya.m@vitap.ac.in",
    phone: "+91-9876543212",
    specialization: ["Computer Networks", "Network Security", "Wireless Communication"],
  },
  {
    id: "4",
    name: "VALARMATHI B",
    code: "SCORE",
    department: "Computer Science",
    email: "valarmathi.b@vitap.ac.in",
    phone: "+91-9876543213",
    specialization: ["Artificial Intelligence", "Machine Learning", "Data Science"],
  },
  {
    id: "5",
    name: "SELVA RANI B",
    code: "SCORE",
    department: "Computer Science",
    email: "selvarani.b@vitap.ac.in",
    phone: "+91-9876543214",
    specialization: ["Machine Learning", "Deep Learning", "Neural Networks"],
  },
  {
    id: "6",
    name: "ANUJ KUMAR",
    code: "SMEC",
    department: "Management",
    email: "anuj.kumar@vitap.ac.in",
    phone: "+91-9876543215",
    specialization: ["Management Principles", "Organizational Behavior", "Strategic Management"],
  },
  {
    id: "7",
    name: "SHAHID HAMID RAINA",
    code: "SSL",
    department: "Social Sciences",
    email: "shahid.raina@vitap.ac.in",
    phone: "+91-9876543216",
    specialization: ["Constitutional Law", "Political Science", "Public Administration"],
  },
  {
    id: "8",
    name: "ETHNIJS (APT)",
    code: "SSL",
    department: "Computer Science",
    email: "ethnijs@vitap.ac.in",
    phone: "+91-9876543217",
    specialization: ["Competitive Programming", "Algorithms", "Data Structures"],
  },
]

// Current class assignments
const classAssignments: ClassAssignment[] = [
  {
    timeSlot: "08:00 - 08:50",
    day: "Monday",
    course: "Cloud Architecture Design",
    courseCode: "BCSE355L",
    venue: "SJT112",
    type: "THEORY",
    professor: professors[0],
    credits: 3,
    students: 45,
  },
  {
    timeSlot: "08:51 - 09:40",
    day: "Monday",
    course: "Operating Systems Lab",
    courseCode: "BITE305P",
    venue: "SJT20",
    type: "LAB",
    professor: professors[1],
    credits: 2,
    students: 30,
  },
  {
    timeSlot: "08:00 - 08:50",
    day: "Tuesday",
    course: "Operating Systems",
    courseCode: "BITE305L",
    venue: "SJT211A",
    type: "THEORY",
    professor: professors[1],
    credits: 3,
    students: 50,
  },
  {
    timeSlot: "08:51 - 09:40",
    day: "Tuesday",
    course: "Computer Networks Lab",
    courseCode: "BITE305P",
    venue: "SJT18",
    type: "LAB",
    professor: professors[2],
    credits: 2,
    students: 28,
  },
  {
    timeSlot: "08:00 - 08:50",
    day: "Wednesday",
    course: "Computer Networks",
    courseCode: "BITE305L",
    venue: "SJT126",
    type: "THEORY",
    professor: professors[2],
    credits: 3,
    students: 48,
  },
  {
    timeSlot: "08:51 - 09:40",
    day: "Wednesday",
    course: "AI Lab",
    courseCode: "BITE306P",
    venue: "SJT218",
    type: "LAB",
    professor: professors[3],
    credits: 2,
    students: 32,
  },
  {
    timeSlot: "08:00 - 08:50",
    day: "Thursday",
    course: "Artificial Intelligence",
    courseCode: "BITE306L",
    venue: "SJT801",
    type: "THEORY",
    professor: professors[3],
    credits: 3,
    students: 52,
  },
  {
    timeSlot: "08:51 - 09:40",
    day: "Thursday",
    course: "Machine Learning Lab",
    courseCode: "BITE410L",
    venue: "SJT224",
    type: "LAB",
    professor: professors[4],
    credits: 2,
    students: 35,
  },
  {
    timeSlot: "08:00 - 08:50",
    day: "Friday",
    course: "Machine Learning",
    courseCode: "BITE410L",
    venue: "SJT224",
    type: "THEORY",
    professor: professors[4],
    credits: 3,
    students: 47,
  },
  {
    timeSlot: "08:51 - 09:40",
    day: "Friday",
    course: "Advanced Competitive Coding",
    courseCode: "BSTS301P",
    venue: "SJT224",
    type: "LAB",
    professor: professors[7],
    credits: 1.5,
    students: 25,
  },
]

function getCurrentTimeSlot(): string | null {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const timeSlots = [
    "08:00 - 08:50",
    "08:51 - 09:40",
    "09:51 - 10:40",
    "10:41 - 11:30",
    "11:40 - 12:30",
    "14:00 - 14:50",
    "14:51 - 15:40",
    "15:51 - 16:40",
    "16:41 - 17:30",
  ]

  for (const slot of timeSlots) {
    const [start, end] = slot.split(" - ")
    const [startHour, startMin] = start.split(":").map(Number)
    const [endHour, endMin] = end.split(":").map(Number)
    const startTime = startHour * 60 + startMin
    const endTime = endHour * 60 + endMin

    if (currentTime >= startTime && currentTime <= endTime) {
      return slot
    }
  }
  return null
}

function getCurrentDayName(): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[new Date().getDay()]
}

export function ProfessorScheduleManager() {
  const [selectedProfessor, setSelectedProfessor] = React.useState<Professor | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterDepartment, setFilterDepartment] = React.useState("all")
  const [currentTime, setCurrentTime] = React.useState(new Date())

  const currentTimeSlot = getCurrentTimeSlot()
  const currentDay = getCurrentDayName()

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const filteredProfessors = professors.filter((prof) => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || prof.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  const currentAssignments = classAssignments.filter(
    (assignment) => assignment.timeSlot === currentTimeSlot && assignment.day === currentDay,
  )

  const professorSchedule = (professorId: string) => {
    return classAssignments.filter((assignment) => assignment.professor.id === professorId)
  }

  const departments = Array.from(new Set(professors.map((p) => p.department)))

  return (
    <div className="space-y-6">
      {/* Current Active Classes */}
      {currentAssignments.length > 0 && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              Currently Active Classes - {currentTimeSlot}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {currentAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={assignment.professor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {assignment.professor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{assignment.course}</h3>
                      <p className="text-sm text-muted-foreground">
                        {assignment.courseCode} • Prof. {assignment.professor.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{assignment.venue}</span>
                        <Badge variant={assignment.type === "THEORY" ? "default" : "secondary"} className="text-xs">
                          {assignment.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{assignment.students} Students</p>
                    <p className="text-sm text-muted-foreground">{assignment.credits} Credits</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="professors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="professors">Professors</TabsTrigger>
          <TabsTrigger value="assignments">Class Assignments</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="professors">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Professor Directory</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Professor
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Professor</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter professor's full name" />
                      </div>
                      <div>
                        <Label htmlFor="code">Code</Label>
                        <Input id="code" placeholder="e.g., SCORE, SMEC, SSL" />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Management">Management</SelectItem>
                            <SelectItem value="Social Sciences">Social Sciences</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="professor@vitap.ac.in" />
                      </div>
                      <Button className="w-full">Add Professor</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search professors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Professor List */}
              <div className="grid gap-4">
                {filteredProfessors.map((professor) => {
                  const schedule = professorSchedule(professor.id)
                  return (
                    <div key={professor.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={professor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {professor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{professor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {professor.department} • {professor.code}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {professor.specialization.slice(0, 2).map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                              {professor.specialization.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{professor.specialization.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{schedule.length} Classes</p>
                          <p className="text-sm text-muted-foreground">
                            {schedule.reduce((sum, s) => sum + s.students, 0)} Students
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Class Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classAssignments.map((assignment, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 border rounded-lg",
                      assignment.timeSlot === currentTimeSlot && assignment.day === currentDay
                        ? "border-primary bg-primary/5"
                        : "",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{assignment.day}</div>
                          <div className="text-xs text-muted-foreground">{assignment.timeSlot}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{assignment.course}</h3>
                          <p className="text-sm text-muted-foreground">
                            {assignment.courseCode} • Prof. {assignment.professor.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{assignment.venue}</span>
                            <Badge variant={assignment.type === "THEORY" ? "default" : "secondary"} className="text-xs">
                              {assignment.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{assignment.students} Students</p>
                        <p className="text-sm text-muted-foreground">{assignment.credits} Credits</p>
                        {assignment.timeSlot === currentTimeSlot && assignment.day === currentDay && (
                          <Badge variant="default" className="mt-1">
                            Active Now
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Time</th>
                      <th className="text-left p-3 font-semibold">Monday</th>
                      <th className="text-left p-3 font-semibold">Tuesday</th>
                      <th className="text-left p-3 font-semibold">Wednesday</th>
                      <th className="text-left p-3 font-semibold">Thursday</th>
                      <th className="text-left p-3 font-semibold">Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["08:00 - 08:50", "08:51 - 09:40", "09:51 - 10:40", "14:00 - 14:50", "14:51 - 15:40"].map(
                      (timeSlot) => (
                        <tr key={timeSlot} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{timeSlot}</td>
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                            const assignment = classAssignments.find((a) => a.timeSlot === timeSlot && a.day === day)
                            return (
                              <td key={day} className="p-3">
                                {assignment ? (
                                  <div className="space-y-1">
                                    <div className="font-semibold text-sm">{assignment.course}</div>
                                    <div className="text-xs text-muted-foreground">{assignment.professor.name}</div>
                                    <div className="text-xs text-muted-foreground">{assignment.venue}</div>
                                  </div>
                                ) : (
                                  <div className="text-muted-foreground text-sm">-</div>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
