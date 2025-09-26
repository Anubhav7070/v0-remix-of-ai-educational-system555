import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_API_KEY = "AIzaSyB2h3pa349eEsbnubcJ3KoPBZ6NR1nfNX8"

export async function POST(request: NextRequest) {
  try {
    const { question, analysisType } = await request.json()

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    // Enhanced educational prompt for better analysis
    const educationalPrompt = `
As an expert educational AI analyst, provide a comprehensive analysis for the following educational question:

Question: ${question}
Analysis Type: ${analysisType}

Please provide:
1. Detailed analysis of the educational aspect
2. Key insights and patterns
3. Actionable recommendations
4. Data-driven suggestions for improvement
5. Best practices in education

Focus on practical, implementable solutions that can improve educational outcomes.

Analysis:
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: educationalPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Google AI API Error:", errorData)
      throw new Error(`Google AI API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Google AI API")
    }

    const analysis = data.candidates[0].content.parts[0].text

    return NextResponse.json({
      analysis,
      timestamp: new Date().toISOString(),
      analysisType,
      success: true,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate analysis",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
