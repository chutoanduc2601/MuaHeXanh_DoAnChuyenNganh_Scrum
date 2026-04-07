import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm để điều hướng
import axios from 'axios'; // Thêm để gọi API
import Swal from 'sweetalert2'; // Thêm để hiện thông báo đẹp
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
    const navigate = useNavigate(); // Khởi tạo hook điều hướng
    const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái chờ gửi

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
            // 1. Gọi API Backend (Spring Boot)
            const response = await axios.post("http://localhost:8080/api/projects", formData);

            if (response.status === 200 || response.status === 201) {
                // 2. Hiển thị thông báo thành công
                await Swal.fire({
                    title: 'Thành công!',
                    text: 'Dự án của bạn đã được đăng và đang chờ duyệt (PENDING).',
                    icon: 'success',
                    confirmButtonText: 'Đến trang quản lý',
                    confirmButtonColor: '#28a745',
                    timer: 3000, // Tự đóng sau 3 giây
                    timerProgressBar: true
                });

                // 3. Chuyển hướng tới trang Quản lý dự án
                navigate('/manage-projects');
            }
        } catch (error: any) {
            console.error("Lỗi khi đăng dự án:", error);

            // Thông báo lỗi nếu Backend gặp vấn đề
            Swal.fire({
                title: 'Thất bại!',
                text: error.response?.data?.message || 'Không thể kết nối đến máy chủ.',
                icon: 'error',
                confirmButtonText: 'Thử lại'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="project-form-container">
            <div className="form-header">
                <h2>Tạo Dự Án Tình Nguyện</h2>
                <p>Thông tin sẽ được gửi đến hệ thống để phê duyệt</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên dự án</label>
                    <input
                        type="text"
                        name="projectName"
                        className="form-control"
                        placeholder="Nhập tên dự án..."
                        required
                        value={formData.projectName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Mô tả công việc</label>
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Mô tả chi tiết công việc..."
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Địa điểm</label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            required
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Số lượng sinh viên</label>
                        <input
                            type="number"
                            name="requiredStudents"
                            className="form-control"
                            min="1"
                            required
                            value={formData.requiredStudents}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Kỹ năng yêu cầu</label>
                    <input
                        type="text"
                        name="requiredSkills"
                        className="form-control"
                        placeholder="Sức khỏe, giảng dạy..."
                        value={formData.requiredSkills}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Ngày bắt đầu</label>
                        <input
                            type="date"
                            name="startDate"
                            className="form-control"
                            required
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ngày kết thúc</label>
                        <input
                            type="date"
                            name="endDate"
                            className="form-control"
                            required
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG DỰ ÁN'}
                </button>

                <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => navigate(-1)}
                    style={{ marginTop: '10px', width: '100%', padding: '12px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    HỦY BỎ
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;