import { useState } from "react";
import { toast } from "sonner";

type AddSubmissionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (submission: any) => void;
  mode: 'full' | 'quick';
};

export function AddSubmissionModal({ isOpen, onClose, onAdd, mode }: AddSubmissionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    submissionId: '',
    trackingLink: '',
    status: '已提交'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.journal) {
      toast.error('标题和期刊是必填项');
      return;
    }

    const newSubmission = {
      ...formData,
      authors: formData.authors.split(',').map(a => a.trim()),
      statusHistory: [{
        status: formData.status,
        date: new Date().toISOString().split('T')[0]
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: Math.random().toString(36).substring(2, 9)
    };

    onAdd(newSubmission);
    onClose();
    setFormData({
      title: '',
      authors: '',
      journal: '',
      submissionId: '',
      trackingLink: '',
      status: '已提交'
    });
    toast.success('投稿添加成功');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{mode === 'full' ? '添加投稿' : '快速添加'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">论文标题*</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            {mode === 'full' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">作者(逗号分隔)</label>
                  <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) => setFormData({...formData, authors: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">投稿编号</label>
                  <input
                    type="text"
                    value={formData.submissionId}
                    onChange={(e) => setFormData({...formData, submissionId: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">追踪链接</label>
                  <input
                    type="text"
                    value={formData.trackingLink}
                    onChange={(e) => setFormData({...formData, trackingLink: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">期刊*</label>
              <input
                type="text"
                value={formData.journal}
                onChange={(e) => setFormData({...formData, journal: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3498DB] hover:bg-blue-700"
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
