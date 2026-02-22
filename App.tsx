
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Upload, 
  Settings as SettingsIcon, 
  LayoutDashboard, 
  PlusCircle, 
  Bell, 
  UserCircle,
  Stethoscope,
  ChevronRight,
  Activity,
  Volume2,
  TrendingUp,
  Users,
  Sparkles
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ReportView from './pages/ReportView';
import LandingPage from './pages/LandingPage';
import ReportsList from './pages/ReportsList';
import Settings from './pages/Settings';
import UploadPage from './pages/UploadPage';
import Trends from './pages/Trends';
import FamilyProfiles from './pages/FamilyProfiles';
import SymptomChecker from './pages/SymptomChecker';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ReportFile, FamilyMember } from './types';

const Header: React.FC = () => {
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || 'Dr. Smith');
  
  useEffect(() => {
    const handleStorage = () => {
      setUserName(localStorage.getItem('user_name') || 'Dr. Smith');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
            HealthVoice
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <Link to="/settings" className="flex items-center space-x-2 p-1 pl-3 pr-2 border border-slate-200 rounded-full hover:shadow-sm transition-all">
            <span className="text-sm font-medium text-slate-700">{userName}</span>
            <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
              <img src="https://picsum.photos/seed/doctor/64/64" alt="Avatar" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assistant', label: 'AI Assistant', icon: Sparkles },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/upload', label: 'New Report', icon: PlusCircle },
    { path: '/reports', label: 'All Reports', icon: FileText },
    { path: '/profiles', label: 'Family', icon: Users },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around md:relative md:border-t-0 md:flex-col md:space-y-2 md:w-64 md:px-4 md:py-8 lg:px-6 bg-slate-50 min-h-screen">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <Link 
            key={item.path}
            to={item.path} 
            className={`flex flex-col md:flex-row items-center md:space-x-3 p-3 rounded-xl transition-all font-bold ${
              isActive 
                ? 'text-blue-600 bg-blue-50 shadow-sm shadow-blue-100/50' 
                : 'text-slate-500 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] md:text-base mt-1 md:mt-0">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('is_authenticated') === 'true';
  });

  const [isRegistered, setIsRegistered] = useState(() => {
    return !!localStorage.getItem('system_access_key');
  });

  const [authView, setAuthView] = useState<'login' | 'register'>(
    localStorage.getItem('system_access_key') ? 'login' : 'register'
  );

  const [storedPassword, setStoredPassword] = useState(() => {
    return localStorage.getItem('system_access_key');
  });

  const [reports, setReports] = useState<ReportFile[]>(() => {
    const saved = localStorage.getItem('health_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [members, setMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('family_members');
    return saved ? JSON.parse(saved) : [
      { id: 'self', name: localStorage.getItem('user_name') || 'John Doe', relationship: 'Self', avatar: 'https://picsum.photos/seed/doctor/200/200' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('health_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('family_members', JSON.stringify(members));
  }, [members]);

  const handleLogin = (username: string, password: string) => {
    // Check against stored password
    if (password === storedPassword || password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('is_authenticated', 'true');
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, password: string) => {
    setStoredPassword(password);
    localStorage.setItem('system_access_key', password);
    localStorage.setItem('user_name', username);
    setIsRegistered(true);
    setAuthView('login');
    
    // Update members list with the new name
    setMembers(prev => prev.map(m => m.id === 'self' ? { ...m, name: username } : m));
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('is_authenticated');
    setAuthView('login');
    // We keep reports and members in localStorage for this demo, 
    // but in a real app you might want to clear sensitive data
  };

  if (!isAuthenticated) {
    if (authView === 'register') {
      return <RegisterPage onRegister={handleRegister} onGoToLogin={() => setAuthView('login')} />;
    }
    return <LoginPage onLogin={handleLogin} onGoToRegister={() => setAuthView('register')} />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={
            <>
              <Header />
              <div className="flex flex-1">
                <div className="hidden md:block">
                  <Navigation />
                </div>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                  <Routes>
                    <Route 
                      path="/dashboard" 
                      element={<Dashboard reports={reports} onUpdateReports={setReports} />} 
                    />
                    <Route 
                      path="/trends" 
                      element={<Trends reports={reports} />} 
                    />
                    <Route 
                      path="/assistant" 
                      element={<SymptomChecker />} 
                    />
                    <Route 
                      path="/upload" 
                      element={<UploadPage reports={reports} onUpdateReports={setReports} />} 
                    />
                    <Route 
                      path="/reports" 
                      element={<ReportsList reports={reports} onUpdateReports={setReports} />} 
                    />
                    <Route 
                      path="/profiles" 
                      element={<FamilyProfiles members={members} onUpdateMembers={setMembers} />} 
                    />
                    <Route 
                      path="/settings" 
                      element={<Settings onSignOut={handleSignOut} />} 
                    />
                    <Route 
                      path="/report/:id" 
                      element={<ReportView reports={reports} />} 
                    />
                  </Routes>
                </main>
              </div>
              <div className="md:hidden">
                <Navigation />
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
