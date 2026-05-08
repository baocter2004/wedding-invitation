import React from 'react';
import { useParams } from 'react-router-dom';
import { mockData } from '../../../api/mockData';
import TemplateRenderer from '../../weddingTemplates/components/TemplateRenderer';

const PublicWeddingPage = () => {
  const { slug } = useParams();

  // Find wedding by slug
  const wedding = mockData.weddings.find(w => w.slug === slug);

  if (!wedding) {
    return <div className="p-20 text-center text-2xl font-bold">Không tìm thấy thiệp cưới này!</div>;
  }

  // Find template used by this wedding
  const template = mockData.templates.find(t => t.id === wedding.template_id);

  if (!template) {
    return <div className="p-20 text-center text-2xl font-bold">Lỗi: Mẫu thiệp không tồn tại!</div>;
  }

  // Assemble full data
  const events = mockData.wedding_events.filter(e => e.wedding_id === wedding.id);
  const photos = mockData.wedding_photos.filter(p => p.wedding_id === wedding.id);
  const bankAccounts = mockData.wedding_bank_accounts.filter(b => b.wedding_id === wedding.id);

  const fullWeddingData = {
    ...wedding,
    events,
    photos,
    bankAccounts,
    wishes: mockData.wedding_wishes.filter(w => w.wedding_id === wedding.id),
    // Use wedding's theme config if available, otherwise fallback to template default
    theme_config_json: wedding.theme_config_json || template.default_config_json
  };

  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] flex justify-center">
      <div className="w-full max-w-7xl bg-white relative shadow-2xl min-h-screen overflow-x-hidden flex flex-col">
        <TemplateRenderer componentName={template.component_name} weddingData={fullWeddingData} />
      </div>
    </div>
  );
};

export default PublicWeddingPage;
