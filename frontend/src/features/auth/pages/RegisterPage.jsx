import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // Mock register redirect
    navigate('/customer/dashboard');
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">Đăng Ký</h1>
        <p className="text-slate-500">Bắt đầu tạo thiệp cưới của riêng bạn</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User size={18} />
            </div>
            <input
              type="text"
              {...register('name', { required: 'Họ tên là bắt buộc' })}
              className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all`}
              placeholder="Nguyễn Văn A"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone size={18} />
            </div>
            <input
              type="tel"
              {...register('phone', { required: 'Số điện thoại là bắt buộc' })}
              className={`block w-full pl-10 pr-3 py-2.5 border ${errors.phone ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all`}
              placeholder="0987654321"
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail size={18} />
            </div>
            <input
              type="email"
              {...register('email', { required: 'Email là bắt buộc' })}
              className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all`}
              placeholder="nhapemail@vidu.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input
              type="password"
              {...register('password', { required: 'Mật khẩu là bắt buộc' })}
              className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-rose-500/30 mt-6"
        >
          Đăng Ký
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-medium text-rose-500 hover:text-rose-600">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
