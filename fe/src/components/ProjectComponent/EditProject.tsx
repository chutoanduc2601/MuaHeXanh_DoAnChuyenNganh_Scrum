import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Save, XCircle, Edit, MapPin, Users, Wrench, Calendar } from 'lucide-react';
// Import ảnh nền theo yêu cầu
import bgImage from '../../assets/images/pngt.jpg';
import '../../assets/css/ProjectEdit.css';

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
            await axios.put(`http://localhost:8080/api/projects/${id}`, formData);
            Swal.fire({
                title: 'Thành công!',
                text: 'Dữ liệu chiến dịch đã được cập nhật.',
                icon: 'success',
                confirmButtonColor: '#059669'
            });
            navigate('/manage-projects');
        } catch (error) {
            Swal.fire('Lỗi', 'Cập nhật thất bại!', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="mhx-loading">Đang tải dữ liệu...</div>;

    return (
        <div className="mhx-edit-page" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="mhx-overlay-edit">
                <div className="mhx-edit-container">

                    <button className="btn-back-v3" onClick={() => navigate(-1)}>
                    🌿 Quay Lại
                    </button>

                    <div className="mhx-glass-form-card">
                        <header className="form-header-v3">

                            <h2>Chỉnh Sửa Chiến Dịch</h2>
                            <p>Cập nhật thông tin chi tiết cho dự án tình nguyện</p>
                        </header>

                        <form onSubmit={handleSubmit} className="mhx-form-v3">
                            <div className="form-section">
                                <label><Edit size={16} /> Tên chiến dịch</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-section">
                                <label><MapPin size={16} /> Địa điểm triển khai</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-grid-v3">
                                <div className="form-section">
                                    <label><Users size={16} /> Số lượng SV</label>
                                    <input
                                        type="number"
                                        name="requiredStudents"
                                        value={formData.requiredStudents}
                                        onChange={handleChange}
                                        min="1"
                                    />
                                </div>
                                <div className="form-section">
                                    <label><Wrench size={16} /> Kỹ năng yêu cầu</label>
                                    <input
                                        type="text"
                                        name="requiredSkills"
                                        value={formData.requiredSkills}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-grid-v3">
                                <div className="form-section">
                                    <label><Calendar size={16} /> Ngày bắt đầu</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-section">
                                    <label><Calendar size={16} /> Ngày kết thúc</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <label>Mô tả chi tiết</label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="form-actions-v3">
                                <button type="submit" className="btn-save-v3" disabled={isSubmitting}>
                                    <Save size={18} /> {isSubmitting ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}
                                </button>
                                <button type="button" className="btn-cancel-v3" onClick={() => navigate(-1)}>
                                    <XCircle size={18} /> HỦY BỎ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProject;