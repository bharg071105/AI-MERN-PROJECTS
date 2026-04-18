import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { useToast } from '../components/ui/Toast'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage() {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (_data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 700))
      addToast('If your email exists, a password reset link has been sent.', 'success')
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Reset your password</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
            Enter your email and we will send a reset link if the account exists.
          </p>
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

              <Button type="submit" isLoading={isLoading} className="w-full">
                Send Reset Link
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                Back to Sign In
              </Link>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}
