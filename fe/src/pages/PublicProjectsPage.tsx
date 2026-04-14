import { useState, useEffect } from 'react';
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

// Mock data
// const MOCK_PROJECTS: Project[] = [
//     {
//         id: 1,
//         projectName: "Dạy học miễn phí tại vùng sâu",
//         description: "Hỗ trợ giảng dạy các môn Toán, Tiếng Việt cho học sinh tiểu học tại các xã khó khăn thuộc tỉnh Bình Phước.",
//         location: "TP. Hồ Chí Minh",
//         requiredStudents: 20,
//         requiredSkills: "Sư phạm, Kiên nhẫn, Tiếng Việt",
//         startDate: "2025-06-15",
//         endDate: "2025-08-15",
//         status: "approved"
//     },
//     {
//         id: 2,
//         projectName: "Trồng cây xanh đô thị",
//         description: "Tham gia trồng và chăm sóc cây xanh dọc các tuyến đường nội thành nhằm cải thiện môi trường sống.",
//         location: "Hà Nội",
//         requiredStudents: 35,
//         requiredSkills: "Thể lực tốt, Yêu môi trường",
//         startDate: "2025-07-01",
//         endDate: "2025-07-31",
//         status: "approved"
//     },
//     {
//         id: 3,
//         projectName: "Hỗ trợ y tế cộng đồng",
//         description: "Phối hợp với trạm y tế phường tổ chức khám sức khoẻ miễn phí, tư vấn dinh dưỡng cho người cao tuổi.",
//         location: "Đà Nẵng",
//         requiredStudents: 15,
//         requiredSkills: "Y khoa, Điều dưỡng, Giao tiếp",
//         startDate: "2025-06-20",
//         endDate: "2025-07-20",
//         status: "approved"
//     },
//     {
//         id: 4,
//         projectName: "Số hoá tài liệu thư viện",
//         description: "Scan và xây dựng cơ sở dữ liệu số cho kho tài liệu địa phương giúp người dân tra cứu dễ dàng hơn.",
//         location: "Cần Thơ",
//         requiredStudents: 10,
//         requiredSkills: "CNTT, Tỉ mỉ, Photoshop",
//         startDate: "2025-07-10",
//         endDate: "2025-08-10",
//         status: "approved"
//     },
//     {
//         id: 5,
//         projectName: "Vệ sinh bờ biển Mỹ Khê",
//         description: "Dọn dẹp rác thải nhựa và tuyên truyền ý thức bảo vệ môi trường biển cho người dân và du khách.",
//         location: "Đà Nẵng",
//         requiredStudents: 50,
//         requiredSkills: "Thể lực tốt, Nhiệt tình",
//         startDate: "2025-06-28",
//         endDate: "2025-06-30",
//         status: "approved"
//     },
//     {
//         id: 6,
//         projectName: "Workshop kỹ năng sống cho trẻ em",
//         description: "Tổ chức các buổi workshop kỹ năng mềm, an toàn giao thông và phòng tránh tai nạn cho học sinh THCS.",
//         location: "TP. Hồ Chí Minh",
//         requiredStudents: 25,
//         requiredSkills: "Thuyết trình, Sáng tạo, MC",
//         startDate: "2025-07-05",
//         endDate: "2025-07-25",
//         status: "approved"
//     }
// ];


export default function PublicProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApprovedProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects/status/approved');
                setProjects(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dự án:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApprovedProjects();
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setProjects(MOCK_PROJECTS);
    //         setLoading(false);
    //     }, 800);
    // }, []);

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
                            {projects.length > 0 ? (
                                projects.map((project: Project) => (
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
