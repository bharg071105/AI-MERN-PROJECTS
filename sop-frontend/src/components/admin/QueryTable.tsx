import { Search } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '@/utils/formatDate';

interface Query {
  id: string;
  question: string;
  department: string;
  user: string;
  time: string;
  status: 'answered' | 'pending' | 'failed';
}

interface QueryTableProps {
  queries: Query[];
}

const statusColors: Record<string, string> = {
  answered: 'bg-success/10 text-success',
  pending: 'bg-orange-500/10 text-orange-400',
  failed: 'bg-destructive/10 text-destructive',
};

const QueryTable = ({ queries }: QueryTableProps) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const perPage = 10;

  const filtered = queries.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase()) ||
    q.department.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recent Queries</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search queries..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9 pr-3 py-1.5 rounded-lg bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left p-3 font-medium">Question</th>
              <th className="text-left p-3 font-medium">Department</th>
              <th className="text-left p-3 font-medium">User</th>
              <th className="text-left p-3 font-medium">Time</th>
              <th className="text-left p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((q) => (
              <tr key={q.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-3 text-foreground max-w-xs truncate">{q.question}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{q.department}</span>
                </td>
                <td className="p-3 text-muted-foreground">{q.user}</td>
                <td className="p-3 text-muted-foreground">{formatDate(q.time)}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColors[q.status]}`}>
                    {q.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-3 flex items-center justify-between border-t border-border">
          <p className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1 text-xs rounded bg-muted text-muted-foreground disabled:opacity-30"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 text-xs rounded bg-muted text-muted-foreground disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryTable;
