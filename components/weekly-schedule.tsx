import * as React from "react"
import { cn } from "@/lib/utils"

interface ClassTime {
  start: string
  end: string
}

interface ClassDetail {
  course: string
  slotVenue: string
  type: "THEORY" | "LAB"
}

interface ScheduleEntry {
  time: ClassTime
  monday?: ClassDetail
  tuesday?: ClassDetail
  wednesday?: ClassDetail
  thursday?: ClassDetail
  friday?: ClassDetail
  saturday?: ClassDetail
  sunday?: ClassDetail
}

const mockWeeklySchedule: ScheduleEntry[] = [
  {
    time: { start: "08:00", end: "08:50" },
    monday: { course: "A1", slotVenue: "F1", type: "THEORY" },
    tuesday: { course: "B1", slotVenue: "G1", type: "THEORY" },
    wednesday: { course: "C1", slotVenue: "H1", type: "THEORY" },
    thursday: { course: "D1", slotVenue: "E1", type: "THEORY" },
    friday: { course: "E1", slotVenue: "TA1", type: "THEORY" },
    saturday: { course: "V8", slotVenue: "X11", type: "THEORY" },
    sunday: { course: "V10", slotVenue: "Y11", type: "THEORY" },
  },
  {
    time: { start: "08:50", end: "09:40" },
    monday: { course: "L1", slotVenue: "L2", type: "LAB" },
    tuesday: { course: "L7", slotVenue: "L8", type: "LAB" },
    wednesday: { course: "L13", slotVenue: "L14", type: "LAB" },
    thursday: { course: "L19", slotVenue: "L20", type: "LAB" },
    friday: { course: "L25", slotVenue: "L26", type: "LAB" },
    saturday: { course: "L71", slotVenue: "L72", type: "LAB" },
    sunday: { course: "L83", slotVenue: "L84", type: "LAB" },
  },
  {
    time: { start: "09:50", end: "10:40" },
    monday: { course: "D1", slotVenue: "F1", type: "THEORY" },
    tuesday: { course: "A1", slotVenue: "G1", type: "THEORY" },
    wednesday: { course: "B1", slotVenue: "H1", type: "THEORY" },
    thursday: { course: "C1", slotVenue: "E1", type: "THEORY" },
    friday: { course: "TA1", slotVenue: "TD1", type: "THEORY" },
    saturday: { course: "X11", slotVenue: "Y11", type: "THEORY" },
    sunday: { course: "Y10", slotVenue: "Z11", type: "THEORY" },
  },
  {
    time: { start: "10:50", end: "11:40" },
    monday: { course: "L3-BITE309P-LO-SJT20-ALL", slotVenue: "L4", type: "LAB" },
    tuesday: { course: "L11-BITE308P-LO-SJT20-ALL", slotVenue: "L12", type: "LAB" },
    wednesday: { course: "L15-BITE309P-LO-SJT20-ALL", slotVenue: "L16", type: "LAB" },
    thursday: { course: "L21", slotVenue: "L22", type: "LAB" },
    friday: { course: "L27", slotVenue: "L28", type: "LAB" },
    saturday: { course: "L73", slotVenue: "L74", type: "LAB" },
    sunday: { course: "L85", slotVenue: "L86", type: "LAB" },
  },
  {
    time: { start: "11:50", end: "12:30" },
    monday: { course: "L5", slotVenue: "L6", type: "LAB" },
    tuesday: { course: "L17", slotVenue: "L18", type: "LAB" },
    wednesday: { course: "L17", slotVenue: "L18", type: "LAB" },
    thursday: { course: "L23", slotVenue: "L24", type: "LAB" },
    friday: { course: "L29", slotVenue: "L30", type: "LAB" },
    saturday: { course: "L75", slotVenue: "L76", type: "LAB" },
    sunday: { course: "L87", slotVenue: "L88", type: "LAB" },
  },
  {
    time: { start: "12:30", end: "13:30" },
    monday: { course: "Lunch", slotVenue: "-", type: "OTHER" },
    tuesday: { course: "Lunch", slotVenue: "-", type: "OTHER" },
    wednesday: { course: "Lunch", slotVenue: "-", type: "OTHER" },
    thursday: { course: "Lunch", slotVenue: "-", type: "OTHER" },
    friday: { course: "Lunch", slotVenue: "-", type: "OTHER" },
    saturday: { course: "Lunch", slotVenue: "-", type: "OTHER" },
    sunday: { course: "Lunch", slotVenue: "-", type: "OTHER" },
  },
  {
    time: { start: "14:00", end: "14:50" },
    monday: { course: "A2-BCSE551L-TH-SJT12-ALL", slotVenue: "L31", type: "THEORY" },
    tuesday: { course: "B2-BITE305L-TH-SJT26-ALL", slotVenue: "L37", type: "THEORY" },
    wednesday: { course: "C2-BITE410L-TH-SJT24-ALL", slotVenue: "L43", type: "THEORY" },
    thursday: { course: "D2-BITE308L-TH-SJT801-ALL", slotVenue: "L49", type: "THEORY" },
    friday: { course: "E2-BITE410L-TH-SJT211A-ALL", slotVenue: "L55", type: "THEORY" },
    saturday: { course: "X21", slotVenue: "Z21", type: "THEORY" },
    sunday: { course: "Y21", slotVenue: "Z21", type: "THEORY" },
  },
  {
    time: { start: "14:50", end: "15:40" },
    monday: { course: "SS-BITE301P-SS-SJT801-ALL", slotVenue: "L32", type: "LAB" },
    tuesday: { course: "GMGT101L-TH-MB212-ALL", slotVenue: "L38", type: "LAB" },
    wednesday: { course: "TD2-BITE410L-TH-SJT24-ALL", slotVenue: "L44", type: "LAB" },
    thursday: { course: "B2-BITE308L-TH-SJT801-ALL", slotVenue: "L50", type: "LAB" },
    friday: { course: "E2-BITE410L-TH-SJT211A-ALL", slotVenue: "L56", type: "LAB" },
    saturday: { course: "X21", slotVenue: "Z21", type: "LAB" },
    sunday: { course: "Y21", slotVenue: "Z21", type: "LAB" },
  },
  {
    time: { start: "15:50", end: "16:40" },
    monday: { course: "D2-BITE308L-TH-SJT801-ALL", slotVenue: "L33", type: "THEORY" },
    tuesday: { course: "C2-BITE410L-TH-SJT24-ALL", slotVenue: "L39", type: "THEORY" },
    wednesday: { course: "B2-BITE305L-TH-SJT26-ALL", slotVenue: "L45", type: "THEORY" },
    thursday: { course: "A2-BCSE551L-TH-SJT12-ALL", slotVenue: "L51", type: "THEORY" },
    friday: { course: "GMGT101L-TH-MB212-ALL", slotVenue: "L57", type: "THEORY" },
    saturday: { course: "W21", slotVenue: "W22", type: "THEORY" },
    sunday: { course: "V11", slotVenue: "V11", type: "THEORY" },
  },
  {
    time: { start: "16:50", end: "17:40" },
    monday: { course: "TD2-BITE308L-TH-SJT801-ALL", slotVenue: "L34", type: "LAB" },
    tuesday: { course: "TC2-BMGT101L-TH-MB212-ALL", slotVenue: "L40", type: "LAB" },
    wednesday: { course: "TC2-BITE410L-TH-SJT24-ALL", slotVenue: "L46", type: "LAB" },
    thursday: { course: "TC2-BITE308L-TH-SJT801-ALL", slotVenue: "L52", type: "LAB" },
    friday: { course: "TD2-BITE301P-SS-SJT801-ALL", slotVenue: "L58", type: "LAB" },
    saturday: { course: "L79", slotVenue: "L80", type: "LAB" },
    sunday: { course: "L93", slotVenue: "L94", type: "LAB" },
  },
  {
    time: { start: "17:50", end: "18:30" },
    monday: { course: "L35", slotVenue: "L36", type: "LAB" },
    tuesday: { course: "L41", slotVenue: "L42", type: "LAB" },
    wednesday: { course: "L47", slotVenue: "L48", type: "LAB" },
    thursday: { course: "L53", slotVenue: "L54", type: "LAB" },
    friday: { course: "L59", slotVenue: "L60", type: "LAB" },
    saturday: { course: "L81", slotVenue: "L82", type: "LAB" },
    sunday: { course: "V4", slotVenue: "-", type: "THEORY" },
  },
  {
    time: { start: "18:51", end: "19:00" },
    monday: { course: "V3", slotVenue: "-", type: "THEORY" },
    tuesday: { course: "V4", slotVenue: "-", type: "THEORY" },
    wednesday: { course: "V5", slotVenue: "-", type: "THEORY" },
    thursday: { course: "V6", slotVenue: "-", type: "THEORY" },
    friday: { course: "V7", slotVenue: "-", type: "THEORY" },
    saturday: { course: "V9", slotVenue: "-", type: "THEORY" },
    sunday: { course: "V11", slotVenue: "-", type: "THEORY" },
  },
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function WeeklySchedule({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm p-4", className)}>
      <h2 className="text-xl font-semibold text-center mb-4">Weekly Class Schedule</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              {daysOfWeek.map((day) => (
                <th key={day} scope="col" className="px-6 py-3">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockWeeklySchedule.map((entry, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td rowSpan={2} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {entry.time.start} - {entry.time.end}
                  </td>
                  {daysOfWeek.map((day) => {
                    const classDetail = entry[day.toLowerCase() as keyof ScheduleEntry] as ClassDetail | undefined
                    return (
                      <td key={day} className="px-6 py-4">
                        {classDetail?.type === "THEORY" && (
                          <div className="font-semibold text-blue-600">
                            {classDetail.course}
                            <br />
                            <span className="text-xs text-gray-500">{classDetail.slotVenue}</span>
                          </div>
                        )}
                        {classDetail?.type === "OTHER" && (
                          <div className="font-semibold text-gray-600">{classDetail.course}</div>
                        )}
                      </td>
                    )
                  })}
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  {daysOfWeek.map((day) => {
                    const classDetail = entry[day.toLowerCase() as keyof ScheduleEntry] as ClassDetail | undefined
                    return (
                      <td key={day} className="px-6 py-4">
                        {classDetail?.type === "LAB" && (
                          <div className="font-semibold text-purple-600">
                            {classDetail.course}
                            <br />
                            <span className="text-xs text-gray-500">{classDetail.slotVenue}</span>
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
