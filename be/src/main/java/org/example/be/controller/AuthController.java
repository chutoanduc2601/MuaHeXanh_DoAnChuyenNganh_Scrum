package org.example.be.controller;

import org.example.be.entity.User;
import org.example.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*") // Để React gọi được API
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("username"); // Lấy email từ React
        String password = loginData.get("password"); // Lấy password từ React

        Optional<User> userOptional = userRepository.findByEmail(email);

        // Kiểm tra xem email có tồn tại không VÀ password gửi lên có khớp với DB không
        if (userOptional.isPresent() && password != null && password.equals(userOptional.get().getPassword())) {
            // Đăng nhập thành công
            return ResponseEntity.ok(userOptional.get());
        } else {
            // Sai email hoặc password
            return ResponseEntity.status(401).body("Email hoặc mật khẩu không chính xác!");
        }
    }
}