package org.example.be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.example.be.entity.User;
import org.example.be.repository.UserRepository;
import java.time.LocalDate;

@SpringBootApplication
public class BeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(UserRepository userRepository) {
        return args -> {
            System.out.println("====== BẮT ĐẦU KIỂM TRA MÔI TRƯỜNG DB ======");
            
            // Xóa hết dữ liệu cũ nếu muốn (tùy chọn) hoặc tạo thêm
            // userRepository.deleteAll();

            User student = new User(
                    "Nguyễn Văn Sinh Viên",
                    LocalDate.of(2000, 1, 1),
                    "sinhvien" + System.currentTimeMillis() + "@gmail.com", // Đảm bảo unique
                    "0909123456",
                    "SV2026-001",
                    "Đại Học CNTT",
                    "Java, Spring Boot, React",
                    "Sinh viên thực tập dự án Mùa Hè Xanh"
            );

            userRepository.save(student);

            System.out.println("✅ TẠO STUDENT MỚI THÀNH CÔNG VỚI THÔNG TIN:");
            System.out.println("- Họ tên: " + student.getFullName());
            System.out.println("- MSSV  : " + student.getStudentId());
            System.out.println("- Lên Supabase (Web) bật Table Editor để xem kết quả nhé!");
            System.out.println("=============================================");
        };
    }
}
