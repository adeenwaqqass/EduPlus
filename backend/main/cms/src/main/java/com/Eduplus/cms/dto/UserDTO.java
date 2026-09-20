package com.Eduplus.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String name;
    private String shortName;
    private String role; // 'student' | 'faculty' | 'admin'
    private String registrationNumber;
    private String department;
    private String semester;
    private String avatar;
    private String email;
    private String phone;
}
