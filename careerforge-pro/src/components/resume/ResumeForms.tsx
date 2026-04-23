import React from 'react'
import { useResume } from '../../context/ResumeContext'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'
import { Card, CardBody } from '../ui/Card'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function PersonalInfoForm() {
  const { currentResume, updatePersonalInfo } = useResume()

  if (!currentResume) return null

  return (
    <Card>
      <CardBody className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Personal Information</h3>
        
        <Input
          label="Full Name"
          value={currentResume.personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          placeholder="John Doe"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={currentResume.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="john@example.com"
          />
          <Input
            label="Phone"
            type="tel"
            value={currentResume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <Input
          label="Location"
          value={currentResume.personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          placeholder="New York, NY"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn"
            value={currentResume.personalInfo.linkedin || ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
          />
          <Input
            label="Website"
            value={currentResume.personalInfo.website || ''}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="johndoe.com"
          />
        </div>
        
        <Textarea
          label="Professional Summary"
          value={currentResume.personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="Experienced software engineer with expertise in..."
          rows={4}
        />
      </CardBody>
    </Card>
  )
}

export function ExperienceForm() {
  const { currentResume, addExperience, updateExperience, removeExperience } = useResume()
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  if (!currentResume) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Work Experience</h3>
        <Button size="sm" onClick={addExperience}>
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      <AnimatePresence>
        {currentResume.experience.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <button
                    onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                    className="flex items-center gap-2 flex-1"
                  >
                    {expandedId === exp.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="text-left">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{exp.position || 'Position'}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{exp.company || 'Company'}</p>
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {expandedId === exp.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <Input
                      label="Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                      placeholder="Software Engineer"
                    />
                    
                    <Input
                      label="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Tech Corp"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      />
                      <Input
                        label="End Date"
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        disabled={exp.current}
                      />
                    </div>
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                        className="rounded border-slate-300"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-200">I currently work here</span>
                    </label>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                        Description (one bullet point per line)
                      </label>
                      <Textarea
                        value={exp.description.join('\n')}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value.split('\n') })}
                        placeholder="Led development of...&#10;Increased performance by...&#10;Managed team of..."
                        rows={4}
                      />
                    </div>
                  </motion.div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {currentResume.experience.length === 0 && (
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400 mb-3">No experience added yet</p>
            <Button onClick={addExperience}>Add Experience</Button>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export function EducationForm() {
  const { currentResume, addEducation, updateEducation, removeEducation } = useResume()
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  if (!currentResume) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Education</h3>
        <Button size="sm" onClick={addEducation}>
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      <AnimatePresence>
        {currentResume.education.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <button
                    onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                    className="flex items-center gap-2 flex-1"
                  >
                    {expandedId === edu.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="text-left">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{edu.degree || 'Degree'}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{edu.school || 'School'}</p>
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {expandedId === edu.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <Input
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="Bachelor of Science"
                    />
                    
                    <Input
                      label="Field of Study"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                      placeholder="Computer Science"
                    />
                    
                    <Input
                      label="School"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                      placeholder="University Name"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      />
                      <Input
                        label="End Date"
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {currentResume.education.length === 0 && (
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400 mb-3">No education added yet</p>
            <Button onClick={addEducation}>Add Education</Button>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export function SkillsForm() {
  const { currentResume, addSkill, removeSkill } = useResume()
  const [newSkill, setNewSkill] = React.useState('')

  if (!currentResume) return null

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim())
      setNewSkill('')
    }
  }

  return (
    <Card>
      <CardBody>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Skills</h3>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            placeholder="Add a skill (e.g., JavaScript, Python)"
            className="flex-1"
          />
          <Button onClick={handleAddSkill}>Add</Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {currentResume.skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg border border-primary-200"
            >
              <span className="font-medium text-sm">{skill.name}</span>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-primary-400 hover:text-primary-600"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>

        {currentResume.skills.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400 text-center py-4">No skills added yet</p>
        )}
      </CardBody>
    </Card>
  )
}

export function ProjectsForm() {
  const { currentResume, addProject, updateProject, removeProject } = useResume()
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  if (!currentResume) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Projects</h3>
        <Button size="sm" onClick={addProject}>
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      <AnimatePresence>
        {currentResume.projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <button
                    onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                    className="flex items-center gap-2 flex-1"
                  >
                    {expandedId === project.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="text-left">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{project.name || 'Project'}</p>
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {expandedId === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <Input
                      label="Project Name"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, { name: e.target.value })}
                      placeholder="My Awesome Project"
                    />
                    
                    <Textarea
                      label="Description"
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      placeholder="A brief description of your project..."
                      rows={3}
                    />
                    
                    <Input
                      label="Technologies (comma-separated)"
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateProject(project.id, { technologies: e.target.value.split(',').map(t => t.trim()) })}
                      placeholder="React, TypeScript, Node.js"
                    />
                    
                    <Input
                      label="Link (optional)"
                      value={project.link || ''}
                      onChange={(e) => updateProject(project.id, { link: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </motion.div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {currentResume.projects.length === 0 && (
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400 mb-3">No projects added yet</p>
            <Button onClick={addProject}>Add Project</Button>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
