import { Navigation } from "@/components/navigation"
import { UnifiedTimetable } from "@/components/unified-timetable"

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Class Timetable</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            View your weekly class schedule with real-time current class information and professor details.
            Automatically adapts to mobile and desktop views.
          </p>
        </div>
        <UnifiedTimetable />
      </main>
    </div>
  )
}
