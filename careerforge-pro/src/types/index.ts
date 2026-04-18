export interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro'
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface Skill {
  id: string
  name: string
  level: number
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
}

export interface ResumeData {
  id: string
  userId: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin?: string
    website?: string
    summary: string
  }
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  template: 'modern' | 'classic' | 'minimal'
  createdAt: Date
  updatedAt: Date
}

export interface JDAnalysis {
  keywords: Array<{
    keyword: string
    importance: 'high' | 'medium' | 'low'
    category: 'skill' | 'experience' | 'education' | 'tool'
  }>
  requiredSkills: string[]
  preferredSkills: string[]
  matchScore: number
}

export interface ATSScore {
  overall: number
  keywordMatch: number
  formatScore: number
  completeness: number
  missingKeywords: string[]
  suggestions: string[]
}

export interface CoverLetter {
  id: string
  resumeId: string
  jdText: string
  tone: 'professional' | 'casual' | 'enthusiastic'
  content: string
  createdAt: Date
}
