import { Navigation } from "@/components/navigation"
import { EnhancedAcademicCalendar } from "@/components/enhanced-academic-calendar"

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Academic Calendar</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            View important academic dates, holidays, exam schedules, and special events throughout the year
          </p>
        </div>
        <EnhancedAcademicCalendar />
      </main>
    </div>
  )
}
