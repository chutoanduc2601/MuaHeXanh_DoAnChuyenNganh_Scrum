import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/PublicProjectsPage.css';
import { useNavigate } from 'react-router-dom';

interface Project {
    id: number;
    projectName: string;
    description: string;
    location: string;
    requiredStudents: number;
    requiredSkills: string;
    startDate: string;
    endDate: string;
    status: string;
}

export default function PublicProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApprovedProjects = async () => {
            try {
                // Sửa thành cổng backend chuẩn đã có
                const response = await axios.get('http://localhost:8080/api/projects/status/approved');
                setProjects(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dự án:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApprovedProjects();
    }, []);

    const handleRegisterClick = (id: number) => {
        alert(`Tính năng đăng ký dự án ${id} đang được phát triển!`);
    };

    return (
        <div className="public-projects-container">
            <Navbar />
            
            <main className="projects-main">
                <section className="projects-hero">
                    <h1>Chiến Dịch Mùa Hè Xanh</h1>
                    <p>Khám phá và tham gia các dự án tình nguyện để đóng góp cho cộng đồng</p>
                </section>

                <section className="projects-content">
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <div className="projects-grid">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div className="project-card" key={project.id}>
                                        <div className="card-header">
                                            <span className="location-badge">📍 {project.location || 'Chưa cập nhật'}</span>
                                        </div>
                                        <div className="card-body">
                                            <h3>{project.projectName}</h3>
                                            <p className="project-desc">{project.description || 'Chưa có mô tả'}</p>
                                            
                                            <div className="project-stats">
                                                <div className="stat-item">
                                                    <strong>👥 Cần tuyển:</strong>
                                                    <span>{project.requiredStudents} tình nguyện viên</span>
                                                </div>
                                                <div className="stat-item">
                                                    <strong>📅 Thời gian:</strong>
                                                    <span>{project.startDate ? new Date(project.startDate).toLocaleDateString('vi-VN') : 'Đang cập nhật'} - {project.endDate ? new Date(project.endDate).toLocaleDateString('vi-VN') : 'Đang cập nhật'}</span>
                                                </div>
                                            </div>

                                            {project.requiredSkills && (
                                                <div className="project-skills">
                                                    <strong>Kỹ năng:</strong>
                                                    <span className="skills-text">{project.requiredSkills}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="card-footer">
                                            <button className="btn-register" onClick={() => handleRegisterClick(project.id)}>
                                                Đăng Ký Tham Gia
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-projects">
                                    <p>Hiện chưa có dự án nào đang mở.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
