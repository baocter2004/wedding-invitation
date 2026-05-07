import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-rose-50 text-slate-800">
      <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-rose-500 font-bold text-xl font-heading">
          <Heart size={24} fill="currentColor" />
          <span>LoveKnot</span>
        </Link>
        <nav className="flex gap-6 items-center">
          <Link to="/templates" className="hover:text-rose-500 font-medium">Mẫu Thiệp</Link>
          <Link to="/login" className="hover:text-rose-500 font-medium">Đăng Nhập</Link>
          <Link to="/register" className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full font-medium transition-colors">
            Tạo Thiệp Miễn Phí
          </Link>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white py-8 text-center text-slate-500 mt-12 border-t border-rose-100">
        <p>&copy; {new Date().getFullYear()} LoveKnot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
