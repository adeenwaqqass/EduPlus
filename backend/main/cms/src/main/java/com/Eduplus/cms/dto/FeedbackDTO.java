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
public class FeedbackDTO {
    private String id;
    
    @NotBlank(message = "Course Code is required")
    private String courseCode;

    private String facultyId;
    private String facultyName;

    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Integer rating;

    private String comments;
    private String feedbackType; // 'COURSE_EVAL' | 'FACULTY_REVIEW'
    private String dateSubmitted;
}
