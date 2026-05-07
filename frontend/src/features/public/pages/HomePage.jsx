import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Palette, Smartphone, Share2, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-white z-0"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-200/50 rounded-full blur-3xl opacity-50 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-600 font-medium text-sm mb-8 animate-bounce">
            <Sparkles size={16} />
            <span>Nền tảng tạo thiệp cưới số 1 Việt Nam</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-heading leading-tight mb-6">
            Lưu giữ khoảnh khắc <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
              Tình Yêu Vĩnh Cửu
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tự tay thiết kế thiệp cưới online tuyệt đẹp chỉ trong 5 phút. 
            Gửi lời mời trân trọng nhất đến những người thân yêu theo cách hiện đại và ấn tượng.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="px-8 py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg shadow-lg shadow-rose-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Bắt Đầu Miễn Phí
              <ArrowRight size={20} />
            </Link>
            <Link to="/templates" className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-lg border border-slate-200 shadow-sm transition-all flex items-center justify-center">
              Xem Mẫu Thiệp
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading mb-4">Tại sao chọn LoveKnot?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Trải nghiệm tuyệt vời với những tính năng được thiết kế riêng cho ngày trọng đại của bạn.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <Palette size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Giao Diện Đa Dạng</h3>
              <p className="text-slate-600">Kho giao diện khổng lồ với nhiều phong cách từ hiện đại, tối giản đến truyền thống, sang trọng.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Thân Thiện Di Động</h3>
              <p className="text-slate-600">Thiệp cưới hiển thị hoàn hảo trên mọi thiết bị, đặc biệt tối ưu trải nghiệm cho màn hình điện thoại.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <Share2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Chia Sẻ Dễ Dàng</h3>
              <p className="text-slate-600">Gửi thiệp nhanh chóng qua Zalo, Messenger, Facebook chỉ với một đường link duy nhất.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Heart className="mx-auto text-rose-500 mb-6" size={48} />
          <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
            Sẵn sàng cho ngày trọng đại?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Hãy để LoveKnot đồng hành cùng bạn tạo nên một thiệp mời hoàn hảo, ghi dấu ấn khó phai trong lòng khách mời.
          </p>
          <Link to="/register" className="inline-block px-10 py-4 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-lg shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-1">
            Tạo Thiệp Ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
