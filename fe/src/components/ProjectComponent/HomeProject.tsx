import React from 'react';
import '../../assets/css/HomeProject.css';
import { useNavigate } from 'react-router-dom';

const HomeProject: React.FC = () => {
    const navigate = useNavigate(); // 2. Khởi tạo hàm navigate

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Hệ Thống Quản Lý Tình Nguyện</h1>
            </header>

            <div className="dashboard-grid">
                {/* 3. Gọi hàm navigate với path đã định nghĩa trong App.tsx */}
                <div className="menu-card" onClick={() => navigate('/create-project')}>
                    <span className="icon-wrapper">📝</span>
                    <h3>Tạo Dự Án Mới</h3>
                    <p>Đăng tải thông tin dự án để bắt đầu tuyển thành viên.</p>
                    <span className="btn-navigate">Bắt đầu ngay</span>
                </div>

                <div className="menu-card" onClick={() => navigate('/manage-projects')}>
                    <span className="icon-wrapper">📊</span>
                    <h3>Quản Lý Dự Án</h3>
                    <p>Xem danh sách, chỉnh sửa hoặc xóa dự án.</p>
                    <span className="btn-navigate">Xem danh sách</span>
                </div>

            </div>
        </div>
    );
};

export default HomeProject;