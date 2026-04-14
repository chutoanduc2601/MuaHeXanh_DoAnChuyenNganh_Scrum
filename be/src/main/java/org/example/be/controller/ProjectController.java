package org.example.be.controller;

import org.example.be.dto.ProjectRequestDTO;
import org.example.be.dto.RejectRequest;
import org.example.be.entity.Project;
import org.example.be.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody ProjectRequestDTO projectDTO) {
        Project project = new Project();
        project.setProjectName(projectDTO.getProjectName());
        project.setDescription(projectDTO.getDescription());
        project.setLocation(projectDTO.getLocation());
        project.setRequiredStudents(projectDTO.getRequiredStudents());
        project.setRequiredSkills(projectDTO.getRequiredSkills());
        project.setStartDate(projectDTO.getStartDate());
        project.setEndDate(projectDTO.getEndDate());
        project.setStatus("PENDING");

        return ResponseEntity.ok(projectService.createProject(project));
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Trong file ProjectController.java
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(
            @PathVariable Integer id,
            @RequestBody java.util.Map<String, String> payload
    ) {
        String reason = payload.get("deleteReason");
        projectService.deleteProject(id, reason);
        return ResponseEntity.ok("Dự án đã được xóa thành công!");
    }
    @GetMapping("/status/approved")
    public ResponseEntity<List<Project>> getApprovedProjects() {
        return ResponseEntity.ok(projectService.getProjectsByStatus("APPROVED"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Integer id, @RequestBody ProjectRequestDTO projectDTO) {
        Project projectDetails = new Project();
        projectDetails.setProjectName(projectDTO.getProjectName());
        projectDetails.setDescription(projectDTO.getDescription());
        projectDetails.setLocation(projectDTO.getLocation());
        projectDetails.setRequiredStudents(projectDTO.getRequiredStudents());
        projectDetails.setRequiredSkills(projectDTO.getRequiredSkills());
        projectDetails.setStartDate(projectDTO.getStartDate());
        projectDetails.setEndDate(projectDTO.getEndDate());

        Project updatedProject = projectService.updateProject(id, projectDetails);
        return ResponseEntity.ok(updatedProject);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Project> approveProject(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.approveProject(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Project> rejectProject(
            @PathVariable Integer id,
            @RequestBody RejectRequest request
    ) {
        return ResponseEntity.ok(projectService.rejectProject(id, request.getReason()));
    }
}