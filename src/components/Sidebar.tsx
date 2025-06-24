import { useState } from "react";

export function Sidebar({ onFilter }: { onFilter: (filter: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    onFilter(filter);
  };

  return (
    <div className="w-64 bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-bold text-lg mb-4 text-[#2C3E50]">筛选条件</h3>
      <div className="space-y-2">
        {['all', '已提交', '审稿中', '小修', '大修', '已接受', '已拒绝'].map((status) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`w-full text-left p-2 rounded ${activeFilter === status ? 'bg-[#3498DB] text-white' : 'hover:bg-gray-100'}`}
          >
            {status === 'all' ? '全部状态' : status}
          </button>
        ))}
      </div>
    </div>
  );
}
