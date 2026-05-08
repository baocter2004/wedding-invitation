/**
 * Central Asset Registry (Standardized)
 */

// Placeholder photos from Unsplash
const DEFAULT_PHOTOS = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544078754-0a811fa15c32?q=80&w=1974&auto=format&fit=crop',
];

const FALLBACK_COVER = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop';

export const PORTRAITS = {
  groom: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
  bride: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
};

export const GALLERY_FALLBACK = DEFAULT_PHOTOS.map((url, i) => ({
  id: `g${i + 1}`,
  image_path: url,
  caption: 'Khoảnh khắc yêu thương',
  sort_order: i + 1,
}));

export const resolveGallery = (photos) =>
  Array.isArray(photos) && photos.length > 0 ? photos : GALLERY_FALLBACK;

export const resolveCover = (path) => path || FALLBACK_COVER;

export const formatDate = (dateStr) => {
  if (!dateStr) return { day: '--', month: '--', year: '----' };
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: String(d.getMonth() + 1).padStart(2, '0'),
    year: d.getFullYear(),
    dayName: d.toLocaleDateString('vi-VN', { weekday: 'long' }),
    full: d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: (t) => new Date(t).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
};
