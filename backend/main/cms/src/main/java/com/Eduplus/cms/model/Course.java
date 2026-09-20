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
@Document(collection = "courses")
public class Course {
    @Id
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
