package org.example.be.service;

import org.example.be.entity.Project;
import org.example.be.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        project.setIsActive(1);
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findByIsActive(1);
    }

    public Project getProjectById(Integer id) {
        return projectRepository.findById(id)
                .filter(p -> p.getIsActive() == 1)
                .orElseThrow(() -> new RuntimeException("Dự án không tồn tại hoặc đã bị ẩn"));
    }

    // LOGIC XÓA MỀM: Chuyển 1 sang 2
    public void deleteProject(Integer id, String reason) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy dự án"));

        project.setIsActive(2);
        project.setDeleteReason(reason);
        projectRepository.save(project);
    }
    // Sửa lại trong ProjectService.java
    public List<Project> getProjectsByStatusAndActive(String status, int isActive) {
        return projectRepository.findByStatusAndIsActive(status, isActive);
    }

    public Project updateProject(Integer id, Project projectDetails) {
        Project project = getProjectById(id);
        project.setProjectName(projectDetails.getProjectName());
        project.setDescription(projectDetails.getDescription());
        project.setLocation(projectDetails.getLocation());
        project.setRequiredStudents(projectDetails.getRequiredStudents());
        project.setRequiredSkills(projectDetails.getRequiredSkills());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        return projectRepository.save(project);
    }

    public Project approveProject(Integer id) {
        Project project = getProjectById(id);
        project.setStatus("APPROVED");
        return projectRepository.save(project);
    }

    public Project rejectProject(Integer id, String reason) {
        Project project = getProjectById(id);
        project.setStatus("REJECTED");
        project.setRejectReason(reason);
        return projectRepository.save(project);
    }

    public List<Project> getProjectsByStatus(String status) {
        return projectRepository.findByStatusAndIsActive(status, 1);
    }
}