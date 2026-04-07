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
import ProjectForm from "./components/ProjectComponent/ProjectForm.tsx";
import ProjectList from "./components/ProjectComponent/ProjectList.tsx";
import HomeProject from "./components/ProjectComponent/HomeProject.tsx";
import ProjectDetail from "./components/ProjectComponent/ProjectDetail.tsx";
import EditProject from "./components/ProjectComponent/EditProject.tsx";

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
        {/* Trang dành cho sinh viên/người dùng chung */}
      <Route path="/" element={<HomePage />} />
        {/* Trang đăng nhập/đăng ký */}
      <Route path="/dang-ky" element={<SignUpPage />} />
      <Route path="/dang-nhap" element={<LoginPage />} />
        {/* CÁC TRANG DÀNH CHO LEADER */}
        <Route path="/leader-dashboard" element={<HomeProject />} />
        <Route path="/create-project" element={<ProjectForm />} />
        <Route path="/manage-projects" element={<ProjectList />} />
        <Route path="/view-project/:id" element={<ProjectDetail />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
    </Routes>


  );
}

export default App;
