
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useResume } from '../context/ResumeContext'
import { useToast } from '../components/ui/Toast'

const templates: Array<{
  id: 'modern' | 'classic' | 'minimal'
  name: string
  description: string
  features: string[]
}> = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold headers',
    features: ['Bold typography', 'Color accents', 'Modern layout', 'Best for tech roles'],
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional format preferred by conservative industries',
    features: ['Serif fonts', 'Traditional structure', 'Conservative styling', 'ATS-friendly'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    features: ['Whitespace focused', 'Subtle styling', 'Content-first', 'Clean aesthetic'],
  },
]

export function TemplatesPage() {
  const { selectedTemplate, setSelectedTemplate } = useResume()
  const { addToast } = useToast()

  const handleSelect = (templateId: 'modern' | 'classic' | 'minimal') => {
    setSelectedTemplate(templateId)
    addToast(`Template changed to ${templateId}`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Resume Templates</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Choose a professional template that matches your style and industry
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className={`h-full ${
                selectedTemplate === template.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {/* Preview */}
              <div className="aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-200 m-4 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-6">
                  {template.id === 'modern' && (
                    <div className="w-full space-y-3">
                      <div className="h-4 bg-primary-600 rounded w-3/4 mb-2" />
                      <div className="h-2 bg-slate-400 rounded w-1/2" />
                      <div className="border-t-2 border-primary-600 my-3" />
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-300 rounded w-full" />
                        <div className="h-2 bg-slate-300 rounded w-5/6" />
                        <div className="h-2 bg-slate-300 rounded w-4/5" />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <div className="h-5 bg-primary-100 rounded px-2 w-16" />
                        <div className="h-5 bg-primary-100 rounded px-2 w-20" />
                        <div className="h-5 bg-primary-100 rounded px-2 w-14" />
                      </div>
                    </div>
                  )}

                  {template.id === 'classic' && (
                    <div className="w-full space-y-3 font-serif">
                      <div className="text-center">
                        <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-1" />
                        <div className="h-2 bg-slate-400 rounded w-1/2 mx-auto" />
                      </div>
                      <div className="border-b border-slate-400 my-3" />
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-600 rounded w-full" />
                        <div className="h-2 bg-slate-600 rounded w-5/6" />
                        <div className="h-2 bg-slate-600 rounded w-4/5" />
                      </div>
                    </div>
                  )}

                  {template.id === 'minimal' && (
                    <div className="w-full space-y-4">
                      <div>
                        <div className="h-3 bg-slate-800 rounded w-2/3 mb-1" />
                        <div className="h-1.5 bg-slate-400 rounded w-1/3" />
                      </div>
                      <div className="space-y-2 pt-2">
                        <div className="h-1.5 bg-slate-300 rounded w-full" />
                        <div className="h-1.5 bg-slate-300 rounded w-5/6" />
                        <div className="h-1.5 bg-slate-300 rounded w-4/5" />
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        <div className="h-4 bg-slate-100 rounded px-2 w-14" />
                        <div className="h-4 bg-slate-100 rounded px-2 w-16" />
                        <div className="h-4 bg-slate-100 rounded px-2 w-12" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <CardBody className="pt-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{template.name}</h3>
                  {selectedTemplate === template.id && (
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{template.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelect(template.id)}
                  variant={selectedTemplate === template.id ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {selectedTemplate === template.id ? 'Current Template' : 'Use This Template'}
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
