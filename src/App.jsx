import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import Solution from './components/Solution';
import ReservationSection from './components/ReservationSection';
import ReservationCheck from './components/ReservationCheck';
import Admin from './pages/Admin';

const LandingPage = () => (
  <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-purple selection:text-white overflow-x-hidden">
    <main>
      <Hero />
      <ProblemStatement />
      <Solution />
      <ReservationSection />
      <ReservationCheck />
    </main>

    <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-4">
        <p className="mb-2">&copy; 2026 웹3사관학교. All rights reserved.</p>
        <p>본 설명회는 투자를 권유하는 것이 아니며, 웹3 교육 및 리더 양성을 목적으로 합니다.</p>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-cheonbok" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
