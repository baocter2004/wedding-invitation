import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // Mock login redirect
    if (data.email === 'admin@example.com') {
      navigate('/admin/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">Đăng Nhập</h1>
        <p className="text-slate-500">Chào mừng bạn quay lại với LoveKnot</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail size={18} />
            </div>
            <input
              type="email"
              {...register('email', { required: 'Email là bắt buộc' })}
              className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all`}
              placeholder="nhapemail@vidu.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-rose-500">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
            <a href="#" className="text-sm font-medium text-rose-500 hover:text-rose-600">Quên mật khẩu?</a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input
              type="password"
              {...register('password', { required: 'Mật khẩu là bắt buộc' })}
              className={`block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="mt-1 text-sm text-rose-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-rose-500/30"
        >
          Đăng Nhập
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-medium text-rose-500 hover:text-rose-600">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
