import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-rose-50 p-4">
      <Link to="/" className="flex items-center gap-2 text-rose-500 font-bold text-2xl font-heading mb-8">
        <Heart size={32} fill="currentColor" />
        <span>LoveKnot</span>
      </Link>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <Outlet />
      </div>
      
      <div className="mt-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-rose-500 transition-colors">&larr; Quay lại trang chủ</Link>
      </div>
    </div>
  );
};

export default AuthLayout;
