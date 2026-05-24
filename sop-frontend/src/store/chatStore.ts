import { create } from 'zustand';

export interface Source {
  filename: string;
  department: string;
  page: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Source[];
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

interface ChatState {
  messages: Message[];
  chatHistory: ChatSession[];
  currentChatId: string | null;
  currentDepartment: string;
  isLoading: boolean;
  searchQuery: string;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setDepartment: (dept: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
  setChatHistory: (history: ChatSession[]) => void;
  setCurrentChatId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  startNewChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  chatHistory: [],
  currentChatId: null,
  currentDepartment: 'All',
  isLoading: false,
  searchQuery: '',
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setDepartment: (currentDepartment) => set({ currentDepartment }),
  setLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [] }),
  setChatHistory: (chatHistory) => set({ chatHistory }),
  setCurrentChatId: (currentChatId) => set({ currentChatId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  startNewChat: () => set({ messages: [], currentChatId: null }),
}));
