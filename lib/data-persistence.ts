import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const STUDENTS_FILE = path.join(DATA_DIR, "students.json")
const ATTENDANCE_FILE = path.join(DATA_DIR, "attendance.json")

interface StudentRecord {
  id: string
  name: string
  email: string
  rollNumber: string
  faceDescriptor: number[]
  registrationDate: string
  totalAttendance: number
  lastSeen: string
  photo?: string
}

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  rollNumber: string
  timestamp: string
  confidence: number
  subject: string
  status: "present" | "late" | "absent"
  method: "facial_recognition" | "manual"
  sessionId: string
}

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    console.error("[v0] Error ensuring data directory exists:", error)
  }
}

export async function loadStudents(): Promise<StudentRecord[]> {
  await ensureDataDir()
  try {
    const data = await fs.readFile(STUDENTS_FILE, "utf8")
    return JSON.parse(data)
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.log("[v0] Students file not found, returning empty array.")
      return []
    }
    console.error("[v0] Error loading students:", error)
    return []
  }
}

export async function saveStudents(students: StudentRecord[]): Promise<void> {
  await ensureDataDir()
  try {
    await fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2), "utf8")
  } catch (error) {
    console.error("[v0] Error saving students:", error)
  }
}

export async function loadAttendance(): Promise<AttendanceRecord[]> {
  await ensureDataDir()
  try {
    const data = await fs.readFile(ATTENDANCE_FILE, "utf8")
    return JSON.parse(data)
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.log("[v0] Attendance file not found, returning empty array.")
      return []
    }
    console.error("[v0] Error loading attendance:", error)
    return []
  }
}

export async function saveAttendance(attendance: AttendanceRecord[]): Promise<void> {
  await ensureDataDir()
  try {
    await fs.writeFile(ATTENDANCE_FILE, JSON.stringify(attendance, null, 2), "utf8")
  } catch (error) {
    console.error("[v0] Error saving attendance:", error)
  }
}

export async function clearAllPersistentData(): Promise<void> {
  await ensureDataDir()
  try {
    await fs.writeFile(STUDENTS_FILE, JSON.stringify([], null, 2), "utf8")
    await fs.writeFile(ATTENDANCE_FILE, JSON.stringify([], null, 2), "utf8")
    console.log("[v0] All persistent data cleared.")
  } catch (error) {
    console.error("[v0] Error clearing persistent data:", error)
  }
}
