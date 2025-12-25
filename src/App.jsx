import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomNav from './components/Layout/BottomNav';
import Home from './components/Features/Home/Home';
import Fasting from './components/Features/Fasting/Fasting';
import Prayer from './components/Features/Prayer/Prayer';
import Bible from './components/Features/Bible/Bible';
import ReadingDashboard from './components/Features/Bible/ReadingDashboard';
import VerticalBibleTimeline from './components/Features/Bible/VerticalBibleTimeline';
import Profile from './components/Features/Profile/Profile';
import PWAInstallPrompt from './components/Shared/PWAInstallPrompt';

import LandingPage from './components/Features/Onboarding/LandingPage';
import AuthPage from './components/Features/Onboarding/AuthPage';

const AppContent = () => {
  const location = useLocation();
  const isOnboarding = location.pathname === '/welcome' || location.pathname === '/auth';
  const hasVisited = localStorage.getItem('hasVisited');

  return (
    <div className="app-container" style={isOnboarding ? { maxWidth: '100%', margin: 0, border: 'none' } : {}}>
      {/* Main Content Area */}
      <div className="content-area" style={isOnboarding ? { padding: 0, paddingBottom: 0 } : {}}>
        <Routes>
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={hasVisited ? <Home /> : <Navigate to="/welcome" replace />} />
          <Route path="/fasting" element={<Fasting />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/read" element={<ReadingDashboard />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/bible-timeline" element={<VerticalBibleTimeline />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Navigation - Hide on welcome screen */}
      {!isOnboarding && <BottomNav />}
      {!isOnboarding && <PWAInstallPrompt />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
