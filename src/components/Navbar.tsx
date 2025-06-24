import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-[#2C3E50] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">学术论文投稿管理系统</div>
        <div className="flex space-x-6">
          <Link to="/submissions" className="hover:text-blue-300 transition-colors">
            <i className="fa-solid fa-file-lines mr-2"></i>投稿管理
          </Link>
          <Link to="/statistics" className="hover:text-blue-300 transition-colors">
            <i className="fa-solid fa-chart-pie mr-2"></i>数据统计
          </Link>
        </div>
      </div>
    </nav>
  );
}
