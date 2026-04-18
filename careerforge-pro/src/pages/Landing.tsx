
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { FileText, Target, Zap, Shield, Star, Check, ArrowRight } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen app-surface">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-700/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900 dark:text-slate-100 tracking-tight">CareerForge</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Pricing</a>
              <Link to="/login" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Login</Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-700/10 dark:from-sky-500/15 dark:to-blue-800/10" />
        <div className="absolute inset-0 bg-white/75 dark:bg-slate-950/65 backdrop-blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative z-10 rounded-[2rem] bg-white/95 dark:bg-slate-950/95 border border-slate-200/70 dark:border-slate-700/70 shadow-2xl shadow-slate-900/10 p-8 sm:p-10 lg:p-12">
                <Badge className="mb-6" variant="info">
                  <Star className="w-3 h-3 mr-1" />
                  Trusted by 50,000+ job seekers
                </Badge>

                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-950 dark:text-white leading-[1.02] md:leading-[1.03] tracking-tight mb-6 drop-shadow-[0_4px_20px_rgba(15,23,42,0.12)]">
                  Land your dream job with an{' '}
                  <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                    ATS-proof resume
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl leading-8">
                  Build polished resumes that pass Applicant Tracking Systems, generate tailored cover letters, and match you with the best jobs fast.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
                  <Link to="/signup" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-900 border border-slate-950 shadow-xl"
                    >
                      Start Building Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <a href="#features" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto !border-0 m-0 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                      See How It Works
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="rounded-[2rem] bg-white/90 dark:bg-slate-950/95 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl shadow-slate-900/10 p-8">
                <div className="grid gap-6">
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-primary-500 to-purple-600 p-6 text-white shadow-xl shadow-purple-900/30">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/80">Resume overview</p>
                        <h2 className="text-2xl font-semibold text-white mt-3">Professional template</h2>
                      </div>
                      <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-white/95">
                      <p>• Clean and contemporary design</p>
                      <p>• ATS-optimized formatting</p>
                      <p>• Multiple color options</p>
                      <p>• Easy to customize</p>
                    </div>
                  </div>
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-primary-500 to-purple-600 p-6 text-white">
                    <p className="text-sm uppercase tracking-[0.26em] font-medium">AI resume assist</p>
                    <h3 className="mt-4 text-3xl font-semibold">Tailored suggestions</h3>
                    <p className="mt-3 text-white">Instant feedback for keywords, structure, and ATS fit.</p>
                    <ul className="mt-4 space-y-1 text-sm text-white/80">
                      <li>• Keyword optimization</li>
                      <li>• Format improvements</li>
                      <li>• ATS score analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/70 dark:bg-slate-950/55 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Powerful tools to create, optimize, and track your job applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'ATS Score Analysis',
                description: 'Get instant feedback on how well your resume matches job descriptions.',
              },
              {
                icon: Zap,
                title: 'AI-Powered Rewrites',
                description: 'Transform weak bullet points into impactful achievements with AI.',
              },
              {
                icon: Shield,
                title: 'Keyword Optimization',
                description: 'Automatically highlight relevant keywords from job descriptions.',
              },
              {
                icon: FileText,
                title: 'Professional Templates',
                description: 'Choose from modern, classic, and minimal resume templates.',
              },
              {
                icon: Star,
                title: 'Cover Letters',
                description: 'Generate tailored cover letters that complement your resume.',
              },
              {
                icon: Check,
                title: 'Job Matcher',
                description: 'Find jobs that match your skills and experience perfectly.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardBody className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/25">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-100/65 dark:bg-slate-900/35 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Start free, upgrade when you're ready
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Free</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Perfect for getting started</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900 dark:text-slate-100">$0</span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    '1 Resume',
                    'Basic templates',
                    'ATS score check',
                    'PDF export',
                    'Email support',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </CardBody>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-primary-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="default" className="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
                  Most Popular
                </Badge>
              </div>
              
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Pro</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">For serious job seekers</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900 dark:text-slate-100">$19</span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    'Unlimited resumes',
                    'All premium templates',
                    'Advanced ATS analysis',
                    'AI-powered rewrites',
                    'Cover letter generator',
                    'Job matcher',
                    'Priority support',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-500 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup">
                  <Button variant="outline" className="w-full mt-6">Start Free Trial</Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/80 dark:bg-slate-950/45 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Join thousands of professionals who've accelerated their career with CareerForge
          </p>
          <Link to="/signup">
            <Button
              variant="primary"
              size="lg"
              className="w-full text-white shadow-xl"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2 text-white" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl">CareerForge</span>
              </div>
              <p className="text-slate-400 text-sm">
                Build ATS-proof resumes and land your dream job.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 CareerForge Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
