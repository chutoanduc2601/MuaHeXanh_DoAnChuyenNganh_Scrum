package org.example.be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "applications",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "project_id"})
        }
)
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Sinh viên apply
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Project được apply
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    // PENDING / JOINED / REJECTED
    @Column(nullable = false)
    private String status = "PENDING";

    @Column(name = "applied_at")
    private LocalDateTime appliedAt = LocalDateTime.now();
}