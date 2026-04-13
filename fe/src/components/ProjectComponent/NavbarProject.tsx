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
          <Link to="/leader-dashboard" className="navbar-logo">
            <span className="logo-text">GreenSummers</span>
          </Link>
          {/* Navigation links */}
          <div className="nav-links desktop-menu">
            <Link to="/leader-dashboard">Trang chủ</Link>

            {/* THÊM LINK LEADER DASHBOARD Ở ĐÂY */}
            {user && (
                <Link to="/manage-projects" style={{ fontWeight: '600', }}>
                  Quản lý dự án
                </Link>

            )}
            <Link to="/create-project" style={{ fontWeight: '600',  }}>
              Tạo dự án mới
            </Link>
          </div>

          {/* Auth section */}
          <div className="auth-buttons desktop-menu" style={{ position: 'relative' }}>
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

            {user && (
                <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}>
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

                        <Link
                            to="/leader-dashboard"
                            onClick={() => setShowDropdown(false)}
                            style={{
                              display: 'block',
                              padding: '11px 16px',
                              color: '#1f2937',
                              fontSize: '14px',
                              textDecoration: 'none',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Bảng điều khiển
                        </Link>

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
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Hồ sơ của tôi
                        </Link>

                        <div style={{ height: '1px', backgroundColor: '#f3f4f6' }} />

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
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>

              {/* THÊM LINK MOBILE Ở ĐÂY */}
              {user && (
                  <Link to="/leader-dashboard" onClick={() => setIsMenuOpen(false)}>
                    Quản lý dự án
                  </Link>
              )}

              <a href="#about" onClick={() => setIsMenuOpen(false)}>Ý nghĩa</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Hình ảnh</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>

              {/* ... (phần auth mobile giữ nguyên như file cũ) ... */}
            </div>
        )}
      </nav>
  );
}