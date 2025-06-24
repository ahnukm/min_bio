import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SubmissionTable } from "@/components/SubmissionTable";
import { AddSubmissionModal } from "@/components/AddSubmissionModal";
import { Submission, statusColors } from "@/types/submission";
import { toast } from "sonner";

const mockSubmissions: Submission[] = [
  {
    id: '1',
    title: '深度学习在医学图像分析中的应用',
    authors: ['张三', '李四'],
    journal: '医学人工智能期刊',
    submissionId: 'MEDAI-2023-001',
    trackingLink: 'https://example.com/track/1',
    status: '审稿中',
    statusHistory: [
      { status: '已提交', date: '2023-01-01' },
      { status: '审稿中', date: '2023-01-15' }
    ],
    createdAt: '2023-01-01',
    updatedAt: '2023-01-15'
  },
  {
    id: '2',
    title: '区块链技术在金融领域的应用研究',
    authors: ['王五', '赵六', '钱七'],
    journal: '金融科技前沿',
    submissionId: 'FINTECH-2023-002',
    trackingLink: 'https://example.com/track/2',
    status: '小修',
    statusHistory: [
      { status: '已提交', date: '2023-02-01' },
      { status: '审稿中', date: '2023-02-15' },
      { status: '小修', date: '2023-03-01', notes: '需要补充实验数据' }
    ],
    createdAt: '2023-02-01',
    updatedAt: '2023-03-01'
  }
];

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>(mockSubmissions);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);

  const handleFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(submissions.filter(s => s.status === filter));
    }
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
    setFilteredSubmissions(prev => prev.filter(sub => sub.id !== id));
    toast.success('投稿已删除');
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setSubmissions(prev => {
      const updated = prev.map(sub => {
        if (sub.id === id) {
          return {
            ...sub,
            status: newStatus,
            statusHistory: [
              ...sub.statusHistory,
              { status: newStatus, date: new Date().toISOString().split('T')[0] }
            ],
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return sub;
      });
      setFilteredSubmissions(updated.filter(s => 
        filteredSubmissions.some(fs => fs.id === s.id)
      ));
      return updated;
    });
    toast.success('状态更新成功');
  };

  const handleAddSubmission = (newSubmission: Submission) => {
    setSubmissions(prev => [...prev, newSubmission]);
    setFilteredSubmissions(prev => [...prev, newSubmission]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#2C3E50]">投稿管理</h1>
          <div className="space-x-3">
            <button
              onClick={() => setIsQuickModalOpen(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3498DB] hover:bg-blue-700"
            >
              快速添加
            </button>
            <button
              onClick={() => setIsFullModalOpen(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2C3E50] hover:bg-blue-900"
            >
              完整添加
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <Sidebar onFilter={handleFilter} />
          </div>
          <div className="md:w-3/4">
             <SubmissionTable 
               submissions={filteredSubmissions} 
               onStatusChange={handleStatusChange}
               onDelete={handleDeleteSubmission}
            />
          </div>
        </div>
      </div>

      <AddSubmissionModal 
        isOpen={isFullModalOpen} 
        onClose={() => setIsFullModalOpen(false)} 
        onAdd={handleAddSubmission}
        mode="full"
      />
      <AddSubmissionModal 
        isOpen={isQuickModalOpen} 
        onClose={() => setIsQuickModalOpen(false)} 
        onAdd={handleAddSubmission}
        mode="quick"
      />
    </div>
  );
}
