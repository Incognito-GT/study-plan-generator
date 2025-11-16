'use client'

import { useState, useEffect } from 'react'
import { Plus, BookOpen, Trash2, Calendar, BookMarked, Zap } from 'lucide-react'
import StudyPlanDetailPage from '@/components/study-plan-detail-page'

interface StudyPlan {
  id: string
  subject: string
  testDate: string
  chapters: string[]
  createdAt: string
}

export default function Home() {
  const [plans, setPlans] = useState<StudyPlan[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('studyPlans')
    if (saved) {
      setPlans(JSON.parse(saved))
    }
    setIsLoading(false)

    const handleStorageChange = () => {
      // Removed updateTotalResources() calls since level system was removed
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('studyPlans', JSON.stringify(plans))
  }, [plans])

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id))
    if (selectedPlanId === id) {
      setSelectedPlanId(null)
    }
  }

  const handleAddNewPlan = () => {
    setSelectedPlanId('new')
  }

  if (isLoading) return null

  if (selectedPlanId === 'new') {
    return (
      <StudyPlanDetailPage 
        onBack={() => setSelectedPlanId(null)}
        onPlanCreated={(newPlan) => {
          setPlans([...plans, newPlan])
          setSelectedPlanId(null)
        }}
      />
    )
  }

  if (selectedPlanId && selectedPlanId !== 'new') {
    const plan = plans.find(p => p.id === selectedPlanId)
    if (plan) {
      return (
        <StudyPlanDetailPage 
          plan={plan}
          onBack={() => setSelectedPlanId(null)}
        />
      )
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-cyan-300">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-widest">Smart Study Planning</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-blue-50 mb-4 text-balance leading-tight">
              Master Every Chapter
            </h1>
            <p className="text-xl text-blue-200 mb-8 text-balance">
              Generate personalized study plans, track your progress, and ace your exams.
            </p>
            <button
              onClick={handleAddNewPlan}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Create First Plan
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {plans.length > 0 && (
          <>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-black text-blue-50 mb-2">Your Courses</h2>
                  <p className="text-blue-300">{plans.length} active {plans.length === 1 ? 'course' : 'courses'}</p>
                </div>
                <button
                  onClick={handleAddNewPlan}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Course
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => {
                  const daysUntilTest = Math.ceil(
                    (new Date(plan.testDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  )
                  const urgency = daysUntilTest <= 7 ? 'urgent' : daysUntilTest <= 14 ? 'medium' : 'normal'
                  
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className="group text-left bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-700 rounded-xl p-6 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                            <BookMarked className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Course</p>
                            <h3 className="text-lg font-bold text-blue-50 group-hover:text-cyan-300 transition-colors">
                              {plan.subject}
                            </h3>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePlan(plan.id)
                          }}
                          className="text-blue-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-200 font-medium">
                            {new Date(plan.testDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            urgency === 'urgent' ? 'bg-red-500/20 text-red-300' :
                            urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {daysUntilTest} days
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-200 font-medium">{plan.chapters.length} chapters</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {plan.chapters.slice(0, 2).map((ch, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md font-semibold">
                            {ch}
                          </span>
                        ))}
                        {plan.chapters.length > 2 && (
                          <span className="inline-block px-2 py-1 text-xs text-blue-400 font-semibold">
                            +{plan.chapters.length - 2}
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {plans.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black text-blue-50 mb-2">Start Your Journey</h2>
            <p className="text-blue-300 mb-8 max-w-sm mx-auto">
              Create your first study plan and begin mastering your courses with AI-powered assistance.
            </p>
            <button
              onClick={handleAddNewPlan}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Create First Plan
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
