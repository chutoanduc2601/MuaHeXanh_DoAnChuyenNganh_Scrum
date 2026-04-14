package org.example.be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationResponseDTO {
    private Long id;
    private Long userId;
    private String fullname;
    private String studentId;
    private String email;
    private String phone;
    private String school;
    private String skill;
    private String note;
    private Integer projectId;
    private String projectName;
    private String status;

    private LocalDateTime appliedAt;  // Ngày nộp đơn
    private String location;          // Địa điểm mặt trận
    private LocalDate startDate;        // Ngày bắt đầu
    private LocalDate endDate;          // Ngày kết thúc
    private String rejectReason;      // Lý do từ chối (nếu có)
}