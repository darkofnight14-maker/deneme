import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Square,
  RotateCcw,
  PartyPopper,
  AlertTriangle,
  Zap,
  Clock,
  Hash,
  MessageSquare,
  Film,
  Layers,
  Eye
} from 'lucide-react';
import './Checklist.css';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const checklistItems = [
  {
    id: 1,
    text: 'İlk 3-5 saniye dikkat çekici mi?',
    icon: Zap,
    category: 'İçerik',
    critical: true
  },
  {
    id: 2,
    text: 'Video süresi 15-30 saniye aralığında mı?',
    icon: Clock,
    category: 'Format'
  },
  {
    id: 3,
    text: 'Rivora logo overlay eklendi mi?',
    icon: Layers,
    category: 'Marka',
    critical: true
  },
  {
    id: 4,
    text: 'Caption 2-3 cümle, minimal mi?',
    icon: MessageSquare,
    category: 'İçerik'
  },
  {
    id: 5,
    text: '7-10 hashtag eklendi mi? (3 marka + 4-7 niche/trend)',
    icon: Hash,
    category: 'SEO'
  },
  {
    id: 6,
    text: 'Yayın saati 19:00-23:00 arasında mı?',
    icon: Clock,
    category: 'Zamanlama'
  },
  {
    id: 7,
    text: 'Story teaser planlandı mı?',
    icon: Film,
    category: 'Strateji'
  },
  {
    id: 8,
    text: 'Loop-friendly son kare mevcut mu?',
    icon: Eye,
    category: 'İçerik'
  }
];

function Checklist() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    setChecked({});
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const total = checklistItems.length;
  const progress = (checkedCount / total) * 100;
  const allDone = checkedCount === total;

  const getCategoryColor = (cat) => {
    const colors = {
      'İçerik': 'var(--accent-blue)',
      'Format': 'var(--accent-purple)',
      'Marka': 'var(--accent-ochre)',
      'SEO': 'var(--accent-teal)',
      'Zamanlama': 'var(--accent-orange)',
      'Strateji': '#22C55E'
    };
    return colors[cat] || 'var(--text-secondary)';
  };

  return (
    <motion.div
      className="checklist-page"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="page-header" variants={item}>
        <h1>Yayın Öncesi Kontrol Listesi</h1>
        <p>Her videoyu yayınlamadan önce bu kontrolleri tamamla</p>
      </motion.div>

      {/* Progress */}
      <motion.div className="glass-card progress-card" variants={item}>
        <div className="progress-header">
          <div className="progress-info">
            <h3>{checkedCount}/{total}</h3>
            <p>kontrol tamamlandı</p>
          </div>
          <button className="btn btn-secondary" onClick={resetAll}>
            <RotateCcw size={16} />
            Sıfırla
          </button>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={allDone ? {
              background: 'linear-gradient(90deg, #22C55E, #10B981)'
            } : {}}
          />
        </div>
      </motion.div>

      {/* Checklist Items */}
      <div className="checklist-items">
        {checklistItems.map((checkItem) => (
          <motion.div
            key={checkItem.id}
            className={`glass-card checklist-item ${checked[checkItem.id] ? 'item-checked' : ''} ${checkItem.critical ? 'item-critical' : ''}`}
            variants={item}
            onClick={() => toggle(checkItem.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="check-icon">
              {checked[checkItem.id] ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <CheckSquare size={22} className="checked" />
                </motion.div>
              ) : (
                <Square size={22} />
              )}
            </div>
            <div className="check-content">
              <span className={`check-text ${checked[checkItem.id] ? 'text-checked' : ''}`}>
                {checkItem.text}
              </span>
              <span
                className="check-category"
                style={{ color: getCategoryColor(checkItem.category) }}
              >
                {checkItem.category}
              </span>
            </div>
            <div className="check-item-icon" style={{ color: getCategoryColor(checkItem.category) }}>
              <checkItem.icon size={18} />
            </div>
            {checkItem.critical && !checked[checkItem.id] && (
              <AlertTriangle size={16} className="critical-icon" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Completion Celebration */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            className="glass-card celebration"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <PartyPopper size={40} className="celebration-icon" />
            <h2>Tüm kontroller tamamlandı!</h2>
            <p>İçeriğin yayınlanmaya hazır. Harika iş çıkardın! 🚀</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Checklist;
