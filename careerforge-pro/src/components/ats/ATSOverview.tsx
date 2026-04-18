import { Card, CardBody } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { Target, AlertTriangle } from 'lucide-react'
import type { ATSScore } from '../../types'

interface ATSOverviewProps {
  score: ATSScore
}

export function ATSOverview({ score }: ATSOverviewProps) {
  return (
    <Card>
      <CardBody>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">ATS Score Report</h2>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-52 h-52 mx-auto md:mx-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="95" cy="95" r="80" stroke="currentColor" strokeWidth="14" fill="none" className="text-slate-200" />
                <circle
                  cx="95"
                  cy="95"
                  r="80"
                  stroke="url(#atsscore-gradient)"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray="502"
                  strokeDashoffset={502 - (502 * score.overall) / 100}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="atsscore-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{score.overall}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">out of 100</span>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Keyword Match</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{score.keywordMatch}%</span>
                </div>
                <ProgressBar value={score.keywordMatch} color="primary" size="sm" showLabel={false} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Format Score</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{score.formatScore}%</span>
                </div>
                <ProgressBar value={score.formatScore} color="success" size="sm" showLabel={false} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Completeness</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{score.completeness}%</span>
                </div>
                <ProgressBar value={score.completeness} color="warning" size="sm" showLabel={false} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/70">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {score.missingKeywords.map((keyword) => (
                  <Badge key={keyword} variant="danger" size="sm">{keyword}</Badge>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/70">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Top Suggestions</h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {score.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
