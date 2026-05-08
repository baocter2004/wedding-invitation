import { Sparkles, Leaf, Heart } from 'lucide-react';

export const TEMPLATE_THEMES = {
  'traditional': {
    name: 'Truyền thống',
    type: 'TRADITIONAL',
    primary: '#a82c23',
    bg: '#FFF9F0',
    font: '"Playfair Display", serif',
    icon: Sparkles,
    accentOpacity: 0.1
  },
  'modern': {
    name: 'Hiện đại',
    type: 'MODERN',
    primary: '#111111',
    bg: '#FFFFFF',
    font: '"Inter", sans-serif',
    icon: Heart,
    accentOpacity: 0.05
  },
  'emerald': {
    name: 'Thanh lịch',
    type: 'EMERALD',
    primary: '#064E3B',
    bg: '#F0FDF4',
    font: '"Playfair Display", serif',
    icon: Leaf,
    accentOpacity: 0.1
  }
};

export const getThemeByTemplateId = (templateId) => {
  return TEMPLATE_THEMES[templateId] || TEMPLATE_THEMES['modern'];
};
