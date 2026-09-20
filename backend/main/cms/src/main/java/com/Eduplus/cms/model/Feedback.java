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
@Document(collection = "feedback")
public class Feedback {
    @Id
    private String id;
    private String courseCode;
    private String facultyId;
    private String facultyName;
    private Integer rating;
    private String comments;
    private String feedbackType; // 'COURSE_EVAL' | 'FACULTY_REVIEW'
    private String dateSubmitted;
}
