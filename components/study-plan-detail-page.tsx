'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import StudyPlanForm from './study-plan-form'
import StudyPlanDisplay from './study-plan-display'

interface StudyPlan {
  id: string
  subject: string
  testDate: string
  chapters: string[]
  createdAt: string
}

interface StudyPlanDetailPageProps {
  plan?: StudyPlan
  onBack: () => void
  onPlanCreated?: (plan: StudyPlan) => void
}

export default function StudyPlanDetailPage({ plan, onBack, onPlanCreated }: StudyPlanDetailPageProps) {
  const [displayPlan, setDisplayPlan] = useState<any>(() => {
    if (plan) {
      const saved = localStorage.getItem(`plan-${plan.id}`)
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return null
  })
  
  const [phases, setPhases] = useState<any[]>(() => {
    if (plan) {
      const saved = localStorage.getItem(`plan-${plan.id}`)
      if (saved) {
        const fullPlan = JSON.parse(saved)
        return fullPlan.schedule || []
      }
    }
    return []
  })

  useEffect(() => {
    if (plan) {
      const saved = localStorage.getItem(`plan-${plan.id}`)
      if (saved) {
        const fullPlan = JSON.parse(saved)
        setDisplayPlan(fullPlan)
        setPhases(fullPlan.schedule || [])
      }
    }
  }, [plan])

  const handlePlanGenerated = (generatedPlan: any) => {
    setDisplayPlan(generatedPlan)
    setPhases(generatedPlan.schedule || [])
    
    if (onPlanCreated) {
      const newPlan: StudyPlan = {
        id: Date.now().toString(),
        subject: generatedPlan.subject,
        testDate: generatedPlan.testDate,
        chapters: generatedPlan.schedule.map((phase: any) => 
          phase.chapters[0]?.name || 'Chapter'
        ),
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem(`plan-${newPlan.id}`, JSON.stringify(generatedPlan))
      onPlanCreated(newPlan)
    }
  }

  if (!displayPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <div className="border-b border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-card via-background to-card rounded-xl border border-primary/20 p-8 shadow-lg">
            <StudyPlanForm onPlanGenerated={handlePlanGenerated} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
      <StudyPlanDisplay plan={displayPlan} phases={phases} />
    </div>
  )
}
