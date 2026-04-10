import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CandidateList from "../components/ProjectComponent/CandidateList";
import {
    getApplicationsByProject,
    getProjectById,
    updateApplicationStatus,
} from "../services/applicationService";
import type { Application } from "../types/application";

interface ProjectInfo {
    id: number;
    projectName: string;
    requiredStudents: number;
}

function LeaderCandidatePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [applications, setApplications] = useState<Application[]>([]);
    const [project, setProject] = useState<ProjectInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingActionId, setLoadingActionId] = useState<number | null>(null);

    const joinedCount = useMemo(
        () => applications.filter((app) => app.status === "APPROVED").length,
        [applications]
    );

    const fetchData = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const [applicationsData, projectData] = await Promise.all([
                getApplicationsByProject(id),
                getProjectById(id),
            ]);

            setApplications(applicationsData);
            setProject(projectData);
        } catch (error: any) {
            Swal.fire(
                "Lỗi",
                error?.response?.data?.message || "Không thể tải danh sách ứng viên",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleAccept = async (applicationId: number) => {
        if (!project) return;

        if (joinedCount >= project.requiredStudents) {
            Swal.fire("Thông báo", "Dự án đã đủ số lượng tình nguyện viên", "warning");
            return;
        }

        try {
            setLoadingActionId(applicationId);
            await updateApplicationStatus(applicationId, "APPROVED");
            await fetchData();
            Swal.fire("Thành công", "Đã chấp nhận ứng viên", "success");
        } catch (error: any) {
            Swal.fire(
                "Lỗi",
                error?.response?.data?.message || "Không thể chấp nhận ứng viên",
                "error"
            );
        } finally {
            setLoadingActionId(null);
        }
    };

    const handleReject = async (applicationId: number) => {
        try {
            setLoadingActionId(applicationId);
            await updateApplicationStatus(applicationId, "REJECTED");
            await fetchData();
            Swal.fire("Thành công", "Đã loại ứng viên", "success");
        } catch (error: any) {
            Swal.fire(
                "Lỗi",
                error?.response?.data?.message || "Không thể cập nhật trạng thái",
                "error"
            );
        } finally {
            setLoadingActionId(null);
        }
    };

    if (loading) {
        return <div style={{ padding: "24px" }}>Đang tải dữ liệu...</div>;
    }

    return (
        <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: "16px",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#6c757d",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                Quay lại
            </button>

            <div
                style={{
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    marginBottom: "20px",
                }}
            >
                <h1 style={{ marginBottom: "8px" }}>Quản lý ứng viên</h1>
                <p>
                    <strong>Dự án:</strong> {project?.projectName}
                </p>
                <p>
                    <strong>Số lượng cần tuyển:</strong> {project?.requiredStudents}
                </p>
                <p>
                    <strong>Đã chấp nhận:</strong> {joinedCount}
                </p>
            </div>

            <CandidateList
                applications={applications}
                joinedCount={joinedCount}
                requiredStudents={project?.requiredStudents || 0}
                onAccept={handleAccept}
                onReject={handleReject}
                loadingActionId={loadingActionId}
            />
        </div>
    );
}

export default LeaderCandidatePage;