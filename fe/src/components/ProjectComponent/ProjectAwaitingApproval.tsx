import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/ProjectAwaiting.css';

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
            const response = await axios.get(API_URL + "/status/pending");
            setProjects(response.data);
        } catch (error) {
            console.error("Lỗi khi kết nối BE:", error);
            alert("Không thể tải danh sách dự án. Kiểm tra lại Backend!");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            await axios.put(`${API_URL}/${id}/approve`);
            alert("Approved!");
            fetchProjects(); // reload danh sách
        } catch (e) {
            alert("Approved ERROR !!!");
        }
    };

    const openRejectModal = (id: number) => {
        setSelectedId(id);
        setRejectReason("");
        setShowRejectModal(true);
    };

    const handleReject = async () => {
        if (selectedId === null) return;

        if (rejectReason.trim().length === 0) {
            alert("Vui lòng nhập lý do từ chối.");
            return;
        }

        try {
            await axios.put(`${API_URL}/${selectedId}/reject`, { reason: rejectReason });

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

    if (loading) return <div className="loading-text">Đang tải dữ liệu từ máy chủ...</div>;

    return (
        <div className="project-list-container">
            {/* Header & Back Button */}
            <div className="page-header">
                <button className="btn-home" onClick={() => navigate('/')}>
                    &#8592; HomePage
                </button>
                <h2>Danh Sách Dự Án Cần Duyệt</h2>
            </div>

            {/* Table Area */}
            <div className="table-responsive">
                <table className="table-projects">
                    <thead>
                    <tr>
                        <th>Tên Dự Án</th>
                        <th>Địa Điểm</th>
                        <th>Số Lượng</th>
                        <th>Trạng Thái</th>
                        <th className="text-center">Thao Tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <tr key={project.id}>
                                <td className="font-medium">{project.projectName}</td>
                                <td>{project.location}</td>
                                <td>{project.requiredStudents}</td>
                                <td>
                                        <span className={`status-badge ${project.status === 'PENDING' ? 'status-pending' : ''}`}>
                                            {project.status}
                                        </span>
                                </td>
                                <td className="action-btns">
                                    <button className="btn-approval" onClick={() => handleApprove(project.id)}>
                                        Đồng ý
                                    </button>
                                    <button className="btn-reject" onClick={() => openRejectModal(project.id)}>
                                        Từ chối
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center empty-state">
                                Hiện tại không có dự án nào cần duyệt.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
                    {/* Ngăn click xuyên qua overlay làm đóng modal nếu click vào form */}
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <h3>Lý do từ chối</h3>
                        <textarea
                            placeholder="Nhập lý do chi tiết..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            autoFocus
                        />
                        <div className="modal-btns">
                            <button className="btn-cancel" onClick={() => setShowRejectModal(false)}>Hủy</button>
                            <button className="btn-reject" onClick={handleReject}>Xác nhận từ chối</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectAwaitingApproval;