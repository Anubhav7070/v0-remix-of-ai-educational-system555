import { Navigation } from "@/components/navigation"
import { ProfessorScheduleManager } from "@/components/professor-schedule-manager"

export default function ProfessorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Professor Management</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Manage professor assignments, view current classes, and organize teaching schedules with real-time updates
          </p>
        </div>
        <ProfessorScheduleManager />
      </main>
    </div>
  )
}
