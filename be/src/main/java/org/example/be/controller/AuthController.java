package org.example.be.controller;

import org.example.be.dto.RegisterRequest;
import org.example.be.entity.User;
import org.example.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*") // Để React gọi được API
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("username");
        String rawPassword = loginData.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);

        // BCrypt verify: so sánh raw password với hash đã lưu trong DB
        if (userOptional.isPresent() && rawPassword != null
                && passwordEncoder.matches(rawPassword, userOptional.get().getPassword())) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(401).body("Email hoặc mật khẩu không chính xác!");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        // Kiểm tra email
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("Email đã được sử dụng!");
        }

        // Kiểm tra password rỗng
        if (req.getPassword() == null || req.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Mật khẩu không được để trống!");
        }

        User user = new User();
        user.setFullname(req.getFullname());
        user.setEmail(req.getEmail());

        // Hash password
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        user.setPhone(req.getPhone());
        user.setStudentId(req.getStudentId());
        user.setSchool(req.getSchool());
        user.setSkill(req.getSkill());
        user.setNote(req.getNote());

        if (req.getDob() != null && !req.getDob().isBlank()) {
            user.setDob(LocalDate.parse(req.getDob()));
        }

        User saved = userRepository.save(user);

        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }
}