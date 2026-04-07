package org.example.be.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullname;
    private String dob;          // ISO date string: "yyyy-MM-dd"
    private String email;
    private String password;
    private String phone;
    private String studentId;
    private String school;
    private String skill;
    private String note;

}
