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
@Document(collection = "faculties")
public class Faculty {
    @Id
    private String id;
    private String facultyId;
    private String name;
    private String designation;
    private String department;
    private String email;
    private String phone;
    private String qualification;
    private String specialization;
    private String officeLocation;
    private Integer joiningYear;
    private Integer experienceYears;
    private String avatar;
    private List<String> assignedCourses;
}
