package org.example.be.controller;

import org.example.be.dto.ProjectRequestDTO;
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
        // Kiểm tra log ở đây, nếu vẫn null thì là do lỗi format JSON ở Postman
        System.out.println("Mapping DTO to Entity: " + projectDTO.getProjectName());

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
    public List<Project> listProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeProject(@PathVariable Integer id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Xóa thành công!");
    }
    // Trong ProjectController.java

    // Trong ProjectController.java

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Integer id, @RequestBody ProjectRequestDTO projectDTO) {
        // 1. Chuyển đổi DTO sang Entity (để giữ tính đóng gói)
        Project projectDetails = new Project();
        projectDetails.setProjectName(projectDTO.getProjectName());
        projectDetails.setDescription(projectDTO.getDescription());
        projectDetails.setLocation(projectDTO.getLocation());
        projectDetails.setRequiredStudents(projectDTO.getRequiredStudents());
        projectDetails.setRequiredSkills(projectDTO.getRequiredSkills());
        projectDetails.setStartDate(projectDTO.getStartDate());
        projectDetails.setEndDate(projectDTO.getEndDate());

        // 2. Gọi Service để thực hiện cập nhật
        Project updatedProject = projectService.updateProject(id, projectDetails);

        return ResponseEntity.ok(updatedProject);
    }
}