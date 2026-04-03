import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import SignUpPage from './components/SignUpPage';
import './App.css';
import './assets/css/LoginPage.css'
import LoginPage from './pages/LoginPage';

function HomePage() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dang-ky" element={<SignUpPage />} />
      <Route path="/dang-nhap" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
