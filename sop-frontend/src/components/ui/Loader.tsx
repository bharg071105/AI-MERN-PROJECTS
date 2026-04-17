import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const Loader = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3"
  >
    <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center flex-shrink-0">
      <Bot className="w-4 h-4 text-primary" />
    </div>
    <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-4 space-y-2.5 max-w-[60%]">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-dot" style={{ animationDelay: '0s' }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  </motion.div>
);

export default Loader;
