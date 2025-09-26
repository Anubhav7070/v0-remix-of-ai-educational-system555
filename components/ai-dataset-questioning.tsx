"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Database, MessageSquare, TrendingUp, BarChart3, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIDatasetQuestioningProps {
  uploadedData: any[]
  datasetInfo: any
  hasDataset: boolean
}

interface QuestionResult {
  question: string
  answer: string
  timestamp: string
  datasetSummary: string
}

export function AIDatasetQuestioning({ uploadedData, datasetInfo, hasDataset }: AIDatasetQuestioningProps) {
  const [question, setQuestion] = useState("")
  const [questionResult, setQuestionResult] = useState<QuestionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleQuestionSubmit = async () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a question about your dataset",
        variant: "destructive",
      })
      return
    }

    if (!hasDataset || uploadedData.length === 0) {
      toast({
        title: "Dataset Required",
        description: "Please upload a dataset first before asking questions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Create dataset summary for AI context
      const datasetSummary = createDatasetSummary()

      const response = await fetch("/api/google-ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `Based on this dataset information: ${datasetSummary}\n\nUser Question: ${question}`,
          analysisType: "dataset-analysis",
        }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      setQuestionResult({
        question,
        answer: result.analysis,
        timestamp: new Date().toISOString(),
        datasetSummary,
      })

      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your dataset and provided insights",
      })
    } catch (error) {
      console.error("Dataset analysis error:", error)
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze dataset. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createDatasetSummary = () => {
    if (!datasetInfo || uploadedData.length === 0) return "No dataset available"

    const summary = {
      totalRows: uploadedData.length,
      totalColumns: datasetInfo.columns?.length || 0,
      columns: datasetInfo.columns || [],
      sampleData: uploadedData.slice(0, 3), // First 3 rows as sample
      dataTypes: datasetInfo.dataTypes || {},
      missingValues: datasetInfo.missingValues || {},
    }

    return JSON.stringify(summary, null, 2)
  }

  const suggestedQuestions = [
    "What patterns can you identify in this dataset?",
    "What are the key insights from this data?",
    "Which features are most important for prediction?",
    "Are there any outliers or anomalies in the data?",
    "What correlations exist between different variables?",
    "How can I improve the quality of this dataset?",
    "What machine learning models would work best with this data?",
    "What preprocessing steps do you recommend?",
  ]

  const handleSuggestedQuestion = (suggestedQ: string) => {
    setQuestion(suggestedQ)
  }

  if (!hasDataset) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <Database className="w-16 h-16 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">No Dataset Available</h3>
              <p className="text-muted-foreground">
                Upload a dataset first to start asking AI-powered questions about your data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dataset Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Dataset Information
          </CardTitle>
          <CardDescription>Current dataset ready for AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{uploadedData.length}</div>
              <div className="text-sm text-muted-foreground">Rows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{datasetInfo?.columns?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Columns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {datasetInfo?.columns?.filter((col: any) => typeof uploadedData[0]?.[col] === "number").length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Numeric</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {datasetInfo?.columns?.filter((col: any) => typeof uploadedData[0]?.[col] === "string").length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Text</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Ask AI About Your Dataset
          </CardTitle>
          <CardDescription>Get intelligent insights and analysis of your data using Google AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask any question about your dataset... e.g., 'What patterns do you see in this data?' or 'Which features are most important?'"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <Button onClick={handleQuestionSubmit} disabled={isLoading || !question.trim()} className="w-full">
            {isLoading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Dataset...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Suggested Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Suggested Questions
          </CardTitle>
          <CardDescription>Click on any question to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((suggestedQ, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto p-3 bg-transparent"
                onClick={() => handleSuggestedQuestion(suggestedQ)}
              >
                <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{suggestedQ}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Response */}
      {questionResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Dataset Analysis
              </CardTitle>
              <Badge variant="default">Google AI</Badge>
            </div>
            <CardDescription>
              Analysis generated on {new Date(questionResult.timestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Question */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Your Question:</h4>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm">{questionResult.question}</p>
              </div>
            </div>

            {/* Answer */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">AI Analysis:</h4>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{questionResult.answer}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>AI Dataset Analysis Features</CardTitle>
          <CardDescription>Powered by Google AI for intelligent data insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Pattern Recognition</h3>
              <p className="text-sm text-muted-foreground">Identify hidden patterns and trends in your data</p>
            </div>
            <div className="text-center space-y-2">
              <BarChart3 className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Statistical Insights</h3>
              <p className="text-sm text-muted-foreground">Get comprehensive statistical analysis and insights</p>
            </div>
            <div className="text-center space-y-2">
              <Brain className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">ML Recommendations</h3>
              <p className="text-sm text-muted-foreground">Receive AI-powered machine learning recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
