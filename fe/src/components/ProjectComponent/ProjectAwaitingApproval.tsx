import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/ProjectManager.css';

interface Project {
    id: number;
    projectName: string;
    location: string;
    requiredStudents: number;
    status: string;
}

const ProjectAwaitingApproval: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [rejectReason, setRejectReason] = useState<string>("");

    const navigate = useNavigate();
        const API_URL = "http://localhost:8080/api/projects";

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL+"/status/pending");
            setProjects(response.data);
        } catch (error) {
            console.error("Lỗi khi kết nối BE:", error);
            alert("Không thể tải danh sách dự án. Kiểm tra lại Backend!");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        await fetch(`http://localhost:8080/api/projects/${id}/approve`, {
            method: "PUT",
        });
        alert("Approved!");
        fetchProjects(); // reload danh sách
    };
    const openRejectModal = (id: number) => {
        setSelectedId(id);
        setRejectReason("");
        setShowRejectModal(true);
    };
    const handleReject = async () => {
        if (!selectedId) return;

        if (rejectReason.trim().length === 0) {
            alert("Vui lòng nhập lý do từ chối.");
            return;
        }

        try {
            await fetch(`${API_URL}/${selectedId}/reject`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: rejectReason }),
            });

            alert("Đã từ chối dự án!");
            setShowRejectModal(false);
            fetchProjects();
        } catch (e) {
            alert("Lỗi từ chối dự án!");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Đang tải dữ liệu từ máy chủ...</div>;

    return (
        <div className="project-list-container">
            {/* Header với nút Quay lại Dashboard */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                    onClick={() => navigate('/leader-dashboard')}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    ← Dashboard
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Danh Sách Dự Án</h2>
            </div>

            <table className="table-projects">
                <thead>
                <tr>
                    <th>Tên Dự Án</th>
                    <th>Địa Điểm</th>
                    <th>Số Lượng</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.projectName}</td>
                            <td>{project.location}</td>
                            <td>{project.requiredStudents}</td>
                            <td>
                                <span className={`status-badge ${project.status === 'PENDING' ? 'status-pending' : ''}`}>
                                    {project.status}
                                </span>
                            </td>
                            <td className="action-btns">
                                <button className="btn-approval" onClick={() => handleApprove(project.id)}>Đồng ý</button>
                                <button className="btn-reject" onClick={() => openRejectModal(project.id)}>Từ chối</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} style={{textAlign: 'center'}}>Hiện tại không có dự án nào.</td>
                    </tr>
                )}
                </tbody>
            </table>
            {showRejectModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Lý do từ chối</h3>

                        <textarea
                            placeholder="Nhập lý do..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />

                        <div className="modal-btns">
                            <button className="btn-reject" onClick={handleReject}>Xác nhận từ chối</button>
                            <button className="btn-cancel" onClick={() => setShowRejectModal(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectAwaitingApproval;