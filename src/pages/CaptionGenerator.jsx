import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquareText,
  Shuffle,
  Copy,
  Check,
  Hash,
  Sparkles
} from 'lucide-react';
import { weeklyTemplate, dayOrder } from '../data/weeklyTemplate';
import { captionTemplates } from '../data/captionTemplates';
import { brandConfig } from '../data/brandConfig';
import './CaptionGenerator.css';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

function CaptionGenerator() {
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayName = dayNames[new Date().getDay()];

  const [selectedDay, setSelectedDay] = useState(todayName);
  const [currentCaption, setCurrentCaption] = useState(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateCaption = useCallback(() => {
    setGenerating(true);
    setCopied(false);

    // Simulate generation with delay
    setTimeout(() => {
      const captions = captionTemplates[selectedDay];
      if (captions && captions.length > 0) {
        const randomIndex = Math.floor(Math.random() * captions.length);
        setCurrentCaption(captions[randomIndex]);
      }
      setGenerating(false);
    }, 800);
  }, [selectedDay]);

  const getHashtags = () => {
    const { brand, niche, trend_pool } = brandConfig.hashtags;
    const shuffledNiche = [...niche].sort(() => Math.random() - 0.5).slice(0, 4);
    const shuffledTrend = [...trend_pool].sort(() => Math.random() - 0.5).slice(0, 3);
    return { brand, niche: shuffledNiche, trend: shuffledTrend };
  };

  const hashtags = getHashtags();

  const copyToClipboard = () => {
    if (!currentCaption) return;
    const allHashtags = [...hashtags.brand, ...hashtags.niche, ...hashtags.trend].join(' ');
    const text = `${currentCaption.caption}\n\n${allHashtags}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const dayData = weeklyTemplate[selectedDay];

  return (
    <motion.div
      className="caption-generator"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="page-header" variants={item}>
        <h1>Caption Üreteci</h1>
        <p>Günlük temaya uygun Türkçe caption ve hashtag oluştur</p>
      </motion.div>

      {/* Day Selector */}
      <motion.div className="day-selector" variants={item}>
        {dayOrder.map((day) => (
          <button
            key={day}
            className={`day-btn ${selectedDay === day ? 'day-btn-active' : ''}`}
            onClick={() => { setSelectedDay(day); setCurrentCaption(null); }}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </motion.div>

      {/* Theme Info */}
      <motion.div className="glass-card theme-info-card" variants={item}>
        <div className="theme-header">
          <MessageSquareText size={20} style={{ color: dayData?.color }} />
          <h3>{selectedDay} — {dayData?.format}</h3>
        </div>
        <p className="theme-desc">{dayData?.theme}</p>
        <div className="theme-meta">
          <span className="meta-tag">{dayData?.style}</span>
          <span className="meta-tag">{dayData?.duration_sec}sn</span>
          <span className="meta-tag">{dayData?.caption_tone}</span>
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div className="generate-area" variants={item}>
        <motion.button
          className="btn btn-primary generate-btn"
          onClick={generateCaption}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={generating}
        >
          {generating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Sparkles size={18} />
              </motion.div>
              Üretiliyor...
            </>
          ) : (
            <>
              <Shuffle size={18} />
              Caption Üret
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Generated Caption */}
      <AnimatePresence mode="wait">
        {currentCaption && (
          <motion.div
            key={currentCaption.caption}
            className="glass-card caption-result"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="caption-header">
              <span className="caption-mood-tag">{currentCaption.mood}</span>
              <motion.button
                className="btn btn-secondary copy-btn"
                onClick={copyToClipboard}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Kopyalandı!' : 'Kopyala'}
              </motion.button>
            </div>
            <p className="caption-text">{currentCaption.caption}</p>

            <div className="divider" />

            <div className="hashtag-section">
              <div className="hashtag-row">
                <span className="hashtag-label">Marka</span>
                <div className="hashtag-tags">
                  {hashtags.brand.map((h) => (
                    <span key={h} className="tag tag-brand">{h}</span>
                  ))}
                </div>
              </div>
              <div className="hashtag-row">
                <span className="hashtag-label">Niche</span>
                <div className="hashtag-tags">
                  {hashtags.niche.map((h) => (
                    <span key={h} className="tag tag-niche">{h}</span>
                  ))}
                </div>
              </div>
              <div className="hashtag-row">
                <span className="hashtag-label">Trend</span>
                <div className="hashtag-tags">
                  {hashtags.trend.map((h) => (
                    <span key={h} className="tag tag-trend">{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="copy-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            ✓ Caption ve hashtagler kopyalandı!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CaptionGenerator;
