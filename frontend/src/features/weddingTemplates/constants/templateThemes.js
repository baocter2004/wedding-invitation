import { Sparkles, Leaf, Heart, Flower2, Star } from 'lucide-react';

export const TEMPLATE_THEMES = {
  'toi-gian-trang': {
    name: 'Tối giản Trắng',
    type: 'MINIMAL',
    primary: '#111111',
    bg: '#FFFFFF',
    font: '"Playfair Display", serif',
    icon: Heart,
    accentOpacity: 0.02
  },
  'lang-man-hoa': {
    name: 'Lãng mạn Hoa',
    type: 'FLORAL',
    primary: '#E29595',
    bg: '#FFF9F9',
    font: '"Playfair Display", serif',
    icon: Flower2,
    accentOpacity: 0.05
  },
  'hoang-gia-vang': {
    name: 'Hoàng gia Vàng',
    type: 'LUXURY',
    primary: '#D4AF37',
    bg: '#0A0A0A',
    font: '"Playfair Display", serif',
    icon: Sparkles,
    accentOpacity: 0.12
  },
  'truyen-thong-do': {
    name: 'Truyền thống Đỏ',
    type: 'TRADITIONAL',
    primary: '#991B1B',
    bg: '#FFF9F0',
    font: '"Playfair Display", serif',
    icon: Heart,
    accentOpacity: 0.05
  },
  'phim-anh-hien-dai': {
    name: 'Phim ảnh Hiện đại',
    type: 'MODERN',
    primary: '#2D3436',
    bg: '#F5F6FA',
    font: '"Playfair Display", serif',
    icon: Star,
    accentOpacity: 0.05
  },
  'moc-mac-xanh': {
    name: 'Mộc mạc Xanh',
    type: 'RUSTIC',
    primary: '#2D4F1E',
    bg: '#FDFCF8',
    font: '"Playfair Display", serif',
    icon: Leaf,
    accentOpacity: 0.08
  },
  'sang-trong-truyen-thong': {
    name: 'Sang trọng Truyền thống',
    type: 'LUXURY_RED',
    primary: '#800000',
    bg: '#1A0000',
    font: '"Playfair Display", serif',
    icon: Sparkles,
    accentOpacity: 0.15
  },
  'phuong-hoang-lua': {
    name: 'Phượng hoàng Lửa',
    type: 'PHOENIX',
    primary: '#D42F2F',
    bg: '#0F0101',
    font: '"Playfair Display", serif',
    icon: Sparkles,
    accentOpacity: 0.2
  },
  'hien-dai-luc-bao': {
    name: 'Hiện đại Lục bảo',
    type: 'EMERALD',
    primary: '#064E3B',
    bg: '#ECFDF5',
    font: '"Playfair Display", serif',
    icon: Leaf,
    accentOpacity: 0.1
  }
};

export const getThemeByTemplateId = (templateId) => {
  return TEMPLATE_THEMES[templateId] || TEMPLATE_THEMES['toi-gian-trang'];
};
