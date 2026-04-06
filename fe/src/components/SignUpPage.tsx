import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const [formData, setFormData] = useState({
    fullname: '',
    dob: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    school: '',
    skill: '',
    note: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (formData.password !== formData.confirmPassword) {
      setApiError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullname: formData.fullname,
        dob: formData.dob,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        studentId: formData.studentId,
        school: formData.school,
        skill: formData.skill,
        note: formData.note,
      };

      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const msg = await response.text();
        setApiError(msg || 'Đăng ký thất bại, vui lòng thử lại!');
      }
    } catch {
      setApiError('Không kết nối được với server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Left panel */}
      <div className="signup-left-panel">
        <div className="signup-left-inner">
          <Link to="/" className="logo signup-logo">GreenSummers</Link>
          <div className="signup-left-content">
            <h1>Chiến dịch<br />Mùa Hè Xanh<br />2026</h1>
            <p>Gia nhập đội ngũ tình nguyện viên, mang sức trẻ và tri thức đến những vùng đất cần sự đóng góp của bạn.</p>

            <div className="signup-steps">
              <div className="step-item">
                <div className="step-dot">1</div>
                <div>
                  <strong>Điền đơn đăng ký</strong>
                  <span>Cung cấp thông tin đầy đủ để Ban Chỉ Huy nắm bắt năng lực của bạn</span>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="step-item">
                <div className="step-dot">2</div>
                <div>
                  <strong>Phỏng vấn ngắn</strong>
                  <span>Trao đổi cùng Ban Chỉ Huy về kỹ năng chuyên môn</span>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="step-item">
                <div className="step-dot">3</div>
                <div>
                  <strong>Lên đường cống hiến</strong>
                  <span>Xuất quân đến mặt trận theo nguyện vọng và năng lực</span>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1593113565694-c6c87e671d1e?auto=format&fit=crop&q=80&w=600"
            alt="Tình nguyện viên"
            className="signup-left-image"
          />
        </div>
      </div>

      {/* Right panel - form */}
      <div className="signup-right-panel">
        <div className="signup-right-inner" style={{ maxWidth: '600px' }}>
          <Link to="/" className="signup-back-link">&larr; Quay về trang chủ</Link>

          {submitted ? (
            <div className="signup-success">
              <div className="success-check">✓</div>
              <h2>Đăng ký thành công!</h2>
              <p>Cảm ơn bạn <strong>{formData.fullname}</strong> đã đăng ký tham gia Mùa Hè Xanh 2026. Ban Chỉ Huy sẽ liên hệ với bạn qua email <strong>{formData.email}</strong> trong thời gian sớm nhất.</p>
              <button className="btn-primary btn-large" onClick={() => navigate('/')}>Trở về Trang chủ</button>
            </div>
          ) : (
            <>
              <div className="signup-form-header">
                <h2>Đăng ký tình nguyện viên</h2>
                <p>Mẫu đơn thu thập đầy đủ thông tin để phân bổ đội hình phù hợp.</p>
              </div>

              <form className="signup-form-main" onSubmit={handleSubmit}>
                {/* -------- Thông tin cá nhân -------- */}
                <div className="form-section-title">Thông tin cá nhân &amp; Liên hệ</div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullname">Họ và tên</label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Ngày tháng năm sinh</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email liên hệ</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="0912345678"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="studentId">Mã số sinh viên</label>
                    <input
                      type="text"
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      required
                      placeholder="20261234"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="school">Trường ĐH / Cao đẳng</label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                      placeholder="Đại học Bách Khoa"
                    />
                  </div>
                </div>

                {/* -------- Tài khoản -------- */}
                <div className="form-section-title" style={{ marginTop: '1.5rem' }}>Tạo tài khoản</div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Tối thiểu 6 ký tự"
                      minLength={6}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Nhập lại mật khẩu"
                      minLength={6}
                    />
                  </div>
                </div>

                {/* -------- Năng lực & Nguyện vọng -------- */}
                <div className="form-section-title" style={{ marginTop: '1.5rem' }}>Năng lực &amp; Nguyện vọng</div>

                <div className="form-group">
                  <label htmlFor="skill">Thế mạnh / Kỹ năng nổi bật</label>
                  <input
                    type="text"
                    id="skill"
                    name="skill"
                    value={formData.skill}
                    onChange={handleChange}
                    placeholder="Văn nghệ, thiết kế, xây dựng, nhiếp ảnh, MC..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="note">Địa bàn công tác mong muốn (hoặc yêu cầu đặc biệt)</label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Ghi rõ mặt trận bạn muốn tham gia (VD: Tây Nguyên, Miền Tây...) hoặc lưu ý riêng"
                    rows={4}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                {apiError && (
                  <p style={{ color: 'red', marginTop: '0.75rem', fontWeight: 500 }}>{apiError}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary btn-submit"
                  style={{ marginTop: '1.5rem' }}
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Xác nhận đăng ký'}
                </button>

                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                  Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập ngay</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
