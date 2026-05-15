import { useState } from 'react';
import MinimalWhiteTemplate from './MinimalWhiteTemplate';
import TraditionalRedTemplate from './TraditionalRedTemplate';
import EmeraldModernTemplate from './EmeraldModernTemplate';
import FloralPastelTemplate from './FloralPastelTemplate';
import LuxuryGoldTemplate from './LuxuryGoldTemplate';
import ModernPhotoStoryTemplate from './ModernPhotoStoryTemplate';
import WelcomeCover from '../shared/WelcomeCover';

const TEMPLATES = {
  'MinimalWhiteTemplate': MinimalWhiteTemplate,
  'TraditionalRedTemplate': TraditionalRedTemplate,
  'EmeraldModernTemplate': EmeraldModernTemplate,
  'FloralPastelTemplate': FloralPastelTemplate,
  'LuxuryGoldTemplate': LuxuryGoldTemplate,
  'ModernPhotoStoryTemplate': ModernPhotoStoryTemplate,
};

const TemplateRenderer = ({ componentName, weddingData }) => {
  const [coverOpen, setCoverOpen] = useState(false);

  // Fallback to MinimalWhiteTemplate if not found
  const TemplateComponent = TEMPLATES[componentName] || MinimalWhiteTemplate;
  const templateId = componentName || 'MinimalWhiteTemplate';

  return (
    <>
      {!coverOpen && (
        <WelcomeCover
          weddingData={weddingData}
          templateId={templateId}
          onOpen={() => setCoverOpen(true)}
        />
      )}

      <div className="w-full">
        <TemplateComponent weddingData={weddingData} />
      </div>
    </>
  );
};

export default TemplateRenderer;
