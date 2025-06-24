export interface StatusHistoryItem {
  status: string;
  date: string;
  notes?: string;
}

export interface Submission {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  submissionId: string;
  trackingLink: string;
  status: string;
  statusHistory: StatusHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

export const statusColors: Record<string, string> = {
  '已提交': 'bg-gray-200 text-gray-800',
  '审稿中': 'bg-blue-200 text-blue-800',
  '小修': 'bg-yellow-200 text-yellow-800',
  '大修': 'bg-orange-200 text-orange-800',
  '已接受': 'bg-green-200 text-green-800',
  '已拒绝': 'bg-red-200 text-red-800',
};
