package org.example.be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}