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

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const API_URL = "http://localhost:8080/api/projects";

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setProjects(response.data);
        } catch (error) {
            console.error("Lỗi khi kết nối BE:", error);
            alert("Không thể tải danh sách dự án. Kiểm tra lại Backend!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setProjects(projects.filter(p => p.id !== id));
                alert("Đã xóa thành công!");
            } catch (error) {
                alert("Lỗi khi xóa!");
            }
        }
    };

    const handleView = (id: number) => navigate(`/view-project/${id}`);
    const handleEdit = (id: number) => navigate(`/edit-project/${id}`);

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
                <button className="btn-add" onClick={() => navigate('/create-project')}>
                    + Tạo Dự Án Mới
                </button>
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
                                <button className="btn-view" onClick={() => handleView(project.id)}>Xem</button>
                                <button className="btn-edit" onClick={() => handleEdit(project.id)}>Sửa</button>
                                <button className="btn-delete" onClick={() => handleDelete(project.id)}>Xóa</button>
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
        </div>
    );
};

export default ProjectList;