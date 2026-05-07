import MinimalWhiteTemplate from './MinimalWhiteTemplate';
import FloralPastelTemplate from './FloralPastelTemplate';
import LuxuryGoldTemplate from './LuxuryGoldTemplate';
import TraditionalRedTemplate from './TraditionalRedTemplate';
import ModernPhotoStoryTemplate from './ModernPhotoStoryTemplate';
import GreenRusticTemplate from './GreenRusticTemplate';
import LuxuryTraditionalRedTemplate from './LuxuryTraditionalRedTemplate';
import PhoenixRedTemplate from './PhoenixRedTemplate';
import EmeraldModernTemplate from './EmeraldModernTemplate';

const TemplateRenderer = ({ componentName, weddingData }) => {
  const templates = {
    MinimalWhiteTemplate: MinimalWhiteTemplate,
    FloralPastelTemplate: FloralPastelTemplate,
    LuxuryGoldTemplate: LuxuryGoldTemplate,
    TraditionalRedTemplate: TraditionalRedTemplate,
    ModernPhotoStoryTemplate: ModernPhotoStoryTemplate,
    GreenRusticTemplate: GreenRusticTemplate,
    LuxuryTraditionalRedTemplate: LuxuryTraditionalRedTemplate,
    PhoenixRedTemplate: PhoenixRedTemplate,
    EmeraldModernTemplate: EmeraldModernTemplate,
  };

  const TemplateComponent = templates[componentName];

  if (!TemplateComponent) {
    return <div className="p-8 text-center text-red-500">Template "{componentName}" không tồn tại.</div>;
  }

  return <TemplateComponent weddingData={weddingData} />;
};

export default TemplateRenderer;
