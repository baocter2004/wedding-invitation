import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import { mockData } from '../../../api/mockData';

const TemplatesPage = () => {
  const { templates } = mockData;

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-4">Mẫu Thiệp Cưới</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Khám phá bộ sưu tập giao diện độc quyền của chúng tôi. Mỗi thiết kế đều được chăm chút tỉ mỉ để tôn vinh câu chuyện tình yêu của bạn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col">
              {/* Thumbnail Area */}
              <div className="relative aspect-[4/5] bg-slate-200 overflow-hidden">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {template.thumbnail_path ? (
                  <img src={template.thumbnail_path} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 flex-col gap-4">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center opacity-20"
                      style={{ backgroundColor: template.default_config_json.primary_color }}
                    >
                      <span className="text-4xl font-heading font-bold" style={{ color: template.default_config_json.secondary_color }}>T</span>
                    </div>
                    <span className="font-medium">Chưa có ảnh xem trước</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Link to={`/templates/${template.code}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-rose-500 hover:scale-110 transition-transform tooltip" title="Xem thử">
                    <Eye size={20} />
                  </Link>
                  <Link to="/register" className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white hover:bg-rose-400 hover:scale-110 transition-transform" title="Dùng mẫu này">
                    <Plus size={20} />
                  </Link>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">{template.name}</h3>
                    <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-medium uppercase tracking-wider">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">
                    Mẫu thiệp mang phong cách {template.category}, phù hợp với các cặp đôi yêu thích sự lãng mạn.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: template.default_config_json.primary_color }}></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: template.default_config_json.secondary_color }}></div>
                  </div>
                  <span className="text-xs text-slate-400 ml-2">Màu chủ đạo</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
