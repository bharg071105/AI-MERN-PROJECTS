import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Users, Clock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '@/components/layout/Sidebar';
import StatsCard from '@/components/admin/StatsCard';
import QueryTable from '@/components/admin/QueryTable';
import UsageChart from '@/components/admin/UsageChart';
import { documentApi } from '@/api/documentApi';
import { formatDate } from '@/utils/formatDate';

// Mock data for demo (replaced by API in production)
const mockStats = { totalQueries: 1248, totalDocs: 34, activeUsers: 89, avgResponseTime: '1.2s' };
const mockBarData = [
  { day: 'Mon', queries: 45 }, { day: 'Tue', queries: 62 }, { day: 'Wed', queries: 38 },
  { day: 'Thu', queries: 71 }, { day: 'Fri', queries: 55 }, { day: 'Sat', queries: 12 }, { day: 'Sun', queries: 8 },
];
const mockPieData = [
  { name: 'HR', value: 35 }, { name: 'IT', value: 28 }, { name: 'Finance', value: 22 }, { name: 'Operations', value: 15 },
];
const mockQueries = Array.from({ length: 25 }, (_, i) => ({
  id: String(i),
  question: ['What is the leave policy?', 'How to submit expenses?', 'VPN setup guide?', 'Onboarding process?'][i % 4],
  department: ['HR', 'Finance', 'IT', 'Operations'][i % 4],
  user: ['John D.', 'Sarah M.', 'Alex K.', 'Lisa W.'][i % 4],
  time: new Date(Date.now() - i * 3600000).toISOString(),
  status: (['answered', 'answered', 'pending', 'answered', 'failed'] as const)[i % 5],
}));

interface Document {
  id: string;
  filename: string;
  department: string;
  size: string;
  uploaded: string;
}

const AdminDashboard = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await documentApi.listDocuments();
        setDocuments(data.documents || []);
      } catch {
        // use empty list
      }
    };
    fetchDocs();
    const interval = setInterval(fetchDocs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteDoc = async (docId: string) => {
    try {
      await documentApi.deleteDocument(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      toast.success('Document deleted');
    } catch {
      toast.error('Failed to delete document');
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-foreground"
        >
          Admin Dashboard
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Queries" value={mockStats.totalQueries} icon={MessageSquare} color="blue" />
          <StatsCard title="Total Documents" value={mockStats.totalDocs} icon={FileText} color="green" />
          <StatsCard title="Active Users" value={mockStats.activeUsers} icon={Users} color="purple" />
          <StatsCard title="Avg Response Time" value={mockStats.avgResponseTime} icon={Clock} color="orange" />
        </div>

        {/* Charts */}
        <UsageChart barData={mockBarData} pieData={mockPieData} />

        {/* Queries Table */}
        <QueryTable queries={mockQueries} />

        {/* Documents Table */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Uploaded Documents</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">Filename</th>
                  <th className="text-left p-3 font-medium">Department</th>
                  <th className="text-left p-3 font-medium">Size</th>
                  <th className="text-left p-3 font-medium">Uploaded</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-3 text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      {doc.filename}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{doc.department}</span>
                    </td>
                    <td className="p-3 text-muted-foreground">{doc.size}</td>
                    <td className="p-3 text-muted-foreground">{formatDate(doc.uploaded)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No documents uploaded yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
