import { Navigation } from "@/components/navigation"
import { AIDatasetAnalyzer } from "@/components/ai-dataset-analyzer"

export default function AIDatasetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">AI Dataset Analysis</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Upload any dataset and get AI-powered analysis, insights, and interactive Q&A capabilities
          </p>
        </div>
        <AIDatasetAnalyzer />
      </main>
    </div>
  )
}
