import api from '../lib/api'
import type { ResumeData, JDAnalysis, ATSScore, CoverLetter } from '../types'

export const resumeService = {
  async getAll(): Promise<ResumeData[]> {
    const response = await api.get('/resume')
    return response.data
  },

  async getById(id: string): Promise<ResumeData> {
    const response = await api.get(`/resume/${id}`)
    return response.data
  },

  async create(data: Partial<ResumeData>): Promise<ResumeData> {
    const response = await api.post('/resume', data)
    return response.data
  },

  async update(id: string, data: Partial<ResumeData>): Promise<ResumeData> {
    const response = await api.put(`/resume/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/resume/${id}`)
  },
}

export const jdService = {
  async analyze(jdText: string): Promise<JDAnalysis> {
    const response = await api.post('/jd/analyze', { jdText })
    return response.data
  },
}

export const atsService = {
  async score(resumeId: string, jdText?: string): Promise<ATSScore> {
    const response = await api.post('/ats/score', { resumeId, jdText })
    return response.data
  },
}

export const aiService = {
  async rewrite(text: string, context?: string): Promise<{ rewritten: string }> {
    const response = await api.post('/ai/rewrite', { text, context })
    return response.data
  },
}

export const coverLetterService = {
  async generate(resumeId: string, jdText: string, tone: string): Promise<CoverLetter> {
    const response = await api.post('/cover-letter', { resumeId, jdText, tone })
    return response.data
  },

  async getById(id: string): Promise<CoverLetter> {
    const response = await api.get(`/cover-letter/${id}`)
    return response.data
  },
}

export const templateService = {
  async getAll(): Promise<string[]> {
    const response = await api.get('/templates')
    return response.data
  },
}
