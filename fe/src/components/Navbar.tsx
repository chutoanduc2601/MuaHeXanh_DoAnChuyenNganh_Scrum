import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure styles are applied

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ fullname: string } | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Helper để lấy chữ cái đầu của tên
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    // Lấy chữ cái đầu của từ cuối cùng (tên)
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">GreenSummers</span>
        </Link>
        <div className="nav-links desktop-menu">
          <a href="#home">Trang chủ</a>
          <a href="#about">Ý nghĩa</a>
          <a href="#gallery">Hình ảnh</a>
          <a href="#contact">Liên hệ</a>
        </div>
        <div className="auth-buttons desktop-menu">
          {user ? (
            <div className="user-profile-menu" style={{ position: 'relative' }}>
              <div 
                className="user-avatar" 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: '#4ade80', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', cursor: 'pointer', fontSize: '18px'
                }}
              >
                {getInitials(user.fullname)}
              </div>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="profile-dropdown" style={{
                  position: 'absolute', top: '50px', right: '0',
                  backgroundColor: 'white', padding: '10px',
                  borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  minWidth: '150px', zIndex: 1000
                }}>
                  <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>
                    {user.fullname}
                  </p>
                  <Link 
                    to="/profile" 
                    className="dropdown-item" 
                    style={{ display: 'block', padding: '8px 0', color: '#16a34a', textDecoration: 'none' }}
                  >
                    Hồ sơ của tôi
                  </Link>
                  <div style={{ height: '1px', backgroundColor: '#eee', margin: '5px 0' }}></div>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      color: '#ef4444', textAlign: 'left', padding: '8px 0',
                      cursor: 'pointer', fontSize: '16px'
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/dang-nhap" className="btn-text">Đăng nhập</Link>
              <Link to="/dang-ky" className="btn-primary">Đăng ký tình nguyện viên</Link>
            </>
          )}
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
          
          <div className="auth-buttons-mobile" style={{ marginTop: '15px' }}>
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{
                      width: '35px', height: '35px', borderRadius: '50%',
                      backgroundColor: '#4ade80', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {getInitials(user.fullname)}
                   </div>
                   <span style={{ fontWeight: 'bold' }}>{user.fullname}</span>
                </div>
                <Link to="/profile" className="btn-secondary" onClick={() => setIsMenuOpen(false)}>Hồ sơ của tôi</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn-primary" style={{ backgroundColor: '#ef4444' }}>
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link to="/dang-nhap" className="btn-secondary" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                <Link to="/dang-ky" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
