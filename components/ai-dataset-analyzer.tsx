"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  FileText,
  Brain,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Database,
  Send,
  Loader2,
  Download,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

interface DatasetInfo {
  name: string
  size: number
  rows: number
  columns: string[]
  numericColumns: string[]
  categoricalColumns: string[]
  uploadedAt: string
}

interface AnalysisResult {
  summary: string
  insights: string[]
  recommendations: string[]
  statistics: any
  fullAnalysis: string
  timestamp: string
}

interface ChatMessage {
  id: string
  question: string
  answer: string
  timestamp: string
  type: "user" | "ai"
}

export function AIDatasetAnalyzer() {
  const [dataset, setDataset] = useState<any[]>([])
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [isAsking, setIsAsking] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const text = await file.text()
      let data: any[] = []

      if (file.name.endsWith(".csv")) {
        // Parse CSV
        const lines = text.split("\n").filter((line) => line.trim())
        const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

        data = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
          const row: any = {}
          headers.forEach((header, index) => {
            const value = values[index] || ""
            // Try to parse as number
            const numValue = Number.parseFloat(value)
            row[header] = isNaN(numValue) ? value : numValue
          })
          return row
        })
      } else if (file.name.endsWith(".json")) {
        // Parse JSON
        data = JSON.parse(text)
        if (!Array.isArray(data)) {
          throw new Error("JSON file must contain an array of objects")
        }
      }

      if (data.length === 0) {
        throw new Error("No data found in file")
      }

      // Analyze dataset structure
      const columns = Object.keys(data[0])
      const numericColumns = columns.filter(
        (col) =>
          typeof data[0][col] === "number" ||
          (typeof data[0][col] === "string" && !isNaN(Number.parseFloat(data[0][col]))),
      )
      const categoricalColumns = columns.filter((col) => !numericColumns.includes(col))

      const info: DatasetInfo = {
        name: file.name,
        size: file.size,
        rows: data.length,
        columns,
        numericColumns,
        categoricalColumns,
        uploadedAt: new Date().toISOString(),
      }

      setDataset(data)
      setDatasetInfo(info)

      // Auto-analyze the dataset
      await performInitialAnalysis(data, info)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload file. Please check the format and try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const performInitialAnalysis = async (data: any[], info: DatasetInfo) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/ai/dataset-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataset: data.slice(0, 100), // Send first 100 rows for analysis
          datasetInfo: info,
          analysisType: "initial",
        }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const askQuestion = async () => {
    if (!currentQuestion.trim() || !dataset.length) return

    setIsAsking(true)
    const questionId = Date.now().toString()

    // Add user message
    const userMessage: ChatMessage = {
      id: questionId + "_user",
      question: currentQuestion,
      answer: "",
      timestamp: new Date().toISOString(),
      type: "user",
    }
    setChatMessages((prev) => [...prev, userMessage])

    try {
      const response = await fetch("/api/ai/dataset-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion,
          dataset: dataset.slice(0, 50), // Send sample for context
          datasetInfo,
          previousContext: chatMessages.slice(-5), // Last 5 messages for context
        }),
      })

      const result = await response.json()

      // Add AI response
      const aiMessage: ChatMessage = {
        id: questionId + "_ai",
        question: currentQuestion,
        answer: result.answer,
        timestamp: new Date().toISOString(),
        type: "ai",
      }
      setChatMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Question failed:", error)
      const errorMessage: ChatMessage = {
        id: questionId + "_error",
        question: currentQuestion,
        answer: "Sorry, I encountered an error processing your question. Please try again.",
        timestamp: new Date().toISOString(),
        type: "ai",
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsAsking(false)
      setCurrentQuestion("")
    }
  }

  const clearDataset = () => {
    setDataset([])
    setDatasetInfo(null)
    setAnalysisResult(null)
    setChatMessages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const downloadSample = () => {
    if (!dataset.length) return

    const sample = dataset.slice(0, 10)
    const csv = [Object.keys(sample[0]).join(","), ...sample.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${datasetInfo?.name}_sample.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            AI Dataset Analyzer
          </CardTitle>
          <CardDescription>
            Upload your dataset and get AI-powered analysis, insights, and interactive Q&A using advanced language
            models
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Dataset Upload
          </CardTitle>
          <CardDescription>Upload CSV or JSON files for AI analysis (max 10MB)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <div className="space-y-2">
                <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="gap-2">
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Choose File
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">Supports CSV and JSON formats</p>
              </div>
            </div>

            {/* Dataset Info */}
            {datasetInfo && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="font-medium">{datasetInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{(datasetInfo.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="font-medium">{datasetInfo.rows.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Rows</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="font-medium">{datasetInfo.columns.length}</p>
                      <p className="text-sm text-muted-foreground">Columns</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="font-medium">{datasetInfo.numericColumns.length}</p>
                      <p className="text-sm text-muted-foreground">Numeric</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Actions */}
            {datasetInfo && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadSample} className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Download Sample
                </Button>
                <Button variant="outline" onClick={clearDataset} className="gap-2 bg-transparent">
                  <Trash2 className="w-4 h-4" />
                  Clear Dataset
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {dataset.length > 0 && (
        <Tabs defaultValue="analysis" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="chat">Ask Questions</TabsTrigger>
            <TabsTrigger value="preview">Data Preview</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription>
                  Automated insights and recommendations from your dataset using advanced AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center space-y-4">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                      <p className="text-muted-foreground">Analyzing your dataset with AI...</p>
                    </div>
                  </div>
                ) : analysisResult ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <Alert>
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Dataset Summary:</strong> {analysisResult.summary}
                      </AlertDescription>
                    </Alert>

                    {/* Insights */}
                    <div>
                      <h3 className="font-semibold mb-3">Key Insights</h3>
                      <div className="space-y-2">
                        {analysisResult.insights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5" />
                            <p className="text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="font-semibold mb-3">Recommendations</h3>
                      <div className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <p className="text-sm">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {analysisResult.fullAnalysis && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Detailed AI Analysis</CardTitle>
                          <CardDescription>
                            Generated on {new Date(analysisResult.timestamp).toLocaleString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                              {analysisResult.fullAnalysis}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Analysis will start automatically after upload</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Ask Questions About Your Data
                </CardTitle>
                <CardDescription>Chat with AI about your dataset - ask anything!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat Messages */}
                  <div className="max-h-96 overflow-y-auto space-y-4 border rounded-lg p-4">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Start asking questions about your dataset!</p>
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium">Try asking:</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {[
                              "What are the main patterns in this data?",
                              "Which columns are most important?",
                              "Are there any outliers?",
                              "What insights can you provide?",
                            ].map((question) => (
                              <Button
                                key={question}
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentQuestion(question)}
                                className="text-xs"
                              >
                                {question}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.type === "user" ? message.question : message.answer}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Question Input */}
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask me anything about your dataset..."
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      className="min-h-[60px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          askQuestion()
                        }
                      }}
                    />
                    <Button onClick={askQuestion} disabled={isAsking || !currentQuestion.trim()} className="gap-2">
                      {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Preview Tab */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Data Preview
                </CardTitle>
                <CardDescription>First 10 rows of your dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-muted">
                    <thead>
                      <tr className="bg-muted/50">
                        {datasetInfo?.columns.map((col) => (
                          <th key={col} className="border border-muted p-2 text-left font-medium">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataset.slice(0, 10).map((row, index) => (
                        <tr key={index} className="hover:bg-muted/25">
                          {datasetInfo?.columns.map((col) => (
                            <td key={col} className="border border-muted p-2 text-sm">
                              {String(row[col] || "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Dataset Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Numeric Columns */}
                  <div>
                    <h3 className="font-semibold mb-3">Numeric Columns ({datasetInfo?.numericColumns.length || 0})</h3>
                    <div className="space-y-2">
                      {datasetInfo?.numericColumns.map((col) => (
                        <Badge key={col} variant="outline">
                          {col}
                        </Badge>
                      ))}
                      {datasetInfo?.numericColumns.length === 0 && (
                        <p className="text-sm text-muted-foreground">No numeric columns detected</p>
                      )}
                    </div>
                  </div>

                  {/* Categorical Columns */}
                  <div>
                    <h3 className="font-semibold mb-3">
                      Categorical Columns ({datasetInfo?.categoricalColumns.length || 0})
                    </h3>
                    <div className="space-y-2">
                      {datasetInfo?.categoricalColumns.map((col) => (
                        <Badge key={col} variant="secondary">
                          {col}
                        </Badge>
                      ))}
                      {datasetInfo?.categoricalColumns.length === 0 && (
                        <p className="text-sm text-muted-foreground">No categorical columns detected</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
