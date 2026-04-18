
import { User, Bell, Lock } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/ui/Toast'

export function SettingsPage() {
  const { user } = useAuth()
  const { addToast } = useToast()

  const handleSave = () => {
    addToast('Settings saved successfully!', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage your account preferences and settings</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Full Name"
              defaultValue={user?.name || ''}
              placeholder="John Doe"
            />
            <Input
              label="Email"
              type="email"
              defaultValue={user?.email || ''}
              placeholder="john@example.com"
            />
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardBody>
      </Card>

      {/* Notifications */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Email notifications', desc: 'Receive updates about your resume' },
              { label: 'Job alerts', desc: 'Get notified about matching jobs' },
              { label: 'ATS score updates', desc: 'Weekly resume optimization tips' },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/70 rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{setting.label}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Security */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Security</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
            />
            <Button onClick={handleSave}>Update Password</Button>
          </div>
        </CardBody>
      </Card>

    </div>
  )
}
