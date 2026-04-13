import React from 'react';
import '../../assets/css/HomeProject.css';
import { useNavigate } from 'react-router-dom';
import { ClipboardPlus, Settings2 } from 'lucide-react';
import bgImage from '../../assets/images/pngt.jpg';
import Navbar from './NavbarProject'; // Giả sử cùng thư mục, hãy điều chỉnh path cho đúng

const HomeProject: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div
                className="home-wrapper"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    paddingTop: '80px', // Thêm khoảng cách để không bị Navbar che mất Header
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <header className="home-header">
                    <h1 style={{ color: 'white', fontSize: '3.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                        MÙA HÈ XANH
                    </h1>

                </header>

                <div className="dashboard-grid">
                    <div className="menu-card" onClick={() => navigate('/create-project')}>
                        <div className="icon-box">
                            <ClipboardPlus size={64} color="#10b981" />
                        </div>
                        <h3>Tạo Dự Án Mới</h3>
                        <p>Khởi tạo các chiến dịch tình nguyện mới, thiết lập địa điểm và số lượng sinh viên cần thiết.</p>
                        <span className="btn-navigate">Bắt đầu ngay</span>
                    </div>

                    <div className="menu-card" onClick={() => navigate('/manage-projects')}>
                        <div className="icon-box">
                            <Settings2 size={64} color="#059669" />
                        </div>
                        <h3>Quản Lý Dự Án</h3>
                        <p>Theo dõi tiến độ, danh sách ứng viên, chỉnh sửa thông tin hoặc điều phối các dự án hiện có.</p>
                        <span className="btn-navigate">Xem danh sách</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeProject;