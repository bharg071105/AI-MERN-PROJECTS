import { Card, CardBody } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react'
import type { JDAnalysis } from '../../types'

interface JDAnalysisPanelProps {
  analysis: JDAnalysis
}

export function JDAnalysisPanel({ analysis }: JDAnalysisPanelProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Keyword Overview</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">The most important keywords extracted from the job description.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="danger" size="sm">{skill}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Preferred Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.preferredSkills.map((skill) => (
                  <Badge key={skill} variant="info" size="sm">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Match Score</h3>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70">
              <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{analysis.matchScore}%</span>
              <span className="text-sm text-slate-600 dark:text-slate-300">Based on extracted keywords</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Keyword Breakdown</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((item) => (
                <Badge
                  key={item.keyword}
                  variant={item.importance === 'high' ? 'danger' : item.importance === 'medium' ? 'warning' : 'default'}
                  size="sm"
                >
                  {item.keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
