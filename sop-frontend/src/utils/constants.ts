export const DEPARTMENTS = ['All', 'HR', 'IT', 'Finance', 'Operations'] as const;
export type Department = (typeof DEPARTMENTS)[number];

export const ROUTES = {
  LOGIN: '/login',
  CHAT: '/',
  ADMIN: '/admin',
  UPLOAD: '/admin/upload',
} as const;

export const EXAMPLE_QUESTIONS = [
  "What is the company's leave policy?",
  "How do I submit an expense report?",
  "What are the IT security guidelines?",
];

export const MAX_MESSAGE_LENGTH = 500;
export const ACCEPTED_FILE_TYPES = { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] };
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
