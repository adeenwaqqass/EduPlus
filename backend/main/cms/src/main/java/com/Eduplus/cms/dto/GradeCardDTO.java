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
public class GradeCardDTO {
    private String studentName;
    private String registrationNumber;
    private String rollNumber;
    private String branch;
    private String academicSession;
    private String semesterTitle;
    private Double sgpa;
    private Double cgpa;
    
    private List<CourseGradeItem> courses;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CourseGradeItem {
        private String courseCode;
        private String courseTitle;
        private Integer credits;
        private Integer ut1; // Max 20
        private Integer ut2; // Max 20
        private Integer internalScore; // Max 20
        private Integer endSemScore; // Max 60 (Admin Entry Only)
        private Integer totalMarks; // Max 100
        private String letterGrade; // 'O', 'A+', 'A', 'B+', 'B', 'C', 'F'
        private Integer gradePoints; // 10, 9, 8, 7, 6, 5, 0
    }
}
