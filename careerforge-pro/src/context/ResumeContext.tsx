import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ResumeData, JDAnalysis, ATSScore } from '../types'
import { generateId } from '../lib/utils'

const RESUMES_STORAGE_KEY = 'careerforge_pro_resumes'
const TEMPLATE_STORAGE_KEY = 'careerforge_pro_template'

type TemplateType = ResumeData['template']

interface ResumeContextType {
  currentResume: ResumeData | null
  setCurrentResume: (resume: ResumeData | null) => void
  resumes: ResumeData[]
  setResumes: (resumes: ResumeData[]) => void
  createResume: () => ResumeData
  loadResumeById: (id: string) => ResumeData | null
  jdKeywords: JDAnalysis | null
  setJdKeywords: (keywords: JDAnalysis | null) => void
  atsScore: ATSScore | null
  setAtsScore: (score: ATSScore | null) => void
  selectedTemplate: TemplateType
  setSelectedTemplate: (template: TemplateType) => void
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void
  addExperience: () => void
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void
  removeEducation: (id: string) => void
  addSkill: (name: string) => void
  removeSkill: (id: string) => void
  addProject: () => void
  updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void
  removeProject: (id: string) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

function loadStoredResumes(): ResumeData[] {
  try {
    const raw = localStorage.getItem(RESUMES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ResumeData[]
    return parsed.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }))
  } catch {
    return []
  }
}

function saveResumesToStorage(resumes: ResumeData[]) {
  localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes))
}

function loadStoredTemplate(): TemplateType {
  const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY)
  if (stored === 'classic' || stored === 'minimal' || stored === 'modern') {
    return stored
  }

  return 'modern'
}

function saveTemplateToStorage(template: TemplateType) {
  localStorage.setItem(TEMPLATE_STORAGE_KEY, template)
}

function createDefaultResume(): ResumeData {
  return {
    id: generateId(),
    userId: 'guest',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    template: 'modern',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null)
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [jdKeywords, setJdKeywords] = useState<JDAnalysis | null>(null)
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null)
  const [selectedTemplate, setSelectedTemplateState] = useState<TemplateType>('modern')

  useEffect(() => {
    const storedResumes = loadStoredResumes()
    const storedTemplate = loadStoredTemplate()

    setSelectedTemplateState(storedTemplate)

    if (storedResumes.length > 0) {
      setResumes(storedResumes)
      setCurrentResume(storedResumes[0])
      return
    }

    const initialResume = createDefaultResume()
    setResumes([initialResume])
    setCurrentResume(initialResume)
    saveResumesToStorage([initialResume])
  }, [])

  const updateResumeState = useCallback((resume: ResumeData) => {
    setCurrentResume(resume)
    setResumes((previous) => {
      const next = previous.some((item) => item.id === resume.id)
        ? previous.map((item) => (item.id === resume.id ? resume : item))
        : [...previous, resume]

      saveResumesToStorage(next)
      return next
    })
  }, [])

  const createResume = useCallback(() => {
    const newResume = createDefaultResume()
    setResumes((previous) => {
      const next = [...previous, newResume]
      saveResumesToStorage(next)
      return next
    })
    setCurrentResume(newResume)
    return newResume
  }, [])

  const loadResumeById = useCallback(
    (id: string) => {
      const found = resumes.find((item) => item.id === id) || null
      if (found) {
        setCurrentResume(found)
        setSelectedTemplateState(found.template)
      }
      return found
    },
    [resumes],
  )

  const setSelectedTemplate = useCallback(
    (template: TemplateType) => {
      setSelectedTemplateState(template)
      saveTemplateToStorage(template)
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = { ...prev, template, updatedAt: new Date() }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const updatePersonalInfo = useCallback(
    (info: Partial<ResumeData['personalInfo']>) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          personalInfo: { ...prev.personalInfo, ...info },
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const addExperience = useCallback(() => {
    setCurrentResume((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        experience: [
          ...prev.experience,
          {
            id: generateId(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: [],
          },
        ],
        updatedAt: new Date(),
      }
      updateResumeState(next)
      return next
    })
  }, [updateResumeState])

  const updateExperience = useCallback(
    (id: string, data: Partial<ResumeData['experience'][0]>) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const removeExperience = useCallback(
    (id: string) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          experience: prev.experience.filter((exp) => exp.id !== id),
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const addEducation = useCallback(() => {
    setCurrentResume((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        education: [
          ...prev.education,
          {
            id: generateId(),
            school: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
          },
        ],
        updatedAt: new Date(),
      }
      updateResumeState(next)
      return next
    })
  }, [updateResumeState])

  const updateEducation = useCallback(
    (id: string, data: Partial<ResumeData['education'][0]>) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)),
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const removeEducation = useCallback(
    (id: string) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          education: prev.education.filter((edu) => edu.id !== id),
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const addSkill = useCallback(
    (name: string) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          skills: [...prev.skills, { id: generateId(), name, level: 3 }],
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const removeSkill = useCallback(
    (id: string) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          skills: prev.skills.filter((skill) => skill.id !== id),
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const addProject = useCallback(() => {
    setCurrentResume((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: generateId(),
            name: '',
            description: '',
            technologies: [],
          },
        ],
        updatedAt: new Date(),
      }
      updateResumeState(next)
      return next
    })
  }, [updateResumeState])

  const updateProject = useCallback(
    (id: string, data: Partial<ResumeData['projects'][0]>) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, ...data } : proj)),
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  const removeProject = useCallback(
    (id: string) => {
      setCurrentResume((prev) => {
        if (!prev) return prev
        const next = {
          ...prev,
          projects: prev.projects.filter((proj) => proj.id !== id),
          updatedAt: new Date(),
        }
        updateResumeState(next)
        return next
      })
    },
    [updateResumeState],
  )

  return (
    <ResumeContext.Provider
      value={{
        currentResume,
        setCurrentResume,
        resumes,
        setResumes,
        createResume,
        loadResumeById,
        jdKeywords,
        setJdKeywords,
        atsScore,
        setAtsScore,
        selectedTemplate,
        setSelectedTemplate,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
