import { FileText } from 'lucide-react';
import { Source } from '@/store/chatStore';

interface SourceCardProps {
  source: Source;
}

const SourceCard = ({ source }: SourceCardProps) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-xs">
      <FileText className="w-3.5 h-3.5 text-primary flex-shrink-0" />
      <span className="text-foreground font-medium truncate">{source.filename}</span>
      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">
        {source.department}
      </span>
      <span className="text-muted-foreground">p.{source.page}</span>
    </div>
  );
};

export default SourceCard;
