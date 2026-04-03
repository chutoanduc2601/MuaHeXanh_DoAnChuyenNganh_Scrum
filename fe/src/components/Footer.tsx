

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="navbar-logo">
            <span className="logo-text">GreenSummers</span>
          </div>
          <p>Cổng thông tin chuyên biệt hỗ trợ tiếp nhận đơn từ các sinh viên có nguyện vọng tham gia Mùa Hè Xanh. Kết nối sức trẻ - chung tay vì cộng đồng.</p>
        </div>
        <div className="footer-col">
          <h4>Thông tin</h4>
          <a href="#about">Ý nghĩa hành trình</a>
          <a href="#gallery">Thư viện ảnh</a>
          <a href="#">Tiến độ tuyển quân</a>
        </div>
        <div className="footer-col">
          <h4>Hỗ trợ</h4>
          <a href="#">Quy định bắt buộc</a>
          <a href="#contact">Liên hệ Ban Chỉ Huy</a>
          <a href="#">Hướng dẫn nộp đơn</a>
        </div>
        <div className="footer-col">
          <h4>Kết nối</h4>
          <div className="social-links">
            <a href="#">Fanpage Chiến dịch</a>
            <a href="#">Kênh Youtube Hội</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Ban Chỉ Huy Mùa Hè Xanh. All rights reserved.</p>
      </div>
    </footer>
  )
}
