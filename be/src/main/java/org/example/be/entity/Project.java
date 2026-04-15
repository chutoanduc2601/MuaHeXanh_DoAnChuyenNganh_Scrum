package org.example.be.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "project_name", nullable = false)
    @JsonProperty("projectName")
    private String projectName;

    @Column(name = "description", columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;

    @Column(name = "location")
    @JsonProperty("location")
    private String location;

    @Column(name = "required_students")
    @JsonProperty("requiredStudents")
    private Integer requiredStudents;

    @Column(name = "required_skills", columnDefinition = "TEXT")
    @JsonProperty("requiredSkills")
    private String requiredSkills;

    @Column(name = "start_date")
    @JsonProperty("startDate")
    private LocalDate startDate;

    @Column(name = "end_date")
    @JsonProperty("endDate")
    private LocalDate endDate;

    @Column(name = "status")
    @JsonProperty("status")
    private String status = "PENDING";

    @Column(name = "reject_reason", columnDefinition = "TEXT")
    @JsonProperty("rejectReason")
    private String rejectReason;

    @Column(name = "is_active")
    @JsonProperty("isActive")
    private Integer isActive = 1;

    @Column(name = "delete_reason", columnDefinition = "TEXT")
    @JsonProperty("deleteReason")
    private String deleteReason;
}