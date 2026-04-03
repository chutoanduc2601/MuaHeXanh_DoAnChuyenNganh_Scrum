

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Chiến dịch Mùa Hè Xanh 2026</h1>
        <p className="hero-subtitle">
          Website chính thức ghi nhận thông tin đăng ký Mùa Hè Xanh. 
          Mùa hè này, hãy để tuổi thanh xuân rực rỡ hơn khi mang trí thức, lòng nhiệt huyết và sức trẻ đến những vùng đất mới. 
          Hãy cùng nhau xây dựng cộng đồng và để lại những dấu ấn tốt đẹp nhất!
        </p>
        <div className="hero-actions">
          <button className="btn-primary btn-large">Đăng ký tham gia ngay</button>
          <button className="btn-secondary btn-large">Thông tin chi tiết</button>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="hero-blob"></div>
        <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600&h=800" alt="Sinh viên tình nguyện Mùa Hè Xanh" className="hero-image" />
      </div>
    </section>
  )
}
