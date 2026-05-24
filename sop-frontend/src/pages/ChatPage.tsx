import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import EmptyState from '@/components/ui/EmptyState';
import { useChat } from '@/hooks/useChat';

const ChatPage = () => {
  const { messages, isLoading, sendMessage, currentDepartment } = useChat();

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-14 border-b border-border flex items-center justify-between px-4"
        >
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
              {currentDepartment}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Bot className="w-3.5 h-3.5" />
            Powered by AI
          </div>
        </motion.header>

        {/* Messages or Empty */}
        {messages.length === 0 && !isLoading ? (
          <EmptyState onExampleClick={sendMessage} />
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}

        {/* Input */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPage;
