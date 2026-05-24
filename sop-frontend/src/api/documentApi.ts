import api from './axios';

export const documentApi = {
  uploadDocument: async (file: File, department: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('department', department);
    const { data } = await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  listDocuments: async () => {
    const { data } = await api.get('/documents/list');
    return data;
  },
  deleteDocument: async (docId: string) => {
    const { data } = await api.delete(`/documents/${docId}`);
    return data;
  },
};
