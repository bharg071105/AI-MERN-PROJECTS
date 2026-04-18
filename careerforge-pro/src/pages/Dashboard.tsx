
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Plus, Clock, TrendingUp } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { useResume } from '../context/ResumeContext'

export function DashboardPage() {
  const { user } = useAuth()
  const { resumes } = useResume()

  const stats = [
    { label: 'Total Resumes', value: resumes.length.toString(), icon: FileText, change: '+2 this week' },
    { label: 'Avg ATS Score', value: '85', icon: TrendingUp, change: '+5 points' },
    { label: 'Jobs Applied', value: '12', icon: Clock, change: 'This month' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome back, {user?.name}!</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Ready to optimize your resume today?</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/resume/new">
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Create Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success">{stat.change}</Badge>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Resumes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your Resumes</h2>
          <Link to="/dashboard/resume">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.slice(0, 3).map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/dashboard/resume/${resume.id}`}>
                  <Card hover className="h-full">
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        </div>
                        <Badge variant={resume.template === 'modern' ? 'info' : 'default'}>
                          {resume.template}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        {resume.personalInfo.fullName || 'Untitled Resume'}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">No resumes yet</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">Create your first resume to get started</p>
              <Link to="/dashboard/resume/new">
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Resume
                </Button>
              </Link>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Resume Builder', description: 'Create or edit resumes', link: '/dashboard/resume' },
            { title: 'Job Matcher', description: 'Find matching jobs', link: '/dashboard/jobs' },
            { title: 'ATS Checker', description: 'Check resume score', link: '/dashboard/ats' },
            { title: 'Templates', description: 'Browse templates', link: '/dashboard/templates' },
          ].map((action, index) => (
            <Link key={index} to={action.link}>
              <Card hover className="h-full">
                <CardBody className="p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{action.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{action.description}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
