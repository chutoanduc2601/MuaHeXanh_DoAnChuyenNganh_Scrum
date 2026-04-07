import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/ProjectDetail.css';

const ProjectDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // Gọi API lấy chi tiết theo ID
                const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                alert("Không thể tải thông tin dự án!");
                navigate('/manage-projects');
            }
        };
        fetchDetail();
    }, [id, navigate]);

    if (!project) return <div>Đang tải chi tiết...</div>;

    return (
        <div className="project-detail-container">
            <button className="btn-back" onClick={() => navigate(-1)}>← Quay lại</button>
            <h2>Chi Tiết Dự Án: {project.projectName}</h2>
            <hr />
            <div className="detail-grid">
                <p><strong>Mô tả:</strong> {project.description || "Không có mô tả"}</p>
                <p><strong>Địa điểm:</strong> {project.location}</p>
                <p><strong>Số lượng SV cần:</strong> {project.requiredStudents}</p>
                <p><strong>Kỹ năng yêu cầu:</strong> {project.requiredSkills}</p>
                <p><strong>Ngày bắt đầu:</strong> {project.startDate}</p>
                <p><strong>Ngày kết thúc:</strong> {project.endDate}</p>
                <p><strong>Trạng thái:</strong> <span className="status-pending">{project.status}</span></p>
            </div>
        </div>
    );
};

export default ProjectDetail;