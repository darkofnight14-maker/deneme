import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import WeeklyCalendar from './pages/WeeklyCalendar';
import CaptionGenerator from './pages/CaptionGenerator';
import Scheduler from './pages/Scheduler';
import Checklist from './pages/Checklist';
import BrandSettings from './pages/BrandSettings';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<WeeklyCalendar />} />
            <Route path="/captions" element={<CaptionGenerator />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/settings" element={<BrandSettings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
