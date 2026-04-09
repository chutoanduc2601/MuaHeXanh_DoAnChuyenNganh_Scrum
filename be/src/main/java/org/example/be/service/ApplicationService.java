package org.example.be.service;

import org.example.be.dto.ApplicationRequestDTO;
import org.example.be.dto.ApplicationResponseDTO;
import org.example.be.dto.UpdateApplicationStatusDTO;
import org.example.be.entity.Application;
import org.example.be.entity.Project;
import org.example.be.entity.User;
import org.example.be.repository.ApplicationRepository;
import org.example.be.repository.ProjectRepository;
import org.example.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ApplicationResponseDTO applyToProject(ApplicationRequestDTO requestDTO) {
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với ID: " + requestDTO.getUserId()));

        Project project = projectRepository.findById(requestDTO.getProjectId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy project với ID: " + requestDTO.getProjectId()));

        applicationRepository.findByUserAndProject(user, project).ifPresent(app -> {
            throw new RuntimeException("Sinh viên đã đăng ký dự án này rồi!");
        });

        Application application = new Application();
        application.setUser(user);
        application.setProject(project);
        application.setStatus("PENDING");

        Application saved = applicationRepository.save(application);
        return mapToDTO(saved);
    }

    public List<ApplicationResponseDTO> getApplicationsByProject(Integer projectId) {
        List<Application> applications = applicationRepository.findByProjectId(projectId);
        return applications.stream().map(this::mapToDTO).toList();
    }

    public ApplicationResponseDTO updateStatus(Long applicationId, UpdateApplicationStatusDTO requestDTO) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn ứng tuyển với ID: " + applicationId));

        String newStatus = requestDTO.getStatus();
        if (newStatus == null || newStatus.isBlank()) {
            throw new RuntimeException("Status không được để trống");
        }

        newStatus = newStatus.toUpperCase();

        if (!newStatus.equals("JOINED") && !newStatus.equals("REJECTED") && !newStatus.equals("PENDING")) {
            throw new RuntimeException("Status không hợp lệ. Chỉ chấp nhận: PENDING, JOINED, REJECTED");
        }

        if (newStatus.equals("JOINED")) {
            Project project = application.getProject();
            long joinedCount = applicationRepository.countByProjectIdAndStatus(project.getId(), "JOINED");

            if (project.getRequiredStudents() != null && joinedCount >= project.getRequiredStudents()) {
                throw new RuntimeException("Dự án đã đủ số lượng tình nguyện viên");
            }
        }

        application.setStatus(newStatus);
        Application updated = applicationRepository.save(application);
        return mapToDTO(updated);
    }

    private ApplicationResponseDTO mapToDTO(Application application) {
        User user = application.getUser();
        Project project = application.getProject();

        return new ApplicationResponseDTO(
                application.getId(),
                user.getId(),
                user.getFullname(),
                user.getStudentId(),
                user.getEmail(),
                user.getPhone(),
                user.getSchool(),
                user.getSkill(),
                user.getNote(),
                project.getId(),
                project.getProjectName(),
                application.getStatus()
        );
    }
}