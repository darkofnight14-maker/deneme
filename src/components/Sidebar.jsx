import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquareText,
  Clock,
  CheckSquare,
  Settings,
  Sparkles
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/calendar', icon: CalendarDays, label: 'Haftalık Takvim' },
  { to: '/captions', icon: MessageSquareText, label: 'Caption Üreteci' },
  { to: '/scheduler', icon: Clock, label: 'Yayın Zamanlayıcı' },
  { to: '/checklist', icon: CheckSquare, label: 'Kontrol Listesi' },
  { to: '/settings', icon: Settings, label: 'Marka Ayarları' },
];

function Sidebar() {
  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Sparkles size={24} />
        </div>
        <div className="brand-text">
          <h1>Rivora</h1>
          <span>Content Studio</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    className="nav-active-bg"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <div className="status-dot" />
          <span>Sistem Aktif</span>
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
