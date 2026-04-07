import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/css/ProjectForm.css';

const EditProject: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        location: '',
        requiredStudents: 1,
        requiredSkills: '',
        startDate: '',
        endDate: '',
    });

    // 1. Lấy dữ liệu cũ từ Backend khi load trang
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                Swal.fire('Lỗi', 'Không thể tải dữ liệu dự án!', 'error');
                navigate('/manage-projects');
            }
        };
        fetchProject();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // 2. Gọi API PUT để cập nhật thông tin
            await axios.put(`http://localhost:8080/api/projects/${id}`, formData);

            await Swal.fire({
                title: 'Thành công!',
                text: 'Thông tin dự án đã được cập nhật.',
                icon: 'success',
                confirmButtonColor: '#28a745'
            });
            navigate('/manage-projects');
        } catch (error) {
            Swal.fire('Thất bại', 'Lỗi khi cập nhật dữ liệu!', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="loading">Đang tải dữ liệu dự án...</div>;

    return (
        <div className="project-form-container">
            <div className="form-header">
                <h2>Chỉnh Sửa Dự Án</h2>
                <p>Cập nhật các thông tin cần thiết cho chiến dịch</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên dự án</label>
                    <input
                        type="text"
                        name="projectName"
                        className="form-control"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mô tả công việc</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Địa điểm</label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Số lượng sinh viên</label>
                        <input
                            type="number"
                            name="requiredStudents"
                            className="form-control"
                            min="1"
                            value={formData.requiredStudents}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Kỹ năng yêu cầu</label>
                    <input
                        type="text"
                        name="requiredSkills"
                        className="form-control"
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
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Ngày kết thúc</label>
                        <input
                            type="date"
                            name="endDate"
                            className="form-control"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '20px',          // Khoảng cách giữa 2 nút
                    marginTop: '20px',
                    width: '80%',         // Khung chứa chiếm 80%
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'stretch' // Đảm bảo các phần tử con có chiều cao bằng nhau
                }}>
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={isSubmitting}
                        style={{
                            flex: 7,              // Chiếm 70% không gian còn lại
                            padding: '12px 0',    // Padding trên/dưới cố định, trái/phải bằng 0 vì đã có flex
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:'-1px'
                        }}
                    >
                        {isSubmitting ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}
                    </button>

                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => navigate(-1)}
                        style={{
                            flex: 3,              // Chiếm 30% không gian còn lại
                            padding: '12px 0',
                            background: '#6c757d',
                            height: '50px',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        HỦY BỎ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProject;