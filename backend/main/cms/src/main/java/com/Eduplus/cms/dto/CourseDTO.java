package com.Eduplus.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private String id;
    private String courseCode;
    private String title;
    private Integer credits;
    private String department;
    private String semester;
    private String facultyName;
    private String facultyId;
    private Integer totalConductedLectures;
    private Integer enrolledStudentsCount;
    private String type; // 'CORE' | 'ELECTIVE' | 'LAB' | 'PROJECT'
    private String syllabusUrl;
}
