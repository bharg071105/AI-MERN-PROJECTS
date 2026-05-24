import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface UsageChartProps {
  barData: { day: string; queries: number }[];
  pieData: { name: string; value: number }[];
}

const PIE_COLORS = ['#3b82f6', '#22c55e', '#a855f7', '#f97316', '#ef4444'];

const UsageChart = ({ barData, pieData }: UsageChartProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Queries per Day</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 15% 20%)" />
            <XAxis dataKey="day" tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(240 17% 14%)', border: '1px solid hsl(240 15% 20%)', borderRadius: 8, color: '#f1f5f9' }}
            />
            <Bar dataKey="queries" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Queries by Department</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(240 17% 14%)', border: '1px solid hsl(240 15% 20%)', borderRadius: 8, color: '#f1f5f9' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;
