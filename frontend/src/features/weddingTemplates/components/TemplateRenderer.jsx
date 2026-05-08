import { useState } from 'react';
import MinimalWhiteTemplate from './MinimalWhiteTemplate';
import FloralPastelTemplate from './FloralPastelTemplate';
import LuxuryGoldTemplate from './LuxuryGoldTemplate';
import TraditionalRedTemplate from './TraditionalRedTemplate';
import ModernPhotoStoryTemplate from './ModernPhotoStoryTemplate';
import GreenRusticTemplate from './GreenRusticTemplate';
import LuxuryTraditionalRedTemplate from './LuxuryTraditionalRedTemplate';
import PhoenixRedTemplate from './PhoenixRedTemplate';
import EmeraldModernTemplate from './EmeraldModernTemplate';
import WelcomeCover from '../shared/WelcomeCover';

const TEMPLATES = {
  'toi-gian-trang': MinimalWhiteTemplate,
  'lang-man-hoa': FloralPastelTemplate,
  'hoang-gia-vang': LuxuryGoldTemplate,
  'truyen-thong-do': TraditionalRedTemplate,
  'phim-anh-hien-dai': ModernPhotoStoryTemplate,
  'moc-mac-xanh': GreenRusticTemplate,
  'sang-trong-truyen-thong': LuxuryTraditionalRedTemplate,
  'phuong-hoang-lua': PhoenixRedTemplate,
  'hien-dai-luc-bao': EmeraldModernTemplate,
};

const TemplateRenderer = ({ componentName, weddingData }) => {
  const [coverOpen, setCoverOpen] = useState(false);

  // Fallback to Vietnamese slug if the componentName passed is old English identifier
  const templateSlug = TEMPLATES[componentName] ? componentName : 
    Object.keys(TEMPLATES).find(key => TEMPLATES[key].name === componentName) || componentName;

  const TemplateComponent = TEMPLATES[templateSlug];

  if (!TemplateComponent) {
    return (
      <div className="p-8 text-center" style={{ color: '#ef4444' }}>
        Template &quot;{componentName}&quot; không tồn tại.
      </div>
    );
  }

  return (
    <>
      {/* Welcome cover — shown first; disappears when user opens it */}
      {!coverOpen && (
        <WelcomeCover
          weddingData={weddingData}
          templateId={templateSlug}
          onOpen={() => setCoverOpen(true)}
        />
      )}

      {/* Actual invitation template — always rendered below the cover */}
      <div className="w-full">
        <TemplateComponent weddingData={weddingData} />
      </div>
    </>
  );
};

export default TemplateRenderer;
