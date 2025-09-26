import { UniversityCalendar } from "@/components/university-calendar"
import { WeeklySchedule } from "@/components/weekly-schedule"

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold text-center mb-8">University Schedule</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UniversityCalendar className="lg:col-span-1" />
        <WeeklySchedule className="lg:col-span-1" />
      </div>
    </main>
  )
}
