import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { statusColors } from "@/types/submission";
import { toast } from "sonner";

type StatData = {
  status: string;
  count: number;
  percentage: number;
};

type TrendData = {
  date: string;
  submitted: number;
  accepted: number;
  rejected: number;
};

type StatisticsData = {
  total: number;
  byStatus: StatData[];
  trend: TrendData[];
};

const mockStatistics: StatisticsData = {
  total: 12,
  byStatus: [
    { status: '已提交', count: 3, percentage: 25 },
    { status: '审稿中', count: 4, percentage: 33.3 },
    { status: '小修', count: 2, percentage: 16.7 },
    { status: '大修', count: 1, percentage: 8.3 },
    { status: '已接受', count: 1, percentage: 8.3 },
    { status: '已拒绝', count: 1, percentage: 8.3 }
  ],
  trend: [
    { date: '2023-01', submitted: 2, accepted: 0, rejected: 0 },
    { date: '2023-02', submitted: 3, accepted: 1, rejected: 0 },
    { date: '2023-03', submitted: 4, accepted: 1, rejected: 1 },
    { date: '2023-04', submitted: 3, accepted: 0, rejected: 0 }
  ]
};

const COLORS = {
  '已提交': '#94a3b8',
  '审稿中': '#60a5fa',
  '小修': '#fbbf24',
  '大修': '#fb923c',
  '已接受': '#4ade80',
  '已拒绝': '#f87171'
};

export default function Statistics() {
  const [timeRange, setTimeRange] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string[]>([]);

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    toast.success(`时间范围已更新: ${range === 'all' ? '全部时间' : range}`);
  };

  const handleLegendClick = (status: string) => {
    setActiveStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  const filteredData = mockStatistics.byStatus.filter(
    item => activeStatus.length === 0 || activeStatus.includes(item.status)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-6">数据统计</h1>
        
        {/* 时间筛选 */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-[#2C3E50] mb-3">时间范围</h3>
          <div className="flex flex-wrap gap-2">
            {['all', '2023-01', '2023-02', '2023-03', '2023-04'].map(range => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                className={`px-3 py-1 rounded-full text-sm ${
                  timeRange === range 
                    ? 'bg-[#3498DB] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {range === 'all' ? '全部时间' : range}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 饼图区域 */}
          <div className="lg:w-2/3 bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-[#2C3E50] mb-4">投稿状态分布</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {filteredData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[entry.status as keyof typeof COLORS]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value}篇`, 
                      name
                    ]}
                  />
                  <Legend 
                    onClick={(data) => handleLegendClick(data.value)} 
                    wrapperStyle={{ bottom: -10 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 统计数据区域 */}
          <div className="lg:w-1/3 bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-[#2C3E50] mb-4">关键数据</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-500">总投稿数</p>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {mockStatistics.total}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-[#2C3E50]">按状态统计</p>
                {mockStatistics.byStatus.map((stat) => (
                  <div key={stat.status} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[stat.status as keyof typeof COLORS] }}
                      />
                      <span>{stat.status}</span>
                    </div>
                    <span className="font-medium">
                      {stat.count} ({stat.percentage}%)
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <p className="text-sm font-medium text-[#2C3E50] mb-2">近期趋势</p>
                <div className="space-y-2">
                  {mockStatistics.trend.slice(0, 3).map((trend) => (
                    <div key={trend.date} className="text-sm">
                      <p className="font-medium">{trend.date}</p>
                      <div className="flex justify-between text-gray-500">
                        <span>投稿: {trend.submitted}</span>
                        <span>接受: {trend.accepted}</span>
                        <span>拒绝: {trend.rejected}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}