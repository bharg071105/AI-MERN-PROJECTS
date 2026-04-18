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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await login(data.email, data.password)
      addToast('Login successful!', 'success')
      navigate('/dashboard')
    } catch (error) {
      addToast('Invalid email or password', 'error')
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
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-slate-900 dark:text-slate-100">CareerForge</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Welcome back</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">Sign in to your CareerForge account to save resumes, generate cover letters, and track job matches.</p>
        </div>

        <Card>
          <CardBody className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                  Sign up free
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}
