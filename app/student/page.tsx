import { Navigation } from "@/components/navigation"
import { StudentDashboard } from "@/components/student-dashboard"

export default function StudentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Student Dashboard</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Your personalized academic dashboard with real-time class information, attendance tracking, and performance
            insights
          </p>
        </div>
        <StudentDashboard />
      </main>
    </div>
  )
}
