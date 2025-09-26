import { PatentComparisonAnalysis } from "@/components/patent-comparison-analysis"

export default function PatentAnalysisPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Patent Innovation Analysis</h1>
        <p className="text-muted-foreground">
          Comprehensive comparison between cutting-edge educational AI patents and our current implementation,
          highlighting gaps and strategic improvement opportunities.
        </p>
      </div>
      <PatentComparisonAnalysis />
    </div>
  )
}
