package com.Eduplus.cms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String name;
    private String registrationNumber;
    private String rollNumber;
    private String branch;
    private String semester;
    private String academicBatch;
    private String classSection;
    private String email;
    private String phone;
    private String avatar;
    
    private Double cgpa;
    private Double attendancePercentage;
    private String riskLevel; // 'CRITICAL' | 'IMPORTANT' | 'NORMAL'
    private Double riskScore; // 0.0 to 100.0 from Achilles AI
    
    private String parentName;
    private String parentPhone;
    private String address;
    private String hostelRoom;

    private List<String> enrolledCourses;
}
