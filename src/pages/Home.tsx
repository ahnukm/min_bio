import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2C3E50] mb-6">学术论文投稿管理系统</h1>
          <p className="text-lg text-gray-600 mb-8">高效管理您的学术论文投稿全流程</p>
          <Link
            to="/submissions"
            className="inline-block px-6 py-3 bg-[#3498DB] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始管理投稿
          </Link>
        </div>
      </div>
    </div>
  );
}