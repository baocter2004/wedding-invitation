/**
 * Central Wedding Assets Registry
 * All image URLs and custom-generated asset paths used across templates.
 * Update this file to change visuals globally.
 */

// ─── Custom Generated Assets (from /public/assets/wedding/) ──────────────────
export const ASSETS = {
  // Botanical / Green
  emeraldDivider: '/assets/wedding/emerald_divider.png',
  greenLeavesCorner: '/templates/green_rustic/leaves_corner.png',

  // Floral / Romantic
  floralBanner: '/assets/wedding/floral_banner.png',

  // Luxury / Gold
  goldOrnament: '/assets/wedding/gold_ornament.png',
  goldFrame: '/templates/luxury_red/frame.png',

  // Phoenix / Traditional
  phoenix: '/templates/phoenix_red/phoenix.png',
};

// ─── Stock Photography (Unsplash — categorised) ──────────────────────────────
export const STOCK = {
  // Wedding couples
  couple1: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
  couple2: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop',
  couple3: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',

  // Portraits
  bride1: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
  groom1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',

  // Gallery fillers
  gallery1: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1544833058-e70f9ca2bdc5?q=80&w=1974&auto=format&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
  gallery5: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop',
  gallery6: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
};

// ─── Default fallback gallery (used when weddingData.photos is empty) ─────────
export const DEFAULT_GALLERY = [
  { id: 'f1', image_path: STOCK.gallery1, caption: 'Khoảnh khắc yêu thương' },
  { id: 'f2', image_path: STOCK.gallery2, caption: 'Ngày hạnh phúc' },
  { id: 'f3', image_path: STOCK.gallery3, caption: 'Bó hoa cưới' },
  { id: 'f4', image_path: STOCK.gallery4, caption: 'Nụ cười rạng ngời' },
  { id: 'f5', image_path: STOCK.gallery5, caption: 'Pre-wedding' },
  { id: 'f6', image_path: STOCK.gallery6, caption: 'Chú rể' },
];
