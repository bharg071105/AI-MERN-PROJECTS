import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Eye, EyeOff, Palette, Save } from 'lucide-react'
import { useResume } from '../context/ResumeContext'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import {
  PersonalInfoForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  ProjectsForm,
} from '../components/resume/ResumeForms'
import { ResumePreview } from '../components/resume/ResumePreview'
import { useToast } from '../components/ui/Toast'

type FormSection = 'personal' | 'experience' | 'education' | 'skills' | 'projects'

const sections: { id: FormSection; label: string }[] = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

export function ResumeBuilderPage() {
  const { id } = useParams()
  const {
    currentResume,
    selectedTemplate,
    setSelectedTemplate,
    createResume,
    loadResumeById,
    jdKeywords,
  } = useResume()
  const { addToast } = useToast()
  const [activeSection, setActiveSection] = useState<FormSection>('personal')
  const [showPreview, setShowPreview] = useState(true)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    if (!id) {
      if (!currentResume) {
        createResume()
      }
      setIsInitializing(false)
      return
    }

    if (id === 'new') {
      createResume()
      setIsInitializing(false)
      return
    }

    const loaded = loadResumeById(id)
    if (!loaded) {
      createResume()
    }
    setIsInitializing(false)
  }, [id, currentResume, createResume, loadResumeById])

  useEffect(() => {
    if (jdKeywords && currentResume) {
      setShowPreview(true)
    }
  }, [jdKeywords, currentResume])

  const highlightedKeywords = useMemo(
    () => jdKeywords?.keywords.map((item) => item.keyword.toLowerCase()) ?? [],
    [jdKeywords],
  )

  const handleSave = () => {
    addToast('Resume saved successfully!', 'success')
  }

  const handleExport = () => {
    addToast('Exporting resume as PDF...', 'info')
  }

  if (isInitializing || !currentResume) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-300">Preparing your resume workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Resume Builder</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            {currentResume.personalInfo.fullName || 'Untitled Resume'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show Preview
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <Button size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Template Selector */}
      <Card className="mb-6">
        <CardBody className="py-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Template:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['modern', 'classic', 'minimal'].map((template) => (
                <button
                  key={template}
                  onClick={() => setSelectedTemplate(template as 'modern' | 'classic' | 'minimal')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                    selectedTemplate === template
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left Panel - Forms */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Section Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:border-slate-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === 'personal' && <PersonalInfoForm />}
              {activeSection === 'experience' && <ExperienceForm />}
              {activeSection === 'education' && <EducationForm />}
              {activeSection === 'skills' && <SkillsForm />}
              {activeSection === 'projects' && <ProjectsForm />}
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <div className="hidden lg:block bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="h-full overflow-y-auto p-4">
              <ResumePreview resume={currentResume} highlightedKeywords={highlightedKeywords} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
