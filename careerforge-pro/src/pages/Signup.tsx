import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/ui/Toast'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const onSubmit = async (data: SignupFormData) => {
    try {
      setStatusMessage(null)
      setIsLoading(true)
      await signup(data.name, data.email, data.password)
      setStatusMessage({ type: 'success', text: 'Account created successfully! Redirecting you now.' })
      addToast('Account created successfully!', 'success')
      navigate('/dashboard')
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Failed to create account. Please try again.' })
      addToast('Failed to create account. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen app-surface flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-slate-900 dark:text-slate-100 tracking-tight">CareerForge</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Create your account</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Start building your professional resume with AI-enhanced suggestions, ATS-friendly formatting, and polished templates.</p>
        </div>

        <Card>
          <CardBody className="p-8">
            {statusMessage && (
              <div
                className={`rounded-xl border px-4 py-3 mb-5 text-sm ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
                role="alert"
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="text-xs text-slate-600 dark:text-slate-400">
                By signing up, you agree to our{' '}
                <a href="#" className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-400">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-400">Privacy Policy</a>
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}
