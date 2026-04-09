import type { Application } from "../../types/application";

interface CandidateListProps {
    applications: Application[];
    joinedCount: number;
    requiredStudents: number;
    onAccept: (applicationId: number) => void;
    onReject: (applicationId: number) => void;
    loadingActionId: number | null;
}

function CandidateList({
                           applications,
                           joinedCount,
                           requiredStudents,
                           onAccept,
                           onReject,
                           loadingActionId,
                       }: CandidateListProps) {
    return (
        <div style={{ padding: "24px" }}>
            <h2 style={{ marginBottom: "8px" }}>Danh sách ứng viên</h2>
            <p style={{ marginBottom: "20px", color: "#555" }}>
                Đã nhận: <strong>{joinedCount}</strong> / {requiredStudents}
            </p>

            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "#fff",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                >
                    <thead style={{ background: "#f5f5f5" }}>
                    <tr>
                        <th style={thStyle}>Họ tên</th>
                        <th style={thStyle}>MSSV</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>SĐT</th>
                        <th style={thStyle}>Trường</th>
                        <th style={thStyle}>Kỹ năng</th>
                        <th style={thStyle}>Trạng thái</th>
                        <th style={thStyle}>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.length === 0 ? (
                        <tr>
                            <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                                Chưa có ứng viên nào đăng ký.
                            </td>
                        </tr>
                    ) : (
                        applications.map((app) => {
                            const disableAccept =
                                app.status === "JOINED" ||
                                joinedCount >= requiredStudents ||
                                loadingActionId === app.id;

                            const disableReject =
                                app.status === "REJECTED" || loadingActionId === app.id;

                            return (
                                <tr key={app.id}>
                                    <td style={tdStyle}>{app.fullname}</td>
                                    <td style={tdStyle}>{app.studentId}</td>
                                    <td style={tdStyle}>{app.email}</td>
                                    <td style={tdStyle}>{app.phone}</td>
                                    <td style={tdStyle}>{app.school}</td>
                                    <td style={tdStyle}>{app.skill}</td>
                                    <td style={tdStyle}>
                      <span
                          style={{
                              padding: "6px 10px",
                              borderRadius: "999px",
                              fontSize: "12px",
                              fontWeight: 600,
                              background:
                                  app.status === "JOINED"
                                      ? "#d4edda"
                                      : app.status === "REJECTED"
                                          ? "#f8d7da"
                                          : "#fff3cd",
                              color:
                                  app.status === "JOINED"
                                      ? "#155724"
                                      : app.status === "REJECTED"
                                          ? "#721c24"
                                          : "#856404",
                          }}
                      >
                        {app.status}
                      </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                            <button
                                                onClick={() => onAccept(app.id)}
                                                disabled={disableAccept}
                                                style={{
                                                    ...buttonStyle,
                                                    background: disableAccept ? "#bdbdbd" : "#28a745",
                                                    cursor: disableAccept ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                Chấp nhận
                                            </button>
                                            <button
                                                onClick={() => onReject(app.id)}
                                                disabled={disableReject}
                                                style={{
                                                    ...buttonStyle,
                                                    background: disableReject ? "#bdbdbd" : "#dc3545",
                                                    cursor: disableReject ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                Loại
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    borderBottom: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
};

const tdStyle: React.CSSProperties = {
    borderBottom: "1px solid #eee",
    padding: "12px",
    verticalAlign: "top",
};

const buttonStyle: React.CSSProperties = {
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    fontWeight: 600,
};

export default CandidateList;