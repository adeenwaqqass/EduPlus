package com.Eduplus.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
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
    
    // Academic & Risk Metrics
    private Double cgpa;
    private Double sgpa;
    private Double attendancePercentage;
    private String riskLevel; // 'CRITICAL' | 'IMPORTANT' | 'NORMAL'
    private Double riskScore; // 0.0 to 100.0 from Achilles AI
    
    // Admission & Family Details (SPPU Standard)
    private String fatherName;
    private String motherName;
    private String degree;
    private String scheme;
    private String admissionCategory;
    private String academicSession;

    // Guardian & Address
    private String parentName;
    private String parentPhone;
    private String address;
    private String hostelRoom;

    private List<Object> enrolledCourses;
}
