import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <span className="logo-text">GreenSummers</span>
        </div>
        <div className="nav-links desktop-menu">
          <a href="#home">Trang chủ</a>
          <a href="#about">Ý nghĩa</a>
          <a href="#gallery">Hình ảnh</a>
          <a href="#contact">Liên hệ</a>
        </div>
        <div className="auth-buttons desktop-menu">
          <button className="btn-text">Đăng nhập</button>
          <button className="btn-primary">Đăng ký tình nguyện viên</button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Mở Menu
        </button>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Trang chủ</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>Ý nghĩa</a>
          <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Hình ảnh</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>
          <div className="auth-buttons-mobile">
            <button className="btn-secondary">Đăng nhập</button>
            <button className="btn-primary">Đăng ký</button>
          </div>
        </div>
      )}
    </nav>
  )
}
