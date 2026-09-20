package com.Eduplus.cms.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeEntryRequest {
    @NotBlank(message = "Student Registration Number is required")
    private String registrationNumber;

    @NotBlank(message = "Course Code is required")
    private String courseCode;

    private String academicSession; // e.g., 'WINTER 2026'

    // Internal Assessment Marks (Faculty Entry - Max 20 each)
    @Min(value = 0, message = "UT1 marks cannot be negative")
    @Max(value = 20, message = "UT1 marks cannot exceed 20")
    private Integer ut1;

    @Min(value = 0, message = "UT2 marks cannot be negative")
    @Max(value = 20, message = "UT2 marks cannot exceed 20")
    private Integer ut2;

    @Min(value = 0, message = "Internal Assessment marks cannot be negative")
    @Max(value = 20, message = "Internal Assessment marks cannot exceed 20")
    private Integer internalScore;

    // External End-Sem Exam Marks (Admin/HOD Entry ONLY - Max 60)
    @Min(value = 0, message = "End-Sem marks cannot be negative")
    @Max(value = 60, message = "End-Sem marks cannot exceed 60")
    private Integer endSemScore;
}
