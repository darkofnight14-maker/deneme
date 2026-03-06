import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Radio,
  CalendarClock,
  Bell,
  Zap
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';
import { weeklyTemplate, dayOrder } from '../data/weeklyTemplate';
import './Scheduler.css';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

function Scheduler() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayName = dayNames[currentTime.getDay()];
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const getNextPostingTime = () => {
    for (const hour of brandConfig.posting_hours) {
      const [h, m] = hour.split(':').map(Number);
      if (h * 60 + m > currentTotalMinutes) {
        return hour;
      }
    }
    return 'Yarın ' + brandConfig.posting_hours[0];
  };

  const isPostingActive = (hour) => {
    const [h] = hour.split(':').map(Number);
    return currentHour >= h && currentHour < h + 1;
  };

  const getTimelinePosition = (hour) => {
    const [h, m] = hour.split(':').map(Number);
    const startHour = 18;
    const endHour = 24;
    const totalRange = (endHour - startHour) * 60;
    const position = ((h - startHour) * 60 + m) / totalRange;
    return Math.max(0, Math.min(1, position)) * 100;
  };

  return (
    <motion.div
      className="scheduler"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="page-header" variants={item}>
        <h1>Yayın Zamanlayıcı</h1>
        <p>İçerik yayın saatlerini takip et ve planla</p>
      </motion.div>

      {/* Live Clock */}
      <motion.div className="glass-card live-clock-card" variants={item}>
        <div className="clock-content">
          <div className="clock-icon-wrapper">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            >
              <Clock size={32} />
            </motion.div>
          </div>
          <div className="clock-info">
            <div className="clock-time">{formatTime(currentTime)}</div>
            <div className="clock-date">{formatDate(currentTime)}</div>
          </div>
          <div className="clock-next">
            <span className="next-label">Sonraki yayın</span>
            <span className="next-time">{getNextPostingTime()}</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div className="glass-card timeline-card" variants={item}>
        <h3 className="section-title">
          <CalendarClock size={20} /> Yayın Zaman Çizelgesi
        </h3>
        <div className="timeline">
          <div className="timeline-track">
            {/* Hour labels */}
            {['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map((h) => (
              <div
                key={h}
                className="timeline-hour"
                style={{ left: `${getTimelinePosition(h)}%` }}
              >
                <span>{h}</span>
              </div>
            ))}
            {/* Posting markers */}
            {brandConfig.posting_hours.map((hour) => (
              <motion.div
                key={hour}
                className={`timeline-marker ${isPostingActive(hour) ? 'marker-active' : ''}`}
                style={{ left: `${getTimelinePosition(hour)}%` }}
                whileHover={{ scale: 1.3 }}
              >
                <Bell size={16} />
                <span className="marker-label">{hour}</span>
              </motion.div>
            ))}
            {/* Current time indicator */}
            {currentTotalMinutes >= 18 * 60 && currentTotalMinutes <= 24 * 60 && (
              <motion.div
                className="timeline-current"
                style={{ left: `${getTimelinePosition(`${currentHour}:${String(currentMinute).padStart(2, '0')}`)}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="current-line" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Weekly Schedule */}
      <motion.div variants={item}>
        <h3 className="section-title">
          <Radio size={20} /> Haftalık Yayın Planı
        </h3>
      </motion.div>
      <div className="schedule-grid">
        {dayOrder.map((day) => {
          const data = weeklyTemplate[day];
          const isToday = day === todayName;

          return (
            <motion.div
              key={day}
              className={`glass-card schedule-card ${isToday ? 'schedule-today' : ''}`}
              variants={item}
              whileHover={{ y: -3 }}
            >
              <div className="sched-header">
                <h4>{day}</h4>
                {isToday && (
                  <span className="sched-today-badge">
                    <Zap size={12} /> Bugün
                  </span>
                )}
              </div>
              <p className="sched-format">{data.format}</p>
              <div className="sched-times">
                {brandConfig.posting_hours.map((hour) => (
                  <div
                    key={hour}
                    className={`sched-time ${isToday && isPostingActive(hour) ? 'sched-time-active' : ''}`}
                  >
                    <Clock size={12} />
                    <span>{hour}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Scheduler;
