import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import Mukjizat from './pages/Mukjizat';
import Santo from './pages/Santo';
import Tentang from './pages/Tentang';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Beranda />} />
                <Route path="/beranda" element={<Beranda />} />
                <Route path="/mukjizat" element={<Mukjizat />} />
                <Route path="/santo" element={<Santo />} />
                <Route path="/tentang" element={<Tentang />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;


