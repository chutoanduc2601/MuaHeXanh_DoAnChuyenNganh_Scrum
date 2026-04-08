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
        if (project.getStatus() == null) project.setStatus("PENDING");
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Integer id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy dự án ID: " + id));
    }

    public void deleteProject(Integer id) {
        projectRepository.deleteById(id);
    }
    public Project updateProject(Integer id, Project projectDetails) {
        // 1. Tìm dự án cũ, nếu không thấy sẽ ném ngoại lệ (RuntimeException đã định nghĩa ở hàm getProjectById)
        Project project = getProjectById(id);

        // 2. Cập nhật các thông tin mới
        project.setProjectName(projectDetails.getProjectName());
        project.setDescription(projectDetails.getDescription());
        project.setLocation(projectDetails.getLocation());
        project.setRequiredStudents(projectDetails.getRequiredStudents());
        project.setRequiredSkills(projectDetails.getRequiredSkills());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        // Lưu ý: Không cập nhật status trừ khi bạn muốn leader có quyền đổi status tại đây

        // 3. Lưu lại (Spring Data JPA save() sẽ thực hiện UPDATE nếu Object đã có ID)
        return projectRepository.save(project);
    }

    // ======= APPROVE =======
    public Project approveProject(Integer id) {
        Project project = getProjectById(id);
        project.setStatus("APPROVED");
        project.setRejectReason(null); // clear lý do cũ nếu có
        return projectRepository.save(project);
    }

    // ======= REJECT =======
    public Project rejectProject(Integer id, String reason) {
        Project project = getProjectById(id);
        project.setStatus("REJECTED");
        project.setRejectReason(reason);
        return projectRepository.save(project);
    }

    public List<Project> getProjectsByStatus(String status) {
        return projectRepository.findByStatus(status);
    }

}