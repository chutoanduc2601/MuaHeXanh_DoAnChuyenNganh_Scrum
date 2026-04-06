package org.example.be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullname;

    private LocalDate dob;

    @Column(unique = true)
    private String email;

    private String password;

    private String phone;

    @Column(name = "student_id")
    private String studentId;

    private String school;

    @Column(columnDefinition = "TEXT")
    private String skill;

    @Column(columnDefinition = "TEXT")
    private String note;
}