# SOP Assistant — Frontend

A React-based frontend for the Enterprise SOP (Standard Operating Procedure) AI Assistant. Allows employees to query company documents and SOPs using natural language, with an admin panel for document management.

## Features

- JWT-based authentication with role-based access (admin / user)
- AI-powered chat interface with streaming responses
- Source document references for every answer
- Department-wise SOP filtering (HR, IT, Finance, Operations)
- Admin dashboard with usage analytics
- Document upload panel (PDF, DOC, DOCX)
- Chat history with search
- Responsive sidebar layout

## Tech Stack

- **React 18** with TypeScript
- **Vite** — build tool
- **Tailwind CSS** — styling
- **shadcn/ui** — component library
- **Zustand** — state management
- **TanStack Query** — server state & caching
- **Axios** — HTTP client
- **Framer Motion** — animations
- **Recharts** — admin analytics charts

## Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:8080`

### Environment Variables

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Enterprise SOP Assistant
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/          # Axios API calls (auth, chat, documents)
├── components/
│   ├── admin/    # Dashboard stats, charts, query table
│   ├── chat/     # Message bubbles, input, source cards
│   ├── layout/   # Sidebar, protected route wrapper
│   └── ui/       # shadcn/ui base components
├── hooks/        # useAuth, useChat custom hooks
├── pages/        # LoginPage, ChatPage, AdminDashboard, UploadPage
├── store/        # Zustand stores (auth, chat)
└── utils/        # Constants, date helpers
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
