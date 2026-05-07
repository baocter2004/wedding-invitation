/**
 * ============================================================
 *  WEDDING INVITATION — Central Image & Asset Registry
 *  src/assets/images/index.js
 *
 *  Tất cả ảnh/asset dùng trong templates được quản lý tại đây.
 *  Khi backend ready, chỉ cần thay URL tương ứng từ API response.
 * ============================================================
 */

// Pre-selected high quality placeholder photos for when backend data is empty
const DEFAULT_PHOTOS = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop', // classic wedding dress
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop', // rings
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop', // couple walking
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop', // ceremony setup
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop', // table setting
  'https://images.unsplash.com/photo-1544078754-0a811fa15c32?q=80&w=1974&auto=format&fit=crop', // cake
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop', // dancing
  'https://images.unsplash.com/photo-1482575832494-771174eb1b74?q=80&w=2070&auto=format&fit=crop', // sunset couple
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070&auto=format&fit=crop', // flowers
];

const FALLBACK_COVER = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop'; // Elegant couple hugging

export const PORTRAITS = {
  groom: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', // Handsome groom
  bride: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop', // Beautiful bride
};

// ─── Gallery fallback (khi wedding chưa upload ảnh) ──────────
export const GALLERY_FALLBACK = DEFAULT_PHOTOS.map((url, i) => ({
  id: `g${i + 1}`,
  image_path: url,
  caption: 'Khoảnh khắc yêu thương',
  sort_order: i + 1,
}));

// ─── Custom-generated decorative assets ──────────────────────
export const DECORATIVE = {
  greenLeaves: '/assets/images/leaves_corner.png',
  redFrame: '/assets/images/frame.png',
  phoenix: '/assets/images/phoenix.png',
  emeraldDivider: '/assets/images/emerald_divider.png',
  floralBanner: '/assets/images/floral_banner.png',
  goldOrnament: '/assets/images/gold_ornament.png',
};

// ─── Helpers ─────────────────────────────────────────────────
/** Trả về gallery thực hoặc fallback nếu rỗng */
export const resolveGallery = (photos) =>
  Array.isArray(photos) && photos.length > 0 ? photos : GALLERY_FALLBACK;

/** Trả về ảnh bìa hoặc fallback couple ảnh */
export const resolveCover = (path) =>
  path || FALLBACK_COVER;

/** Format ngày theo vi-VN */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
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

// Re-export legacy aliases to not break old imports
export const DEFAULT_GALLERY = GALLERY_FALLBACK;
export const STOCK = PORTRAITS;
export const ASSETS = DECORATIVE;
