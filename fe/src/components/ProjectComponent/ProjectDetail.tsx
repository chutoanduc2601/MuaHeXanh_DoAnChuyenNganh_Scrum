import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  Leaf, MapPin, Users, Wrench, Calendar, FileText } from 'lucide-react';
// Import ảnh nền
import bgImage from '../../assets/images/pngt.jpg';
import '../../assets/css/ProjectDetail.css';

const ProjectDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any>(null);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/leader-dashboard');
        }
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Lỗi:", error);
                navigate('/leader-dashboard');
            }
        };
        fetchDetail();
    }, [id, navigate]);

    if (!project) return <div className="loading-state">Đang tải chi tiết dự án Mùa Hè Xanh...</div>;

    return (
        <div
            className="project-detail-page"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="mhx-overlay-detail">
                <div className="project-detail-container">
                    {/* Nút quay lại */}
                    <div className="detail-navigation">
                        <button className="btn-back-mhx-detail" onClick={handleBack}>
                            <Leaf /> Quay Lại
                        </button>
                    </div>

                    {/* Header Card: Tên chiến dịch */}
                    <header className="detail-main-header">
                        <div className="header-badge">CHIẾN DỊCH TÌNH NGUYỆN 2026</div>
                        <h1>{project.projectName}</h1>
                        <div className={`detail-status-pill ${project.status?.toLowerCase() || 'approved'}`}>
                            {project.status || 'APPROVED'}
                        </div>
                    </header>

                    <div className="detail-content-layout">
                        {/* Khối mô tả */}
                        <div className="info-card-detail desc-section">
                            <div className="card-header">
                                <FileText size={20} color="#059669" />
                                <h3>Mô tả hoạt động</h3>
                            </div>
                            <p>{project.description || "Chưa có mô tả chi tiết cho dự án này."}</p>
                        </div>

                        {/* Grid thông tin chi tiết */}
                        <div className="info-grid-detail">
                            <div className="grid-card">
                                <MapPin size={22} className="grid-icon" />
                                <div className="grid-text">
                                    <span className="grid-label">ĐỊA ĐIỂM</span>
                                    <span className="grid-value">{project.location}</span>
                                </div>
                            </div>

                            <div className="grid-card">
                                <Users size={22} className="grid-icon" />
                                <div className="grid-text">
                                    <span className="grid-label">SỐ LƯỢNG SV</span>
                                    <span className="grid-value">{project.requiredStudents} thành viên</span>
                                </div>
                            </div>
                            <div className="grid-card">
                                <Wrench size={22} className="grid-icon" />
                                <div className="grid-text">
                                    <span className="grid-label">KỸ NĂNG</span>
                                    <span className="grid-value">{project.requiredSkills || "Không yêu cầu"}</span>
                                </div>
                            </div>

                            <div className="grid-card">
                                <Calendar size={22} className="grid-icon" />
                                <div className="grid-text">
                                    <span className="grid-label">THỜI GIAN</span>
                                    <span className="grid-value">{project.startDate} — {project.endDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;