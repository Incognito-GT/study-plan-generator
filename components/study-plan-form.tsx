'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface StudyPlanFormProps {
  onPlanGenerated: (plan: any) => void
}

const HARDEST_HIGH_SCHOOL_COURSES = [
  'AP Calculus BC',
  'AP Calculus AB',
  'AP Chemistry',
  'AP Physics C',
  'AP Physics 1',
  'AP Biology',
  'AP Organic Chemistry',
  'AP Statistics',
  'AP Macroeconomics',
  'AP Microeconomics',
  'AP English Language',
  'AP English Literature',
  'AP U.S. History',
  'AP World History',
  'AP European History',
  'AP U.S. Government',
  'AP Comparative Government',
  'AP Psychology',
  'AP Human Geography',
  'IB Higher Level Physics',
  'IB Higher Level Chemistry',
  'IB Higher Level Mathematics',
  'IB Higher Level Biology',
  'Honors Precalculus',
  'Honors Chemistry',
  'Honors Physics',
  'Honors Biology',
  'Linear Algebra',
  'Multivariable Calculus',
  'Differential Equations',
]

export default function StudyPlanForm({ onPlanGenerated }: StudyPlanFormProps) {
  const [subject, setSubject] = useState('')
  const [testDate, setTestDate] = useState('')
  const [chapters, setChapters] = useState('')
  const [loading, setLoading] = useState(false)

  const parseChapters = (input: string): string[] => {
    const result: string[] = []
    const parts = input.split(',').map((p) => p.trim())

    for (const part of parts) {
      // Check for range pattern like "1-3" or "Chapter 1-3"
      const rangeMatch = part.match(/(?:chapter\s+)?(\d+)\s*-\s*(\d+)(?:\s*[:\s].*)?/i)
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1])
        const end = parseInt(rangeMatch[2])
        for (let i = start; i <= end; i++) {
          result.push(`Chapter ${i}`)
        }
      } else if (part) {
        // If it's just a number like "1", treat it as "Chapter 1"
        if (/^\d+$/.test(part.trim())) {
          result.push(`Chapter ${part.trim()}`)
        } else {
          result.push(part)
        }
      }
    }

    return result
  }

  const fetchChapterDetails = async (subject: string, chapters: string[]) => {
    try {
      const response = await fetch('/api/research-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, chapters }),
      })
      
      if (!response.ok) throw new Error('Failed to fetch course details')
      
      const data = await response.json()
      return data.chapterDetails
    } catch (error) {
      console.error('[v0] Error fetching course details:', error)
      return chapters.map((ch) => ({
        name: ch,
        notes: 'Study this chapter thoroughly.',
        resources: [],
        keyPoints: [],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!subject || !testDate || !chapters) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const testDateObj = new Date(testDate)
      const today = new Date()
      const daysUntilTest = Math.ceil(
        (testDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysUntilTest <= 0) {
        alert('Test date must be in the future')
        setLoading(false)
        return
      }

      const chapterList = parseChapters(chapters)

      if (chapterList.length === 0) {
        alert('Please enter valid chapter numbers or names')
        setLoading(false)
        return
      }

      const chapterDetails = await fetchChapterDetails(subject, chapterList)

      const daysPerChapter = Math.floor(daysUntilTest / chapterList.length)
      const remainingDays = daysUntilTest % chapterList.length
      
      const plan = []

      for (let i = 0; i < chapterList.length; i++) {
        const daysForThisChapter = daysPerChapter + (i < remainingDays ? 1 : 0)
        
        const phaseStartDay = i === 0 ? 1 : plan[i - 1].endDay + 1
        const phaseEndDay = phaseStartDay + daysForThisChapter - 1

        const startDate = new Date(today)
        startDate.setDate(startDate.getDate() + phaseStartDay - 1)
        
        const endDate = new Date(today)
        endDate.setDate(endDate.getDate() + phaseEndDay - 1)

        plan.push({
          startDay: phaseStartDay,
          endDay: phaseEndDay,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          chapters: [chapterDetails[i]],
          completed: false,
        })
      }

      onPlanGenerated({
        subject,
        testDate: testDate,
        totalDays: daysUntilTest,
        schedule: plan,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error generating plan:', error)
      alert('Error generating study plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/30 shadow-lg bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-foreground">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-100">Create Your Study Plan</CardTitle>
          <CardDescription className="text-blue-200">
            Select your subject, test date, and chapters to generate an instant study plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Subject / Course
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-800 text-blue-100"
              >
                <option value="" className="bg-blue-900 text-blue-100">-- Select a Course --</option>
                {HARDEST_HIGH_SCHOOL_COURSES.map((course) => (
                  <option key={course} value={course} className="bg-blue-900 text-blue-100">
                    {course}
                  </option>
                ))}
                <option value="" className="bg-blue-900 text-blue-100">-- Or Enter Custom Subject --</option>
              </select>
              {subject && !HARDEST_HIGH_SCHOOL_COURSES.includes(subject) && (
                <Input
                  type="text"
                  placeholder="Enter custom subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full mt-2 border-blue-600 bg-blue-800 text-blue-100 placeholder:text-blue-400"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Test Date
              </label>
              <Input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full border-blue-600 bg-blue-800 text-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Chapters
              </label>
              <textarea
                placeholder="Enter chapters in any format:&#10;• Ranges: 1-3, 5-7&#10;• Individual: 1, 2, 3&#10;• Names: Chapter 1: Intro, Chapter 2: Basics&#10;Mixed: 1-3, Chapter 5, Chapter 6"
                value={chapters}
                onChange={(e) => setChapters(e.target.value)}
                className="w-full px-3 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-800 text-blue-100 placeholder:text-blue-400"
                rows={5}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
              size="lg"
            >
              {loading ? 'Researching course content...' : 'Generate Study Plan'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
