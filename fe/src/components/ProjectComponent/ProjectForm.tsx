import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// Import ảnh nền
import bgImage from '../../assets/images/pngt.jpg';
import '../../assets/css/ProjectForm.css';

interface ProjectData {
    projectName: string;
    description: string;
    location: string;
    requiredStudents: number;
    requiredSkills: string;
    startDate: string;
    endDate: string;
}

const ProjectForm: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<ProjectData>({
        projectName: '',
        description: '',
        location: '',
        requiredStudents: 1,
        requiredSkills: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:8080/api/projects", formData);

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Chiến dịch Mùa Hè Xanh đã được đăng ký!',
                    icon: 'success',
                    confirmButtonColor: '#059669'
                });
                navigate('/leader-dashboard');
            }
        } catch (error) {
            Swal.fire('Lỗi!', 'Không thể kết nối máy chủ.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="project-form-page-wrapper"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="project-form-container-v2">
                <div className="form-header-v2">
                    <button
                        type="button"
                        className="btn-back-dashboard"
                        onClick={() => navigate('/leader-dashboard')}
                    >
                        🌿 Quay Lại
                    </button>
                    <h2> ĐĂNG KÝ CHIẾN DỊCH MÙA HÈ XANH</h2>
                </div>

                <form onSubmit={handleSubmit} className="project-main-form">
                    <div className="form-group-v2">
                        <label>Tên chiến dịch</label>
                        <input
                            type="text"
                            name="projectName"
                            placeholder="VD: Dạy học hè tại xã..."
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-v2">
                        <label>Mô tả hoạt động</label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="Mô tả các công việc chính..."
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-row-v2">
                        <div className="form-group-v2">
                            <label>Địa điểm triển khai</label>
                            <input type="text" name="location" required onChange={handleChange} />
                        </div>
                        <div className="form-group-v2">
                            <label>Số lượng </label>
                            <input type="number" name="requiredStudents" min="1" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group-v2">
                        <label>Kỹ năng yêu cầu</label>
                        <input type="text" name="requiredSkills" placeholder="Kỹ năng sư phạm, văn nghệ..." onChange={handleChange} />
                    </div>

                    <div className="form-row-v2">
                        <div className="form-group-v2">
                            <label>Ngày bắt đầu</label>
                            <input type="date" name="startDate" required onChange={handleChange} />
                        </div>
                        <div className="form-group-v2">
                            <label>Ngày kết thúc</label>
                            <input type="date" name="endDate" required onChange={handleChange} />
                        </div>
                    </div>

                    {/* Nút Hủy và Xác nhận nằm trên cùng 1 hàng */}
                    <div className="form-actions-v2">
                        <button
                            type="button"
                            className="btn-cancel-v2"
                            onClick={() => navigate(-1)}
                        >
                            HỦY BỎ
                        </button>
                        <button
                            type="submit"
                            className="btn-submit-v2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐĂNG KÝ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;