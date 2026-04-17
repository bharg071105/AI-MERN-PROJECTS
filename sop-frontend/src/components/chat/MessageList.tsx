import { useRef, useEffect } from 'react';
import { Message } from '@/store/chatStore';
import MessageBubble from './MessageBubble';
import Loader from '../ui/Loader';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && <Loader />}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
