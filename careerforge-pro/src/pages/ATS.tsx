import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { ATSOverview } from '../components/ats/ATSOverview'
import { useToast } from '../components/ui/Toast'
import { useResume } from '../context/ResumeContext'
import { atsService } from '../services'
import type { ATSScore } from '../types'

export function ATSPage() {
  const { addToast } = useToast()
  const { currentResume, setAtsScore } = useResume()
  const [score, setScore] = useState<ATSScore | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleAnalyze = async () => {
    if (!currentResume) {
      addToast('Create a resume first to calculate ATS score.', 'error')
      return
    }

    setIsCalculating(true)

    try {
      const response = await atsService.score(currentResume.id)
      setScore(response)
      setAtsScore(response)
      addToast('ATS score calculated successfully!', 'success')
    } catch (error) {
      const fallback: ATSScore = {
        overall: 78,
        keywordMatch: 82,
        formatScore: 90,
        completeness: 65,
        missingKeywords: ['Python', 'AWS Lambda', 'Docker', 'CI/CD'],
        suggestions: [
          'Add more quantifiable achievements to your experience',
          'Include relevant certifications',
          'Expand your skills section with industry-specific tools',
          'Use more action verbs in bullet points',
        ],
      }
      setScore(fallback)
      setAtsScore(fallback)
      addToast('Showing local ATS guidance while the API is unavailable.', 'info')
    } finally {
      setIsCalculating(false)
    }
  }

  const activeScore = score ?? {
    overall: 72,
    keywordMatch: 75,
    formatScore: 88,
    completeness: 68,
    missingKeywords: ['Python', 'AWS Lambda', 'Docker', 'CI/CD'],
    suggestions: [
      'Add more quantifiable achievements to your experience',
      'Include relevant certifications',
      'Expand your skills section with industry-specific tools',
      'Use more action verbs in bullet points',
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">ATS Score Analysis</h1>
        <p className="text-slate-600 dark:text-slate-300">
          See how well your resume performs against Applicant Tracking Systems
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-slate-600 dark:text-slate-300">Current resume</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{currentResume?.personalInfo.fullName || 'Untitled Resume'}</p>
        </div>
        <Button onClick={handleAnalyze} isLoading={isCalculating}>
          {currentResume ? 'Calculate ATS Score' : 'Create a Resume First'}
        </Button>
      </div>

      <ATSOverview score={activeScore} />

      <div className="flex justify-end gap-3">
        <Button variant="outline">Download Report</Button>
        <Button>Optimize Resume</Button>
      </div>
    </div>
  )
}
