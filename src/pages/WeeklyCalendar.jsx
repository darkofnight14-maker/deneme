import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { weeklyTemplate, dayOrder } from '../data/weeklyTemplate';
import './WeeklyCalendar.css';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

function WeeklyCalendar() {
  const today = new Date();
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayName = dayNames[today.getDay()];

  return (
    <motion.div
      className="weekly-calendar"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="page-header" variants={item}>
        <h1>Haftalık İçerik Takvimi</h1>
        <p>7 günlük içerik planını buradan takip edebilirsin</p>
      </motion.div>

      <div className="calendar-grid">
        {dayOrder.map((day) => {
          const data = weeklyTemplate[day];
          const IconComponent = Icons[data.icon] || Icons.Circle;
          const isToday = day === todayName;

          return (
            <motion.div
              key={day}
              className={`calendar-card glass-card ${isToday ? 'calendar-today' : ''}`}
              variants={item}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {isToday && <div className="today-indicator">BUGÜN</div>}
              <div className="cal-header">
                <div
                  className="cal-icon"
                  style={{
                    background: `${data.color}20`,
                    color: data.color,
                    boxShadow: `0 0 20px ${data.color}30`
                  }}
                >
                  <IconComponent size={22} />
                </div>
                <div className="cal-day">
                  <h3>{day}</h3>
                  <span className="cal-format">{data.format}</span>
                </div>
              </div>

              <div className="cal-body">
                <div className="cal-theme">
                  <span className="cal-label">Tema</span>
                  <p>{data.theme}</p>
                </div>

                <div className="cal-details">
                  <div className="cal-detail">
                    <Icons.Clock size={14} />
                    <span>{data.duration_sec}sn</span>
                  </div>
                  <div className="cal-detail">
                    <Icons.Palette size={14} />
                    <span>{data.style}</span>
                  </div>
                </div>

                <div className="cal-tone">
                  <Icons.MessageCircle size={14} />
                  <span>{data.caption_tone}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default WeeklyCalendar;
