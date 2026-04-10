import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/PublicProjectsPage.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApprovedProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects/status/approved');
                setProjects(response.data);
                setFilteredProjects(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dự án:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApprovedProjects();
    }, []);

    const handleRegisterClick = async (projectId: number) => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            Swal.fire({
                icon: 'warning',
                title: 'Yêu cầu đăng nhập',
                text: 'Bạn phải đăng nhập với tư cách sinh viên để đăng ký tham gia.',
                confirmButtonColor: '#10b981',
                confirmButtonText: 'Đến trang đăng nhập'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dang-nhap');
                }
            });
            return;
        }

        const user = JSON.parse(userStr);
        if (user.role !== 'user') { // Sinh viên là 'user'
            Swal.fire('Lỗi', 'Chỉ sinh viên mới có thể đăng ký tham gia dự án.', 'error');
            return;
        }

        // Show confirmation
        const confirm = await Swal.fire({
            title: 'Xác nhận đăng ký?',
            text: 'Bạn đã kiểm tra lịch cá nhân và chắc chắn muốn tham gia dự án này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Đăng ký ngay!',
            cancelButtonText: 'Từ chối'
        });

        if (!confirm.isConfirmed) return;

        try {
            Swal.showLoading();
            await axios.post('http://localhost:8080/api/applications/apply', {
                userId: user.id,
                projectId: projectId
            });

            Swal.fire({
                icon: 'success',
                title: 'Đăng ký thành công!',
                text: 'Hệ thống đã gửi email thông báo chi tiết đến bạn.',
                confirmButtonColor: '#10b981',
            });
            
        } catch (error: any) {
            const errorMsg = error.response?.data || 'Đã có lỗi xảy ra. Hãy thử lại.';
            Swal.fire({
                icon: 'error',
                title: 'Ối, Từ chối!',
                text: errorMsg,
                confirmButtonColor: '#10b981',
            });
        }
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
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <div className="project-card" key={project.id}>
                                        <div className="card-header">
                                            <span className="location-badge">{project.location || 'Chưa cập nhật'}</span>
                                        </div>
                                        <div className="card-body">
                                            <h3>{project.projectName}</h3>
                                            <p className="project-desc">{project.description || 'Chưa có mô tả'}</p>
                                            
                                            <div className="project-stats">
                                                <div className="stat-item">
                                                    <strong>Cần tuyển:</strong>
                                                    <span>{project.requiredStudents} tình nguyện viên</span>
                                                </div>
                                                <div className="stat-item">
                                                    <strong>Thời gian:</strong>
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
                                    <p>Không tìm thấy dự án nào phù hợp với điều kiện lọc.</p>
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
