import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/MyProjectsPage.css";
import { useNavigate } from "react-router-dom";

export default function MyProjectsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL"); // State cho bộ lọc
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/dang-nhap");
      return;
    }
    const user = JSON.parse(userStr);

    const fetchMyApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/applications/user/${user.id}`,
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Lỗi khi tải đơn đăng ký:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyApplications();
  }, [navigate]);

  // Logic lọc dữ liệu
  const filteredApps = applications.filter((app) => {
    if (activeFilter === "ALL") return true;
    return app.status === activeFilter;
  });

  return (
    <div className="my-projects-container">
      <Navbar />
      <main className="my-projects-main">
        
        {/* HERO BANNER MỚI */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Dự án của tôi</h1>
            <p>Theo dõi hành trình Mùa Hè Xanh rực rỡ của bạn</p>
          </div>
        </div>

        <div className="applications-wrapper">
          {/* THANH BỘ LỌC */}
          <div className="filter-tabs">
            <button className={`filter-btn ${activeFilter === "ALL" ? "active" : ""}`} onClick={() => setActiveFilter("ALL")}>Tất cả</button>
            <button className={`filter-btn ${activeFilter === "APPROVED" ? "active" : ""}`} onClick={() => setActiveFilter("APPROVED")}>Đã trúng tuyển</button>
            <button className={`filter-btn ${activeFilter === "PENDING" ? "active" : ""}`} onClick={() => setActiveFilter("PENDING")}>Đang chờ duyệt</button>
            <button className={`filter-btn ${activeFilter === "REJECTED" ? "active" : ""}`} onClick={() => setActiveFilter("REJECTED")}>Bị từ chối</button>
          </div>

          <div className="applications-box">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : filteredApps.length === 0 ? (
              <div className="empty-state">
                <p>{applications.length === 0 ? "Bạn chưa đăng ký tham gia dự án nào." : "Không có dự án nào ở trạng thái này."}</p>
                {applications.length === 0 && (
                  <button onClick={() => navigate("/du-an")} className="btn-explore">
                    Tìm dự án ngay
                  </button>
                )}
              </div>
            ) : (
              <div className="app-grid">
                {filteredApps.map((app) => (
                  <div className="app-card" key={app.id}>
                    <div className="app-card-header">
                      <h3>{app.projectName || "Dự án chưa cập nhật tên"}</h3>
                      <span className={`app-status status-${app.status?.toLowerCase()}`}>
                        {app.status === "PENDING" ? "Đang chờ duyệt" : app.status === "APPROVED" ? "Đã trúng tuyển" : "Bị từ chối"}
                      </span>
                    </div>
                    
                    <div className="app-card-body">
                      {/* Thêm Icon cho từng dòng */}
                      <div className="info-row">
                        <span className="info-label">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          Ngày nộp đơn
                        </span>
                        <span>{app.appliedAt || app.appliedDate ? new Date(app.appliedAt || app.appliedDate).toLocaleDateString("vi-VN") : "Không rõ"}</span>
                      </div>

                      <div className="info-row">
                        <span className="info-label">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          Địa điểm
                        </span>
                        <span>{app.location || "Chưa cập nhật"}</span>
                      </div>

                      <div className="info-row">
                        <span className="info-label">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          Thời gian
                        </span>
                        <span>
                          {app.startDate ? new Date(app.startDate).toLocaleDateString("vi-VN") : "..."} - {app.endDate ? new Date(app.endDate).toLocaleDateString("vi-VN") : "..."}
                        </span>
                      </div>

                      {app.status === "REJECTED" && (
                        <div className="reject-reason">
                          <strong>Lý do từ chối:</strong><br />
                          {app.rejectReason || "Không có phản hồi chi tiết từ Ban Chỉ Huy."}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}