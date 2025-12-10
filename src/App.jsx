import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/Layout/BottomNav';
import Home from './components/Features/Home/Home';
import Fasting from './components/Features/Fasting/Fasting';
import Prayer from './components/Features/Prayer/Prayer';
import Bible from './components/Features/Bible/Bible';
import Profile from './components/Features/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="app-container">

        {/* Main Content Area */}
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fasting" element={<Fasting />} />
            <Route path="/prayer" element={<Prayer />} />
            <Route path="/bible" element={<Bible />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Navigation */}
        <BottomNav />

      </div>
    </Router>
  );
}

export default App;
