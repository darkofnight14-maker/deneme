import { motion } from 'framer-motion';
import {
  Palette,
  Hash,
  Clock,
  Target,
  Image,
  Type,
  Eye,
  Users,
  Sparkles
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';
import './BrandSettings.css';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const colorMap = {
  'pastel grey': '#9CA3AF',
  'muted blue': '#5B7DB1',
  'subtle ochre': '#C4A35A'
};

function BrandSettings() {
  return (
    <motion.div
      className="brand-settings"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="page-header" variants={item}>
        <h1>Marka Ayarları</h1>
        <p>Rivora marka kimliği ve konfigürasyon detayları</p>
      </motion.div>

      {/* Brand Identity */}
      <motion.div className="glass-card brand-identity-card" variants={item}>
        <div className="brand-id-header">
          <div className="brand-id-logo">
            <Sparkles size={32} />
          </div>
          <div>
            <h2>{brandConfig.brand_name}</h2>
            <p className="brand-vibe">{brandConfig.vibe}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid-2 settings-grid">
        {/* Color Palette */}
        <motion.div className="glass-card" variants={item}>
          <div className="setting-header">
            <Palette size={20} />
            <h3>Renk Paleti</h3>
          </div>
          <div className="color-list">
            {brandConfig.color_palette.map((color) => (
              <div key={color} className="color-item">
                <div
                  className="color-swatch"
                  style={{ background: colorMap[color] || '#666' }}
                />
                <div className="color-info">
                  <span className="color-name">{color}</span>
                  <span className="color-hex">{colorMap[color] || '#666'}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Typography */}
        <motion.div className="glass-card" variants={item}>
          <div className="setting-header">
            <Type size={20} />
            <h3>Tipografi</h3>
          </div>
          <p className="setting-value">{brandConfig.typography}</p>
          <div className="typo-preview">
            <span className="typo-outfit">Outfit — Başlıklar</span>
            <span className="typo-inter">Inter — Gövde Metni</span>
          </div>
        </motion.div>

        {/* Target Audience */}
        <motion.div className="glass-card" variants={item}>
          <div className="setting-header">
            <Users size={20} />
            <h3>Hedef Kitle</h3>
          </div>
          <p className="setting-value">{brandConfig.target_audience}</p>
        </motion.div>

        {/* Video Format */}
        <motion.div className="glass-card" variants={item}>
          <div className="setting-header">
            <Target size={20} />
            <h3>Video Format</h3>
          </div>
          <div className="format-preview">
            <div className="format-box">
              <span>{brandConfig.video_format}</span>
            </div>
            <p>Dikey format (Reels/Shorts)</p>
          </div>
        </motion.div>

        {/* Posting Hours */}
        <motion.div className="glass-card" variants={item}>
          <div className="setting-header">
            <Clock size={20} />
            <h3>Yayın Saatleri</h3>
          </div>
          <div className="posting-hours">
            {brandConfig.posting_hours.map((hour) => (
              <div key={hour} className="hour-badge">
                <Clock size={14} />
                <span>{hour}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Logo Overlay */}
        <motion.div className="glass-card" variants={item}>
          <div className="setting-header">
            <Image size={20} />
            <h3>Logo Overlay</h3>
          </div>
          <div className="overlay-settings">
            <div className="overlay-item">
              <Eye size={14} />
              <span>Opaklık</span>
              <strong>{Math.round(brandConfig.logo_overlay.opacity * 100)}%</strong>
            </div>
            <div className="overlay-item">
              <Target size={14} />
              <span>Pozisyon</span>
              <strong>{brandConfig.logo_overlay.position}</strong>
            </div>
            <div className="overlay-item">
              <Image size={14} />
              <span>Boyut oranı</span>
              <strong>{Math.round(brandConfig.logo_overlay.size_ratio * 100)}%</strong>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hashtags Full Section */}
      <motion.div className="glass-card hashtags-full" variants={item}>
        <div className="setting-header">
          <Hash size={20} />
          <h3>Hashtag Setleri</h3>
        </div>

        <div className="hashtag-group">
          <h4>Marka Hashtag'leri</h4>
          <div className="hashtag-tags-list">
            {brandConfig.hashtags.brand.map((h) => (
              <span key={h} className="tag tag-brand">{h}</span>
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="hashtag-group">
          <h4>Niche Hashtag'leri</h4>
          <div className="hashtag-tags-list">
            {brandConfig.hashtags.niche.map((h) => (
              <span key={h} className="tag tag-niche">{h}</span>
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="hashtag-group">
          <h4>Trend Havuzu</h4>
          <div className="hashtag-tags-list">
            {brandConfig.hashtags.trend_pool.map((h) => (
              <span key={h} className="tag tag-trend">{h}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default BrandSettings;
