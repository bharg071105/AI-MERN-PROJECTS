
import { CreditCard, Check } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'

export function BillingPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Billing & Plans</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage your subscription and billing details</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardBody className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Current Plan</h2>
              <Badge variant={user?.plan === 'pro' ? 'success' : 'default'} size="md" className="capitalize">
                {user?.plan} Plan
              </Badge>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Your Benefits</h3>
              <ul className="space-y-3">
                {[
                  user?.plan === 'pro' ? 'Unlimited resumes' : '1 resume',
                  user?.plan === 'pro' ? 'All premium templates' : 'Basic templates',
                  user?.plan === 'pro' ? 'Advanced ATS analysis' : 'Basic ATS check',
                  user?.plan === 'pro' ? 'AI-powered rewrites' : 'No AI rewrites',
                  user?.plan === 'pro' ? 'Cover letter generator' : 'No cover letters',
                  user?.plan === 'pro' ? 'Priority support' : 'Email support',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/70 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              {user?.plan === 'free' ? (
                <>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Upgrade to Pro</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Unlock all features and create unlimited resumes
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">$19</span>
                    <span className="text-slate-600 dark:text-slate-300">/month</span>
                  </div>
                  <Button className="w-full">Upgrade to Pro</Button>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Next Billing Date</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">May 8, 2026</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    You're on the Pro plan. Your next payment of $19 will be charged automatically.
                  </p>
                  <Button variant="outline" className="w-full">Cancel Subscription</Button>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Payment Method</h3>
          {user?.plan === 'pro' ? (
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/70 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">•••• •••• •••• 4242</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Expires 12/2027</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300">No payment method required for free plan</p>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
