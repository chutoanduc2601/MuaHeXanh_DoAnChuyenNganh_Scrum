import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ fullname: string; email?: string } | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">GreenSummers</span>
        </Link>

        {/* Navigation links — vị trí KHÔNG thay đổi */}
        <div className="nav-links desktop-menu">
          <a href="#home">Trang chủ</a>
          <a href="#about">Ý nghĩa</a>
          <a href="#gallery">Hình ảnh</a>
          <a href="#contact">Liên hệ</a>
        </div>

        {/* Auth section — luôn chiếm cùng một khoảng không gian */}
        <div className="auth-buttons desktop-menu" style={{ position: 'relative' }}>
          {/*
            Hai nút này luôn được render để giữ nguyên khoảng không gian.
            - Khi CHƯA đăng nhập: hiển thị bình thường
            - Khi ĐÃ đăng nhập: ẩn bằng visibility:hidden (vẫn chiếm không gian)
            → Nav links không bao giờ bị xê dịch
          */}
          <Link
            to="/dang-nhap"
            className="btn-text"
            style={user ? { visibility: 'hidden', pointerEvents: 'none' } : {}}
          >
            Đăng nhập
          </Link>
          <Link
            to="/dang-ky"
            className="btn-primary"
            style={user ? { visibility: 'hidden', pointerEvents: 'none' } : {}}
          >
            Đăng ký tình nguyện viên
          </Link>

          {/* User pill — chỉ hiện khi đã đăng nhập, đặt absolute trên nền 2 nút */}
          {user && (
            <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}>
              {/* Trigger */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 14px 6px 6px',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #d1fae5',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  whiteSpace: 'nowrap',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px',
                  flexShrink: 0,
                }}>
                  {getInitials(user.fullname)}
                </div>
                <span>{user.fullname}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  minWidth: '210px',
                  zIndex: 1000,
                  overflow: 'hidden',
                }}>
                  {/* Header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
                    <p style={{ margin: 0, fontWeight: '700', color: '#111827', fontSize: '14px' }}>
                      {user.fullname}
                    </p>
                    {user.email && (
                      <p style={{ margin: '2px 0 0', color: '#6b7280', fontSize: '12px' }}>
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* Profile link */}
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    style={{
                      display: 'block',
                      padding: '11px 16px',
                      color: '#059669',
                      fontWeight: '500',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    Hồ sơ của tôi
                  </Link>

                  {/* Divider */}
                  <div style={{ height: '1px', backgroundColor: '#f3f4f6' }} />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '11px 16px',
                      color: '#dc2626',
                      fontWeight: '500',
                      fontSize: '14px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fff7f7')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Trang chủ</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>Ý nghĩa</a>
          <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Hình ảnh</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>

          <div className="auth-buttons-mobile" style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {user ? (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '10px',
                  border: '1px solid #d1fae5',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: '#10b981', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', fontSize: '16px', flexShrink: 0,
                  }}>
                    {getInitials(user.fullname)}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#111827', fontSize: '15px' }}>
                      {user.fullname}
                    </p>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '12px' }}>
                      Sinh viên tình nguyện
                    </p>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block', textAlign: 'center', padding: '11px',
                    backgroundColor: '#e0f2fe', color: '#0369a1',
                    fontWeight: '600', borderRadius: '10px', textDecoration: 'none',
                    fontSize: '15px',
                  }}
                >
                  Hồ sơ của tôi
                </Link>

                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  style={{
                    padding: '11px', borderRadius: '10px',
                    backgroundColor: '#fee2e2', color: '#b91c1c',
                    border: 'none', fontWeight: '600', cursor: 'pointer',
                    width: '100%', fontSize: '15px', fontFamily: 'inherit',
                  }}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/dang-nhap"
                  className="btn-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/dang-ky"
                  className="btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
