import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeCover = ({ weddingData, onOpen }) => {
  const [phase, setPhase] = useState('idle'); // idle | opening | done

  // ── Extract data ───────────────────────────────────────────
  const groom =
    weddingData?.groom_short_name ||
    weddingData?.groom_full_name ||
    'Chú Rể';
  const bride =
    weddingData?.bride_short_name ||
    weddingData?.bride_full_name ||
    'Cô Dâu';
  const eventDate = weddingData?.events?.[0]?.event_time;
  const d = eventDate ? new Date(eventDate) : null;
  const dateStr = d
    ? d.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  // ── Extract accent colour from theme (light touch only) ───
  let accent = '#8B7355'; // warm gold-brown default
  try {
    const theme = JSON.parse(weddingData?.theme_config_json || '{}');
    if (theme.primaryColor) {
      // Use the theme colour but muted — only for borders/seal
      accent = theme.primaryColor;
    }
  } catch (_) {}

  // ── Initials for monogram seal ────────────────────────────
  const groomInitial = groom?.charAt(0)?.toUpperCase() || 'G';
  const brideInitial = bride?.charAt(0)?.toUpperCase() || 'B';

  // ── Lock scroll while cover visible ──────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // ── Handle open button ────────────────────────────────────
  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');

    // Keep timing in sync with framer-motion layers below
    const ANIM_MS = 1200;
    setTimeout(() => {
      document.body.style.overflow = '';
      if (onOpen) onOpen();
      setPhase('done');
    }, ANIM_MS);
  };

  // ── Palette (neutral ivory tones) ────────────────────────
  const palette = {
    // More airy / less "black card" feeling while keeping an elegant envelope vibe
    bg: '#F7F1E9',

    // Envelope layers (lighter + with clearer separation)
    envBody: '#F0E7D8',
    envFlap: '#E2D2B8',
    envSide: '#D2BFA0',
    envShadow: 'rgba(70,50,25,0.18)',

    // Invitation card
    card: '#FFFEFB',
    cardBorder: `${accent}40`,

    sealBg: '#FFFEFB',
    sealBorder: `${accent}D8`,
    sealText: accent,

    textPrimary: '#241C12',
    textSecondary: '#5E4C37',
    textMuted: '#8A7560',

    accentLine: accent,

    // CTA button
    btnBg: '#241C12',
    btnText: '#FFFEFB',
    btnHover: accent,
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="welcome-cover"
          className="welcome-cover-root"
          style={styles.root(palette.bg)}
          exit={{
            y: '-105%',
            opacity: 0,
            transition: { duration: 0.65, ease: [0.22, 0, 0.2, 1] },
          }}
        >
          {/* ── Subtle dot-grid texture ── */}
          <div style={styles.dotGrid} aria-hidden="true" />

          {/* ── Decorative ambient glow ── */}
          <div style={styles.glowTopLeft(accent)} aria-hidden="true" />
          <div style={styles.glowBottomRight(accent)} aria-hidden="true" />

          {/* ══ ENVELOPE WRAPPER ════════════════════════════════ */}
          <div style={styles.envelopeWrapper}>

            {/* ── Card peeking above the envelope ── */}
            <motion.div
              style={styles.peekCard(palette.card, palette.cardBorder)}
              initial={{ y: 0, opacity: 1 }}
              animate={
                phase === 'opening'
                  ? {
                      y: '-66px',
                      opacity: 0,
                      transition: { duration: 0.55, ease: [0.22, 0, 0.2, 1], delay: 0.05 },
                    }
                  : {}
              }
            >
              <div style={styles.peekCardInner(palette.textMuted)}>
                <span style={{ fontFamily: '"Playfair Display", "Lora", serif', fontStyle: 'italic', fontSize: '11px', letterSpacing: '0.15em', color: palette.textMuted }}>
                  Thiệp Cưới
                </span>
              </div>
            </motion.div>

            {/* ── Main envelope body ── */}
            <motion.div
              style={styles.envelopeBody(palette.envBody, palette.envShadow)}
              animate={
                phase === 'opening'
                  ? {
                      y: '18px',
                      opacity: 0,
                      transition: { duration: 0.62, ease: [0.22, 0, 0.2, 1], delay: 0.05 },
                    }
                  : {}
              }
            >
              {/* Left triangle flap */}
              <div
                style={styles.sideFlap('left', palette.envSide)}
                aria-hidden="true"
              />
              {/* Right triangle flap */}
              <div
                style={styles.sideFlap('right', palette.envSide)}
                aria-hidden="true"
              />
              {/* Bottom flap */}
              <div
                style={styles.bottomFlap(palette.envFlap)}
                aria-hidden="true"
              />

                {/* ── Inner invitation card ── */}
              <motion.div
                style={styles.innerCard(palette.card, palette.cardBorder)}
                initial={{ y: 0, opacity: 1 }}
                animate={
                  phase === 'opening'
                    ? {
                        y: -10,
                        opacity: 0.98,
                        transition: { duration: 0.45, ease: [0.22, 0, 0.2, 1], delay: 0.08 },
                      }
                    : {}
                }
              >

                {/* Top ornament line */}
                <div style={styles.ornamentLine(accent)} aria-hidden="true" />

                {/* ── Header: Trân trọng kính mời ── */}
                <p style={styles.label(palette.textMuted)}>
                  Trân trọng kính mời
                </p>

                {/* ── Monogram / Seal ── */}
                <div style={styles.seal(palette.sealBg, palette.sealBorder, accent)}>
                  <span style={styles.sealText(accent)}>
                    {groomInitial}&amp;{brideInitial}
                  </span>
                </div>

                {/* ── Names ── */}
                <h1 style={styles.names(palette.textPrimary)}>
                  <span style={styles.nameMain}>{groom}</span>
                  <span style={styles.nameSeparator(accent)}>✦</span>
                  <span style={styles.nameMain}>{bride}</span>
                </h1>

                {/* ── Divider ── */}
                <div style={styles.dividerRow(accent)} aria-hidden="true">
                  <div style={styles.dividerLine(accent)} />
                  <div style={styles.dividerDiamond(accent)} />
                  <div style={styles.dividerLine(accent)} />
                </div>

                {/* ── Date ── */}
                {dateStr && (
                  <p style={styles.date(palette.textSecondary)}>{dateStr}</p>
                )}

                {/* ── CTA Button ── */}
                <OpenButton
                  onClick={handleOpen}
                  disabled={phase === 'opening'}
                  palette={palette}
                  accent={accent}
                />

                {/* Bottom ornament line */}
                <div style={styles.ornamentLine(accent)} aria-hidden="true" />
              </motion.div>
            </motion.div>

            {/* ── Top flap (animates open) ── */}
            <motion.div
              style={styles.topFlap(palette.envFlap, palette.envShadow)}
              animate={
                phase === 'opening'
                  ? {
                      rotateX: 180,
                      transition: { duration: 0.48, ease: [0.22, 0, 0.2, 1] },
                    }
                  : { rotateX: 0 }
              }
              aria-hidden="true"
            />

            {/* ── Wax seal (on top flap) ── */}
            <motion.div
              style={styles.waxSeal(palette.sealBg, accent)}
              animate={
                phase === 'opening'
                  ? { scale: 0, opacity: 0, transition: { duration: 0.3, delay: 0.15 } }
                  : {}
              }
              aria-hidden="true"
            >
              <span style={styles.waxText(accent)}>Hỷ</span>
            </motion.div>

          </div>
          {/* ── End envelope wrapper ── */}

        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ──────────────────────────────────────────────────────────────
   Open Button sub-component
────────────────────────────────────────────────────────────── */
const OpenButton = ({ onClick, disabled, palette, accent }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // Ensure Vietnamese diacritics render reliably
        WebkitTextRendering: 'geometricPrecision',
        MozOsxFontSmoothing: 'grayscale',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '20px',
        marginBottom: '4px',
        padding: '13px 36px',
        borderRadius: '100px',
        border: `1.5px solid ${hovered ? accent : palette.btnBg}`,
        backgroundColor: hovered ? 'transparent' : palette.btnBg,
        color: hovered ? accent : palette.btnText,
        fontFamily: '"Be Vietnam Pro", "Inter", sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.06em',
        // Keep proper Vietnamese diacritics; avoid aggressive uppercase/spacing
        textTransform: 'none',
        lineHeight: '1.4',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        transition: 'all 0.28s ease',
        boxShadow: hovered
          ? `0 0 0 3px ${accent}22`
          : '0 4px 16px rgba(44,36,22,0.18)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label="Mở thiệp cưới"
    >
      {/* Envelope icon */}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="14.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1 1.5L8 7L15 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
      Mở Thiệp
    </button>
  );
};

/* ──────────────────────────────────────────────────────────────
   Style helpers (returns inline style objects)
────────────────────────────────────────────────────────────── */

const styles = {
  root: (bg) => ({
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bg,
    overflow: 'hidden',
    // Subtle linen-like texture via repeating gradient
    backgroundImage:
      'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(160,130,90,0.04) 39px, rgba(160,130,90,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(160,130,90,0.04) 39px, rgba(160,130,90,0.04) 40px)',
  }),

  dotGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle, rgba(140,110,70,0.06) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    pointerEvents: 'none',
  },

  glowTopLeft: (accent) => ({
    position: 'absolute',
    top: '-15%',
    left: '-10%',
    width: '45vw',
    height: '45vw',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)`,
    pointerEvents: 'none',
  }),

  glowBottomRight: (accent) => ({
    position: 'absolute',
    bottom: '-20%',
    right: '-10%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${accent}0E 0%, transparent 70%)`,
    pointerEvents: 'none',
  }),

  // ── Envelope wrapper — constrains and positions all layers ──
  envelopeWrapper: {
    position: 'relative',
    width: 'min(520px, 92vw)',
    // Height drives everything else
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  // ── Peek card above the envelope ──
  peekCard: (card, border) => ({
    position: 'relative',
    width: '86%',
    height: '48px',
    backgroundColor: card,
    border: `1px solid ${border}`,
    borderBottom: 'none',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 -6px 20px rgba(70,50,25,0.10)',
    zIndex: 1,
  }),

  peekCardInner: (muted) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: muted,
  }),

  // ── Envelope body ──
  envelopeBody: (bg, shadow) => ({
    position: 'relative',
    width: '100%',
    backgroundColor: bg,
    borderRadius: '4px 4px 12px 12px',
    boxShadow: `0 18px 60px ${shadow}, 0 2px 10px rgba(70,50,25,0.10)`,
    overflow: 'visible',
    zIndex: 2,
    // Inner shine + border for clearer layer separation
    outline: '1px solid rgba(110,85,55,0.22)',
    outlineOffset: '-1px',
  }),

  // ── Triangular side flap ──
  sideFlap: (side, color) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    ...(side === 'left' ? { left: 0 } : { right: 0 }),
    width: '50%',
    backgroundColor: color,
    clipPath:
      side === 'left'
        ? 'polygon(0 0, 0 100%, 100% 100%)'
        : 'polygon(100% 0, 0 100%, 100% 100%)',
    pointerEvents: 'none',
    borderRadius: side === 'left' ? '0 0 0 12px' : '0 0 12px 0',
  }),

  // ── Bottom flap ──
  bottomFlap: (color) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '52%',
    backgroundColor: color,
    clipPath: 'polygon(0 100%, 50% 0%, 100% 100%)',
    borderRadius: '0 0 12px 12px',
    pointerEvents: 'none',
    filter: 'drop-shadow(0 -2px 6px rgba(100,80,50,0.12))',
  }),

  // ── Inner invitation card ──
  innerCard: (bg, border) => ({
    position: 'relative',
    // Move up slightly so the invitation is clearly visible above envelope
    margin: '16px 18px 28px',
    backgroundColor: bg,
    border: `1.5px solid ${border}`,
    borderRadius: '8px',
    padding: 'clamp(22px, 5vw, 36px) clamp(18px, 5vw, 32px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    zIndex: 5,
    boxShadow:
      '0 10px 40px rgba(70,50,25,0.12), inset 0 0 0 1px rgba(255,255,255,0.7)',
    gap: '10px',
  }),

  ornamentLine: (accent) => ({
    width: '60%',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
    margin: '2px 0',
    flexShrink: 0,
  }),

  label: (muted) => ({
    fontFamily: '"Be Vietnam Pro", "Inter", sans-serif',
    fontSize: 'clamp(10px, 2.2vw, 11px)',
    // Tighter spacing to keep Vietnamese diacritics visually stable
    letterSpacing: '0.08em',
    textTransform: 'none',
    color: muted,
    lineHeight: 1.5,
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'visible',
  }),

  // ── Monogram seal ──
  seal: (bg, border, accent) => ({
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    backgroundColor: bg,
    border: `2px solid ${border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 12px ${accent}25, inset 0 0 0 3px ${accent}12`,
    margin: '4px 0',
    flexShrink: 0,
  }),

  sealText: (accent) => ({
    fontFamily: '"Playfair Display", "Lora", serif',
    fontSize: '15px',
    fontStyle: 'italic',
    fontWeight: 500,
    color: accent,
    letterSpacing: '0.02em',
    lineHeight: 1,
  }),

  // ── Couple names ──
  names: (textPrimary) => ({
    margin: '4px 0 2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  }),

  nameMain: {
    fontFamily: '"Playfair Display", "Lora", "Cormorant Garamond", serif',
    fontSize: 'clamp(22px, 6vw, 30px)',
    fontWeight: 400,
    color: 'inherit',
    lineHeight: 1.35,
    letterSpacing: '0.02em',
  },

  nameSeparator: (accent) => ({
    fontSize: '12px',
    color: accent,
    lineHeight: 1.6,
    opacity: 0.7,
    display: 'block',
    margin: '1px 0',
  }),

  // ── Divider with diamond ──
  dividerRow: (accent) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '55%',
    margin: '4px 0',
  }),

  dividerLine: (accent) => ({
    flex: 1,
    height: '1px',
    backgroundColor: `${accent}45`,
  }),

  dividerDiamond: (accent) => ({
    width: '5px',
    height: '5px',
    backgroundColor: accent,
    transform: 'rotate(45deg)',
    opacity: 0.7,
    flexShrink: 0,
  }),

  // ── Date text ──
  date: (color) => ({
    fontFamily: '"Be Vietnam Pro", "Inter", sans-serif',
    fontSize: 'clamp(10px, 2.5vw, 12px)',
    color,
    lineHeight: 1.8,
    letterSpacing: '0.05em',
    margin: '2px 0 0',
    textAlign: 'center',
  }),

  // ── Top flap ──
  topFlap: (color, shadow) => ({
    position: 'absolute',
    top: '48px',    // sits right below the peek card
    left: 0,
    right: 0,
    height: '48%',
    backgroundColor: color,
    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
    borderRadius: '4px 4px 0 0',
    transformOrigin: 'top center',
    transformStyle: 'preserve-3d',
    zIndex: 8,
    // stronger edge shadow + subtle sheen
    filter: `drop-shadow(0 6px 14px ${shadow})`,
    pointerEvents: 'none',
  }),

  // ── Wax seal on flap ──
  waxSeal: (bg, accent) => ({
    position: 'absolute',
    // Centre on the fold point of the top flap
    top: 'calc(44px + 34%)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: bg,
    border: `2px solid ${accent}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 14px ${accent}30, inset 0 0 0 3px ${accent}10`,
    zIndex: 9,
    pointerEvents: 'none',
  }),

  waxText: (accent) => ({
    fontFamily: '"Playfair Display", "Lora", serif',
    fontSize: '14px',
    fontStyle: 'italic',
    fontWeight: 600,
    color: accent,
    lineHeight: 1,
  }),
};

export default WelcomeCover;
