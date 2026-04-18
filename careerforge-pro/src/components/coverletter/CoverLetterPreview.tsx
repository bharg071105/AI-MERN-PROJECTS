import { Card, CardBody } from '../ui/Card'
import { Button } from '../ui/Button'
import { Copy, Check } from 'lucide-react'
import { Textarea } from '../ui/Textarea'

interface CoverLetterPreviewProps {
  value: string
  onCopy: () => void
  copied: boolean
}

export function CoverLetterPreview({ value, onCopy, copied }: CoverLetterPreviewProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Generated Cover Letter</h3>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <Textarea value={value} readOnly rows={20} className="font-mono text-sm" />
      </CardBody>
    </Card>
  )
}
