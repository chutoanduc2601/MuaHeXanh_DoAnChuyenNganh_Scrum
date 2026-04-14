package org.example.be.controller;

import org.example.be.dto.ApplicationRequestDTO;
import org.example.be.dto.ApplicationResponseDTO;
import org.example.be.dto.UpdateApplicationStatusDTO;
import org.example.be.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Sinh viên apply project
    @PostMapping("/apply")
    public ResponseEntity<?> applyToProject(@RequestBody ApplicationRequestDTO requestDTO) {
        try {
            ApplicationResponseDTO result = applicationService.applyToProject(requestDTO);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Sinh viên xem các dự án đã đăng ký
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getApplicationsByUser(userId));
    }

    // Leader xem danh sách ứng viên của project
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByProject(@PathVariable Integer projectId) {
        return ResponseEntity.ok(applicationService.getApplicationsByProject(projectId));
    }

    // Leader duyệt / từ chối
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody UpdateApplicationStatusDTO requestDTO
    ) {
        try {
            return ResponseEntity.ok(applicationService.updateStatus(applicationId, requestDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Sinh viên xem danh sách các dự án mình đã apply
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getApplicationsByUser(userId));
    }
}