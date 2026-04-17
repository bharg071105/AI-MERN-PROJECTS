import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useChatStore, Message } from '@/store/chatStore';
import { chatApi } from '@/api/chatApi';

export const useChat = () => {
  const {
    messages, chatHistory, currentDepartment, isLoading,
    addMessage, setLoading, clearMessages, setChatHistory,
    startNewChat, setDepartment, currentChatId, setCurrentChatId, searchQuery, setSearchQuery, setMessages,
  } = useChatStore();

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);
    setLoading(true);

    try {
      const data = await chatApi.askQuestion(content, currentDepartment);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toISOString(),
        sources: data.sources || [],
      };
      addMessage(aiMessage);
    } catch (error: any) {
      toast.error('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [addMessage, setLoading, currentDepartment]);

  const loadChatHistory = useCallback(async (userId: string) => {
    try {
      const data = await chatApi.getChatHistory(userId);
      setChatHistory(data.history || []);
    } catch {
      // silently fail
    }
  }, [setChatHistory]);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      await chatApi.deleteChatHistory(chatId);
      setChatHistory(chatHistory.filter((c) => c.id !== chatId));
      if (currentChatId === chatId) startNewChat();
      toast.success('Chat deleted');
    } catch {
      toast.error('Failed to delete chat');
    }
  }, [chatHistory, currentChatId, setChatHistory, startNewChat]);

  return {
    messages, chatHistory, currentDepartment, isLoading,
    sendMessage, clearMessages, startNewChat, setDepartment,
    loadChatHistory, deleteChat, currentChatId, setCurrentChatId,
    searchQuery, setSearchQuery, setMessages,
  };
};
