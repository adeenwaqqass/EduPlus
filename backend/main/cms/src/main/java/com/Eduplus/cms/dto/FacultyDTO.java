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
public class FacultyDTO {
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
