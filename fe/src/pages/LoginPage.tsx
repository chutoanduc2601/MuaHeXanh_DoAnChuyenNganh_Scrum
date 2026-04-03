const LoginPage = () => {
  return (
    <>
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>
      <div className="bg-shape shape3"></div>

      <div className="app">
        {/* LOGIN PAGE  */}
        <section id="loginPage" className="login-wrap">
          <div className="lp-login-left">
            <div className="pill">CHIẾN DỊCH TÌNH NGUYỆN HÈ 2026</div>
            <h1>Mùa hè xanh</h1>
            <p>
              Nơi tuổi trẻ không chỉ đi qua mùa hè, mà còn để lại dấu ấn bằng
              những việc làm tử tế, nhiệt huyết và đầy cảm hứng cho cộng đồng.
            </p>

            <div className="info-grid">
              <div className="info-box">
                <span>Thời gian</span>
                <strong>15/06/2026 - 30/07/2026</strong>
              </div>
              <div className="info-box">
                <span>Địa điểm</span>
                <strong>Trường / Địa phương / CLB</strong>
              </div>
              <div className="info-box">
                <span>Hoạt động</span>
                <strong>Môi trường, thiếu nhi, dân sinh</strong>
              </div>
              <div className="info-box">
                <span>Slogan</span>
                <strong>Đi để cống hiến – Đi để trưởng thành</strong>
              </div>
            </div>
          </div>

          <div className="lp-login-right">
            <div className="lp-login-card">
              <div className="lp-logo">🌿</div>
              <h2>Đăng nhập</h2>
              <p className="sub">
                Chào mừng bạn đến với cổng thông tin chiến dịch{" "}
                <strong>Mùa hè xanh 2026</strong>.
              </p>

              <form id="loginForm">
                <div className="form-group">
                  <label htmlFor="username">Tên đăng nhập</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <div>
                  <p>
                    Chưa có tài khoản? <a href="#">Đăng ký ngay</a>
                  </p>
                </div>

                <button type="submit" className="login-btn">
                  Đăng nhập ngay
                </button>

                <div id="errorMsg" className="error"></div>
              </form>
            </div>
          </div>
        </section>

        {/* MAIN PAGE  */}
        <section id="mainPage" className="mp-main-page hidden">
          <div className="mp-navbar">
            <div className="mp-brand">
              <div className="mp-brand-logo">🌱</div>
              <div>
                <h3>Mùa Hè Xanh 2026</h3>
                <p>Tuổi trẻ hành động vì cộng đồng xanh</p>
              </div>
            </div>

            <div className="nav-right">
              <div className="welcome" id="welcomeText">
                Xin chào, admin
              </div>
              <button className="logout-btn" id="logoutBtn">
                Đăng xuất
              </button>
            </div>
          </div>

          <div className="mp-hero-section">
            <div className="mp-hero-card">
              <div className="pill">SẴN SÀNG CHO HÀNH TRÌNH XANH?</div>
              <h1>Mùa hè xanh 2026</h1>
              <p>
                Chung tay xây dựng cộng đồng xanh, sạch, đẹp bằng tinh thần tuổi
                trẻ, trách nhiệm và yêu thương. Mỗi hành động nhỏ hôm nay có thể
                tạo nên thay đổi lớn cho ngày mai.
              </p>

              <div className="hero-actions">
                <a href="#" className="mp-btn mp-btn-white">
                  Đăng ký tham gia
                </a>
                <a href="#" className="mp-btn mp-btn-outline">
                  Xem kế hoạch
                </a>
              </div>
            </div>

            <div className="poster-panel">
              <div className="poster-box">
                <div className="small">TUỔI TRẺ HÀNH ĐỘNG</div>
                <h2>Mùa hè xanh</h2>
                <p>
                  Góp sức trẻ vì cuộc sống cộng đồng.
                  <br />
                  Hành động xanh – Trái tim xanh – Mùa hè ý nghĩa.
                </p>

                <div className="tag-list">
                  <span className="tag">Tình nguyện</span>
                  <span className="tag">Cộng đồng</span>
                  <span className="tag">Môi trường</span>
                  <span className="tag">Tuổi trẻ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mp-content-grid">
            <div className="mp-card">
              <div className="stat">1,200+</div>
              <h3>Tình nguyện viên</h3>
              <p>Đồng hành trong các hoạt động hè xanh trên nhiều mặt trận.</p>
            </div>

            <div className="card">
              <div className="stat">25</div>
              <h3>Công trình</h3>
              <p>Những dự án thiết thực phục vụ cộng đồng và địa phương.</p>
            </div>

            <div className="card">
              <div className="stat">8</div>
              <h3>Đội hình</h3>
              <p>
                Phối hợp các mảng môi trường, giáo dục, truyền thông, hậu cần.
              </p>
            </div>

            <div className="card">
              <div className="stat">100%</div>
              <h3>Nhiệt huyết</h3>
              <p>Một mùa hè không chỉ để nhớ, mà còn để tự hào.</p>
            </div>

            <div className="card span-2">
              <h3>Hoạt động nổi bật</h3>
              <ul>
                <li>Trồng cây xanh, dọn vệ sinh môi trường.</li>
                <li>Tổ chức lớp học hè và sinh hoạt thiếu nhi.</li>
                <li>Hỗ trợ sửa chữa, sơn mới khu vui chơi cộng đồng.</li>
                <li>
                  Thực hiện truyền thông nâng cao nhận thức bảo vệ môi trường.
                </li>
              </ul>
            </div>

            <div className="card span-2">
              <h3>Thông điệp chiến dịch</h3>
              <p>
                Mùa hè xanh là hành trình tuổi trẻ bước ra khỏi vùng an toàn để
                sống có ích hơn, sâu sắc hơn và kết nối hơn. Không chỉ là một
                chiến dịch, đây còn là nơi nuôi dưỡng trách nhiệm, tinh thần sẻ
                chia và những ký ức đẹp.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
