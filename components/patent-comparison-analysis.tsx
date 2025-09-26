"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Brain, Lightbulb, TrendingUp, CheckCircle, AlertTriangle, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatentData {
  id: string
  title: string
  year: string
  status: string
  technologies: string[]
  innovation: string
  currentImplementation?: string
  gaps?: string[]
  improvements?: string[]
}

const patentAnalysis: PatentData[] = [
  {
    id: "US 7,362,997 B2",
    title: "Methods and Apparatus for Curriculum Planning",
    year: "2008",
    status: "Granted patent",
    technologies: [
      "Rule-based logic workflows",
      "Mapping & Alignment Tools",
      "Concept & Process Mapping",
      "Hierarchical Conceptual Development",
    ],
    innovation:
      "Aligns course objectives with standards using conceptual hierarchies (knowledge → comprehension → application → analysis → synthesis → evaluation). Supports interdisciplinary links, equity/gender/racial awareness reporting, and detailed unit planning.",
    currentImplementation:
      "Our system has basic curriculum management but lacks the sophisticated hierarchical conceptual development and automated alignment features.",
    gaps: [
      "No automated course objective alignment with standards",
      "Missing hierarchical conceptual development framework",
      "Limited interdisciplinary linking capabilities",
      "No equity/diversity awareness reporting",
    ],
    improvements: [
      "Implement Bloom's taxonomy-based progression tracking",
      "Add automated curriculum standard alignment",
      "Create interdisciplinary connection mapping",
      "Develop diversity and inclusion analytics",
    ],
  },
  {
    id: "US RE39,942 E",
    title: "Computer-Aided Group-Learning Methods and Systems",
    year: "2007",
    status: "Granted reissued patent",
    technologies: [
      "User Input Monitoring",
      "Trait Analysis (confidence, attitude)",
      "Dialogue-based Learning",
      "Feedback/Hints System",
      "Group Membership Profiling",
    ],
    innovation:
      "Focuses on group learning by dynamically adapting to learner traits, supporting both individual & collaborative phases, and providing real-time feedback during dialogues. Includes learner profiling for participation management.",
    currentImplementation:
      "Our system has basic group features but lacks sophisticated trait analysis and adaptive dialogue systems.",
    gaps: [
      "No real-time learner trait analysis",
      "Missing adaptive dialogue-based learning",
      "Limited group participation profiling",
      "No confidence/attitude tracking",
    ],
    improvements: [
      "Implement real-time sentiment and confidence analysis",
      "Add adaptive group formation algorithms",
      "Create dialogue-based learning modules",
      "Develop participation equity monitoring",
    ],
  },
  {
    id: "US 2014/0030686 A1",
    title: "System and Method for Providing a Virtual Personal Assistant",
    year: "2014",
    status: "Published patent application, pending",
    technologies: [
      "Natural Language Processing (NLP)",
      "Speech Recognition",
      "Context Modeling",
      "Rule-Based Reasoning",
      "Task Automation",
    ],
    innovation:
      "Multi-modal, context-aware personal assistant integrating voice, text, and task management. Adapts dynamically to user history, preferences, and situational context for seamless task execution across different domains.",
    currentImplementation:
      "Our Enhanced AI assistant provides advanced NLP but lacks the multi-modal context awareness and task automation features.",
    gaps: [
      "No speech recognition integration",
      "Limited context modeling across sessions",
      "Missing task automation capabilities",
      "No multi-modal interaction support",
    ],
    improvements: [
      "Add voice interaction capabilities",
      "Implement persistent context modeling",
      "Create automated task execution workflows",
      "Develop cross-platform integration",
    ],
  },
  {
    id: "US 10,846,843 B2",
    title: "Utilizing AI with Captured Images to Detect Agricultural Failure",
    year: "2020",
    status: "Granted patent",
    technologies: [
      "Deep learning (Faster R-CNN, YOLO)",
      "SVM, Haar cascade classifiers",
      "HOG classifier, CNN",
      "Curve fitting, regression",
      "AI-based image processing",
    ],
    innovation:
      "Uses AI and computer vision to automatically detect problems like 'plant gaps' or 'stressed areas' from field images. Provides automated analysis to identify specific issues, unlike query-based systems requiring manual input.",
    currentImplementation:
      "Our system has basic image analysis capabilities but lacks the sophisticated agricultural-specific AI detection models.",
    gaps: [
      "No specialized agricultural AI models",
      "Missing automated problem detection from images",
      "Limited computer vision capabilities",
      "No field-specific analysis tools",
    ],
    improvements: [
      "Adapt agricultural AI techniques for educational content analysis",
      "Implement automated visual learning assessment",
      "Create image-based engagement detection",
      "Develop visual learning pattern recognition",
    ],
  },
  {
    id: "US 11,263,707 B2",
    title: "Learning in Agricultural Planting, Growing, and Harvesting Contexts",
    year: "2022",
    status: "Granted patent",
    technologies: [
      "Non-parametric regression, Random forest",
      "Spatial regression, Bayesian regression",
      "Time series analysis, Bayesian network",
      "Decision tree, ANN, RNN, RL",
      "SVM, clustering, genetic algorithms",
    ],
    innovation:
      "Fused diverse ML models with agronomic datasets, providing adaptive, field-specific advice and real-time feedback, optimizing yields and resource use through comprehensive, explainable recommendations.",
    currentImplementation:
      "Our system uses basic ML models but lacks the sophisticated multi-model fusion and adaptive recommendation engine.",
    gaps: [
      "No multi-model ML fusion architecture",
      "Missing adaptive recommendation engine",
      "Limited real-time feedback systems",
      "No explainable AI recommendations",
    ],
    improvements: [
      "Implement ensemble learning approaches",
      "Create adaptive learning path recommendations",
      "Develop real-time performance feedback",
      "Add explainable AI for educational decisions",
    ],
  },
  {
    id: "US 11,457,554 B2",
    title: "Multi-Dimension Artificial Intelligence Agriculture Advisor",
    year: "2022",
    status: "Granted patent",
    technologies: [
      "Neural Networks",
      "Natural Language Processing (NLP)",
      "Advanced text analytics",
      "Scenario-based hypothesis validation",
    ],
    innovation:
      "Integrated multi-source agronomic, weather, and logistics data into an adaptive AI advisor using advanced ML, NLP, and scenario-based reasoning, offering real-time optimization and personalized recommendations.",
    currentImplementation:
      "Our Enhanced AI provides NLP capabilities but lacks the multi-dimensional data integration and scenario-based reasoning.",
    gaps: [
      "No multi-source data integration",
      "Missing scenario-based hypothesis validation",
      "Limited real-time optimization",
      "No comprehensive advisory system",
    ],
    improvements: [
      "Integrate multiple educational data sources",
      "Implement scenario-based learning validation",
      "Create comprehensive educational advisory system",
      "Develop real-time learning optimization",
    ],
  },
  {
    id: "US 10,949,974",
    title: "Automated Plant Disease Detection",
    year: "2021",
    status: "Granted patent",
    technologies: ["Bayesian networks", "Decision tree", "Support Vector Machine (SVM)", "Neural networks"],
    innovation:
      "Novel two-stage, real-time image processing approach to automatically detect and classify plant diseases. Used machine learning to analyze images and provided remediation recommendations.",
    currentImplementation:
      "Our system has basic image processing but lacks the two-stage automated detection and classification system.",
    gaps: [
      "No two-stage detection system",
      "Missing automated classification",
      "Limited remediation recommendations",
      "No real-time image analysis",
    ],
    improvements: [
      "Adapt two-stage detection for educational content",
      "Implement automated learning difficulty classification",
      "Create remediation recommendation system",
      "Develop real-time learning assessment",
    ],
  },
]

export function PatentComparisonAnalysis({ className }: React.ComponentProps<"div">) {
  const [selectedPatent, setSelectedPatent] = React.useState<PatentData | null>(null)

  const totalPatents = patentAnalysis.length
  const grantedPatents = patentAnalysis.filter((p) => p.status.includes("Granted")).length
  const totalTechnologies = [...new Set(patentAnalysis.flatMap((p) => p.technologies))].length
  const totalGaps = patentAnalysis.reduce((sum, p) => sum + (p.gaps?.length || 0), 0)
  const totalImprovements = patentAnalysis.reduce((sum, p) => sum + (p.improvements?.length || 0), 0)

  return (
    <div className={cn("space-y-6", className)}>
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalPatents}</div>
            <div className="text-sm text-muted-foreground">Patents Analyzed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{grantedPatents}</div>
            <div className="text-sm text-muted-foreground">Granted Patents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalTechnologies}</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalGaps}</div>
            <div className="text-sm text-muted-foreground">Identified Gaps</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-teal-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalImprovements}</div>
            <div className="text-sm text-muted-foreground">Improvements</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patents">Patent Details</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="roadmap">Improvement Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Key Innovations vs Current Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ Current Strengths</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Advanced Groq AI integration with enhanced NLP capabilities</li>
                      <li>• Comprehensive dashboard and analytics system</li>
                      <li>• Mobile-responsive timetable interface</li>
                      <li>• Dataset analysis and visualization tools</li>
                      <li>• Multi-user role management (Student/Teacher/Admin)</li>
                      <li>• Real-time attendance tracking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">⚠️ Major Gaps</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• No hierarchical conceptual development framework</li>
                      <li>• Missing adaptive group learning algorithms</li>
                      <li>• Limited multi-modal interaction (no voice/speech)</li>
                      <li>• No automated curriculum alignment with standards</li>
                      <li>• Missing real-time learner trait analysis</li>
                      <li>• No explainable AI recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patents" className="space-y-4">
          <div className="grid gap-4">
            {patentAnalysis.map((patent) => (
              <Card
                key={patent.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPatent(patent)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1">{patent.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{patent.id}</Badge>
                        <Badge variant={patent.status.includes("Granted") ? "default" : "secondary"}>
                          {patent.year}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{patent.innovation}</p>
                  <div className="flex flex-wrap gap-1">
                    {patent.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {patent.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{patent.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Critical Gaps in Current Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patentAnalysis.map((patent) => (
                  <div key={patent.id} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-2">{patent.title}</h4>
                    <div className="space-y-2">
                      {patent.gaps?.map((gap, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          {gap}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-teal-500" />
                Strategic Improvement Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patentAnalysis.map((patent) => (
                  <div key={patent.id} className="border-l-4 border-teal-500 pl-4">
                    <h4 className="font-semibold mb-2">{patent.title}</h4>
                    <div className="space-y-2">
                      {patent.improvements?.map((improvement, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Patent Modal/Detail View */}
      {selectedPatent && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedPatent.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{selectedPatent.id}</Badge>
                  <Badge>{selectedPatent.year}</Badge>
                  <Badge variant={selectedPatent.status.includes("Granted") ? "default" : "secondary"}>
                    {selectedPatent.status}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedPatent(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Innovation Description</h4>
              <p className="text-sm text-muted-foreground">{selectedPatent.innovation}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPatent.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedPatent.currentImplementation && (
              <div>
                <h4 className="font-semibold mb-2">Current Implementation Status</h4>
                <p className="text-sm text-muted-foreground">{selectedPatent.currentImplementation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
