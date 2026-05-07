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
  MinimalWhiteTemplate,
  FloralPastelTemplate,
  LuxuryGoldTemplate,
  TraditionalRedTemplate,
  ModernPhotoStoryTemplate,
  GreenRusticTemplate,
  LuxuryTraditionalRedTemplate,
  PhoenixRedTemplate,
  EmeraldModernTemplate,
};

const TemplateRenderer = ({ componentName, weddingData }) => {
  const [coverOpen, setCoverOpen] = useState(false);

  const TemplateComponent = TEMPLATES[componentName];

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
          templateId={componentName}
          onOpen={() => setCoverOpen(true)}
        />
      )}

      {/* Actual invitation template — always rendered below the cover */}
      <TemplateComponent weddingData={weddingData} />
    </>
  );
};

export default TemplateRenderer;
