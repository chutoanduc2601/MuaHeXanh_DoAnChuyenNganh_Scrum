import { Link } from 'react-router-dom';

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
            <img src="https://images.unsplash.com/photo-1593113565694-c6c87e671d1e?auto=format&fit=crop&q=80&w=800" alt="Mùa hè xanh với thiếu nhi" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600" alt="Cải tạo hạ tầng" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=600" alt="Gắn kết đồng đội" />
          </div>
          <div className="gallery-item wide">
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" alt="Đội hình thanh niên tình nguyện" />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Sẵn sàng mang sức trẻ cống hiến chưa?</h2>
          <p>Hãy nhanh tay đăng ký để được xếp vào danh sách mặt trận năm nay. Số lượng xét duyệt có giới hạn cho một số địa bàn trung tâm.</p>
          <Link to="/dang-ky" className="btn-primary btn-large">Mở form đăng ký</Link>
        </div>
      </section>
    </>
  );
}
