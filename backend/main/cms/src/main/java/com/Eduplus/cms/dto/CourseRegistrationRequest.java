package com.Eduplus.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRegistrationRequest {
    @NotBlank(message = "Student Registration Number is required")
    private String registrationNumber;

    @NotEmpty(message = "At least one course code must be selected")
    private List<String> courseCodes;

    private String registrationType; // 'REGULAR' | 'MAJOR_MINOR' | 'ELECTIVE'
    private String academicSession; // e.g., 'WINTER 2026'
}
