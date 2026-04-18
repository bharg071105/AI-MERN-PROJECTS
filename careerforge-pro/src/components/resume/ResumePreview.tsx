
import { motion } from 'framer-motion'
import type { ResumeData } from '../../types'
import { cn } from '../../lib/utils'
import { Mail, Phone, MapPin, Link as LinkedinIcon, Globe } from 'lucide-react'

interface ResumePreviewProps {
  resume: ResumeData
  highlightedKeywords?: string[]
}

export function ModernTemplate({ resume, highlightedKeywords = [] }: ResumePreviewProps) {
  return (
    <div className="bg-white p-8 shadow-2xl max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b-2 border-primary-600 pb-6 mb-6">
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-3">
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {resume.personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              <span>{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
          {resume.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkedinIcon className="w-4 h-4" />
              <span>{resume.personalInfo.linkedin}</span>
            </div>
          )}
          {resume.personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>{resume.personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 uppercase tracking-wide mb-3">
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Work Experience
          </h2>
          <div className="space-y-5">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                    <p className="text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-slate-700 text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.school}</p>
                    {edu.field && <p className="text-slate-600 text-sm">{edu.field}</p>}
                  </div>
                  <span className="text-sm text-slate-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium',
                  highlightedKeywords.includes(skill.name.toLowerCase())
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                )}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-slate-900 mb-1">{project.name}</h3>
                <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export function ClassicTemplate({ resume }: ResumePreviewProps) {
  return (
    <div className="bg-white p-8 shadow-2xl max-w-4xl mx-auto font-serif">
      {/* Header */}
      <header className="text-center border-b border-slate-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 uppercase mb-2">Summary</h2>
          <p className="text-slate-700">{resume.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 uppercase mb-3">Experience</h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-bold">{exp.position}</span>
                  <span className="text-sm italic">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="italic text-slate-600 mb-2">{exp.company}</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-slate-700 text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 uppercase mb-3">Education</h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <span className="font-bold">{edu.degree}</span>
                  <span className="text-sm italic">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="italic">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-slate-900 uppercase mb-3">Skills</h2>
          <p className="text-slate-700">
            {resume.skills.map((s) => s.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  )
}

export function MinimalTemplate({ resume }: ResumePreviewProps) {
  return (
    <div className="bg-white p-8 shadow-2xl max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-light text-slate-900 mb-2">
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
          {resume.personalInfo.location && <span>• {resume.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <section className="mb-6">
          <p className="text-slate-700 text-sm leading-relaxed">{resume.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-medium text-slate-900">{exp.position}</h3>
                  <span className="text-xs text-slate-400">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-600">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Education
          </h2>
          <div className="space-y-2">
            {resume.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-medium text-slate-900">{edu.degree}</span>
                  <span className="text-xs text-slate-500 ml-2">{edu.school}</span>
                </div>
                <span className="text-xs text-slate-400">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export function ResumePreview({ resume, highlightedKeywords = [] }: ResumePreviewProps) {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  }

  const Template = templates[resume.template] || ModernTemplate

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto max-h-full"
    >
      <Template resume={resume} highlightedKeywords={highlightedKeywords} />
    </motion.div>
  )
}
