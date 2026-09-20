package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.LoginRequest;
import com.Eduplus.cms.dto.LoginResponse;
import com.Eduplus.cms.dto.UserDTO;
import com.Eduplus.cms.model.User;
import com.Eduplus.cms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        String role = request.getRole() != null ? request.getRole().toLowerCase() : "student";
        
        // Find by email or fallback to demo profile creation
        User user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> createDemoUser(role, request.getEmail(), request.getDepartment()));

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .shortName(user.getShortName())
                .role(user.getRole())
                .registrationNumber(user.getRegistrationNumber())
                .department(user.getDepartment())
                .semester(user.getSemester())
                .avatar(user.getAvatar())
                .email(user.getEmail())
                .phone(user.getPhone())
                .build();

        String token = "eduplus_jwt_token_" + UUID.randomUUID().toString();

        return LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(userDTO)
                .message("Authentication successful! Welcome " + user.getName())
                .build();
    }

    private User createDemoUser(String role, String email, String dept) {
        if ("faculty".equalsIgnoreCase(role)) {
            return User.builder()
                    .name("Prof. Sarah Jenkins")
                    .shortName("SARAH")
                    .role("faculty")
                    .registrationNumber("FAC-02")
                    .department(dept != null ? dept.toUpperCase() : "COMPUTER SCIENCE & ENGINEERING")
                    .semester("Faculty / Educator")
                    .avatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80")
                    .email(email)
                    .build();
        } else if ("admin".equalsIgnoreCase(role)) {
            return User.builder()
                    .name("Dr. James Miller (HOD & Admin)")
                    .shortName("MILLER")
                    .role("admin")
                    .registrationNumber("ADM-01")
                    .department("REGISTRAR & DEAN OFFICE")
                    .semester("Head of Department / Admin")
                    .avatar("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80")
                    .email(email)
                    .build();
        }
        return User.builder()
                .name("MR. ADEEN WAQQAS AHMED SHAHZAD AHMED")
                .shortName("ADEEN")
                .role("student")
                .registrationNumber("23ACOE1121163")
                .department("COMPUTER ENGINEERING")
                .semester("Semester VII (WINTER 2026)")
                .avatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80")
                .email(email)
                .build();
    }
}
