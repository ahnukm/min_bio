import { useState } from "react";
import { Submission, statusColors } from "@/types/submission";
import { ChevronDown, ChevronRight } from "lucide-react";

type SubmissionTableProps = { 
  submissions: Submission[];
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete?: (id: string) => void;
};

export function SubmissionTable({ 
  submissions,
  onStatusChange,
  onDelete
}: SubmissionTableProps) {

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key as keyof Submission] < b[sortConfig.key as keyof Submission]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof Submission] > b[sortConfig.key as keyof Submission]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" 
                onClick={() => requestSort('title')}>
              论文标题 {sortConfig?.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('journal')}>
              期刊 {sortConfig?.key === 'journal' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('submissionId')}>
              投稿编号 {sortConfig?.key === 'submissionId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              状态
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              删除
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedSubmissions.map((submission) => (
            <>
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button onClick={() => setExpandedRow(expandedRow === submission.id ? null : submission.id)}>
                      {expandedRow === submission.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    <div className="ml-2">
                      <div className="text-sm font-medium text-gray-900">{submission.title}</div>
                      <div className="text-sm text-gray-500">{submission.authors.join(', ')}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {submission.journal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {submission.submissionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[submission.status]}`}>
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href={submission.trackingLink} target="_blank" rel="noopener noreferrer" className="text-[#3498DB] hover:underline">
                    追踪
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => onDelete && onDelete(submission.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
              {expandedRow === submission.id && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 bg-gray-50">
                    <div className="pl-8">
                      <h4 className="font-medium mb-2">状态历史</h4>
                      <ul className="space-y-2">
                        {submission.statusHistory.map((history, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{history.date}:</span> {history.status}
                            {history.notes && <div className="text-gray-500 mt-1">{history.notes}</div>}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <select
                          value={submission.status}
                          onChange={(e) => onStatusChange(submission.id, e.target.value)}
                          className="border rounded p-1 text-sm"
                        >
                          {Object.keys(statusColors).map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
