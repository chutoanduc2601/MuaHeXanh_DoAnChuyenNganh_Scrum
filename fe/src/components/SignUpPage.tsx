import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LOCATIONS = [
  'Tây Nguyên (Đắk Lắk, Gia Lai, Kon Tum...)',
  'Đồng bằng sông Cửu Long (Bến Tre, Trà Vinh, Sóc Trăng...)',
  'Đông Nam Bộ (Tây Ninh, Bình Phước, Bình Dương...)',
  'Nội thành TP. Hồ Chí Minh',
];

export default function SignUpPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    university: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                  <span>Cung cấp thông tin và nguyện vọng của bạn</span>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="step-item">
                <div className="step-dot">2</div>
                <div>
                  <strong>Phỏng vấn ngắn</strong>
                  <span>Trao đổi cùng Ban Chỉ Huy về kỹ năng</span>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="step-item">
                <div className="step-dot">3</div>
                <div>
                  <strong>Lên đường cống hiến</strong>
                  <span>Xuất quân đến mặt trận được phân công</span>
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
        <div className="signup-right-inner">
          <Link to="/" className="signup-back-link">&larr; Quay về trang chủ</Link>

          {submitted ? (
            <div className="signup-success">
              <div className="success-check">✓</div>
              <h2>Đăng ký thành công!</h2>
              <p>Cảm ơn bạn <strong>{formData.fullName}</strong> đã đăng ký tham gia Mùa Hè Xanh 2026. Ban Chỉ Huy sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
              <button className="btn-primary btn-large" onClick={() => navigate('/')}>Trở về Trang chủ</button>
            </div>
          ) : (
            <>
              <div className="signup-form-header">
                <h2>Đăng ký tình nguyện viên</h2>
                <p>Vui lòng điền đầy đủ thông tin bên dưới để hoàn tất đơn đăng ký.</p>
              </div>

              <form className="signup-form-main" onSubmit={handleSubmit}>
                <div className="form-section-title">Thông tin cá nhân</div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
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
                </div>

                <div className="form-group">
                  <label htmlFor="university">Trường Đại học / Cao đẳng</label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    placeholder="Đại học Bách Khoa TP. Hồ Chí Minh"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Địa bàn công tác mong muốn</label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>-- Chọn địa bàn --</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-primary btn-submit">
                  Gửi đơn đăng ký
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
