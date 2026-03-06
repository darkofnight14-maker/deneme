import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  MessageSquareText,
  Clock,
  CheckSquare,
  TrendingUp,
  Eye,
  Hash,
  Video,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';
import { weeklyTemplate, dayOrder } from '../data/weeklyTemplate';
import './Dashboard.css';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

function Dashboard() {
  const navigate = useNavigate();
  const today = new Date();
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayName = dayNames[today.getDay()];
  const todayContent = weeklyTemplate[todayName];

  const quickActions = [
    { label: 'Haftalık Takvim', icon: CalendarDays, path: '/calendar', color: 'var(--accent-blue)' },
    { label: 'Caption Üret', icon: MessageSquareText, path: '/captions', color: 'var(--accent-purple)' },
    { label: 'Yayın Zamanla', icon: Clock, path: '/scheduler', color: 'var(--accent-teal)' },
    { label: 'Kontrol Listesi', icon: CheckSquare, path: '/checklist', color: 'var(--accent-ochre)' },
  ];

  const stats = [
    { label: 'Haftalık İçerik', value: '7', icon: Video, color: 'var(--accent-blue)', glow: 'var(--accent-blue-glow)' },
    { label: 'Hashtag Seti', value: `${brandConfig.hashtags.brand.length + brandConfig.hashtags.niche.length + brandConfig.hashtags.trend_pool.length}`, icon: Hash, color: 'var(--accent-purple)', glow: 'var(--accent-purple-glow)' },
    { label: 'Yayın Saati', value: brandConfig.posting_hours.length.toString(), icon: Clock, color: 'var(--accent-teal)', glow: 'rgba(93, 173, 226, 0.3)' },
    { label: 'Hedef İzlenme', value: '%70+', icon: Eye, color: 'var(--accent-ochre)', glow: 'var(--accent-ochre-glow)' },
  ];

  return (
    <motion.div
      className="dashboard"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="page-header" variants={item}>
        <h1>Dashboard</h1>
        <p>Rivora içerik yönetim merkezine hoş geldin</p>
      </motion.div>

      {/* Today's Content Card */}
      <motion.div className="today-card glass-card" variants={item}>
        <div className="today-header">
          <div className="today-badge">
            <Sparkles size={16} />
            <span>Bugünün İçeriği</span>
          </div>
          <span className="today-day">{todayName}</span>
        </div>
        <div className="today-body">
          <div className="today-info">
            <h2>{todayContent?.theme || 'Bugün için plan yok'}</h2>
            <div className="today-meta">
              <span className="meta-tag">{todayContent?.format}</span>
              <span className="meta-tag">{todayContent?.duration_sec}sn</span>
              <span className="meta-tag">{todayContent?.style}</span>
            </div>
            <p className="today-tone">
              <strong>Caption tonu:</strong> {todayContent?.caption_tone}
            </p>
          </div>
          <button className="btn btn-accent" onClick={() => navigate('/captions')}>
            Caption Üret <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid-4 stats-grid" variants={item}>
        {stats.map((stat)=> (
          <motion.div key={stat.label} className="glass-card stat-card" variants={item}>
            <div
              className="stat-icon"
              style={{
                background: `${stat.color}15`,
                color: stat.color,
                boxShadow: `0 0 20px ${stat.glow}`
              }}
            >
              <stat.icon size={22} />
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="section-title">Hızlı Erişim</h2>
      </motion.div>
      <motion.div className="grid-4" variants={item}>
        {quickActions.map((action)=> (
          <motion.div
            key={action.label}
            className="glass-card quick-action-card"
            onClick={() => navigate(action.path)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="qa-icon" style={{ color: action.color }}>
              <action.icon size={28} />
            </div>
            <span>{action.label}</span>
            <ArrowRight size={16} className="qa-arrow" />
          </motion.div>
        ))}
      </motion.div>

      {/* Algorithm Rules */}
      <motion.div variants={item}>
        <h2 className="section-title">
          <TrendingUp size={20} /> Algoritma Kuralları
        </h2>
      </motion.div>
      <motion.div className="grid-2" variants={item}>
        {[
          { rule: 'İlk 1 saat etkileşim', target: 'Maksimum izlenme ve yorum' },
          { rule: 'Reels tam izlenme oranı', target: '%70-80 hedefi' },
          { rule: 'Video başlangıcı', target: 'İlk 3-5 sn hook içermeli' },
          { rule: 'Hashtag sayısı', target: '5-7 özgün + 2-3 trend' },
          { rule: 'Yayın saatleri', target: '19:00 – 23:00' },
          { rule: 'Video süresi', target: '10-30 sn (platforma göre)' },
        ].map((r) => (
          <div key={r.rule} className="glass-card rule-card">
            <span className="rule-name">{r.rule}</span>
            <span className="rule-target">{r.target}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
