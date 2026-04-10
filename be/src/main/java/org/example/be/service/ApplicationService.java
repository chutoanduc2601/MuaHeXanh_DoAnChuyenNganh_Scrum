package org.example.be.service;

import org.example.be.entity.Application;
import org.example.be.entity.Project;
import org.example.be.entity.User;
import org.example.be.repository.ApplicationRepository;
import org.example.be.repository.ProjectRepository;
import org.example.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public Application applyProject(Long userId, Integer projectId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên"));
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy dự án"));

        // 1. Kiểm tra trùng lặp
        if (applicationRepository.findByUserIdAndProjectId(userId, projectId) != null) {
            throw new RuntimeException("Bạn đã đăng ký dự án này rồi!");
        }

        // 2. Kiểm tra số lượng
        long approvedCount = applicationRepository.countByProjectIdAndStatus(projectId, "APPROVED");
        if (project.getRequiredStudents() != null && approvedCount >= project.getRequiredStudents()) {
            throw new RuntimeException("Dự án đã đủ số lượng tình nguyện viên!");
        }

        // 3. Kiểm tra trùng lịch
        List<Application> userApplications = applicationRepository.findByUserId(userId);
        LocalDate start1 = project.getStartDate();
        LocalDate end1 = project.getEndDate();

        if (start1 != null && end1 != null) {
            for (Application app : userApplications) {
                // Theo yêu cầu: Loại trừ các dự án bị REJECTED
                if ("REJECTED".equals(app.getStatus())) {
                    continue;
                }

                LocalDate start2 = app.getProject().getStartDate();
                LocalDate end2 = app.getProject().getEndDate();

                if (start2 != null && end2 != null) {
                    // Công thức overlap: start1 <= end2 && start2 <= end1
                    if (start1.isBefore(end2.plusDays(1)) && start2.isBefore(end1.plusDays(1))) {
                        throw new RuntimeException("Trùng lịch với dự án: " + app.getProject().getProjectName());
                    }
                }
            }
        }

        // Tạo application
        Application application = new Application();
        application.setUser(user);
        application.setProject(project);
        application.setStatus("PENDING");

        Application saved = applicationRepository.save(application);

        // Mô phỏng Gửi Email
        System.out.println("=========================================================");
        System.out.println("MÔ PHỎNG HỆ THỐNG GỬI EMAIL TỰ ĐỘNG");
        System.out.println("Gửi đến: " + user.getEmail());
        System.out.println("Tiêu đề: Đăng ký thành công dự án " + project.getProjectName());
        System.out.println(
                "Nội dung: Chào " + user.getFullname() + ",\nĐơn đăng ký của bạn đang chờ thủ lĩnh phê duyệt.");
        System.out.println("=========================================================");

        return saved;
    }

    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
}
