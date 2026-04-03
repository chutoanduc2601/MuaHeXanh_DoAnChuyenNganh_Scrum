import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    studentId: '',
    email: '',
    phone: '',
    university: '',
    health: 'Bình thường',
    skills: '',
    experience: 'Chưa từng tham gia',
    locationNote: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
              <p>Cảm ơn bạn <strong>{formData.fullName}</strong> đã đăng ký tham gia Mùa Hè Xanh 2026. Ban Chỉ Huy sẽ liên hệ với bạn qua email <strong>{formData.email}</strong> trong thời gian sớm nhất.</p>
              <button className="btn-primary btn-large" onClick={() => navigate('/')}>Trở về Trang chủ</button>
            </div>
          ) : (
            <>
              <div className="signup-form-header">
                <h2>Đăng ký tình nguyện viên</h2>
                <p>Mẫu đơn thu thập đầy đủ thông tin để phân bổ đội hình phù hợp.</p>
              </div>

              <form className="signup-form-main" onSubmit={handleSubmit}>
                <div className="form-section-title">Thông tin cá nhân & Liên hệ</div>

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
                    <label htmlFor="university">Trường ĐH / Cao đẳng</label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      required
                      placeholder="Đại học Bách Khoa"
                    />
                  </div>
                </div>

                <div className="form-section-title" style={{ marginTop: '1.5rem' }}>Năng lực & Nguyện vọng</div>

                <div className="form-group">
                  <label htmlFor="skills">Thế mạnh / Kỹ năng nổi bật</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Văn nghệ, thiết kế, xây dựng, nhiếp ảnh, MC..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="locationNote">Địa bàn công tác mong muốn (hoặc yêu cầu đặc biệt)</label>
                  <textarea
                    id="locationNote"
                    name="locationNote"
                    value={formData.locationNote}
                    onChange={handleChange}
                    required
                    placeholder="Ghi rõ mặt trận bạn muốn tham gia (VD: Tây Nguyên, Miền Tây...) hoặc lưu ý riêng (VD: Muốn vào đội hình dạy học...)"
                    rows={4}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary btn-submit" style={{ marginTop: '1.5rem' }}>
                  Xác nhận đăng ký
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
