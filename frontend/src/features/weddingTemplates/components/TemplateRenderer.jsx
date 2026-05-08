import { useState } from 'react';
import MinimalWhiteTemplate from './MinimalWhiteTemplate';
import TraditionalRedTemplate from './TraditionalRedTemplate';
import EmeraldModernTemplate from './EmeraldModernTemplate';
import WelcomeCover from '../shared/WelcomeCover';

const TEMPLATES = {
  'modern': MinimalWhiteTemplate,
  'traditional': TraditionalRedTemplate,
  'emerald': EmeraldModernTemplate,
};

const TemplateRenderer = ({ componentName, weddingData }) => {
  const [coverOpen, setCoverOpen] = useState(false);

  // Map incoming template ID to the simplified registry
  const templateId = TEMPLATES[componentName] ? componentName : 'modern';
  const TemplateComponent = TEMPLATES[templateId];

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
