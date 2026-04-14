import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Eye, Edit3, Users, Trash2, MapPin } from 'lucide-react';
import Swal from 'sweetalert2'; // Đảm bảo đã import Swal
import bgImage from '../../assets/images/pngt.jpg';
import '../../assets/css/ProjectList.css';

interface Project {
    id: number;
    projectName: string;
    location: string;
    requiredStudents: number;
    status: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/projects");
            setProjects(response.data);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // HÀM XÓA CÓ NHẬP LÝ DO
    const handleDelete = async (id: number, name: string) => {
        const { value: reason } = await Swal.fire({
            title: 'Xác nhận xóa dự án?',
            text: `Bạn đang thực hiện xóa chiến dịch: ${name}`,
            icon: 'warning',
            input: 'textarea',
            inputLabel: 'Lý do xóa dự án',
            inputPlaceholder: 'Nhập lý do tại đây (bắt buộc)...',
            inputAttributes: {
                'aria-label': 'Nhập lý do tại đây'
            },
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Xác nhận xóa',
            cancelButtonText: 'Hủy',
            inputValidator: (value) => {
                if (!value) {
                    return 'Bạn phải nhập lý do để tiếp tục!';
                }
            }
        });

        if (reason) {
            try {
                // Gửi request xóa kèm lý do (tùy Backend của bạn có nhận reason hay không)
                // Nếu Backend chỉ nhận ID: await axios.delete(`.../${id}`);
                await axios.delete(`http://localhost:8080/api/projects/${id}`, {
                    data: { deleteReason: reason }
                });

                setProjects(projects.filter(p => p.id !== id));

                Swal.fire({
                    title: 'Đã xóa!',
                    text: 'Dự án đã được loại bỏ khỏi hệ thống.',
                    icon: 'success',
                    confirmButtonColor: '#059669'
                });
            } catch (error) {
                Swal.fire('Lỗi!', 'Không thể xóa dự án lúc này.', 'error');
            }
        }
    };

    const filtered = projects.filter(p =>
        p.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mhx-full-page" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="mhx-overlay">
                <div className="mhx-container">
                    <div className="mhx-top-nav">
                        <button className="btn-back-dashboard-v3" onClick={() => navigate('/leader-dashboard')}>
                            🌿 Quay Lại
                        </button>
                    </div>

                    <header className="mhx-glass-header">
                        <div className="header-info">
                            <h1>QUẢN LÝ CHIẾN DỊCH</h1>
                            <p>Mùa Hè Xanh - Hành trình kết nối</p>
                        </div>
                        <button className="btn-add-mhx" onClick={() => navigate('/create-project')}>
                            <Plus size={20} /> ĐĂNG KÝ MỚI
                        </button>
                    </header>

                    <div className="mhx-search-glass">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên chiến dịch hoặc địa điểm..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="mhx-list-wrapper">
                        {loading ? (
                            <div className="loading-text">Đang tải dữ liệu...</div>
                        ) : filtered.length > 0 ? (
                            filtered.map((project) => (
                                <div key={project.id} className="mhx-glass-card">
                                    <div className="mhx-card-main">
                                        <div className="info-group">
                                            <h3 className="project-title-v3">{project.projectName}</h3>
                                            <div className="tag-row">
                                                <span className={`pill-status ${project.status?.toLowerCase() || 'approved'}`}>
                                                    {project.status || 'APPROVED'}
                                                </span>
                                                <span className="pill-loc">
                                                    <MapPin size={14} /> {project.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="stats-group">
                                            <div className="stat-item">
                                                <span className="label">CẦN TUYỂN</span>
                                                <span className="value">{project.requiredStudents} SV</span>
                                            </div>
                                        </div>

                                        <div className="action-group">
                                            <button onClick={() => navigate(`/view-project/${project.id}`)} className="btn-icon view">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => navigate(`/edit-project/${project.id}`)} className="btn-icon edit">
                                                <Edit3 size={18} />
                                            </button>
                                            <button onClick={() => navigate(`/project/${project.id}/candidates`)} className="btn-icon users">
                                                <Users size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id, project.projectName)}
                                                className="btn-icon delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">Chưa có chiến dịch nào được tìm thấy.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;