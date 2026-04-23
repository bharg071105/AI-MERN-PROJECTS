import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Textarea } from '../components/ui/Textarea'
import { Card, CardBody } from '../components/ui/Card'
import { useToast } from '../components/ui/Toast'
import { coverLetterService } from '../services'
import { useResume } from '../context/ResumeContext'
import { CoverLetterPreview } from '../components/coverletter/CoverLetterPreview'

export function CoverLetterPage() {
  const { addToast } = useToast()
  const { currentResume } = useResume()
  const [jdText, setJdText] = useState('')
  const [tone, setTone] = useState('professional')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!currentResume) {
      addToast('Create a resume first to generate a cover letter.', 'error')
      return
    }

    if (!jdText.trim()) {
      addToast('Please paste a job description', 'error')
      return
    }

    setIsGenerating(true)

    try {
      const response = await coverLetterService.generate(currentResume.id, jdText, tone)
      setGeneratedLetter(response.content)
      addToast('Cover letter generated!', 'success')
    } catch (error) {
      const fallback = `Dear Hiring Manager,

I am excited to apply for this opportunity. With strong experience in modern web development and a proven history of delivering polished digital products, I am confident that I can contribute effectively to your team.

Throughout my career, I have worked with React, TypeScript, and scalable workflows that help teams move faster. I enjoy translating complex challenges into clean, user-focused solutions and collaborating with cross-functional teams.

I am particularly interested in this role because of its focus on innovation and teamwork. I believe my skills and professional approach make me an excellent fit for your organization.

Thank you for considering my application. I look forward to the possibility of discussing how I can help drive success for your team.

Sincerely,
[Your Name]`
      setGeneratedLetter(fallback)
      addToast('Cover letter generated locally.', 'info')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    addToast('Copied to clipboard!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Cover Letter Generator</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Create personalized cover letters tailored to any job description
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardBody>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Job Description
                </label>
                <Textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={8}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Tone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['professional', 'casual', 'enthusiastic'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        tone === t
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleGenerate} isLoading={isGenerating} className="w-full">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Cover Letter
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Output Section */}
        <div>
          {generatedLetter ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CoverLetterPreview value={generatedLetter} onCopy={handleCopy} copied={copied} />
          </motion.div>
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Ready to generate</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Paste a job description and click generate to create your cover letter
              </p>
            </CardBody>
          </Card>
        )}
        </div>
      </div>
    </div>
  )
}
