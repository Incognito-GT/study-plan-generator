'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

interface StudyPlanDisplayProps {
  plan: any
  onReset: () => void
}

export default function StudyPlanDisplay({ plan, onReset }: StudyPlanDisplayProps) {
  const [completed, setCompleted] = useState<number[]>([])
  const [expandedPhases, setExpandedPhases] = useState<number[]>([])
  const [clickedLinks, setClickedLinks] = useState<Set<string>>(new Set())
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const totalResources = plan.schedule.reduce((acc: number, phase: any) => {
    return acc + (phase.chapters.reduce((chAcc: number, ch: any) => {
      return chAcc + (ch.resources?.length || 0)
    }, 0))
  }, 0)

  const resourceProgressPercent = totalResources > 0 
    ? Math.round((clickedLinks.size / totalResources) * 100)
    : 0

  const togglePhase = (phaseIndex: number) => {
    setCompleted((prev) =>
      prev.includes(phaseIndex)
        ? prev.filter((i) => i !== phaseIndex)
        : [...prev, phaseIndex]
    )
  }

  const toggleExpandPhase = (phaseIndex: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseIndex)
        ? prev.filter((i) => i !== phaseIndex)
        : [...prev, phaseIndex]
    )
  }

  const handleResourceClick = (url: string) => {
    const linkId = `${plan.subject}-${url}`
    
    if (!clickedLinks.has(linkId)) {
      setClickedLinks((prev) => new Set([...prev, linkId]))
      
      // Only auto-mark as completed if all resources have been clicked for a phase
      // This gives a gentle progress boost without forcing completion
      const autoCompleteThreshold = Math.floor(totalResources * 0.6)
      
      if (clickedLinks.size < Math.floor(plan.schedule.length * 0.2)) {
        // Auto-complete a phase if we've clicked enough resources
        if (clickedLinks.size >= autoCompleteThreshold && completed.length < plan.schedule.length - 1) {
          const nextIncomplete = plan.schedule.findIndex((_, idx: number) => !completed.includes(idx))
          if (nextIncomplete >= 0 && !completed.includes(nextIncomplete)) {
            setCompleted((prev) => [...prev, nextIncomplete])
          }
        }
      }
    }
    
    // Open link in new tab
    window.open(url, '_blank')
  }

  const completionPercent = Math.round((completed.length / plan.schedule.length) * 100)

  const generateQuizQuestions = () => {
    const questions = []
    let questionId = 0

    plan.schedule.forEach((phase: any) => {
      phase.chapters.forEach((chapter: any) => {
        if (chapter.keyPoints && chapter.keyPoints.length > 0) {
          // Create multiple choice questions from key points
          const selectedPoints = chapter.keyPoints.slice(0, 3).map((point: string) => ({
            text: point,
            chapter: chapter.name,
          }))

          selectedPoints.forEach((point: any, idx: number) => {
            questions.push({
              id: questionId++,
              type: 'multiple-choice',
              chapter: point.chapter,
              question: `Which of the following best describes a key concept from "${point.chapter}"?`,
              correct: idx,
              options: [
                point.text,
                chapter.keyPoints[(idx + 1) % chapter.keyPoints.length],
                chapter.keyPoints[(idx + 2) % chapter.keyPoints.length],
                chapter.keyPoints[(idx + 3) % chapter.keyPoints.length],
              ].sort(() => Math.random() - 0.5),
            })
          })
        }
      })
    })

    return questions.slice(0, 10) // Return first 10 questions
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)
  }

  const getQuizScore = () => {
    if (!quizSubmitted) return 0
    const questions = generateQuizQuestions()
    let correct = 0
    questions.forEach((q) => {
      if (quizAnswers[q.id] !== undefined) {
        const selectedOptionText = q.options[parseInt(quizAnswers[q.id])]
        const correctOptionText = q.options[q.options.indexOf(q.options[q.correct])]
        if (selectedOptionText === correctOptionText) {
          correct++
        }
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  return (
    <div className="space-y-6 px-4">
      <Card className="border-blue-600/50 shadow-lg bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-blue-100">{plan.subject}</CardTitle>
              <CardDescription className="text-blue-300">
                Test on {new Date(plan.testDate).toLocaleDateString()} • {plan.totalDays} days to prepare
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onReset} className="border-blue-600 text-blue-100 hover:bg-blue-800">
              Start Over
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">Study Progress</span>
                <span className="font-semibold text-blue-100">{completionPercent}%</span>
              </div>
              <div className="w-full bg-blue-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-cyan-300 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">Resources Studied</span>
                <span className="font-semibold text-blue-100">{resourceProgressPercent}%</span>
              </div>
              <div className="w-full bg-blue-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${resourceProgressPercent}%` }}
                />
              </div>
            </div>

            {clickedLinks.size > 0 && (
              <p className="text-xs text-blue-300">
                {clickedLinks.size} of {totalResources} resources visited
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {plan.schedule.map((phase: any, index: number) => (
          <Card
            key={index}
            className={`border-blue-600/50 shadow-md transition-all bg-gradient-to-br from-blue-800 via-blue-900 to-blue-800 ${
              completed.includes(index)
                ? 'ring-2 ring-blue-400/50'
                : 'hover:shadow-lg'
            }`}
          >
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 mt-1 cursor-pointer"
                    onClick={() => togglePhase(index)}
                  >
                    {completed.includes(index) ? (
                      <CheckCircle2 className="w-6 h-6 text-blue-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-blue-100">
                      Day {phase.startDay}-{phase.endDay} • Review {phase.chapters.length} chapter{phase.chapters.length !== 1 ? 's' : ''}
                    </h3>
                    <p className="text-sm text-blue-300 mt-1">
                      {new Date(phase.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })} - {new Date(phase.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleExpandPhase(index)}
                    className="flex-shrink-0 text-blue-400 hover:text-blue-200 transition-colors"
                  >
                    {expandedPhases.includes(index) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {phase.chapters.map((chapter: any, idx: number) => (
                    <span
                      key={idx}
                      className="text-sm px-3 py-1 bg-blue-700/50 text-blue-200 rounded-full font-medium"
                    >
                      {chapter.name || chapter}
                    </span>
                  ))}
                </div>

                {expandedPhases.includes(index) && (
                  <div className="mt-4 pt-4 border-t border-blue-600 space-y-4">
                    {phase.chapters.map((chapter: any, idx: number) => (
                      <div key={idx} className="bg-blue-700/30 rounded-lg p-4 space-y-3 border border-blue-600">
                        <div>
                          <h4 className="font-semibold text-blue-100 text-base">
                            {chapter.name || chapter}
                          </h4>
                        </div>
                        
                        {chapter.notes && (
                          <div className="bg-blue-800/50 rounded p-3 border border-blue-600">
                            <p className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">
                              Study Notes
                            </p>
                            <p className="text-sm text-blue-100 leading-relaxed">
                              {chapter.notes}
                            </p>
                          </div>
                        )}

                        {chapter.keyPoints && chapter.keyPoints.length > 0 && (
                          <div className="bg-blue-800/50 rounded p-3 border border-blue-600">
                            <p className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">
                              Key Points
                            </p>
                            <ul className="text-sm text-blue-100 space-y-2">
                              {chapter.keyPoints.map((point: string, pidx: number) => (
                                <li key={pidx} className="flex gap-2">
                                  <span className="text-blue-400 flex-shrink-0">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {chapter.resources && chapter.resources.length > 0 && (
                          <div className="bg-blue-800/50 rounded p-3 border border-blue-600">
                            <p className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">
                              Learning Resources
                            </p>
                            <div className="space-y-2">
                              {chapter.resources.map((resource: any, ridx: number) => (
                                <button
                                  key={ridx}
                                  onClick={() => handleResourceClick(resource.url)}
                                  className="w-full text-left text-sm text-blue-300 hover:text-blue-100 flex items-center gap-2 p-2 rounded hover:bg-blue-700/30 transition-colors"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="underline">{resource.title}</span>
                                  {clickedLinks.has(`${plan.subject}-${resource.url}`) && (
                                    <span className="text-xs bg-blue-600 text-blue-100 px-2 py-0.5 rounded ml-auto font-medium">
                                      Visited
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {completed.length === plan.schedule.length && !showQuiz && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-700/40 to-cyan-600/40 border border-blue-600/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-blue-100">
                  Congratulations! You've completed all study phases!
                </h3>
                <p className="text-sm text-blue-300 mt-1">
                  Take the final quiz to test your knowledge.
                </p>
              </div>
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
              >
                Take Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showQuiz && (
        <Card className="border-blue-600/50 shadow-lg bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-100">Final Assessment Quiz</CardTitle>
            <CardDescription className="text-blue-300">
              Test your knowledge on all chapters covered
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!quizSubmitted ? (
              <>
                {generateQuizQuestions().map((question: any, idx: number) => (
                  <div key={question.id} className="bg-blue-800/40 rounded-lg p-4 space-y-3 border border-blue-600">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/40 text-blue-300 text-sm font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex-grow">
                        <p className="font-semibold text-blue-100">{question.question}</p>
                        <p className="text-xs text-blue-400 mt-1">({question.chapter})</p>
                      </div>
                    </div>
                    <div className="space-y-2 ml-9">
                      {question.options.map((option: string, optIdx: number) => (
                        <button
                          key={optIdx}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [question.id]: optIdx.toString() }))}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                            quizAnswers[question.id] === optIdx.toString()
                              ? 'border-blue-400 bg-blue-600/30 text-blue-100'
                              : 'border-blue-600 hover:border-blue-500 text-blue-200'
                          }`}
                        >
                          <span className="text-sm">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  onClick={handleSubmitQuiz}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-6 text-lg"
                >
                  Submit Quiz
                </Button>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-blue-700/40 flex items-center justify-center mx-auto">
                  <span className="text-5xl font-bold text-blue-300">{getQuizScore()}%</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-blue-100">
                    {getQuizScore() >= 80 ? 'Excellent!' : getQuizScore() >= 60 ? 'Good Job!' : 'Keep Studying!'}
                  </h4>
                  <p className="text-blue-300 mt-2">
                    {getQuizScore() >= 80
                      ? 'You have mastered the material!'
                      : getQuizScore() >= 60
                      ? 'You understand most concepts. Review weak areas.'
                      : 'Review the study material and retake the quiz.'}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setShowQuiz(false)
                    setQuizSubmitted(false)
                    setQuizAnswers({})
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
                >
                  Back to Study Plan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
