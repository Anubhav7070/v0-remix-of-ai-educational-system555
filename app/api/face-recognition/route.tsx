import { type NextRequest, NextResponse } from "next/server"
import { calculateCosineSimilarity } from "@/lib/cosine-similarity"

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

export async function POST(request: NextRequest) {
  try {
    const {
      action,
      imageData,
      studentData,
      subject,
      sessionId,
      faceDescriptor,
      studentDatabase, // Accept studentDatabase from client
      attendanceRecords, // Accept attendanceRecords from client
    } = await request.json()

    console.log("[v0] Face recognition API called with action:", action)

    switch (action) {
      case "detect_face":
        return await detectFace(imageData, subject, sessionId, faceDescriptor, studentDatabase, attendanceRecords)
      case "register_student":
        return await registerStudent(studentData, imageData, faceDescriptor, studentDatabase)
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Face recognition error:", error)
    return NextResponse.json(
      {
        error: "Face recognition failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

async function detectFace(
  imageData: string,
  subject = "General",
  sessionId: string,
  faceDescriptor: number[] | undefined,
  studentDatabase: StudentRecord[], // studentDatabase is now a parameter
  attendanceRecords: AttendanceRecord[], // attendanceRecords is now a parameter
) {
  try {
    console.log("[v0] Starting face detection with face descriptor matching")

    console.log("[v0] Current student database size:", studentDatabase.length)

    if (!faceDescriptor || faceDescriptor.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No face descriptor provided for matching",
      })
    }

    let bestMatch: StudentRecord | null = null
    let bestSimilarity = 0
    const threshold = 0.4 // Minimum similarity threshold

    console.log("[v0] Comparing face descriptor against", studentDatabase.length, "registered students")

    for (const student of studentDatabase) {
      if (student.faceDescriptor && student.faceDescriptor.length > 0) {
        const similarity = calculateCosineSimilarity(faceDescriptor, student.faceDescriptor)
        console.log(`[v0] Similarity with ${student.name} (${student.rollNumber}): ${similarity.toFixed(3)}`)

        if (similarity > bestSimilarity && similarity > threshold) {
          bestSimilarity = similarity
          bestMatch = student
        }
      }
    }

    console.log("[v0] Best match:", bestMatch ? `${bestMatch.name} (${bestSimilarity.toFixed(3)})` : "None")

    if (!bestMatch) {
      return NextResponse.json({
        success: false,
        message: `No matching student found (threshold: ${threshold}). Please register first or try again.`,
        confidence: 0,
        debug: {
          studentsInDatabase: studentDatabase.length,
          threshold,
          bestSimilarity,
        },
      })
    }

    const confidence = Math.min(bestSimilarity * 100, 95) // Convert to percentage, cap at 95%

    const today = new Date().toDateString()
    const existingRecord = attendanceRecords.find(
      (```tsx file="app/api/face-recognition/route.tsx"
import { type NextRequest, NextResponse } from "next/server"
import { calculateCosineSimilarity } from "@/lib/cosine-similarity"

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

export async function POST(request: NextRequest) {
  try {
    const {
      action,
      imageData,
      studentData,
      subject,
      sessionId,
      faceDescriptor,
      studentDatabase, // Accept studentDatabase from client
      attendanceRecords, // Accept attendanceRecords from client
    } = await request.json()

    console.log("[v0] Face recognition API called with action:", action)

    switch (action) {
      case "detect_face":
        return await detectFace(imageData, subject, sessionId, faceDescriptor, studentDatabase, attendanceRecords)
      case "register_student":
        return await registerStudent(studentData, imageData, faceDescriptor, studentDatabase)
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Face recognition error:", error)
    return NextResponse.json(
      {
        error: "Face recognition failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

async function detectFace(
  imageData: string,
  subject = "General",
  sessionId: string,
  faceDescriptor: number[] | undefined,
  studentDatabase: StudentRecord[], // studentDatabase is now a parameter
  attendanceRecords: AttendanceRecord[], // attendanceRecords is now a parameter
) {
  try {
    console.log("[v0] Starting face detection with face descriptor matching")

    console.log("[v0] Current student database size:", studentDatabase.length)

    if (!faceDescriptor || faceDescriptor.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No face descriptor provided for matching",
      })
    }

    let bestMatch: StudentRecord | null = null
    let bestSimilarity = 0
    const threshold = 0.4 // Minimum similarity threshold

    console.log("[v0] Comparing face descriptor against", studentDatabase.length, "registered students")

    for (const student of studentDatabase) {
      if (student.faceDescriptor && student.faceDescriptor.length > 0) {
        const similarity = calculateCosineSimilarity(faceDescriptor, student.faceDescriptor)
        console.log(\`[v0] Similarity with ${student.name} (${student.rollNumber}): ${similarity.toFixed(3)}`)
\
        if (similarity > bestSimilarity && similarity > threshold) {
          bestSimilarity = similarity
          bestMatch = student
        }
      }
  \
}

console.log("[v0] Best match:", bestMatch ? `${bestMatch.name} (${bestSimilarity.toFixed(3)})` : "None")

if (!bestMatch) {
  return NextResponse.json({
        success: false,
        message: `No matching student found (threshold: ${threshold}). Please register first or try again.`,
        confidence: 0,
        debug: {
          studentsInDatabase: studentDatabase.length,
          threshold,
          bestSimilarity,
        },
      })
}

const confidence = Math.min(bestSimilarity * 100, 95) // Convert to percentage, cap at 95%

const today = new Date().toDateString()
const existingRecord = attendanceRecords.find(
  (record) =>
    record.studentId === bestMatch!.id &&
    new Date(record.timestamp).toDateString() === today &&
    record.subject === subject,
)

if (existingRecord) {
  return NextResponse.json({
        success: false,
        message: `${bestMatch.name} (${bestMatch.rollNumber}) already marked present for ${subject} today`,
        student: bestMatch,
        confidence,
        duplicate: true,
      })
}

const attendanceRecord: AttendanceRecord = {
  id: `att_${Date.now()}`,
  studentId: bestMatch.id,
  studentName: bestMatch.name,
  rollNumber: bestMatch.rollNumber,
  timestamp: new Date().toISOString(),
  confidence,
  subject,
  status: confidence > 80 ? "present" : "late",
  method: "facial_recognition",
  sessionId: sessionId || `session_${Date.now()}`,
}

console.log(`[v0] Attendance recorded for: ${bestMatch.name} with ${confidence.toFixed(1)}% confidence`)

return NextResponse.json({
      success: true,
      message: `Attendance recorded for ${bestMatch.name} (${bestMatch.rollNumber})`,
      student: bestMatch,
      confidence,
      attendanceRecord,
      similarity: bestSimilarity,
    })
\
  } catch (error)
{
  console.error("[v0] Face detection error:", error)
  return NextResponse.json(
      {
        success: false,
        error: "Face detection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
}
\
}

async
function registerStudent(
  studentData: any,
  imageData: string,
  faceDescriptor: number[] | undefined,
  studentDatabase: StudentRecord[], // studentDatabase is now a parameter
) {
  try {
    console.log("[v0] Registering new student:", studentData.name)

    if (!faceDescriptor || faceDescriptor.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Face descriptor is required for registration",
        },
        { status: 400 },
      )
    }

    const existingStudent = studentDatabase.find((s) => s.rollNumber === studentData.rollNumber)
    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          error: `Student with roll number ${studentData.rollNumber} already exists`,
        },
        { status: 400 },
      )
    }

    const newStudent: StudentRecord = {
      id: `STU_${Date.now()}`,
      name: studentData.name,
      email: studentData.email || `${studentData.name.toLowerCase().replace(/\s+/g, ".")}`,
      rollNumber: studentData.rollNumber,
      faceDescriptor,
      registrationDate: new Date().toISOString().split("T")[0],
      totalAttendance: 0,
      lastSeen: "Never",
      photo: imageData,
    }

    console.log("[v0] Student registered successfully:", newStudent.id)

    return NextResponse.json({
      success: true,
      message: `Student ${studentData.name} (${studentData.rollNumber}) registered successfully`,
      student: newStudent,
    })
  } catch (error) {
    console.error("[v0] Student registration error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Student registration failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
