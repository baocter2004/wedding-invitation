import React from 'react';
import { useParams } from 'react-router-dom';
import { mockData } from '../../../api/mockData';
import TemplateRenderer from '../../weddingTemplates/components/TemplateRenderer';

const TemplatePreviewPage = () => {
  const { code } = useParams();

  // Find the template by code
  const template = mockData.templates.find(t => t.code === code);

  if (!template) {
    return <div className="p-20 text-center text-2xl font-bold">Không tìm thấy mẫu thiệp này!</div>;
  }

  // Use a dummy wedding data for preview
  const previewData = mockData.weddings[0];
  const previewEvents = mockData.wedding_events.filter(e => e.wedding_id === previewData.id);
  const previewPhotos = mockData.wedding_photos.filter(p => p.wedding_id === previewData.id);
  const previewBankAccounts = mockData.wedding_bank_accounts.filter(b => b.wedding_id === previewData.id);

  const fullWeddingData = {
    ...previewData,
    events: previewEvents,
    photos: previewPhotos,
    bankAccounts: previewBankAccounts,
    theme_config_json: template.default_config_json // Use template's default colors/fonts
  };

  return (
    <div className="w-full relative">
      <TemplateRenderer componentName={template.component_name} weddingData={fullWeddingData} />

      {/* Floating Action Button for preview mode */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0 z-[100] flex items-center gap-4 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full shadow-2xl border border-slate-700">
        <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline-block">Đang xem: <strong className="text-rose-400">{template.name}</strong></span>
        <button className="bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-full transition-all hover:scale-105 shadow-lg whitespace-nowrap">
          Dùng Mẫu Này
        </button>
      </div>
    </div>
  );
};

export default TemplatePreviewPage;
