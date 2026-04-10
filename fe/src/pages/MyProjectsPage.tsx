import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/MyProjectsPage.css';
import { useNavigate } from 'react-router-dom';

export default function MyProjectsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/dang-nhap');
            return;
        }

        const user = JSON.parse(userStr);

        const fetchMyApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/applications/user/${user.id}`);
                setApplications(response.data);
            } catch (error) {
                console.error("Lỗi khi tải đơn đăng ký:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyApplications();
    }, [navigate]);

    return (
        <div className="my-projects-container">
            <Navbar />
            <main className="my-projects-main">
                <div className="my-page-header">
                    <h1>Dự án của tôi</h1>
                    <p>Theo dõi trạng thái các dự án Mùa Hè Xanh bạn đã đăng ký tham gia</p>
                </div>
                
                <div className="applications-box">
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : applications.length === 0 ? (
                        <div className="empty-state">
                            <p>Bạn chưa đăng ký tham gia dự án nào.</p>
                            <button onClick={() => navigate('/du-an')} className="btn-explore">
                                Tìm dự án ngay
                            </button>
                        </div>
                    ) : (
                        <div className="app-grid">
                            {applications.map(app => (
                                <div className="app-card" key={app.id}>
                                    <div className="app-card-header">
                                        <h3>{app.project?.projectName}</h3>
                                        <span className={`app-status status-${app.status?.toLowerCase()}`}>
                                            {app.status === 'PENDING' ? 'Đang chờ duyệt' : 
                                             (app.status === 'APPROVED') ? 'Đã trúng tuyển' : 'Bị từ chối'}
                                        </span>
                                    </div>
                                    <div className="app-card-body">
                                        <p><strong>Ngày nộp đơn:</strong> {app.appliedDate ? new Date(app.appliedDate).toLocaleString('vi-VN') : 'Không rõ'}</p>
                                        <p><strong>Địa điểm:</strong> {app.project?.location || 'Chưa cập nhật'}</p>
                                        <p><strong>Thời gian:</strong> {app.project?.startDate ? new Date(app.project.startDate).toLocaleDateString('vi-VN') : '...'} đến {app.project?.endDate ? new Date(app.project.endDate).toLocaleDateString('vi-VN') : '...'}</p>
                                        
                                        {app.status === 'REJECTED' && app.rejectReason && (
                                            <div className="reject-reason">
                                                <strong>Lý do:</strong> {app.rejectReason}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
