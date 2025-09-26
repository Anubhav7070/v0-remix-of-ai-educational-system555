"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Sparkles, TrendingUp, Users, BookOpen, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AnalysisResult {
  analysis: string
  timestamp: string
  type: string
}

export function GoogleAIAnalyzer() {
  const [question, setQuestion] = useState("")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAnalysis = async (analysisType: string) => {
    if (!question.trim() && analysisType === "custom") {
      toast({
        title: "Question Required",
        description: "Please enter a question for analysis",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/google-ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: analysisType === "custom" ? question : getPresetQuestion(analysisType),
          analysisType,
        }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      setAnalysisResult({
        analysis: result.analysis,
        timestamp: new Date().toISOString(),
        type: analysisType,
      })

      toast({
        title: "Analysis Complete",
        description: "AI analysis has been generated successfully",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis Failed",
        description: "Failed to generate AI analysis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getPresetQuestion = (type: string) => {
    switch (type) {
      case "student-performance":
        return "Analyze student performance patterns and provide recommendations for improvement"
      case "attendance-insights":
        return "Analyze attendance patterns and identify trends that affect student success"
      case "curriculum-optimization":
        return "Evaluate curriculum effectiveness and suggest optimization strategies"
      case "learning-analytics":
        return "Provide comprehensive learning analytics and educational insights"
      default:
        return question
    }
  }

  const analysisTypes = [
    {
      id: "student-performance",
      title: "Student Performance",
      description: "Analyze academic performance and identify improvement areas",
      icon: TrendingUp,
    },
    {
      id: "attendance-insights",
      title: "Attendance Insights",
      description: "Discover attendance patterns and their impact on learning",
      icon: Users,
    },
    {
      id: "curriculum-optimization",
      title: "Curriculum Analysis",
      description: "Optimize curriculum design and delivery methods",
      icon: BookOpen,
    },
    {
      id: "learning-analytics",
      title: "Learning Analytics",
      description: "Comprehensive educational data analysis and insights",
      icon: BarChart3,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Google AI Educational Analyzer</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Powered by Google AI to provide intelligent educational insights, performance analysis, and data-driven
          recommendations
        </p>
      </div>

      <Tabs defaultValue="preset" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset">Quick Analysis</TabsTrigger>
          <TabsTrigger value="custom">Custom Question</TabsTrigger>
        </TabsList>

        {/* Preset Analysis */}
        <TabsContent value="preset" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisTypes.map((type) => {
              const Icon = type.icon
              return (
                <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                    </div>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => handleAnalysis(type.id)} disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Custom Question */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Ask Custom Question
              </CardTitle>
              <CardDescription>Ask any educational question and get AI-powered insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ask any question about education, student performance, curriculum, or learning analytics..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button
                onClick={() => handleAnalysis("custom")}
                disabled={isLoading || !question.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Get AI Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis Results */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Analysis Results
              </CardTitle>
              <Badge variant="default">{analysisResult.type.replace("-", " ").toUpperCase()}</Badge>
            </div>
            <CardDescription>Generated on {new Date(analysisResult.timestamp).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{analysisResult.analysis}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Features</CardTitle>
          <CardDescription>Powered by Google AI for educational excellence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Performance Analytics</h3>
              <p className="text-sm text-muted-foreground">Deep insights into student performance patterns</p>
            </div>
            <div className="text-center space-y-2">
              <Users className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Behavioral Analysis</h3>
              <p className="text-sm text-muted-foreground">Understanding attendance and engagement patterns</p>
            </div>
            <div className="text-center space-y-2">
              <BookOpen className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Curriculum Insights</h3>
              <p className="text-sm text-muted-foreground">Data-driven curriculum optimization recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
