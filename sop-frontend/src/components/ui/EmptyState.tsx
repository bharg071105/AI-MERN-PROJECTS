import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { EXAMPLE_QUESTIONS } from '@/utils/constants';

interface EmptyStateProps {
  onExampleClick: (question: string) => void;
}

const EmptyState = ({ onExampleClick }: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex-1 flex flex-col items-center justify-center px-4"
  >
    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
      <Bot className="w-8 h-8 text-primary" />
    </div>
    <h2 className="text-xl font-semibold text-foreground mb-2">Ask anything from your company SOPs</h2>
    <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
      Get instant answers from your company's Standard Operating Procedures. Try one of the examples below.
    </p>
    <div className="flex flex-wrap justify-center gap-2">
      {EXAMPLE_QUESTIONS.map((q) => (
        <motion.button
          key={q}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onExampleClick(q)}
          className="px-4 py-2 rounded-xl bg-card border border-border text-sm text-foreground hover:border-primary/50 transition-colors"
        >
          {q}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default EmptyState;
