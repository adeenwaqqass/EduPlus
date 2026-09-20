package com.Eduplus.cms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String shortName;
    private String email;
    private String password;
    private String role; // 'student' | 'faculty' | 'admin'
    private String registrationNumber;
    private String department;
    private String semester;
    private String avatar;
    private String phone;
}
