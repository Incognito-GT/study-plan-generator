import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(request: Request) {
  try {
    const { subject, message, context } = await request.json()

    const systemPrompt = `You are an expert study assistant helping students prepare for exams. 
Your subject is ${subject}. 
The student is studying these topics: ${context.join(', ')}

Provide clear, concise explanations. If asked to solve problems, show step-by-step solutions. 
Be encouraging and help break down complex concepts into simpler parts.`

    const { text } = await generateText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
      maxTokens: 500,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error('Error:', error)
    return Response.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
