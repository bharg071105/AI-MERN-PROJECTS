import { motion } from 'framer-motion';
import { Plus, Search, LogOut, MessageSquare, Trash2, BarChart3, Upload, Bot } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { DEPARTMENTS } from '@/utils/constants';
import { formatDate } from '@/utils/formatDate';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const {
    chatHistory, startNewChat, currentDepartment, setDepartment,
    deleteChat, currentChatId, setCurrentChatId, searchQuery, setSearchQuery, setMessages,
  } = useChat();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredHistory = chatHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (chat: typeof chatHistory[0]) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages);
    navigate('/');
  };

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-64 h-screen flex flex-col bg-sidebar border-r border-sidebar-border flex-shrink-0"
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">SOP Assistant</span>
        </div>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { startNewChat(); navigate('/'); }}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </motion.button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2">
        {filteredHistory.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => handleSelectChat(chat)}
            className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer mb-0.5 text-sm ${
              currentChatId === chat.id ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="truncate">{chat.title}</p>
              <p className="text-xs text-muted-foreground">{formatDate(chat.date)}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 text-destructive transition-opacity"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Department Filter */}
      <div className="px-3 py-3 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Department</p>
        <div className="flex flex-wrap gap-1.5">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartment(dept)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                currentDepartment === dept
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Nav Links */}
      {user?.role === 'admin' && (
        <div className="px-3 py-2 border-t border-sidebar-border">
          <button
            onClick={() => navigate('/admin')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              location.pathname === '/admin' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => navigate('/admin/upload')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              location.pathname === '/admin/upload' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            <Upload className="w-4 h-4" /> Upload Docs
          </button>
        </div>
      )}

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
