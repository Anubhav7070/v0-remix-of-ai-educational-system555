import { GoogleAIAnalyzer } from "@/components/google-ai-analyzer"

export default function AIAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <GoogleAIAnalyzer />
      </div>
    </div>
  )
}
