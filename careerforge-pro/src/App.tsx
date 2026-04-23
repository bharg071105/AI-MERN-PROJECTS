import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/ui/Toast'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { LandingPage } from './pages/Landing'
import { LoginPage } from './pages/Login'
import { SignupPage } from './pages/Signup'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { DashboardPage } from './pages/Dashboard'
import { ResumeBuilderPage } from './pages/ResumeBuilder'
import { JobMatcherPage } from './pages/JobMatcher'
import { ATSPage } from './pages/ATS'
import { CoverLetterPage } from './pages/CoverLetter'
import { TemplatesPage } from './pages/Templates'
import { BillingPage } from './pages/Billing'
import { SettingsPage } from './pages/Settings'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="resume" element={<ResumeBuilderPage />} />
        <Route path="resume/:id" element={<ResumeBuilderPage />} />
        <Route path="resume/new" element={<ResumeBuilderPage />} />
        <Route path="jobs" element={<JobMatcherPage />} />
        <Route path="ats" element={<ATSPage />} />
        <Route path="cover-letter" element={<CoverLetterPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <ResumeProvider>
              <AppRoutes />
            </ResumeProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
