

export default function Gallery() {
  return (
    <>
      <section id="gallery" className="gallery-section">
        <div className="section-header">
          <h2>Hình ảnh mặt trận các mùa trước</h2>
          <p>Những giọt mồ hôi, nụ cười và kỷ niệm không thể nào quên của các chiến sĩ áo xanh.</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item large">
            <img src="https://thanhnien.mediacdn.vn/Uploaded/trongnth/2022_07_08/sang-4-1505.jpg" alt="Mùa hè xanh với thiếu nhi" />
          </div>
          <div className="gallery-item">
            <img src="/src/assets/images/thanh-nien-tinh-nguyen-1-3520.jpg" alt="Cải tạo hạ tầng" />
          </div>
          <div className="gallery-item">
            <img src="/src/assets/images/thanh-nien-tinh-nguyen-2-2175.jpg" alt="Gắn kết đồng đội" />
          </div>
          <div className="gallery-item wide">
            <img src="/src/assets/images/thanh-nien-tinh-nguyen-6-2450.jpg" alt="Đội hình thanh niên tình nguyện" />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Sẵn sàng mang sức trẻ cống hiến chưa?</h2>
          <p>Hãy nhanh tay tải mẫu đơn và đăng ký để xếp vào danh sách mặt trận năm nay. Số lượng xét duyệt có giới hạn cho một số địa bàn trung tâm.</p>
          <button className="btn-primary btn-large">Mở form đăng ký</button>
        </div>
      </section>
    </>
  )
}
