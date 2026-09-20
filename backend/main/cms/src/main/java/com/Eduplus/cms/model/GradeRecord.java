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
@Document(collection = "grades")
public class GradeRecord {
    @Id
    private String id;
    private String registrationNumber;
    private String courseCode;
    private String academicSession;
    
    // Internal (Faculty Entry - max 20 each)
    private Integer ut1;
    private Integer ut2;
    private Integer internalScore;
    
    // External (Admin Entry Only - max 60)
    private Integer endSemScore;
    
    private Integer totalMarks; // max 100
    private String letterGrade;
    private Integer gradePoints;
}
