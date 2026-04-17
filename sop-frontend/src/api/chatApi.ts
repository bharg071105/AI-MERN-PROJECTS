import api from './axios';

export const chatApi = {
  askQuestion: async (question: string, department: string) => {
    const { data } = await api.post('/chat/ask', { question, department });
    return data;
  },
  getChatHistory: async (userId: string) => {
    const { data } = await api.get(`/chat/history/${userId}`);
    return data;
  },
  deleteChatHistory: async (chatId: string) => {
    const { data } = await api.delete(`/chat/history/${chatId}`);
    return data;
  },
};
